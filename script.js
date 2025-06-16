// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
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

// Coffee Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        }
    });
}

// Testimonial Carousel
let currentTestimonial = 3; // Start with middle testimonial (Sarah Mitchell)
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

function updateTestimonials(index) {
    testimonials.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
        
        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + testimonials.length) % testimonials.length) {
            card.classList.add('prev');
        } else if (i === (index + 1) % testimonials.length) {
            card.classList.add('next');
        } else if (i === (index - 2 + testimonials.length) % testimonials.length) {
            card.classList.add('far-prev');
        } else if (i === (index + 2) % testimonials.length) {
            card.classList.add('far-next');
        }
    });
}

if (prevBtn && nextBtn && testimonials.length > 0) {
    // Initialize the carousel
    updateTestimonials(currentTestimonial);
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonials(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials(currentTestimonial);
    });
}

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// Get Directions button
const directionsBtn = document.querySelector('.directions-btn');
if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
        window.open('https://maps.google.com/?q=39+Brooklyn+Street+Covington+Kentucky', '_blank');
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.coffee-card, .product-card, .product-item, .menu-category').forEach(el => {
    observer.observe(el);
});

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    
    // Set language attribute on HTML element
    document.documentElement.setAttribute('lang', lang);
    
    // Update active language button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all elements with translations
    document.querySelectorAll('[data-en][data-cs]').forEach(element => {
        if (element.tagName === 'INPUT' && element.placeholder) {
            element.placeholder = element.dataset[lang];
        } else if (element.classList.contains('hero-title')) {
            // Special handling for hero title to maintain line breaks
            if (lang === 'cs') {
                element.innerHTML = 'Objevte Kouzlo<br>Naší Speciálně<br>Vybírané Kávy';
            } else {
                element.innerHTML = 'Discover The<br>Art Of Perfect<br>Coffee';
            }
        } else if (element.classList.contains('hero-description')) {
            // Special handling for hero description to maintain line breaks
            if (lang === 'cs') {
                element.innerHTML = 'Zažijte Bohaté A Výrazné Chutě Našich<br>Vynikajících Kávových Směsí. Vytvořeno Pro<br>Probuzení Vašich Smyslů Od TvorimeProTebe';
            } else {
                element.innerHTML = 'Experience The Rich And Bold Flavors Of Our<br>Exquisite Coffee Blends. Crafted To Awaken Your<br>Senses With Every Sip You Take By TvorimeProTebe';
            }
        } else {
            element.textContent = element.dataset[lang];
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Add click listeners to language buttons
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage') || 'en';
switchLanguage(savedLang);

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu, .nav-actions {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--secondary-color);
            padding: 1rem;
            display: none;
            flex-direction: column;
            gap: 1rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .nav-menu.active, .nav-actions.active {
            display: flex;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    /* Animation styles */
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);