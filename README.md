# Xcentric Brand Solutions Website

A modern, responsive, and dynamic website built with React, Tailwind CSS, and Node.js.

## 🎨 Features

- ✨ Modern UI with smooth animations and transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎬 Animated splash screen
- 🎯 Scroll-triggered content reveal
- 💼 Contact form with validation
- ⚡ Performance optimized
- 🚀 Production-ready for Netlify and GitHub Pages

## 🛠️ Tech Stack

### Frontend:
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom animations** - CSS keyframes and transitions

### Backend (Development Only):
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites:
- Node.js 16+ installed
- npm or yarn package manager

### Install Dependencies:
```bash
# Install all dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies (for local development)
cd backend && npm install
```

## 🚀 Usage

### Development Mode:
```bash
# Run both frontend and backend
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

### Production Build:
```bash
# Build optimized production files
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify (Recommended):
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify auto-detects settings from `netlify.toml`
4. Site deploys automatically on every push

See **[NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)** for detailed instructions.

### Deploy to GitHub Pages:
```bash
# Build and deploy in one command
npm run deploy
```

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for GitHub Pages instructions.

## 📁 Project Structure

```
Xcentric_Website/
├── backend/              # Node.js/Express backend (dev only)
│   ├── index.js         # API endpoints
│   └── package.json
├── frontend/            # React frontend
│   ├── src/
│   │   ├── assets/      # Images and icons
│   │   ├── data/        # Static brand data
│   │   ├── App.jsx      # Main component
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # App entry point
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration
│   └── package.json
├── package.json         # Root scripts
├── netlify.toml         # Netlify configuration
├── NETLIFY_DEPLOYMENT.md  # Netlify deployment guide
├── DEPLOYMENT_GUIDE.md  # GitHub Pages deployment guide
└── PERFORMANCE_OPTIMIZATIONS.md  # Performance tips
```

## 🎯 Sections

1. **Hero** - Brand introduction with animated background
2. **About** - "Who We Are" with promise statement
3. **Services** - "What We Do" with 9 service categories
4. **Success Stories** - Client logos and case studies
5. **Contact** - Dedicated contact form page
6. **Footer** - Copyright and contact button

## 🎨 Color Palette

- **Gold**: `#F3C740`
- **Yellow**: `#FFC400`
- **Purple**: `#A64CE6`
- **Teal**: `#2AA39A`
- **Navy**: `#0C1A2B`

## 📱 Mobile Support

The website is fully responsive and tested on:
- iOS Safari
- Android Chrome
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## 🚀 Performance

- Lighthouse Score: 90+ (Performance)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lazy loading for all images
- GPU-accelerated animations
- Optimized bundle size

## 📝 License

All rights reserved © 2025 Xcentric Brand Solutions

---

**Developed By DynastyTech**

