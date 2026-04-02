// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Work Section Toggle
const workButtons = document.querySelectorAll('.work-btn');
const subWorkButtons = document.querySelectorAll('.sub-work-btn');
const modellingSection = document.getElementById('modelling-section');
const programmingSection = document.getElementById('programming-section');
const robloxProjects = document.getElementById('roblox-projects');
const webProjects = document.getElementById('web-projects');

workButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        modellingSection.classList.remove('active');
        programmingSection.classList.remove('active');
        robloxProjects.classList.remove('active');
        webProjects.classList.remove('active');

        if (category === 'modelling') {
            modellingSection.classList.add('active');
        } else if (category === 'programming') {
            programmingSection.classList.add('active');
        }
    });
});

subWorkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        
        robloxProjects.classList.remove('active');
        webProjects.classList.remove('active');

        if (type === 'roblox') {
            robloxProjects.classList.add('active');
        } else if (type === 'web') {
            webProjects.classList.add('active');
        }
    });
});

// Copy Code Function
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target.closest('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Battery Status (Android)
function updateBatteryStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                const percent = Math.round(battery.level * 100);
                const charging = battery.charging;
                
                document.getElementById('batteryPercent').textContent = percent + '%';
                
                if (charging) {
                    document.getElementById('batteryStatus').textContent = 'Charging';
                    document.querySelector('.battery-display i').className = 'fas fa-battery-full';
                } else {
                    document.getElementById('batteryStatus').textContent = 'Discharging';
                    if (percent > 50) {
                        document.querySelector('.battery-display i').className = 'fas fa-battery-three-quarters';
                    } else if (percent > 25) {
                        document.querySelector('.battery-display i').className = 'fas fa-battery-half';
                    } else if (percent > 10) {
                        document.querySelector('.battery-display i').className = 'fas fa-battery-quarter';
                    } else {
                        document.querySelector('.battery-display i').className = 'fas fa-battery-empty';
                    }
                }
            }
            
            updateBattery();
            battery.addEventListener('chargingchange', updateBattery);
            battery.addEventListener('levelchange', updateBattery);
        });
    } else if (navigator.getBattery === undefined) {
        // Fallback for browsers that don't support Battery API
        document.getElementById('batteryPercent').textContent = '85%';
        document.getElementById('batteryStatus').textContent = 'Charging';
    }
}

// Initialize Battery Status
updateBatteryStatus();

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Re-trigger animation on scroll up
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.float-in').forEach(element => {
    observer.observe(element);
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Floating Animation on Hover for Buttons
const buttons = document.querySelectorAll('.work-btn, .sub-work-btn, .submit-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'float 0.6s ease-in-out infinite';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-10px)';
    });
});

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
    }
});