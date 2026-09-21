@echo off
title Push to GitHub — Shawerma El Shami
cd /d "%~dp0"
set "PATH=%PATH%;C:\Users\zeera\AppData\Local\Programs\Git\cmd"

echo =======================================================
echo   Connecting and Pushing Shawerma El Shami to GitHub
echo =======================================================
echo.

:: Check if already authenticated
gh auth status >nul 2>nul
if %errorlevel% neq 0 (
    echo Opening browser to authorize GitHub...
    gh auth login --web -h github.com
    gh auth setup-git
)

echo.
echo Pushing all website files to your GitHub repository...
git push -u -f origin main

echo.
echo =======================================================
echo   SUCCESS! All files are now live on your GitHub repo.
echo =======================================================
echo.
pause
