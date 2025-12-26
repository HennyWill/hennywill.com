// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// GitHub API Integration
const GITHUB_USERNAME = 'HennyWill';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

async function fetchGitHubRepos() {
    const container = document.getElementById('github-projects');

    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
        renderRepos(container, cachedData);
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="loading" style="grid-column: 1 / -1;">
            <div class="spinner"></div>
        </div>
    `;

    try {
        const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=6');

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Cache the response
        setCachedData(repos);

        renderRepos(container, repos);

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Silently fail - don't show error to users
        container.innerHTML = '';
    }
}

// Cache management functions
function getCachedData() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        return isExpired ? null : data;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

function setCachedData(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

// Render repos function
function renderRepos(container, repos) {
    const relevantRepos = repos
        .filter(repo => !repo.fork && !repo.private)
        .slice(0, 4);

    if (relevantRepos.length === 0) {
        container.innerHTML = '';
        return;
    }

    const reposHTML = relevantRepos.map(repo => {
        const language = repo.language || 'Project';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const description = repo.description || 'A project from my GitHub repository.';

        return `
            <div class="github-project">
                <h3>${escapeHtml(repo.name)}</h3>
                <p>${escapeHtml(description)}</p>
                <div class="github-stats">
                    <span class="github-stat">
                        <span>⚡</span>
                        <span>${escapeHtml(language)}</span>
                    </span>
                    ${stars > 0 ? `
                        <span class="github-stat">
                            <span>⭐</span>
                            <span>${stars}</span>
                        </span>
                    ` : ''}
                    ${forks > 0 ? `
                        <span class="github-stat">
                            <span>🔀</span>
                            <span>${forks}</span>
                        </span>
                    ` : ''}
                </div>
                <a href="${escapeHtml(repo.html_url)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="github-link">
                    View on GitHub →
                </a>
            </div>
        `;
    }).join('');

    container.innerHTML = reposHTML;
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
function initAnimations() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .github-project');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add scroll event for header shadow (if we add a header later)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // You can add header shadow logic here if needed

    lastScroll = currentScroll;
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Add any resize-specific logic here if needed
}, 250);

window.addEventListener('resize', handleResize);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub repos
    fetchGitHubRepos();

    // Initialize animations after a short delay to ensure DOM is ready
    setTimeout(initAnimations, 100);
});

// Add loading complete class for any CSS transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload critical resources for better performance
function preloadResources() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        const url = link.getAttribute('href');
        const linkPreload = document.createElement('link');
        linkPreload.rel = 'dns-prefetch';
        linkPreload.href = new URL(url).origin;
        document.head.appendChild(linkPreload);
    });
}

// Call preload when idle
if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadResources);
} else {
    setTimeout(preloadResources, 1);
}

// Simple analytics tracker (placeholder for future analytics)
function trackEvent(category, action, label) {
    // Placeholder for analytics like Google Analytics, Plausible, etc.
    // Example: gtag('event', action, { event_category: category, event_label: label });
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track external link clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        const url = link.getAttribute('href');
        trackEvent('Outbound Link', 'Click', url);
    }
}, true);

// Performance monitoring
if ('PerformanceObserver' in window) {
    // Monitor largest contentful paint
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor first input delay
    const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
}
