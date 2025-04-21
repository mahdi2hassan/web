document.getElementById('signupForm').addEventListener('submit', function (e) {
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
});