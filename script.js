// Ждем, пока вся HTML-страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим контейнер для снежинок
    const snowContainer = document.getElementById('snow-container');
    
    // Количество снежинок
    const numberOfSnowflakes = 100;

    // Создаем 100 снежинок в цикле
    for (let i = 0; i < numberOfSnowflakes; i++) {
        // 1. Создаем новый HTML-элемент (снежинку)
        let flake = document.createElement('div');
        flake.classList.add('snowflake');

        // 2. Задаем ей случайные стили, чтобы они не падали одинаково
        
        // Случайное положение по горизонтали (от 0% до 100% ширины экрана)
        flake.style.left = Math.random() * 100 + 'vw';
        
        // Случайная продолжительность анимации (от 5 до 13 секунд)
        flake.style.animationDuration = (Math.random() * 8 + 5) + 's';
        
        // Случайная задержка (чтобы они не падали все сразу)
        // (отрицательная задержка заставляет анимацию начаться "в процессе")
        flake.style.animationDelay = Math.random() * -10 + 's';
        
        // Случайный размер (от 2px до 5px)
        let size = (Math.random() * 3 + 2) + 'px';
        flake.style.width = size;
        flake.style.height = size;
        
        // Случайная прозрачность (от 0.3 до 1.0)
        flake.style.opacity = Math.random() * 0.7 + 0.3;

        // 3. Добавляем готовую снежинку на страницу
        snowContainer.appendChild(flake);
    }
});
