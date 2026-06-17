@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  Update portfolio and deploy
echo ============================================
echo.

git add -A

set "msg="
set /p "msg=Commit message (Enter for default): "
if "%msg%"=="" set "msg=Update portfolio"

git commit -m "%msg%"
if errorlevel 1 (
  echo.
  echo No changes to commit, or commit failed. Nothing pushed.
  echo.
  pause
  exit /b
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
  echo.
  echo Push failed. Check network / GitHub login.
  echo.
  pause
  exit /b
)

echo.
echo --------------------------------------------
echo  Done. Site updates in 1-2 min:
echo  https://abc910928-ux.github.io/-Portfolio/
echo --------------------------------------------
echo.
pause
