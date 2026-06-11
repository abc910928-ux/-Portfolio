@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo   更新作品集網站並上線
echo ========================================
echo.
echo 正在偵測變更...
git add -A

set "msg="
set /p "msg=請輸入這次更新的說明（直接按 Enter 用預設）: "
if "%msg%"=="" set "msg=更新作品集內容"

git commit -m "%msg%"
if errorlevel 1 (
  echo.
  echo 沒有偵測到變更，或提交失敗，未進行上傳。
  echo.
  pause
  exit /b
)

echo.
echo 正在上傳到 GitHub...
git push
if errorlevel 1 (
  echo.
  echo 上傳失敗，請檢查網路或 GitHub 登入狀態。
  echo.
  pause
  exit /b
)

echo.
echo ----------------------------------------
echo  完成！約 1 至 2 分鐘後網站會自動更新：
echo  https://abc910928-ux.github.io/-Portfolio/
echo ----------------------------------------
echo.
pause
