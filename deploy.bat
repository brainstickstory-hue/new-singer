@echo off
echo ========================================
echo   Singer Website Deployment Tool
echo ========================================
echo.
echo Choose deployment method:
echo.
echo 1. GitHub Pages (Free, Recommended)
echo 2. Open Netlify (Manual Drag & Drop)
echo 3. Show deployment guide
echo 4. Test locally (Python server)
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto guide
if "%choice%"=="4" goto local
if "%choice%"=="5" goto end

:github
echo.
echo ========================================
echo   GitHub Pages Deployment
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Create a new repository on GitHub
echo 2. Copy and run these commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/singer-website.git
echo    git push -u origin master
echo.
echo 3. Go to repository Settings ^> Pages
echo 4. Set Source to "Deploy from branch: master"
echo 5. Your site will be live at: https://YOUR_USERNAME.github.io/singer-website/
echo.
pause
goto end

:netlify
echo.
echo ========================================
echo   Netlify Deployment
echo ========================================
echo.
echo Opening Netlify in your browser...
echo.
echo Steps:
echo 1. Log in to Netlify
echo 2. Click "Add new site" ^> "Deploy manually"
echo 3. Drag and drop this entire folder
echo 4. Done! Your site will be live in seconds
echo.
start https://app.netlify.com/drop
pause
goto end

:guide
echo.
echo Opening deployment guide...
start DEPLOYMENT_GUIDE.md
goto end

:local
echo.
echo ========================================
echo   Starting Local Server
echo ========================================
echo.
echo Server starting at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
goto end

:end
echo.
echo Thank you for using the deployment tool!
pause

