// ConsoleApplication2.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include <iostream>
#include<fstream>
#include <boost/filesystem.hpp>
#include <boost/algorithm/string.hpp>
#include <vector>
#include <string>     // std::string, std::to_string
#include <ctime>
#include <windows.h>



//0x1F0 for username offset reads from 00 to 0E
//0x150 for map name ends at 0x160 0C
//32 gametypes
//0x150 variant type 15 long
//0x178 variant name 15 long
//ox198 Variant desc 127 long
//0xE8 Variant Author 15 long

//include whichever boost lib is needed here
using namespace std;
vector<string> vec2;

void makeJson(vector<string> &vec, bool ismaps) {
	std::ofstream out;
	if (ismaps) {
		out.open("maps.json");
	}
	else {
		out.open("variants.json");
	}
	out << "[" << endl;
	for (size_t i = 0; i < vec.size() - 1; i++) {
		out << vec.at(i) << "," << endl;
	}
	out << vec.at(vec.size() - 1) << endl;

	out << "]";
	out.close();
	return;
}
std::string current_date(int64_t tame) {
	time_t now = tame;
	struct tm tstruct;
	char buf[40];
	tstruct = *localtime(&now);
	//format: day DD-MM-YYYY
	strftime(buf, sizeof(buf), "%D", &tstruct);
	return buf;
}
string mapIdToString(int mapid) {
	if (mapid == 705) {
		return "diamondback";
	}
	else if (mapid == 703) {
		return "edge";
	}
	else if (mapid == 320) {
		return "guardian";
	}
	else if (mapid == 310) {
		return "highground";
	}
	else if (mapid == 31) {
		return "icebox";
	}
	else if (mapid == 30) {
		return "lastresort";
	}
	else if (mapid == 380) {
		return "narrows";
	}
	else if (mapid == 700) {
		return "reactor";
	}
	else if (mapid == 400) {
		return "sandtrap";
	}
	else if (mapid == 410) {
		return "standoff";
	}
	else if (mapid == 390) {
		return "thepit";
	}
	else if (mapid == 340) {
		return "valhalla";
	}
}
string GetCustomMapInfo(const std::string &fullMapName, int offset, bool ismap)
{
	int loops = 0;
	int spaces = 1;
	if ((offset == 0x170 && ismap) || (offset == 0x198 && !ismap)) {
		loops = 127;
	}
	else {
		loops = 15;
	}
	if ((offset == 0x150 && ismap) || (offset == 0x178)) {
		spaces = 2;
	}
	// Open the .map file
	auto mapPath = fullMapName;
	std::ifstream mapFile(mapPath, std::ios::binary);
	if (!mapFile.is_open())
		return "";

	// Read map ID
	string author = "";
	int8_t mapId = 0;
	for (int i = 0; i < loops; i++) {
		mapFile.seekg(offset);
		mapFile.read(reinterpret_cast<char*>(&mapId), sizeof(mapId));
		if (mapId == 0 || mapId == 10 || mapId == 13) {
			break;
		}

		char temp = (char)mapId;
		author += temp;
		offset += spaces;
	}
	return author;
}
int GetCustomMapId(const std::string &fullMapName)
{
	// Open the .map file
	auto mapPath = fullMapName;
	std::ifstream mapFile(mapPath, std::ios::binary);
	if (!mapFile.is_open())
		return -1;

	// Read map ID
	int32_t mapId = 0;
	mapFile.seekg(0x120);
	mapFile.read(reinterpret_cast<char*>(&mapId), sizeof(mapId));
	return mapId;
}
int64_t GetCustomMapDate(const std::string &fullMapName)
{
	// Open the .map file
	auto mapPath = fullMapName;
	std::ifstream mapFile(mapPath, std::ios::binary);
	if (!mapFile.is_open())
		return -1;

	// Read map ID
	int64_t mapId = 0;
	mapFile.seekg(0x110);
	mapFile.read(reinterpret_cast<char*>(&mapId), sizeof(mapId));
	return mapId;
}
bool listMaps()
{
	vector<string> vec;
	boost::filesystem::path p("../../../../maps/");
	boost::filesystem::directory_iterator end_itr;
	if (boost::filesystem::exists(p))
	{
		// cycle through the directory
		for (boost::filesystem::directory_iterator itr(p); itr != end_itr; ++itr)
		{
			if (!is_regular_file(itr->path()))
			{
				std::string file = std::string(itr->path().generic_string());
				std::string file2 = std::string(itr->path().generic_string());
				std::string file3 = file;

				file.append("\\sandbox.map"); // for windows switch the slash sign 
				file2.append("\\mapimage.jpg"); // for windows switch the slash sign 
				auto path = boost::filesystem::path(file);
				auto path2 = boost::filesystem::path(file2);

				int customMapId = GetCustomMapId(file);
				int64_t date = GetCustomMapDate(file);
				string mapnm = mapIdToString(customMapId);
				string customAuthor = GetCustomMapInfo(file, 0x1F0, true);
				string customTitle = GetCustomMapInfo(file, 0x150, true);
				string customDesc = GetCustomMapInfo(file, 0x170, true);
				string folderName = customTitle;

				boost::erase_all(folderName, ".");

				if (boost::filesystem::exists(path)) {
					string temp = "{ \"MapName\": \"";
					temp += customTitle;
					temp += "\", \"BaseMap\": \"";
					temp += mapnm;
					//temp += customMapId;
					temp += "\", \"Author\": \"";
					temp += customAuthor;
					temp += "\", \"Desc\": \"";
					temp += customDesc;
					if (boost::filesystem::exists(path2)) {
						boost::filesystem::rename(file2, "..\\..\\assets\\maps\\customs\\" + customTitle + ".jpg");//change slash for windows
					}
					auto path3 = boost::filesystem::path("../../../../maps/" + folderName);

					if (!boost::contains(itr->path().filename().string(), customTitle)) {

						if ((boost::filesystem::exists(path3) && boost::filesystem::is_empty(path3)) || !boost::filesystem::exists(path3)) {
							boost::filesystem::rename(file3, "..\\..\\..\\..\\maps\\" + folderName);

						}
						else {
							int64_t date2 = GetCustomMapDate("../../../../maps/" + folderName + "/sandbox.map");
							//cout << date << endl;
							//cout << date2 << endl;
							if (date == date2) {
							boost::filesystem::remove_all(file3);
							}
							else {
								int count = 1;
								while (true) {
									if (!boost::filesystem::exists(boost::filesystem::path("../../../../maps/" + folderName + std::to_string(count)))) {
										boost::filesystem::rename(file3, "..\\..\\..\\..\\maps\\" + folderName + std::to_string(count));
										folderName += std::to_string(count);
										break;
									}
									else {
										int64_t date3 = GetCustomMapDate("../../../../maps/" + folderName + std::to_string(count) + "/sandbox.map");
											if (date == date3) {
												boost::filesystem::remove_all(file3);
												break;
											}

									}
									count++;
								}
							}
						}
					}
					

					temp += "\", \"FolderName\": \"";
					temp += folderName;
					temp += "\", \"Date\": \"";
					temp += current_date(date);
					temp += +"\" }";
					vec.push_back(temp);

				}
			}
		}
		makeJson(vec, true);
	}
	return true;
}
bool listModes(string mode)
{

	boost::filesystem::path p("../../../../variants/");
	boost::filesystem::directory_iterator end_itr;
	if (boost::filesystem::exists(p))
	{
		// cycle through the directory
		for (boost::filesystem::directory_iterator itr(p); itr != end_itr; ++itr)
		{
			if (!is_regular_file(itr->path()))
			{
				std::string file = std::string(itr->path().generic_string());
				std::string file3 = file;
				string type = "\\variant.";
				file.append(type += mode); // for windows switch the slash sign 
				auto path = boost::filesystem::path(file);
				string customAuthor = GetCustomMapInfo(file, 0xE8, false);
				int64_t date = GetCustomMapDate(file);
				string customTitle = GetCustomMapInfo(file, 0x178, false);
				string customDesc = GetCustomMapInfo(file, 0x198, false);
				string customMode = GetCustomMapInfo(file, 0x150, false);
				string folderName = customTitle;
				boost::erase_all(folderName, ".");

				if (boost::filesystem::exists(path)) {
					string temp = "{ \"MapName\": \"";
					temp += customTitle;
					temp += "\", \"BaseMode\": \"";
					temp += mode;
					temp += "\", \"Author\": \"";
					temp += customAuthor;
					temp += "\", \"Desc\": \"";
					temp += customDesc;
					temp += "\", \"SpecificMode\": \"";
					temp += customMode;
					
					auto path3 = boost::filesystem::path("../../../../variants/" + folderName);

					if (!boost::contains(itr->path().filename().string(), customTitle)) {

						if ((boost::filesystem::exists(path3) && boost::filesystem::is_empty(path3)) || !boost::filesystem::exists(path3)) {
							boost::filesystem::rename(file3, "..\\..\\..\\..\\variants\\" + folderName);

						}
						else {
							int64_t date2 = GetCustomMapDate("../../../../variants/" + folderName + "/variant." +mode);
							//cout << date << endl;
							//cout << date2 << endl;
							if (date == date2) {
								boost::filesystem::remove_all(file3);
							}
							else {
								int count = 1;
								while (true) {
									if (!boost::filesystem::exists(boost::filesystem::path("../../../../variants/" + folderName + std::to_string(count)))) {
										boost::filesystem::rename(file3, "..\\..\\..\\..\\variants\\" + folderName + std::to_string(count));
										folderName += std::to_string(count);
										break;
									}
									else {
										int64_t date3 = GetCustomMapDate("../../../../maps/" + folderName + std::to_string(count) + "/sandbox.map");
										if (date == date3) {
											boost::filesystem::remove_all(file3);
											break;
										}

									}
									count++;
								}
							}
						}
					}
					/*if (!boost::contains(itr->path().filename().string(), customTitle)) {
						if ((boost::filesystem::exists(path3) && boost::filesystem::is_empty(path3)) || !boost::filesystem::exists(path3)) {
							boost::filesystem::rename(file3, "..\\..\\..\\..\\variants\\" + folderName);

						}
						else {
							int count = 1;
							while (true) {
								if (!boost::filesystem::exists(boost::filesystem::path("../../../../variants/" + folderName + std::to_string(count)))) {
									boost::filesystem::rename(file3, "..\\..\\..\\..\\variants\\" + folderName + std::to_string(count));
									folderName += std::to_string(count);

									break;
								}
								count++;
							}

						}
					}*/

					temp += "\", \"FolderName\": \"";
					temp += folderName;
					temp += "\", \"Date\": \"";
					temp += current_date(date);
					temp += +"\" }";
					vec2.push_back(temp);
				}
			}
		}
	}
	return true;
}

int WINAPI WinMain(HINSTANCE inst, HINSTANCE prev, LPSTR cmd, int show)
{
//int main() {
	//cout << "lol" << endl;
	listMaps();
	listModes("zombiez");
	listModes("assault");
	listModes("terries");
	listModes("jugg");
	listModes("vip");
	listModes("koth");
	listModes("oddball");
	listModes("slayer");
	listModes("ctf");
	makeJson(vec2, false);	
	return 0;
}