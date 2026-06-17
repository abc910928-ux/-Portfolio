@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  Local preview
echo ============================================
echo.

if not exist "node_modules" (
  echo First run: installing dependencies...
  call npm install
  echo.
)

echo Starting dev server.
echo Open your browser at:  http://localhost:3000
echo (Press Ctrl+C or close this window to stop)
echo.
call npm run dev
pause
