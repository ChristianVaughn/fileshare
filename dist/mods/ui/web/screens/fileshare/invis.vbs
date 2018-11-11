Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c EldewritoFileshare.bat"
oShell.Run strArgs, 0, false