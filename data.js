document.addEventListener('DOMContentLoaded', () => {
    const requestsList = document.getElementById('requests');
    const requests = JSON.parse(localStorage.getItem('requests')) || [];

    if (requests.length === 0) {
        requestsList.innerHTML = '<p>لا توجد طلبات معلقة حاليًا.</p>';
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