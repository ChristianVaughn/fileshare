echo@off
set mypath=%cd%
START /min FileshareHelper.exe

START /WAIT %mypath%\..\..\..\..\..\eldorado.exe
tasklist | find /i "eldorado.exe"   || taskkill /im FileshareHelper.exe /F
