// ===================================
// Loading Screen
// ===================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Counter Animation for Stats
// ===================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animate, 10);
            } else {
                counter.innerText = target;
            }
        };
        animate();
    });
};

// Trigger counter animation when in viewport
let counterAnimated = false;
const statsSection = document.querySelector('.stats-section');

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
};

if (statsSection) {
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.3
    });
    observer.observe(statsSection);
}

// ===================================
// Project Filter
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===================================
// Testimonials Slider
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected testimonial
    if (testimonialCards[index] && dots[index]) {
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
};

// Auto slide testimonials
const autoSlideTestimonials = () => {
    currentTestimonial++;
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
};

// Start auto sliding
let testimonialInterval = setInterval(autoSlideTestimonials, 5000);

// Manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        // Reset auto slide
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(autoSlideTestimonials, 5000);
    });
});

// ===================================
// Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
const observeElements = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        elementObserver.observe(element);
    });
};

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });
    
    // Add slide animations to about section
    const aboutText = document.querySelector('.about-text');
    const aboutVisual = document.querySelector('.about-visual');
    if (aboutText) aboutText.classList.add('slide-in-right');
    if (aboutVisual) aboutVisual.classList.add('slide-in-left');
    
    // Add scale animation to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('scale-in');
    });
    
    // Add fade animation to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Add fade animation to feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Start observing elements
    observeElements();
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===================================
// Service Cards Hover Effect Enhancement
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Enhanced Scroll Indicator
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
    
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Floating Cards Animation Enhancement
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        floatingCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.5';
                c.style.filter = 'blur(2px)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        floatingCards.forEach(c => {
            c.style.opacity = '1';
            c.style.filter = 'none';
        });
    });
});

// ===================================
// Enhanced Form Validation
// ===================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Phone number validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });
}

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = 'red';
            alert('الرجاء إدخال بريد إلكتروني صحيح');
        } else {
            this.style.borderColor = '';
        }
    });
}

// ===================================
// Performance Optimization
// ===================================
// Throttle function for scroll events
function throttle(func, wait) {
    let waiting = false;
    return function() {
        if (!waiting) {
            func.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, wait);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // All scroll-based animations
}, 100));

// ===================================
// Lazy Loading for Images (when real images are added)
// ===================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Portfolio section - Simple without JavaScript hiding
// Just keep basic lightbox functionality
function openLightbox(button) {
    // Simple open lightbox without any hiding logic
}

function closeLightbox() {
    // Simple close lightbox
}

function navigateLightbox(direction) {
    // Simple navigate
}

// ===================================
// Browser Compatibility Check
// ===================================
// Check for required features
const checkBrowserSupport = () => {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        cssGrid: CSS.supports('display', 'grid'),
        cssVariables: CSS.supports('--test', '0')
    };
    
    const unsupported = Object.entries(features)
        .filter(([feature, supported]) => !supported)
        .map(([feature]) => feature);
    
    if (unsupported.length > 0) {
        console.warn('Browser missing features:', unsupported);
    }
};

checkBrowserSupport();

console.log('Website loaded successfully - طابط طوائق للطاقة الشمسية');
