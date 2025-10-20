// Основні функції для резюме
document.addEventListener('DOMContentLoaded', function() {
    console.log('Resume portfolio loaded successfully!');
    
    // Ініціалізація Bootstrap компонентів
    initBootstrapComponents();
    
    // Додавання обробників подій
    initEventHandlers();
    
    // Анімації при скролі
    initScrollAnimations();
});

// Ініціалізація Bootstrap компонентів
function initBootstrapComponents() {
    // Ініціалізація тултіпів
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Ініціалізація поповерів
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Обробники подій
function initEventHandlers() {
    // Обробник для кнопки Download CV
    const downloadBtn = document.querySelector('.btn-outline-light');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('CV download functionality would be implemented here!');
            // Тут буде реальна логіка завантаження
        });
    }
    
    // Плавна прокрутка для навігації
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
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
    
    // Анімація карток при ховері
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Анімації при скролі
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Спостерігаємо за секціями для анімації
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Додаткові утиліти
const ResumeUtils = {
    // Форматування телефону
    formatPhoneNumber: function(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    },
    
    // Валідація email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Копіювання тексту в буфер обміну
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Text copied to clipboard');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }
};

// Експорт для використання в інших модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initBootstrapComponents, initEventHandlers, initScrollAnimations, ResumeUtils };
}