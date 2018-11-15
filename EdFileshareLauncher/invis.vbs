Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c mods\ui\web\screens\fileshare\EldewritoFileshare.bat"
oShell.Run strArgs, 0, false