// ===================================
// Dr. Waithaka Portfolio Website JavaScript
// ===================================

// Page loader functionality
function initializePageLoader() {
    // Create loader HTML if it doesn't exist
    if (!document.querySelector('.page-loader')) {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loader-text">
                    
                    <p>Loading ...</p>
                </div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    // Simulate loading progress
    const progressBar = document.querySelector('.progress-bar');
    const loaderText = document.querySelector('.loader-text p');
    
    const loadingSteps = [
        { progress: 20, text: 'Initializing...' },
        { progress: 40, text: 'Loading ...' },
        { progress: 60, text: 'Preparing content...' },
        { progress: 80, text: 'Almost Ready...' },
        { progress: 100, text: 'Ready to explore!' }
    ];

    let currentStep = 0;
    const updateProgress = () => {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            if (progressBar) {
                progressBar.style.width = step.progress + '%';
            }
            if (loaderText) {
                loaderText.textContent = step.text;
            }
            currentStep++;
            setTimeout(updateProgress, 300 + Math.random() * 200);
        } else {
            // Hide loader after a brief delay
            setTimeout(hideLoader, 500);
        }
    };

    // Start progress after a brief delay
    setTimeout(updateProgress, 200);
}

function hideLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }
    
    // Trigger page animations after loader is hidden
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        initializeScrollAnimations();
    }, 100);
}

// Show loading spinner for async operations
function showLoadingSpinner(targetElement, message = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner-small">
            <div class="spinner-ring-small"></div>
        </div>
        <span class="spinner-message">${message}</span>
    `;
    
    if (targetElement) {
        targetElement.appendChild(spinner);
    }
    
    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
    }
}

// Dark mode toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggleButtons.forEach(btn => btn.textContent = '🌙');
        // Note: localStorage removed for Claude.ai compatibility
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggleButtons.forEach(btn => btn.textContent = '☀️');
        // Note: localStorage removed for Claude.ai compatibility
    }
}

// Load saved theme (modified for Claude.ai compatibility)
function loadTheme() {
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    // Default to light theme since we can't use localStorage
    themeToggleButtons.forEach(btn => btn.textContent = '🌙');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Newsletter form submission with loading
function handleNewsletterSubmission() {
    const newsletterBtns = document.querySelectorAll('.newsletter-btn');
    
    newsletterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const emailInput = this.parentElement.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && email.includes('@')) {
                // Show loading spinner
                const spinner = showLoadingSpinner(this.parentElement, 'Subscribing...');
                this.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    hideLoadingSpinner(spinner);
                    this.disabled = false;
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                }, 1500);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
}

// Contact form submission with loading
function handleContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading spinner
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = showLoadingSpinner(this, 'Sending message...');
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                hideLoadingSpinner(spinner);
                submitBtn.disabled = false;
                alert('Thank you for your message! I will get back to you within 24-48 hours.');
                this.reset();
            }, 2000);
        });
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.no-results');

    if (faqQuestions.length > 0) {
        // Toggle accordion functionality
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains('active');

                // Close all other accordions
                faqQuestions.forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                });

                // Toggle current accordion
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('active');
                }
            });
        });

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                let visibleCount = 0;

                faqItems.forEach(item => {
                    const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
                    const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

                    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        // Close accordion if hidden
                        const question = item.querySelector('.faq-question');
                        const answer = item.querySelector('.faq-answer');
                        question.classList.remove('active');
                        answer.classList.remove('active');
                    }
                });

                // Show/hide no results message
                if (noResults) {
                    if (visibleCount === 0 && searchTerm !== '') {
                        noResults.classList.add('show');
                    } else {
                        noResults.classList.remove('show');
                    }
                }
            });
        }

        // Allow keyboard navigation
        faqQuestions.forEach(question => {
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Close mobile menu when clicking outside
function initializeMobileMenuClose() {
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (navbar && mobileMenu && !navbar.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// Gallery image lazy loading
function initializeGalleryLazyLoading() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Navbar scroll effect
function initializeNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animation on scroll
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .service-card, .value-card, .publication-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    clearFieldError(field);

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    // Validate email
    else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    // Validate phone
    else if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 5px;';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader first
    initializePageLoader();
    
    // Core functionality
    loadTheme();
    setActiveNavigation();
    
    // Interactive features
    initializeSmoothScrolling();
    initializeMobileMenuClose();
    handleNewsletterSubmission();
    handleContactForm();
    initializeFAQ();
    
    // Enhanced features
    initializeGalleryLazyLoading();
    initializeNavbarScrollEffect();
    initializeBackToTop();
    enhanceFormValidation();
    
    // Console welcome message
    console.log('🏥 Dr. Waithaka Portfolio Website Loaded Successfully');
    console.log('🌟 Bridging medicine and technology through digital innovation');
});

// Handle page visibility change to show/hide loader
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page became visible again, could show a brief loader if needed
        console.log('Page is now visible');
    }
});

// Export functions for potential external use
window.DrWaithakaPortfolio = {
    toggleTheme,
    toggleMobileMenu,
    validateEmail,
    validatePhone,
    showLoadingSpinner,
    hideLoadingSpinner,
    initializePageLoader,
    hideLoader
};