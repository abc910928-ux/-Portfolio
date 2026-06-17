@echo off
cd /d "%~dp0"
echo ============================================
echo  Remove sample files, then commit and push
echo ============================================
echo.

echo [1/3] Deleting sample / placeholder files...
del /q "public\projects\*.svg" 2>nul
del /q "public\models\sample-building.glb" 2>nul
del /q "scripts\gen-placeholders.mjs" 2>nul
del /q "scripts\gen-sample-model.mjs" 2>nul
del /q "scripts\_remove-samples.mjs" 2>nul

echo [2/3] Staging and committing...
git add -A
git commit -m "Remove sample projects and placeholder files"

echo [3/3] Pushing to GitHub...
git push

echo.
echo ============================================
echo  Done. Check GitHub Actions for deploy:
echo  https://github.com/abc910928-ux/-Portfolio/actions
echo ============================================
echo.
pause
