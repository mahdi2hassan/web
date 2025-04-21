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
});