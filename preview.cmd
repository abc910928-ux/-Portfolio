@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo   本機預覽作品集網站
echo ========================================
echo.

if not exist "node_modules" (
  echo 第一次使用，正在安裝必要元件，請稍候...
  call npm install
  echo.
)

echo 啟動中，啟動完成後請打開瀏覽器：
echo     http://localhost:3000
echo.
echo （要結束預覽，按 Ctrl+C 或直接關閉這個視窗）
echo.
call npm run dev
pause
