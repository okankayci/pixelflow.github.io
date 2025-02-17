// Terminal yazı efekti güncelleme
function typeWriter(element, text) {
    let i = 0;
    element.textContent = '';
    element.style.width = '0';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            element.style.width = `${(i + 1) * 100 / text.length}%`;
            i++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// Glitch efekti
function createGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (!glitchText) return;

    const colors = [
        'rgba(124, 58, 237, 0.7)',  // Purple
        'rgba(59, 130, 246, 0.7)',  // Blue
        'rgba(236, 72, 153, 0.7)',  // Pink
        'rgba(74, 222, 128, 0.7)',  // Green
        'rgba(251, 191, 36, 0.7)'   // Yellow
    ];

    setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 20}px ${randomColor},
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 20}px ${colors[0]}
        `;
        
        setTimeout(() => {
            glitchText.style.textShadow = 'var(--neon-glow)';
        }, 100);
    }, 2000);
}

// Mouse takibi efekti
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero::before');
    if (hero) {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        hero.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--accent-color) 0%, transparent 70%)`;
    }
});

// Mouse interaction effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x.toString());
    document.documentElement.style.setProperty('--mouse-y', y.toString());
    
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = (e.clientX - rect.left) / rect.width;
        const cardY = (e.clientY - rect.top) / rect.height;
        
        if (cardX >= 0 && cardX <= 1 && cardY >= 0 && cardY <= 1) {
            card.style.setProperty('--card-x', cardX.toString());
            card.style.setProperty('--card-y', cardY.toString());
        }
    });
});

// Telefon ekran görüntüsü geçiş efekti
function initPhoneScreenshots() {
    const screenshots = document.querySelectorAll('.screenshot-grid img');
    const dots = document.querySelectorAll('.screen-nav-dot');
    let currentIndex = 0;

    function showScreen(index) {
        screenshots.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        screenshots[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Otomatik geçiş
    setInterval(() => {
        currentIndex = (currentIndex + 1) % screenshots.length;
        showScreen(currentIndex);
    }, 3000);

    // Nokta navigasyonu için click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showScreen(currentIndex);
        });
    });

    // Touch/Swipe desteği
    let touchStartX = 0;
    const phoneScreen = document.querySelector('.phone-screen');

    phoneScreen.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    phoneScreen.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Sola kaydırma
                currentIndex = (currentIndex + 1) % screenshots.length;
            } else {
                // Sağa kaydırma
                currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
            }
            showScreen(currentIndex);
        }
    });
}

// Slider efekti
function initSlider() {
    const images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];
    const sliderControls = document.querySelector('.slider-controls');
    const currentScreen = document.querySelector('.current-screenshot img');
    const nextScreen = document.querySelector('.next-screenshot img');
    let currentIndex = 0;

    // Kontrol noktalarını oluştur
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => changeSlide(index));
        sliderControls.appendChild(dot);
    });

    function changeSlide(index) {
        const dots = document.querySelectorAll('.slider-dot');
        dots[currentIndex].classList.remove('active');
        dots[index].classList.add('active');

        // Mevcut görüntüyü sola kaydır ve soldakini sağa getir
        currentScreen.style.transform = 'translateX(-100%)';
        nextScreen.style.transform = 'translateX(-100%)';
        nextScreen.style.opacity = '1';

        setTimeout(() => {
            currentScreen.src = `img/${images[index]}`;
            nextScreen.src = `img/${images[(index + 1) % images.length]}`;
            
            currentScreen.style.transform = '';
            nextScreen.style.transform = '';
            nextScreen.style.opacity = '0.5';
        }, 500);

        currentIndex = index;
    }

    // Otomatik geçiş
    setInterval(() => {
        changeSlide((currentIndex + 1) % images.length);
    }, 3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card, .section-title').forEach((el) => {
    observer.observe(el);
});

// Mobil menü toggle fonksiyonu ekle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Scroll animasyonu
function initScrollAnimations() {
    const elements = document.querySelectorAll('.product-card, .about-card, .contact-card, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Scroll animasyonları için
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2000,
    delay: 200
});

scrollReveal.reveal('.card', { interval: 100 });
scrollReveal.reveal('.section-title', { delay: 0 });
scrollReveal.reveal('.skill-card', { interval: 200 });

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Aktif menü öğesini vurgula
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobil menü işlemleri
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    const terminalText = document.querySelector('.hero .terminal-text');
    if (terminalText) {
        const text = terminalText.textContent;
        setTimeout(() => {
            typeWriter(terminalText, text);
        }, 500);
    }
    
    createGlitchEffect();
    initPhoneScreenshots();
    initSlider();
    toggleMobileMenu();
    initScrollAnimations();
    highlightActiveNavLink();
    initMobileMenu();
});
