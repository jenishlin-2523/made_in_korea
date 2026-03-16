# Vercel Deployment Instructions

Follow these steps to deploy your movie invitation system on Vercel.

## Option 1: Using Vercel CLI (Fastest)

1. Open your terminal in the project folder.
2. If you haven't installed it, run: `npm install -g vercel`
3. Run the login command: `vercel login`
4. Deploy the project: `vercel`
5. Follow the prompts:
   - "Set up and deploy?" -> **Y**
   - "Which scope?" -> **Choose your username**
   - "Link to existing project?" -> **N**
   - "What's your project's name?" -> **made-in-korea**
   - "In which directory?" -> **./**
   - "Want to modify other settings?" -> **N**
6. Once the deployment finishes, you will get a production URL!

## Option 2: Using GitHub (Recommended for automatic updates)

1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize and push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
4. Click **"Add New"** > **"Project"**.
5. Import your GitHub repository.
6. Click **"Deploy"**.

## Important Notes:
- Since this project is built with Vanilla HTML/JS, Vercel will automatically detect it as a static site.
- Ensure your Supabase credentials in `script.js` and `admin.js` are correct before deploying.
- Your project will be live at `https://made-in-korea.vercel.app` (or a similar auto-generated domain).
