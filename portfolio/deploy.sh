#!/bin/bash

echo "🚀 Portfolio Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial portfolio commit"
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository as remote:"
    echo "git remote add origin https://github.com/yourusername/your-portfolio.git"
    echo ""
    echo "Then run:"
    echo "git push -u origin main"
else
    echo "✅ Remote origin already configured"
    echo "📤 Pushing to GitHub..."
    git push origin main
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Update your content in /data/ files"
echo "2. Add your images to /public/ folders"
echo "3. Customize colors (optional) - see COLOR_THEMES.md"
echo "4. Test locally: npm run dev"
echo "5. Deploy to Vercel (optional):"
echo "   - Go to vercel.com"
echo "   - Connect your GitHub account"
echo "   - Import your portfolio repository"
echo ""
echo "📚 See CUSTOMIZATION_GUIDE.md for detailed instructions" 