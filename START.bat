@echo off
title DIY University
color 0A

echo.
echo  =========================================
echo       DIY UNIVERSITY - Starting...
echo  =========================================
echo.

cd /d "%~dp0backend"
start /min cmd /c "node server.js"

cd /d "%~dp0frontend"
start /min cmd /c "npm run dev"

echo  Servers starting... please wait...
ping -n 7 127.0.0.1 >nul

echo.
echo  Opening browser...
start "" http://127.0.0.1:5175/studio

echo.
echo  =========================================
echo       DIY University is RUNNING!
echo  =========================================
echo.
echo  Studio:   http://127.0.0.1:5175/studio
echo  Backend:  http://127.0.0.1:3003
echo.
echo  Press any key to STOP servers...
pause >nul
taskkill /f /im node.exe >nul 2>&1
