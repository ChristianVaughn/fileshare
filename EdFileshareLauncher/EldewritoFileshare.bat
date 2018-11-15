echo@off
set mypath=%cd%
START /d "%mypath%\mods\ui\web\screens\fileshare\" FileshareHelper.exe

START /WAIT /d "%mypath%\" eldorado.exe
tasklist | find /i "eldorado.exe"   || taskkill /im FileshareHelper.exe /F