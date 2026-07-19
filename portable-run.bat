@echo off
cd /d "%~dp0"
if not exist "dist\index.html" (
    echo Error: dist\index.html not found
    pause
    exit /b 1
)
start http://localhost:5173
eh-server.exe
echo.
pause
