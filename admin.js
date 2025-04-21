document.getElementById('adminForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const adminCode = document.getElementById('adminCode').value;
    const errorMessage = document.getElementById('errorMessage');
    const validCodes = ['010007586279', '011053652279', 'mahdi2hassan', 'ma7di2hassan'];

    if (validCodes.includes(adminCode)) {
        alert('تم تسجيل الدخول بنجاح!');
        window.location.href = 'admin.html'; // غيرها لو عندك لوحة تحكم
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'كود الأدمن غير صحيح. حاول مرة أخرى.';
    }
});