#!/bin/bash

# Xcentric Website - Netlify Setup Helper
echo "🚀 Setting up Netlify for GitHub Actions CI/CD"
echo ""

echo "📋 Follow these steps to get your Netlify credentials:"
echo ""

echo "1️⃣  Create Netlify Site:"
echo "   • Go to: https://app.netlify.com"
echo "   • Click 'Add new site' → 'Import an existing project'"
echo "   • Choose GitHub → Select 'Xcentric_Website'"
echo "   • DON'T deploy yet! Just note the Site ID"
echo ""

echo "2️⃣  Get API Token:"
echo "   • Go to: https://app.netlify.com/user/applications#personal-access-tokens"
echo "   • Click 'New access token'"
echo "   • Name: 'GitHub Actions'"
echo "   • Click 'Generate token'"
echo "   • COPY the token (you won't see it again!)"
echo ""

echo "3️⃣  Add GitHub Secrets:"
echo "   • Go to: https://github.com/HackerWithDrip/Xcentric/settings/secrets/actions"
echo "   • Click 'New repository secret'"
echo "   • Add these two secrets:"
echo "     - Name: NETLIFY_AUTH_TOKEN, Value: [your token]"
echo "     - Name: NETLIFY_SITE_ID, Value: [your site ID]"
echo ""

echo "4️⃣  Push the workflow:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Actions CI/CD'"
echo "   git push origin main"
echo ""

echo "🎉 After setup, every push to main will auto-deploy!"
echo "📱 Preview deployments for every pull request!"
echo ""

read -p "Press Enter when you've completed the setup steps..."
echo ""
echo "✅ Setup complete! Your CI/CD pipeline is ready! 🚀"
