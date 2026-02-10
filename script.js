// ====================================
// DARK MODE TOGGLE
// ====================================

// Check for saved theme preference or default to light mode
//const currentTheme = localStorage.getItem('theme') || 'light';
//document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle functionality
//const themeToggle = document.getElementById('themeToggle');

//themeToggle.addEventListener('click', () => {
    // Get current theme
    //const theme = document.documentElement.getAttribute('data-theme');
    
    // Switch theme
    //const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Apply new theme
    //document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    //localStorage.setItem('theme', newTheme);
    
    // Add a little animation feedback
    //themeToggle.style.transform = 'rotate(360deg)';
    //setTimeout(() => {
        //themeToggle.style.transform = 'rotate(0deg)';
    //}, 400);
//});

// ====================================
// DARK MODE TOGGLE (AUTO-INJECT)
// ====================================

// Apply saved theme immediately
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Try to find existing toggle
let themeToggle = document.getElementById('themeToggle');

// Auto-inject toggle on article pages if missing
if (!themeToggle && document.querySelector('.article-content')) {
    const navContainer = document.querySelector('.nav-container');

    if (navContainer) {
        themeToggle = document.createElement('button');
        themeToggle.id = 'themeToggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');

        const icon = document.createElement('span');
        icon.className = 'theme-icon';
        icon.textContent = '◐';

        themeToggle.appendChild(icon);
        navContainer.appendChild(themeToggle);
    }
}

// Attach toggle behavior (only if it exists)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Fun rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 400);
    });
}

// ====================================
// NEWSLETTER FORM HANDLING
// ====================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            // Success message
            alert(`Thank you for subscribing with ${email}! (This is a demo - no actual subscription created)`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ====================================
// SMOOTH SCROLL FOR NAVIGATION
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for anchor links (not just "#")
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ====================================

// Get current page filename
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Update active nav link
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ====================================
// SCROLL ANIMATION OBSERVER
// ====================================

// Add fade-in animation for elements as they come into view
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

// Observe all post cards
document.querySelectorAll('.post-card').forEach(card => {
    observer.observe(card);
});

// ====================================
// READING TIME ESTIMATOR (Optional)
// ====================================

// Calculate reading time for article pages
const articleContent = document.querySelector('.article-content');

if (articleContent) {
    const text = articleContent.innerText;
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // You can display this in your article meta section
    console.log(`Estimated reading time: ${readingTime} minutes`);
}

// ====================================
// CONSOLE MESSAGE (Fun Easter Egg!)
// ====================================

console.log('%c🚀 Welcome to Pabesh!', 'font-size: 20px; font-weight: bold; color: #d84315;');
console.log('%cData Analytics & Engineering Insights', 'font-size: 14px; color: #666;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'font-size: 12px; color: #999;');
