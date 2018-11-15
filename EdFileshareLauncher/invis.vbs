Set oShell = CreateObject ("Wscript.Shell") 
Set objFSO = CreateObject("Scripting.FileSystemObject")
strFolder = objFSO.GetParentFolderName(WScript.ScriptFullName)
strFolder = strFolder & "\\mods\\ui\web\\screens\\fileshare\\EldewritoFileshare.bat"
Dim strArgs
strArgs = "cmd /c "& strFolder
oShell.Run strArgs, 0, false