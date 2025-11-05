// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // Запускаем все наши функции
    createSnowflakes();
    createGarlands();
    startCountdown();

});


/*
 * --- Функция 1: СОЗДАНИЕ СНЕЖИНОК ---
 * (Код с прошлого раза, без изменений)
 */
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 100;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        let flake = document.createElement('div');
        flake.classList.add('snowflake');

        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 8 + 5) + 's';
        flake.style.animationDelay = Math.random() * -10 + 's';
        
        let size = (Math.random() * 3 + 2) + 'px';
        flake.style.width = size;
        flake.style.height = size;
        
        flake.style.opacity = Math.random() * 0.7 + 0.3;

        snowContainer.appendChild(flake);
    }
}


/*
 * --- Функция 2: СОЗДАНИЕ ГИРЛЯНД (НОВАЯ) ---
 * Эта функция создает лампочки и дает им случайное мерцание
 */
function createGarlands() {
    const containers = document.querySelectorAll('.garland-container');
    const colors = ['color-1', 'color-2', 'color-3', 'color-4'];
    
    // Получаем ширину экрана
    const screenWidth = window.innerWidth;
    // Каждая лампочка + отступ = 28px (12px + 8px + 8px)
    const lightsPerContainer = Math.floor(screenWidth / 28);

    containers.forEach(container => {
        for (let i = 0; i < lightsPerContainer; i++) {
            let light = document.createElement('div');
            light.classList.add('light');
            
            // Выбираем случайный цвет из 4-х
            light.classList.add(colors[i % colors.length]);
            
            // --- Вот магия "ХАОСА" ---
            // Задаем каждой лампочке случайную задержку анимации
            // Это заставляет их мерцать не синхронно
            light.style.animationDelay = (Math.random() * 2) + 's';
            light.style.animationDuration = (Math.random() * 1 + 0.5) + 's'; // Мерцают с разной скоростью
            
            container.appendChild(light);
        }
    });
}


/*
 * --- Функция 3: ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (НОВАЯ) ---
 */
function startCountdown() {
    // Установи дату, до которой идет отсчет (1 Января)
    // ВАЖНО: Я ставлю 2026 год, так как сейчас 2025
    const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime();

    // Элементы на странице, которые мы будем обновлять
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const card = document.querySelector('.card'); // Наша карточка

    // Обновляем таймер каждую секунду
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Расчет времени
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Отображаем на странице (добавляем '0' спереди, если число < 10)
        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');

        // Когда время вышло
        if (distance < 0) {
            clearInterval(interval);
            // Прячем таймер и кнопки
            document.getElementById('countdown').style.display = 'none';
            document.querySelector('.button-container').style.display = 'none';
            document.querySelector('.card p').style.display = 'none';
            // Показываем поздравление
            card.querySelector('h1').innerText = "С Новым Годом!";
        }
    }, 1000);
}
