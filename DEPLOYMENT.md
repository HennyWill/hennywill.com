# Deployment Guide for hennywill.com

## Quick Start - Cloudflare Pages

### Step 1: Initialize Git Repository

```bash
cd /Users/hennywill/Documents/website
git init
git add .
git commit -m "Initial commit: Personal portfolio website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `hennywill.com` (or any name you prefer)
3. **Don't** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/HennyWill/hennywill.com.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Cloudflare Pages

1. **Login to Cloudflare:**
   - Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
   - Sign in or create an account

2. **Create new Pages project:**
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub:**
   - Authorize Cloudflare to access your GitHub
   - Select your `hennywill.com` repository
   - Click "Begin setup"

4. **Configure build settings:**
   ```
   Project name: hennywill
   Production branch: main
   Framework preset: None
   Build command: (leave empty)
   Build output directory: /
   Root directory: /
   ```

5. **Environment variables:**
   - No environment variables needed
   - Click "Save and Deploy"

6. **Wait for deployment:**
   - First deployment takes 1-2 minutes
   - You'll get a URL like: `hennywill.pages.dev`

### Step 5: Add Custom Domain

1. **In Cloudflare Pages:**
   - Go to your project
   - Click "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter `hennywill.com`

2. **Configure DNS:**

   If your domain is already on Cloudflare:
   - Cloudflare will automatically configure DNS
   - Just click "Activate domain"

   If your domain is NOT on Cloudflare:
   - Transfer your domain to Cloudflare (recommended)
   - Or manually add CNAME records:
     ```
     CNAME  www  hennywill.pages.dev
     CNAME  @    hennywill.pages.dev
     ```

3. **Enable HTTPS:**
   - Cloudflare automatically provisions SSL certificate
   - Wait 5-10 minutes for SSL to activate
   - Your site will be available at `https://hennywill.com`

## Alternative: GitHub Pages

If you prefer GitHub Pages:

### Step 1-3: Same as above (Git setup and push)

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" section
4. Under "Source":
   - Select "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### Step 5: Configure Custom Domain

1. In GitHub Pages settings:
   - Enter `hennywill.com` in "Custom domain" field
   - Click "Save"

2. Update DNS at your domain registrar:
   ```
   CNAME  www  hennywill.github.io

   A      @    185.199.108.153
   A      @    185.199.109.153
   A      @    185.199.110.153
   A      @    185.199.111.153
   ```

3. Wait for DNS propagation (5-60 minutes)

## Post-Deployment Checklist

- [ ] Site loads at https://hennywill.com
- [ ] All links work (GitHub, LinkedIn, Chrome Web Store)
- [ ] GitHub projects load correctly
- [ ] Site is responsive on mobile
- [ ] Favicon appears correctly
- [ ] SSL certificate is active

## Testing Performance

1. **Lighthouse Test:**
   - Open Chrome DevTools (F12)
   - Go to "Lighthouse" tab
   - Click "Generate report"
   - Target scores: All 95+

2. **PageSpeed Insights:**
   - Visit [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   - Enter your URL
   - Check scores for mobile and desktop

3. **Mobile Testing:**
   - Use Chrome DevTools mobile emulation
   - Test on real devices if possible

## Updating the Site

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

- **Cloudflare Pages:** Automatically rebuilds and deploys (1-2 minutes)
- **GitHub Pages:** Automatically rebuilds and deploys (2-5 minutes)

## Troubleshooting

### Site not loading after deployment
- Wait 5-10 minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+R)
- Check Cloudflare/GitHub deployment logs

### GitHub repos not showing
- Check browser console for errors (F12)
- Verify GitHub username is correct in `script.js`
- Check GitHub API rate limits

### Custom domain not working
- Verify DNS settings are correct
- Wait up to 24 hours for DNS propagation
- Check SSL certificate status in Cloudflare

### Images or styles not loading
- Ensure all file paths are relative (no leading `/`)
- Check file names match exactly (case-sensitive)
- Verify files were committed to Git

## Support

If you encounter issues:
1. Check Cloudflare/GitHub documentation
2. Review browser console for errors
3. Contact Cloudflare/GitHub support

---

Good luck with your deployment! 🚀
