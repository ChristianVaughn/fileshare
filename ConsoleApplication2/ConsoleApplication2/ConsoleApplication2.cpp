// ConsoleApplication2.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include <iostream>
#include<fstream>
#include <boost/filesystem.hpp>
#include <vector>
#include <string>     // std::string, std::to_string

//include whichever boost lib is needed here
using namespace std;

void makeJson(vector<string> &vec) {
	std::ofstream out("maps.json");
	out << "[" << endl;
	for (size_t i = 0; i < vec.size() - 1; i++) {
		out << vec.at(i) << "," << endl;
	}
	out << vec.at(vec.size() - 1) << endl;

	out << "]";
	out.close();
	return;
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
				file.append("\\sandbox.map"); // for windows switch the slash sign 
				auto path = boost::filesystem::path(file);
				int customMapId = GetCustomMapId(file);
				string mapnm = mapIdToString(customMapId);
				if (boost::filesystem::exists(path)) {
					string temp = "{ \"MapName\": \"";
					temp += itr->path().filename().string();
					temp += "\", \"BaseMap\": \"";
					temp += mapnm;
					temp += +"\" }";
					vec.push_back(temp);
					//std::cout << (itr->path().filename().string());
					//std::cout << std::endl << "csd" << std::endl;
				}
				//std::cout << (itr->path().filename().string());
				//std::cout << std::endl << file << std::endl << path << endl;
			}
		}
		makeJson(vec);
	}
	return true;
}



int main() {
	listMaps();
	return 0;
}