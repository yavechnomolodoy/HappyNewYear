
// Обратный отсчёт до Нового года
function updateCountdown() {
    const newYear = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`);
    const now = new Date();
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Обновляем отсчёт каждую секунду
setInterval(updateCountdown, 1000);

// Инициализация при загрузке
window.onload = updateCountdown;
