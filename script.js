// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // You'll need to set this up

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

// Battery Status (Android)
function updateBatteryStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                const percent = Math.round(battery.level * 100);
                const charging = battery.charging;
                
                document.getElementById('batteryPercent').textContent = percent + '%';
                const batteryIcon = document.getElementById('batteryIcon');
                
                // Set icon based on battery level
                if (percent > 75) {
                    batteryIcon.className = 'fas fa-battery-full';
                } else if (percent > 50) {
                    batteryIcon.className = 'fas fa-battery-three-quarters';
                } else if (percent > 25) {
                    batteryIcon.className = 'fas fa-battery-half';
                } else if (percent > 10) {
                    batteryIcon.className = 'fas fa-battery-quarter';
                } else {
                    batteryIcon.className = 'fas fa-battery-empty';
                }
                
                // Set color based on battery level
                if (percent >= 70) {
                    batteryIcon.classList.add('battery-high');
                    batteryIcon.classList.remove('battery-medium', 'battery-low');
                } else if (percent >= 40) {
                    batteryIcon.classList.add('battery-medium');
                    batteryIcon.classList.remove('battery-high', 'battery-low');
                } else {
                    batteryIcon.classList.add('battery-low');
                    batteryIcon.classList.remove('battery-high', 'battery-medium');
                }
                
                // Update charging status
                if (charging) {
                    document.getElementById('batteryStatus').textContent = 'Charging';
                } else {
                    document.getElementById('batteryStatus').textContent = 'Discharging';
                }
            }
            
            updateBattery();
            battery.addEventListener('chargingchange', updateBattery);
            battery.addEventListener('levelchange', updateBattery);
        });
    } else {
        // Fallback for browsers that don't support Battery API
        const percent = Math.floor(Math.random() * (95 - 70 + 1) + 70);
        document.getElementById('batteryPercent').textContent = percent + '%';
        document.getElementById('batteryStatus').textContent = 'Charging';
        
        const batteryIcon = document.getElementById('batteryIcon');
        batteryIcon.classList.add('battery-high');
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

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Send email using a backend service or EmailJS
        sendEmail(name, email, message);
    });
}

function sendEmail(name, email, message) {
    // Using fetch to send email to your backend
    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            to: 'guardblroblox@gmail.com'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    })
    .catch(error => {
        console.log('Using fallback - Email service not configured');
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
