// Основний JavaScript файл
function showMessage(text, type = 'info') {
    const messageDiv = document.getElementById('message');
    const messageText = document.getElementById('messageText');
    
    messageText.textContent = text;
    messageDiv.className = `message show ${type}`;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 3000);
}

function test() {
    showMessage('Вітаю! Gulp успішно працює! 🎉', 'success');
    console.log('Gulp тест пройдений успішно!');
}

function changeBackground() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
    showMessage('Фон змінено!', 'warning');
}

function resetStyles() {
    document.body.style.background = '';
    showMessage('Стилі скинуто!', 'info');
}

// Додаємо обробники подій після завантаження DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка завантажена! Gulp працює коректно.');
});