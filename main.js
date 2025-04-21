// ===========================
// وظائف الصفحة الرئيسية وصفحة المقررات
// ===========================

// التحكم في قائمة الموبايل
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// أنيميشن علامات الجمع
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const plusSigns = [];
    const numSigns = 30;

    class PlusSign {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 25 + 15;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.opacity = Math.random() * 0.4 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < -this.size || this.x > canvas.width + this.size) this.speedX *= -1;
            if (this.y < -this.size || this.y > canvas.height + this.size) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 111, 97, ${this.opacity})`;
            ctx.font = `${this.size}px Tajawal`;
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
}

// GSAP و ScrollReveal
if (typeof gsap !== 'undefined' && typeof ScrollReveal !== 'undefined') {
    // أنيميشن الهيرو
    if (document.querySelector('.hero-content')) {
        gsap.from('.hero-content h2', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.hero-content p', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });

        gsap.from('.cta-button', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out'
        });
    }

    // أنيميشن الكروت
    ScrollReveal().reveal('.course-card', {
        distance: '50px',
        origin: 'bottom',
        interval: 200,
        duration: 800,
        ease: 'power3.out'
    });

    ScrollReveal().reveal('.request-item', {
        distance: '30px',
        origin: 'bottom',
        interval: 150,
        duration: 600,
        ease: 'power2.out'
    });
}

// ===========================
// وظائف تسجيل الأدمن (admin.html)
// ===========================
const adminForm = document.getElementById('adminForm');
if (adminForm) {
    adminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const adminCode = document.getElementById('adminCode').value;
        const errorMessage = document.getElementById('errorMessage');
        const validCodes = ['010007586279', '011053652279', 'mahdi2hassan', 'ma7di2hassan'];

        if (validCodes.includes(adminCode)) {
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = 'data.html'; // توجيه إلى صفحة البيانات
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'كود الأدمن غير صحيح. حاول مرة أخرى.';
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(errorMessage, 
                    { opacity: 0, y: 10 }, 
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }
        }
    });
}

// ===========================
// وظائف صفحة البيانات (data.html)
// ===========================
if (document.getElementById('requests')) {
    document.addEventListener('DOMContentLoaded', () => {
        const requestsList = document.getElementById('requests');
        const requests = JSON.parse(localStorage.getItem('requests')) || [];

        if (requests.length === 0) {
            requestsList.innerHTML = '<p style="color: #4a5568; font-size: 1.2rem;">لا توجد طلبات معلقة حاليًا.</p>';
        } else {
            requests.forEach(request => {
                const requestItem = document.createElement('div');
                requestItem.classList.add('request-item');
                requestItem.innerHTML = `
                    <p><strong>اسم المستخدم:</strong> ${request.username}</p>
                    <p><strong>البريد الإلكتروني:</strong> ${request.email}</p>
                    <p><strong>تاريخ الطلب:</strong> ${new Date(request.date).toLocaleString('ar-EG')}</p>
                `;
                requestsList.appendChild(requestItem);
            });
        }
    });
}

// ===========================
// وظائف صفحة التسجيل (signup.html)
// ===========================
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const request = {
            username,
            email,
            date: new Date().toISOString()
        };

        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.push(request);
        localStorage.setItem('requests', JSON.stringify(requests));

        alert('تم إرسال طلب التسجيل بنجاح! سيتم مراجعته قريبًا.');
        this.reset();

        // أنيميشن تأكيد التسجيل
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.signup form', 
                { scale: 1 }, 
                { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }
            );
        }
    });
}

// ===========================
// وظائف صفحة الصف الدراسي (grade.html)
// ===========================
if (document.getElementById('grade-title')) {
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('grade');
        const gradeTitle = document.getElementById('grade-title');

        const gradeNames = {
            'first-prep': 'الصف الأول الإعدادي',
            'second-prep': 'الصف الثاني الإعدادي',
            'third-sci': 'الصف الثالث الثانوي - علمي',
            'third-lit': 'الصف الثالث الثانوي - أدبي'
        };

        gradeTitle.textContent = gradeNames[grade] || 'الصف الدراسي';

        // أنيميشن عنوان الصف
        if (typeof gsap !== 'undefined') {
            gsap.from(gradeTitle, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });
}