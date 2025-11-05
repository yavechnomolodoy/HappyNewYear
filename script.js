function updateCountdown() {
    // Цель: 1 января следующего года, 00:00:00
    const nextYear = new Date().getFullYear() + 1;
    const newYear = new Date(`${nextYear}-01-01T00:00:00`);
    
    const now = new Date();
    const diff = newYear - now;

    // Если дата уже наступила (для тестирования)
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<span>С Новым годом!</span>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Обновляем каждую секунду
setInterval(updateCountdown, 1000);

// Первый вызов при загрузке
window.onload = updateCountdown;
