// Функціонал для резюме
document.addEventListener('DOMContentLoaded', function() {
    console.log('Резюме Laura Parker завантажено');
    
    // Анімація при завантаженні
    const animateSections = () => {
        const sections = document.querySelectorAll('.section-title');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateX(-20px)';
            section.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateX(0)';
            }, index * 100);
        });
    };
    
    // Плавна навігація
    const setupNavigation = () => {
        const navLinks = document.querySelectorAll('.list-group-item[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };
    
    // Ініціалізація
    animateSections();
    setupNavigation();
});

// Функції для кнопок
function downloadResume() {
    alert('Функція завантаження PDF буде реалізована тут!');
}

function printResume() {
    window.print();
}

function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: 'Резюме Laura Parker - UI/UX Designer',
            text: 'Професійне резюме дизайнера',
            url: window.location.href
        });
    } else {
        alert('Поділіться посиланням: ' + window.location.href);
    }
}