document.addEventListener('DOMContentLoaded', function() {
    
    createSnowflakes();
    createGarlands();
    startCountdown();
    setupMusicPlayer(); // Новая функция для музыки

});


/*
 * --- Функция 1: СОЗДАНИЕ СНЕЖИНОК (улучшенная) ---
 */
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 150; // Больше снежинок!

    for (let i = 0; i < numberOfSnowflakes; i++) {
        let flake = document.createElement('div');
        flake.classList.add('snowflake');

        // Случайное положение по горизонтали и чуть за экраном
        flake.style.left = Math.random() * 100 + 'vw';
        
        // Случайная продолжительность и задержка для хаотичности
        flake.style.animationDuration = (Math.random() * 7 + 8) + 's'; // Длиннее падение
        flake.style.animationDelay = Math.random() * -15 + 's'; // Более сильная задержка
        
        // Случайный размер (от 3px до 7px)
        let size = (Math.random() * 4 + 3) + 'px';
        flake.style.width = size;
        flake.style.height = size;
        
        // Случайная прозрачность
        flake.style.opacity = Math.random() * 0.6 + 0.4; // Чуть менее прозрачные

        snowContainer.appendChild(flake);
    }
}


/*
 * --- Функция 2: СОЗДАНИЕ ГИРЛЯНД (улучшенная для 4 сторон) ---
 */
function createGarlands() {
    const containers = document.querySelectorAll('.garland-container');
    const colors = ['color-1', 'color-2', 'color-3', 'color-4'];
    
    containers.forEach(container => {
        let numberOfLights;
        // Разное количество лампочек для горизонтальных и вертикальных гирлянд
        if (container.classList.contains('top') || container.classList.contains('bottom')) {
            numberOfLights = Math.floor(window.innerWidth / 40); // 40px на лампочку
        } else {
            numberOfLights = Math.floor(window.innerHeight / 40); // 40px на лампочку
        }

        for (let i = 0; i < numberOfLights; i++) {
            let light = document.createElement('div');
            light.classList.add('light');
            
            light.classList.add(colors[Math.floor(Math.random() * colors.length)]); // Случайный цвет
            
            // Задаем случайные параметры анимации для хаотичного мерцания
            light.style.animationDelay = (Math.random() * 2) + 's';
            light.style.animationDuration = (Math.random() * 1.2 + 0.8) + 's'; // Скорость мерцания
            
            container.appendChild(light);
        }
    });
}


/*
 * --- Функция 3: ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (без изменений) ---
 */
function startCountdown() {
    const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime(); // Установил 2026

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const card = document.querySelector('.card');

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').style.display = 'none';
            document.querySelector('.button-container').style.display = 'none';
            document.querySelector('.card p').style.display = 'none';
            card.querySelector('h1').innerText = "С Новым Годом!";
        }
    }, 1000);
}


/*
 * --- Функция 4: УПРАВЛЕНИЕ МУЗЫКОЙ (НОВАЯ и РАБОЧАЯ) ---
 */
function setupMusicPlayer() {
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIcon = musicToggleBtn.querySelector('i');

    let isPlaying = false; // Отслеживаем, играет ли музыка

    // Проверяем, есть ли аудио-файл, прежде чем пытаться его воспроизвести
    if (backgroundMusic && backgroundMusic.src && backgroundMusic.src.includes('http')) {
        musicToggleBtn.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
                musicToggleBtn.style.background = 'linear-gradient(145deg, #e74c3c, #c0392b)'; // Красный
            } else {
                backgroundMusic.play().catch(e => console.error("Ошибка воспроизведения аудио:", e)); // Обработка возможной ошибки
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
                musicToggleBtn.style.background = 'linear-gradient(145deg, #2ecc71, #27ae60)'; // Зеленый, когда играет
            }
            isPlaying = !isPlaying;
        });
    } else {
        // Если нет музыки или она не загрузилась, деактивируем кнопку
        console.warn("Фоновая музыка не найдена или недействительна. Кнопка музыки будет отключена.");
        musicToggleBtn.disabled = true;
        musicToggleBtn.style.opacity = 0.5;
        musicToggleBtn.style.cursor = 'not-allowed';
    }

    // Автоматически запускаем музыку, если пользователь уже взаимодействовал со страницей
    // (для избежания блокировки браузером автовоспроизведения)
    document.body.addEventListener('click', function firstInteraction() {
        if (!isPlaying && backgroundMusic && backgroundMusic.src && backgroundMusic.src.includes('http')) {
             backgroundMusic.play().then(() => {
                 isPlaying = true;
                 musicIcon.classList.remove('fa-play');
                 musicIcon.classList.add('fa-pause');
                 musicToggleBtn.style.background = 'linear-gradient(145deg, #2ecc71, #27ae60)';
             }).catch(e => console.error("Ошибка автовоспроизведения:", e));
        }
        document.body.removeEventListener('click', firstInteraction); // Отписываемся от события
    });
}
