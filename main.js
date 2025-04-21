// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CTA Button Animation
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    alert('مرحبًا! انطلق مع بلس لتجربة رياضية ممتعة!');
});

// Background Animation (Floating Plus Signs)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const plusSigns = [];
const numSigns = 20;

class PlusSign {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 111, 97, 0.5)';
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('+', this.x, this.y);
    }
}

function init() {
    for (let i = 0; i < numSigns; i++) {
        plusSigns.push(new PlusSign());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plusSigns.forEach(sign => {
        sign.update();
        sign.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});