// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });
});

// Smooth scrolling navigation
const navLinks = document.querySelectorAll('nav a:not(.cv-download-btn)');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// CV Download functionality
const cvDownloadBtn = document.querySelector('.cv-download-btn');
cvDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Change button text temporarily
    const originalText = cvDownloadBtn.textContent;
    cvDownloadBtn.textContent = 'Downloading...';
    cvDownloadBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Create download link (replace 'path/to/your/cv.pdf' with actual path)
    const link = document.createElement('a');
    link.href = './cv/Harith_Rajapaksha_CV.pdf'; // Update this path to your CV file
    link.download = 'Harith_Rajapaksha_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset button after download
    setTimeout(() => {
        cvDownloadBtn.textContent = originalText;
        cvDownloadBtn.style.background = 'var(--gradient)';
    }, 1500);
});

// Project card GitHub navigation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const githubUrl = card.getAttribute('data-github');
        if (githubUrl) {
            // Add clicking animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                window.open(githubUrl, '_blank');
            }, 150);
        }
    });
    
    // Add cursor pointer style
    card.style.cursor = 'pointer';
});

// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.project-card, .about-text, .about-visual, .contact-content');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateX(-50%) translateY(-100%)';
    } else {
        navbar.style.transform = 'translateX(-50%) translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Parallax effect for floating shapes
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    shapes.forEach((shape, i) => {
        const rate = scrolled * (i + 1) * 0.5;
        shape.style.transform = `translate3d(0, ${rate}px, 0) rotate(${rate * 0.1}deg)`;
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.textContent = 'Sending...';
    
    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.style.background = 'var(--gradient)';
        }, 2000);
    }, 1500);
});

// Dynamic text animation for hero
const heroText = document.querySelector('.hero p');
const texts = [
    'Creative Developer & Digital Innovator',
    'Full-Stack Developer',
    'Code Artist & Problem Solver',
    'Tech Explorer & Creative Thinker',
    'AI & ML Model Developer'
];
let textIndex = 0;

setInterval(() => {
    heroText.style.opacity = '0';
    setTimeout(() => {
        textIndex = (textIndex + 1) % texts.length;
        heroText.textContent = texts[textIndex];
        heroText.style.opacity = '1';
    }, 300);
}, 4000);

// Add particle system
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        opacity: 0;
        animation: particleFloat 6s linear infinite;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Background image parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile touch support for cursor
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    cursor.style.left = touch.clientX + 'px';
    cursor.style.top = touch.clientY + 'px';
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    cursor.style.left = touch.clientX + 'px';
    cursor.style.top = touch.clientY + 'px';
});