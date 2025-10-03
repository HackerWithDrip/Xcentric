#!/bin/bash

# Xcentric Website - Quick Deploy Script
echo "🚀 Deploying Xcentric Website to Netlify..."

# Check if we're in the right directory
if [ ! -f "netlify.toml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Staging changes..."
    git add .
    
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Updated website content"
    fi
    git commit -m "$commit_msg"
else
    echo "✅ No changes to commit"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your site will be automatically deployed to Netlify in 2-3 minutes"
    echo "🔗 Check your Netlify dashboard: https://app.netlify.com"
    echo ""
    echo "📱 Your site will be live at: https://xcentric.netlify.app"
else
    echo "❌ Error: Failed to push to GitHub"
    exit 1
fi
