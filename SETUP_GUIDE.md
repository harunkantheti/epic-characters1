# Setup & Deployment Guide

## Quick Start (5 minutes)

### Step 1: Download Files
Download all these files and organize them in a folder called `epic-characters`:

```
epic-characters/
├── package.json
├── tailwind.config.js
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
├── public/
│   └── index.html
└── src/
    ├── index.js
    └── App.js
```

### Step 2: Install & Run Locally
1. Open terminal/command prompt in the `epic-characters` folder
2. Run:
```bash
npm install
npm start
```
3. Your app opens at `http://localhost:3000` 🎉

---

## Deploy to Vercel (Recommended - 3 minutes)

### Step 1: Create GitHub Account
Go to https://github.com and create an account (if you don't have one)

### Step 2: Create Repository
1. Go to https://github.com/new
2. Name it: `epic-characters`
3. Make it **Public**
4. Click "Create Repository"

### Step 3: Upload Files to GitHub
Use GitHub Desktop (easiest) or Git command line:

**Using GitHub Desktop:**
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. Click "File" → "Clone Repository"
4. Find your `epic-characters` repo
5. Clone it to your computer
6. Copy all the files from `epic-characters` folder into the cloned folder
7. In GitHub Desktop:
   - Click "Commit to main"
   - Add message: "Initial commit"
   - Click "Push origin"

**Using Git Command Line:**
```bash
cd epic-characters
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/epic-characters.git
git push -u origin main
```

### Step 4: Deploy with Vercel
1. Go to https://vercel.com
2. Click "Sign up" → Select "Continue with GitHub"
3. Click "Authorize Vercel"
4. Click "Import Project"
5. Select your `epic-characters` repository
6. Click "Import"
7. Click "Deploy"

**Your app is now LIVE!** 🚀

You'll get a URL like: `https://epic-characters.vercel.app`

---

## Deploy to Netlify (Alternative - 3 minutes)

1. Go to https://netlify.com
2. Click "Sign up" → Select "GitHub"
3. Click "Authorize" and sign in
4. Click "New site from Git"
5. Select your `epic-characters` repository
6. Click "Deploy site"

Done! Your app will be live shortly.

---

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org
- Restart your terminal

### "Port 3000 already in use"
```bash
npm start -- --port 3001
```

### App not updating after changes
- Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) to hard refresh
- Clear browser cache

### Vercel deployment failed
- Make sure all files are properly committed to GitHub
- Check that `package.json` is in the root directory

---

## File Organization (Important!)

```
epic-characters/
├── package.json           ← In root
├── tailwind.config.js     ← In root
├── .gitignore            ← In root
├── README.md             ← In root
├── public/
│   └── index.html        ← In public/ folder
└── src/
    ├── index.js          ← In src/ folder
    └── App.js            ← In src/ folder
```

**If files are in wrong places, it won't work!**

---

## After Deployment

### Adding More Characters
- Open your app at the Vercel URL
- Click Settings ⚙️ icon
- Add characters through the admin panel
- Changes save automatically to your browser

### Updating the App
- Make changes to files on your computer
- Commit and push to GitHub:
```bash
git add .
git commit -m "Updated characters"
git push
```
- Vercel automatically redeploys!

### Share Your App
- Send the Vercel URL to anyone
- They can view and add characters
- Each person's browser stores their own data

---

## Need Help?

- **React Docs:** https://react.dev
- **Vercel Docs:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com

Good luck! 🎉
