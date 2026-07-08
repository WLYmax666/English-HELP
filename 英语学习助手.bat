@echo off
setlocal enabledelayedexpansion

REM Find project directory that contains package.json
for /f "delims=" %%i in ('dir "C:\Users\31475\Desktop" /b /ad 2^>nul') do (
    if exist "C:\Users\31475\Desktop\%%i\package.json" (
        cd /d "C:\Users\31475\Desktop\%%i"
        goto :found
    )
)
echo ERROR: project directory not found
pause
exit /b 1

:found
echo Project directory found.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 ( echo ERROR: npm install failed & pause & exit /b 1 )
)

echo Cleaning old node processes...
for /f "tokens=2" %%a in ('tasklist /fi "imagename eq node.exe" /nh 2^>nul') do (
    taskkill /f /pid %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo Starting dev server...
echo Browser will open automatically.
echo Close this window or press Ctrl+C to stop.
echo.
npm run dev -- --open

echo.
echo Server stopped.
pause
