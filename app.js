let tg = window.Telegram.WebApp;
tg.expand();  // Расширяем на весь экран, как в ЛР6

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function() {
    let query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Введите запрос!");
        return;
    }

    // Опционально: сделайте AJAX к вашему API для preview результатов (не обязательно, но полезно)
    fetch('/api/search', {  // Предполагаем, что API на том же домене
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = `<h2>Результаты (${data.count}):</h2>`;
            data.universities.forEach(uni => {
                resultsDiv.innerHTML += `<p><strong>${uni.name}</strong> (балл: ${uni.score})</p>`;
            });
        }
    })
    .catch(error => console.error(error));

    // Показываем MainButton, как в ЛР6
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText(`Отправить запрос: "${query}"`);
        tg.MainButton.show();
    }

    // Сохраняем query для отправки (аналог item в ЛР6)
    window.currentQuery = query;
});

// Обработка клика на MainButton (отправка данных боту, как в ЛР6)
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify({ query: window.currentQuery }));  // Отправляем JSON с запросом
    tg.MainButton.hide();  // Опционально спрячем после отправки
});