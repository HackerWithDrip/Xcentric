# 🚀 GitHub Actions CI/CD Setup for Netlify

## 📋 Overview

This guide sets up automated deployment using GitHub Actions. Your website will automatically deploy to Netlify whenever you push to the main branch, and create preview deployments for pull requests.

## ✅ What's Already Configured

- ✅ GitHub Actions workflow files created
- ✅ Build and deployment scripts ready
- ✅ Linting and testing integrated
- ✅ Preview deployments for PRs
- ✅ Production deployments for main branch

## 🔧 Setup Steps

### Step 1: Create Netlify Site (First Time Only)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select **"Xcentric_Website"**
4. **IMPORTANT**: Don't deploy yet! Just note down:
   - **Site ID** (you'll see it in the URL or site settings)
   - **Site URL** (e.g., `https://xcentric.netlify.app`)

### Step 2: Get Netlify API Token

1. Go to [https://app.netlify.com/user/applications#personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click **"New access token"**
3. Give it a name like "GitHub Actions"
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again!)

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository: `https://github.com/HackerWithDrip/Xcentric`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add these two secrets:

#### Secret 1: NETLIFY_AUTH_TOKEN
- **Name**: `NETLIFY_AUTH_TOKEN`
- **Value**: The API token you copied from Step 2

#### Secret 2: NETLIFY_SITE_ID
- **Name**: `NETLIFY_SITE_ID`
- **Value**: Your Netlify site ID from Step 1

### Step 4: Push the Workflow Files

```bash
git add .
git commit -m "Add GitHub Actions CI/CD workflow"
git push origin main
```

## 🎯 How It Works

### Automatic Deployments

1. **Push to main branch** → Production deployment
2. **Create pull request** → Preview deployment
3. **Merge pull request** → Production deployment

### Workflow Features

- ✅ **Build optimization**: Cached dependencies
- ✅ **Linting**: Code quality checks
- ✅ **Preview deployments**: Test changes before merging
- ✅ **Production deployments**: Automatic main branch deploys
- ✅ **Build summaries**: Detailed deployment info
- ✅ **Comments**: PR comments with preview links

## 📊 Workflow Details

### Build Process
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (cached)
4. Run linting
5. Build production files
6. Deploy to Netlify

### Preview Deployments
- Created for every pull request
- Commented on PR with preview link
- Automatically cleaned up when PR is closed

### Production Deployments
- Triggered on push to main
- Deployed to production URL
- Includes commit comments with deploy info

## 🔄 Usage

### Making Changes
```bash
# Create a feature branch
git checkout -b feature/new-content

# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Add new content"
git push origin feature/new-content

# Create pull request on GitHub
# Preview deployment will be created automatically!
```

### Merging to Production
```bash
# Merge your PR on GitHub
# Production deployment happens automatically!

# Or merge locally
git checkout main
git merge feature/new-content
git push origin main
# Production deployment triggered!
```

## 🎭 Preview Deployments

Every pull request gets:
- ✅ **Preview URL**: `https://deploy-preview-[PR-NUMBER]--xcentric.netlify.app`
- ✅ **PR Comment**: Automatic comment with preview link
- ✅ **Build Status**: Shows in PR checks
- ✅ **Auto-cleanup**: Deleted when PR is closed

## 🚀 Production Deployments

Main branch pushes trigger:
- ✅ **Production URL**: `https://xcentric.netlify.app`
- ✅ **Commit Comments**: Deploy info in commit
- ✅ **Build Summary**: Detailed deployment stats
- ✅ **Rollback**: Easy rollback in Netlify dashboard

## 📱 Monitoring

### GitHub Actions
- Go to **Actions** tab in your repository
- See all workflow runs and their status
- Click on any run for detailed logs

### Netlify Dashboard
- Go to [https://app.netlify.com](https://app.netlify.com)
- See all deployments and their status
- Monitor site performance and analytics

## 🔧 Customization

### Environment Variables
Add to GitHub Secrets if needed:
- `NODE_VERSION`: Change Node.js version
- `BUILD_COMMAND`: Custom build command
- `PUBLISH_DIR`: Custom publish directory

### Workflow Triggers
Edit `.github/workflows/netlify-deploy.yml`:
```yaml
on:
  push:
    branches: [ main, develop ]  # Add more branches
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily builds
```

## 🆘 Troubleshooting

### Build Fails
1. Check **Actions** tab for error logs
2. Verify all secrets are set correctly
3. Test build locally: `cd frontend && npm run build`

### Deployment Fails
1. Check Netlify dashboard for errors
2. Verify `NETLIFY_SITE_ID` is correct
3. Check `NETLIFY_AUTH_TOKEN` has proper permissions

### Preview Not Working
1. Ensure PR is from a fork (if applicable)
2. Check Netlify site settings allow previews
3. Verify workflow file is in `.github/workflows/`

## 🎉 Benefits

- ✅ **Zero manual work**: Push code, get deployment
- ✅ **Safe testing**: Preview before production
- ✅ **Fast feedback**: See changes immediately
- ✅ **Rollback ready**: Easy to revert if needed
- ✅ **Team collaboration**: Everyone can see previews
- ✅ **Audit trail**: Full deployment history

## 📈 Next Steps

After setup:
1. **Test the workflow**: Make a small change and push
2. **Create a PR**: Test preview deployments
3. **Monitor deployments**: Check both GitHub and Netlify
4. **Customize as needed**: Adjust workflow for your needs

---

**Ready to set up?** Follow the steps above and you'll have automated deployments in minutes! 🚀
