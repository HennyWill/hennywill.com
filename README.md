# Vitalii Ilchenko - Personal Portfolio Website

A modern, fast, and responsive single-page portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Lightning Fast** - Pure HTML/CSS/JS with no frameworks, optimized for speed
- **Responsive Design** - Looks great on all devices from mobile to desktop
- **GitHub Integration** - Automatically displays your latest repositories via GitHub API
- **Modern UI** - Clean, minimalist design with smooth animations
- **SEO Optimized** - Proper meta tags and semantic HTML structure
- **Easy to Deploy** - Ready for Cloudflare Pages and GitHub Pages

## Structure

```
website/
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript for interactions and GitHub API
└── README.md       # This file
```

## Local Development

1. Simply open `index.html` in your browser
2. Or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment

### Option 1: Cloudflare Pages (Recommended)

1. **Prepare your repository:**
   - Initialize git in this directory: `git init`
   - Create a repository on GitHub
   - Push your code:
     ```bash
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/HennyWill/hennywill.com.git
     git push -u origin main
     ```

2. **Deploy to Cloudflare Pages:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to "Pages" section
   - Click "Create a project"
   - Connect your GitHub account
   - Select your repository
   - Configure build settings:
     - **Framework preset:** None
     - **Build command:** (leave empty)
     - **Build output directory:** `/`
   - Click "Save and Deploy"

3. **Add custom domain:**
   - After deployment, go to "Custom domains"
   - Add `hennywill.com`
   - Update your DNS settings as instructed

### Option 2: GitHub Pages

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/HennyWill/hennywill.com.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Select root folder (`/`)
   - Click "Save"

3. **Add custom domain (optional):**
   - In "Custom domain" field, enter `hennywill.com`
   - Add a `CNAME` file to your repository with content: `hennywill.com`
   - Update your DNS:
     - Add a CNAME record: `www` → `hennywill.github.io`
     - Add A records for apex domain:
       ```
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```

## Customization

### Update Personal Information

Edit `index.html`:
- Change the hero section text
- Update project descriptions
- Modify the about section

### Change Colors

Edit `styles.css` - look for the `:root` section at the top:

```css
:root {
    --primary: #2563eb;        /* Main blue color */
    --primary-dark: #1d4ed8;   /* Darker blue */
    --text-primary: #0f172a;   /* Main text color */
    /* ... more colors */
}
```

### Add More Projects

Edit `index.html` in the projects section. Copy the `.project-card` structure:

```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">🚀</div>
        <span class="project-status">Published</span>
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Description here...</p>
    <div class="project-links">
        <a href="#" class="project-link">View Project →</a>
    </div>
</div>
```

### Modify GitHub Integration

Edit `script.js`:
- Change `GITHUB_USERNAME` if needed (currently: 'HennyWill')
- Adjust the number of repos displayed (currently: 4)
- Modify filtering logic in `fetchGitHubRepos()`

## Performance Optimization

The website is already optimized for speed:
- ✅ No external dependencies or frameworks
- ✅ Minimal JavaScript
- ✅ Optimized CSS with modern features
- ✅ Lazy loading for animations
- ✅ DNS prefetching for external links
- ✅ Debounced resize events

### Lighthouse Scores Target
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a personal website. Feel free to use the code as inspiration, but please don't copy it directly.

## Contact

- **GitHub:** [HennyWill](https://github.com/HennyWill)
- **LinkedIn:** [hennywill](https://www.linkedin.com/in/hennywill/)
- **Website:** [hennywill.com](https://hennywill.com)

---

Built with ❤️ from Ukraine 🇺🇦
