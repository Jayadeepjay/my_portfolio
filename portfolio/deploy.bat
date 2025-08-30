@echo off
echo 🚀 Portfolio Deployment Script
echo ==============================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial portfolio commit"
    git branch -M main
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🔗 Please add your GitHub repository as remote:
    echo git remote add origin https://github.com/yourusername/your-portfolio.git
    echo.
    echo Then run:
    echo git push -u origin main
) else (
    echo ✅ Remote origin already configured
    echo 📤 Pushing to GitHub...
    git push origin main
)

echo.
echo 🎯 Next Steps:
echo 1. Update your content in /data/ files
echo 2. Add your images to /public/ folders
echo 3. Customize colors (optional) - see COLOR_THEMES.md
echo 4. Test locally: npm run dev
echo 5. Deploy to Vercel (optional):
echo    - Go to vercel.com
echo    - Connect your GitHub account
echo    - Import your portfolio repository
echo.
echo 📚 See CUSTOMIZATION_GUIDE.md for detailed instructions
pause 