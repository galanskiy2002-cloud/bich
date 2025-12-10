let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.hide();  // Изначально скрыта

let query = "";  // Это отправится в бота (как "item" в ЛР6)

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function() {
    query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert("Введите запрос!");
        return;
    }

    // Симулируем результаты (вместо fetch к серверу — статично, как в ЛР6)
    // Для отчёта: покажи красивые карточки, как будто поиск сработал
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div style="text-align:center; padding:20px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white; border-radius:15px; margin-bottom:20px;">
            <h2>✅ Запрос принят: "${query}"</h2>
            <p>Найдено 3 подходящих вуза (пример). Нажмите зелёную кнопку, чтобы отправить в чат!</p>
        </div>
        <div class="university-card">
            <div class="university-name">1. Самарский государственный университет</div>
            <div class="university-details">
                <div class="detail-item">Проходной балл: <span class="badge badge-score">210</span></div>
                <div class="detail-item">ЕГЭ: Математика, Русский</div>
                <div class="detail-item">Рейтинг: <span class="badge badge-rating">8.5 ★</span></div>
                <div class="detail-item">Бюджет: 150 мест</div>
                <div class="detail-item">Платно: 120 000 ₽/год</div>
            </div>
        </div>
        <div class="university-card">
            <div class="university-name">2. Самарский национальный исследовательский университет</div>
            <div class="university-details">
                <div class="detail-item">Проходной балл: <span class="badge badge-score">195</span></div>
                <div class="detail-item">ЕГЭ: Физика, Информатика</div>
                <div class="detail-item">Рейтинг: <span class="badge badge-rating">7.8 ★</span></div>
                <div class="detail-item">Бюджет: 80 мест</div>
                <div class="detail-item">Платно: 140 000 ₽/год</div>
            </div>
        </div>
        <div class="university-card">
            <div class="university-name">3. Поволжский государственный университет телекоммуникаций</div>
            <div class="university-details">
                <div class="detail-item">Проходной балл: <span class="badge badge-score">180</span></div>
                <div class="detail-item">ЕГЭ: Математика</div>
                <div class="detail-item">Рейтинг: <span class="badge badge-rating">8.0 ★</span></div>
                <div class="detail-item">Бюджет: 100 мест</div>
                <div class="detail-item">Платно: 110 000 ₽/год</div>
            </div>
        </div>
    `;

    // Показываем MainButton, как в ЛР6
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText(`Вывести информацию по запросу "${query}"`);
        tg.MainButton.show();
    }
});

// Отправка в бота, как в ЛР6
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (query) {
        tg.sendData(query);  // Только строка с запросом — бот сам обработает
        tg.MainButton.setText("Отправлено в чат!");
        setTimeout(() => tg.close(), 1000);  // Закрываем через секунду
    }
});

function setExample(text) {
    document.getElementById('searchInput').value = text;
    searchBtn.click();
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});