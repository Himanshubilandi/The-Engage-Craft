// The Engage Craft - Premium Meme Marketing Agency
// Simplified JavaScript with only contact options

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const currentYear = document.getElementById('currentYear');
const animateElements = document.querySelectorAll('.animate-on-scroll');

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Engage Craft - Where memes meet marketing magic ✨');
    
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Animate navbar entrance
    setTimeout(() => {
        navbar.classList.add('loaded');
    }, 300);
    
    // Set up all event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add some playful console messages
    console.log('%c🚀 Ready to make some internet magic?', 'color: #2563EB; font-size: 14px; font-weight: bold;');
    console.log('%c📱 Three ways to reach us: WhatsApp, Email, or Instagram!', 'color: #3B82F6; font-size: 12px;');
});

// Set up all event listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Add hover effects to contact cards
    document.querySelectorAll('.contact-option-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Add some fun to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const emoji = this.querySelector('.emoji-circle');
            if (emoji) {
                emoji.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const emoji = this.querySelector('.emoji-circle');
            if (emoji) {
                emoji.style.transform = '';
            }
        });
    });
    
    // Track contact link clicks for fun
    document.querySelectorAll('a[href*="whatsapp"], a[href*="mailto"], a[href*="instagram"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.href.includes('whatsapp') ? 'WhatsApp' : 
                           this.href.includes('mailto') ? 'Email' : 'Instagram';
            console.log(`📞 Opening ${platform}... Smart choice!`);
            
            // Let the link open naturally
        });
    });
}

// Navbar scroll handler
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Check scroll animations
    checkScrollAnimations();
}

// Mobile menu functions
function toggleMobileMenu() {
    const isActive = mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Playful menu toggle effect
    if (isActive) {
        document.body.style.overflow = 'hidden';
        console.log('🍔 Menu served! (Mobile edition)');
    } else {
        document.body.style.overflow = '';
        console.log('👋 Menu closed!');
    }
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll handler
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add a little console fun
        const sectionName = targetId.replace('#', '');
        console.log(`📬 Navigating to ${sectionName}...`);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                const animation = element.getAttribute('data-animation');
                
                setTimeout(() => {
                    element.classList.add('visible');
                    
                    // Handle counter animations
                    if (animation === 'counter') {
                        const counterElement = element.querySelector('.result-number');
                        if (counterElement) {
                            const target = parseInt(counterElement.getAttribute('data-count'));
                            animateCounter(counterElement, target);
                        }
                    }
                }, delay * 1000);
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animate-on-scroll elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Initial check for elements already in view
    checkScrollAnimations();
}

// Check and trigger scroll animations
function checkScrollAnimations() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;
    
    animateElements.forEach(element => {
        if (element.classList.contains('visible')) return;
        
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerPoint) {
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('visible');
            }, delay * 1000);
        }
    });
}

// Animate number counter with personality
function animateCounter(element, target) {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    
    let current = 0;
    let frame = 0;
    
    const counter = setInterval(() => {
        frame++;
        current = Math.min(Math.round(increment * frame), target);
        element.textContent = current;
        
        // Add a little bounce effect at the end
        if (frame >= totalFrames) {
            clearInterval(counter);
            element.textContent = target;
            
            // Bounce animation
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.transition = 'transform 0.3s';
            }, 100);
        }
    }, frameRate);
}

// Add some fun Easter eggs
document.addEventListener('click', function(e) {
    // Secret click on logo
    if (e.target.closest('.logo')) {
        console.log('%c🤫 Psst... You found the secret logo click!', 'color: #EC4899; font-weight: bold;');
        console.log('%cWant to work with us? Pick a contact method below!', 'color: #3B82F6;');
    }
    
    // Click on any emoji
    if (e.target.textContent.match(/[\u{1F300}-\u{1F9FF}]/gu)) {
        e.target.style.transform = 'scale(1.3) rotate(10deg)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 300);
    }
    
    // Click on contact card badges
    if (e.target.classList.contains('contact-badge')) {
        e.target.style.transform = 'scale(1.1)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 300);
    }
});

// Add floating emoji interaction
document.querySelectorAll('.floating-emoji').forEach(emoji => {
    emoji.addEventListener('mouseenter', function() {
        this.style.opacity = '0.3';
        this.style.transform = 'scale(1.5)';
        this.style.filter = 'blur(0px)';
    });
    
    emoji.addEventListener('mouseleave', function() {
        this.style.opacity = '0.1';
        this.style.transform = '';
        this.style.filter = 'blur(0.5px)';
    });
});

// Initialize with a fun loading state
window.addEventListener('load', function() {
    console.log('%c🌈 Website loaded! Three ways to reach us below ↓', 'color: #2563EB; font-size: 16px; font-weight: bold;');
    
    // Add a subtle body fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add copy-to-clipboard functionality for contact details
document.querySelectorAll('.detail-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Only copy if clicking on the text, not the icon
        if (e.target.tagName === 'SPAN') {
            const text = e.target.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show copied feedback
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied! ✓';
                e.target.style.color = '#10B981';
                
                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.style.color = '';
                }, 2000);
                
                console.log(`📋 Copied to clipboard: ${text}`);
            });
        }
    });
    
    // Add hover effect
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
        this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});