document.addEventListener("DOMContentLoaded", function () {

    let svg = document.getElementById("main_diagram");

    let center = { x: svg.viewBox.baseVal.width / 2, y: svg.viewBox.baseVal.height / 2 };
    let radius = Math.min(center.x, center.y);
    let layerThickness = radius / 5;

    let layers = [
        { parts: 2, colors: ["#AF6420", "#549695"], labels: ["Dev | CapEx", "Ops | OpEx"], links: ["/", "/"] },
        { parts: 4, colors: ["#392D75", "#E59F13", "#9FC713", "#0E759F"], labels: ["Распределение", "Производство", "Обмен", "Потребление"], links: ["/", "/", "/", "/"] },
        {
            parts: 12, colors: ["#602980", "#9C1A55", "#C12020", "#D75020", "#FA9C20", "#FFCC20", "#FFEA20", "#80BE00", "#12A050", "#1E72B0", "#0150A0", "#342D90"],
            labels: ["📝Формализация", "📐Проектирование", "📅Планирование", "⌨️Кодирование", "🔧 Сборка", "🐞Испытания", "🚀 Выпуск", "🚚 Поставка", "🖥️Мониторинг", "🤖 Эксплуатация", "📚 Обучение", "✍️ Отзывы"],
            links: ["https://petaflops.guru/metod/12-etapov/formalizatsiya", "https://petaflops.guru/metod/12-etapov/proektirovanie", "https://petaflops.guru/metod/12-etapov/planirovanie", "https://petaflops.guru/metod/12-etapov/codirovanie", "https://petaflops.guru/metod/12-etapov/sborka", "https://petaflops.guru/metod/12-etapov/ispitaniya", "https://petaflops.guru/metod/12-etapov/vipusk", "https://petaflops.guru/metod/12-etapov/postavka", "https://petaflops.guru/metod/12-etapov/monitoring", "https://petaflops.guru/metod/12-etapov/ekspluatatsiya", "https://petaflops.guru/metod/12-etapov/obuchenie", "https://petaflops.guru/metod/12-etapov/otzivi"]
        },
        { parts: 6, colors: ["#7C4087", "#D63420", "#FFB71F", "#FFD710", "#149C78", "#1B3CA4"], labels: ["📌Задачи", "🕒 Сроки", "🚦Качество", "🔄Обновления", "🎖️Реагирование", "🌟Перспективы"], links: ["/", "/", "/", "/", "/", "/"] },

        { parts: 3, colors: ["#602980", "#FA9C20", "#1E72B0"], labels: ["📉Дешевле", "💎Лучше", "🏆Быстрее"], links: ["/", "/", "/"] },
    ];


    let startAngle = -Math.PI / 2;
    for (let i = layers.length - 1; i >= 0; i--) {
        let layer = layers[i];
        let sectionAngle = (Math.PI * 2) / layer.parts;
        let currentRadius = radius - i * layerThickness;

        for (let j = 0; j < layer.parts; j++) {
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            let d = [
                "M", center.x + currentRadius * Math.cos(startAngle), center.y + currentRadius * Math.sin(startAngle),
                "A", currentRadius, currentRadius, 0, +(sectionAngle > Math.PI), 1, center.x + currentRadius * Math.cos(startAngle + sectionAngle), center.y + currentRadius * Math.sin(startAngle + sectionAngle),
                "L", center.x + (currentRadius - layerThickness) * Math.cos(startAngle + sectionAngle), center.y + (currentRadius - layerThickness) * Math.sin(startAngle + sectionAngle),
                "A", currentRadius - layerThickness, currentRadius - layerThickness, 0, +(sectionAngle > Math.PI), 0, center.x + (currentRadius - layerThickness) * Math.cos(startAngle), center.y + (currentRadius - layerThickness) * Math.sin(startAngle),
                "Z"
            ].join(" ");

            path.setAttribute("d", d);
            path.setAttribute("fill", layer.colors[j]);
            svg.appendChild(path);

            let midAngle = startAngle + sectionAngle / 2;
            let textX = center.x + (currentRadius - layerThickness / 2) * Math.cos(midAngle);
            let textY = center.y + (currentRadius - layerThickness / 2) * Math.sin(midAngle);

            let link = document.createElementNS("http://www.w3.org/2000/svg", "a");
            link.setAttributeNS("http://www.w3.org/1999/xlink", "href", layer.links[j]);

            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", textX);
            text.setAttribute("y", textY);
            text.classList.add("label-text");
            text.textContent = layer.labels[j];

            link.appendChild(text);
            svg.appendChild(link);

            startAngle += sectionAngle;
        }
    }

});