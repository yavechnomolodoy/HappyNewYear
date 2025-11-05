document.addEventListener('DOMContentLoaded', function() {
    
    createSnowflakes();
    createGarlands();
    startCountdown();
    setupMusicPlayer();

    // Заполняем таймер нужными HTML-элементами, так как убрали их из index.html
    const countdownHTML = `
        <div class="unit"><span id="days">00</span><label>дней</label></div>
        <div class="unit"><span id="hours">00</span><label>часов</label></div>
        <div class="unit"><span id="minutes">00</span><label>минут</label></div>
        <div class="unit"><span id="seconds">00</span><label>секунд</label></div>
    `;
    document.getElementById('countdown').innerHTML = countdownHTML;

});


/*
 * --- Функция 1: СОЗДАНИЕ СНЕЖИНОК (очень реалистичные) ---
 */
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 200; // Много снега
    const animationTypes = ['fall-slow', 'fall-medium', 'fall-fast'];

    // Создаем стили анимации динамически, чтобы они были хаотичными
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);
    
    // Генерируем анимацию в JS для 3 разных типов падения
    const keyframes = `
        @keyframes fall-slow {
            0% { transform: translateY(0vh) translateX(0vw); }
            100% { transform: translateY(105vh) translateX(5vw); }
        }
        @keyframes fall-medium {
            0% { transform: translateY(0vh) translateX(0vw); }
            100% { transform: translateY(105vh) translateX(-5vw); }
        }
        @keyframes fall-fast {
            0% { transform: translateY(0vh) translateX(0vw); }
            100% { transform: translateY(105vh) translateX(0vw); }
        }
    `;
    styleSheet.sheet.insertRule(keyframes, 0);


    for (let i = 0; i < numberOfSnowflakes; i++) {
        let flake = document.createElement('div');
        flake.classList.add('snowflake');

        flake.style.left = Math.random() * 100 + 'vw';
        
        // Хаотичная скорость падения
        flake.style.animationDuration = (Math.random() * 10 + 10) + 's';
        flake.style.animationDelay = Math.random() * -20 + 's';
        
        // Разные размеры
        let size = (Math.random() * 4 + 3) + 'px';
        flake.style.width = size;
        flake.style.height = size;
        
        flake.style.opacity = Math.random() * 0.7 + 0.3;

        // Назначаем одну из 3 анимаций
        flake.style.animationName = animationTypes[Math.floor(Math.random() * 3)];

        snowContainer.appendChild(flake);
    }
}


/*
 * --- Функция 2: СОЗДАНИЕ ГИРЛЯНД (v4.0) ---
 */
function createGarlands() {
    const containers = document.querySelectorAll('.garland-line');
    const colors = ['#FFD700', '#FF6347', '#87CEEB', '#ADFF2F']; // Цвета ламп
    const lightSize = '12px'; // Размер лампочки

    containers.forEach(container => {
        let isHorizontal = container.classList.contains('top') || container.classList.contains('bottom');
        let totalLength = isHorizontal ? window.innerWidth : window.innerHeight;
        let spacing = 35; // Расстояние между лампочками
        let numberOfLights = Math.floor(totalLength / spacing);

        for (let i = 0; i < numberOfLights; i++) {
            let light = document.createElement('span'); // Используем span для лампочки
            light.classList.add('light-bulb');
            
            // Выбор цвета
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            light.style.backgroundColor = color;
            light.style.width = lightSize;
            light.style.height = lightSize;
            light.style.borderRadius = '50%';
            light.style.position = 'absolute';
            
            // Позиционирование лампочки
            if (isHorizontal) {
                light.style.left = (i * spacing + (spacing/2)) + 'px';
                light.style.top = container.classList.contains('top') ? '5px' : '-5px'; // Смещение от нити
            } else {
                light.style.top = (i * spacing + (spacing/2)) + 'px';
                light.style.left = container.classList.contains('left') ? '5px' : '-5px'; // Смещение от нити
            }

            // Создание тени и мерцания в JS для хаоса
            light.style.boxShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px rgba(255, 255, 255, 0.5)`;
            
            light.style.animationName = 'twinkle';
            light.style.animationDuration = (Math.random() * 1.5 + 0.8) + 's';
            light.style.animationDelay = (Math.random() * 2) + 's';
            light.style.animationIterationCount = 'infinite';
            light.style.animationDirection = 'alternate';
            
            container.appendChild(light);
        }
    });

    // Создаем CSS-анимацию мерцания для лампочек
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);
    
    const twinkleKeyframes = `
        @keyframes twinkle {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1.05); }
        }
    `;
    styleSheet.sheet.insertRule(twinkleKeyframes, 0);
}


/*
 * --- Функция 3: ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ---
 */
function startCountdown() {
    const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime(); // 2026 год

    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    const card = document.querySelector('.card');

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Обновление HTML
        elements.days.innerText = String(d).padStart(2, '0');
        elements.hours.innerText = String(h).padStart(2, '0');
        elements.minutes.innerText = String(m).padStart(2, '0');
        elements.seconds.innerText = String(s).padStart(2, '0');

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = '<h2>С НОВЫМ ГОДОМ!</h2>';
            document.querySelector('.subtitle').innerText = 'Празднуем наступление нового, волшебного 2026 года!';
            document.querySelector('.holiday-content').style.display = 'none';
        }
    }, 1000);
}


/*
 * --- Функция 4: УПРАВЛЕНИЕ МУЗЫКОЙ (Улучшенная) ---
 */
function setupMusicPlayer() {
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIcon = musicToggleBtn.querySelector('i');

    let isPlaying = false; 

    musicToggleBtn.addEventListener('click', function() {
        if (!backgroundMusic || !backgroundMusic.src.includes('http')) return; // Проверка на наличие музыки

        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
            musicToggleBtn.classList.remove('playing');
        } else {
            // Использование play() внутри обработчика клика (взаимодействие с пользователем)
            backgroundMusic.play().catch(e => {
                console.error("Не удалось воспроизвести музыку:", e);
                // Можно добавить уведомление для пользователя
            });
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            musicToggleBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}
