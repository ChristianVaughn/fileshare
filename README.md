![alt text](https://christianvaughn.net/DewShare/img/logo.png)


**Download maps from DewritoHub from within Eldewrito**

## Updates 5/17/19 v0.8.1-Beta
Changed some URL stuff for the last time, so I replaced the v0.8.1 DL instead of a whole new version number since little changed.

## What is FileShare?
Fileshare is an addon web based menu for Eldewrito that adds the capability to download maps in game from [DewritoHub](https://dewritohub.com). Users can search using tags such as #infection or through map names like TanksObama. Along with being able to search for files, users can sort them based on New, Top, Featured, and Updated. All info displayed is straight from the DewritoHub API.
After downloading the users can go into a lobby and use CEF map and game type selection screens to load their maps without needing to relaunch the game.

Although this mod can do alot, there are a few circumstances that make the mod a little bulky. Since the source to Eldewrito is not public a nodeJs application is needed to act as a download handler, and then a c++ app is used to rename the files properly, and extract the data from them for the map selection screens. This might seem a little rigged together, but the original plan was to code a c++ download handler that could communicate with the game's web menus. This approach was not used because during development The Eldewrito mod went closed source.  If you are interested in looking into the source of programs that actually do the downloading once you click download head to the GameFiles branch of this repo.




<img src="http://i.imgur.com/wEF0rzM.jpg"  height="600" align="center"/>

## Download and Use
 Download the latest release [here](https://github.com/cvaughn55/fileshare/releases)
 Extract the zip to the root of your Eldewrito folder(Aka the place where eldorado.exe is), and use DewShareLauncher.exe instead of eldorado.exe in order to get the fileshare working. Once the game is loaded press F12 to open the Fileshare, press F10 to open the map selector, and press F9 to open the game type selector.(Map and gametype selectors only work in the lobbies)

## To-Do list and Bugs
1. Add new features as Finch upgrades the API. One of which potentially being uploading maps.
2. Rewrite the map selection screen to dynamically create headers based on maps in user's ed/maps folder. 
3. Possibly try and add controler or keyboard support.
4. Any bugs or issues reported by other users(none besides these 3 at the moment.)



## Help/Support/Contact
You can ping me on the [ElDewrito Forge Discord](https://discord.gg/PnRePfv), the [DewritoHub Discord](https://discord.gg/gtqM3s5),  [The Beer Keg Discord](https://discord.gg/PJ4Wm4M), the [HB Discord](https://discord.gg/VzMX2Kq) or the [Halo Vault Discord](https://discord.gg/GycDpDj)  if you have any issues, suggestions, or any other info about DewShare. Don't come looking for me in the Official Eldewrito Discord because I am not there. Only the servers above.


If you have issues you can get in touch with me in those places, or make a bug report in the issue tracker and I can look over it.

## Creators
Cvaughn55 - Created base site and NodeJS download handler to download the maps and create a json of all the avalible maps to play.

Warm Beer - Redesigned the fileshare UI from the ground up to better match the other menus already existing in the game, and added some caching/paging improvements to the javascript code.

FinchMFG - Creator of Dewritohub, the site where people can share and download Eldewrito Maps. Also created the API that makes this fileshare possible.

## Shoutouts
Thanks so much to FinchMFG for providing the DewritoHub API which powers the DewShare, and for comming up with solutions for roadblocks that I hit along the way. Thanks to Hackerman who provided help with bugs and other issues along the way. Thanks to Seedenator and 1c3bear for helping find many bugs due to spaces in user folders breaking things, and to Warm Beer who is fixing some things up with the design of the fileshare Also shoutouts to the rest of the community who has been giving feedback and overall positive messages about this project. 
