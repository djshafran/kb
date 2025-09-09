// quartz/components/scripts/main_diagram.inline.ts
// ВНИМАНИЕ: НЕ экспортируйте ничего из этого файла.
// Quartz инлайнит этот файл как строку и запускает после загрузки DOM.

(function () {
  // простая защита от двойного запуска
  if ((window as any).__MAIN_DIAGRAM_INIT__) return
  ;(window as any).__MAIN_DIAGRAM_INIT__ = true

  const SVG_NS = "http://www.w3.org/2000/svg"
  const XLINK_NS = "http://www.w3.org/1999/xlink"

  function polar(cx: number, cy: number, r: number, a: number) {
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  function render() {
    const svg = document.getElementById("main_diagram") as SVGSVGElement | null
    if (!svg) return

    // viewBox по умолчанию, если не задан
    const vb = svg.viewBox?.baseVal
    if (!vb || vb.width === 0 || vb.height === 0) {
      const size = Math.max(svg.clientWidth || 0, svg.clientHeight || 0, 1200)
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`)
    }

    // очистка предыдущего рендера
    svg.querySelector("g.main-diagram__content")?.remove()
    const root = document.createElementNS(SVG_NS, "g")
    root.setAttribute("class", "main-diagram__content")
    svg.appendChild(root)

    const base = svg.viewBox.baseVal
    const cx = base.width / 2
    const cy = base.height / 2
    const radius = Math.min(cx, cy)

    const layers = [
      { parts: 2, colors: ["#AF6420", "#549695"], labels: [" Dev | CapEx", " Ops | OpEx"], links: ["/", "/"] },
      { parts: 4, colors: ["#392D75", "#E59F13", "#9FC713", "#0E759F"], labels: [" Распределение", " Производство", " Обмен", " Потребление"], links: ["/", "/", "/", "/"] },
      {
        parts: 12,
        colors: ["#602980", "#9C1A55", "#C12020", "#D75020", "#FA9C20", "#FFCC20", "#FFEA20", "#80BE00", "#12A050", "#1E72B0", "#0150A0", "#342D90"],
        labels: ["📝 Формализация", "📐 Проектирование", "📅 Планирование", "⌨️ Кодирование", "🔧 Сборка", "🐞 Испытания", "🚀 Выпуск", "🚚 Поставка", "🖥️ Мониторинг", "🤖 Эксплуатация", "📚 Обучение", "✍️ Отзывы"],
        links: [
          "https://petaflops.guru/12_шагов/formalizatsiya",
          "https://petaflops.guru/12_шагов/proektirovanie",
          "https://petaflops.guru/12_шагов/planirovanie",
          "https://petaflops.guru/12_шагов/codirovanie",
          "https://petaflops.guru/12_шагов/sborka",
          "https://petaflops.guru/12_шагов/ispitaniya",
          "https://petaflops.guru/12_шагов/vipusk",
          "https://petaflops.guru/12_шагов/postavka",
          "https://petaflops.guru/12_шагов/monitoring",
          "https://petaflops.guru/12_шагов/ekspluatatsiya",
          "https://petaflops.guru/12_шагов/obuchenie",
          "https://petaflops.guru/12_шагов/otzivi",
        ],
      },
      { parts: 6, colors: ["#7C4087", "#D63420", "#FFB71F", "#FFD710", "#149C78", "#1B3CA4"], labels: ["📌 Задачи", "🕒 Сроки", "🚦 Качество", "🔄 Обновления", "🎖️ Реагирование", "🌟 Перспективы"], links: ["/", "/", "/", "/", "/", "/"] },
      { parts: 3, colors: ["#602980", "#FA9C20", "#1E72B0"], labels: ["📉 Дешевле", "💎 Лучше", "🏆 Быстрее"], links: ["/", "/", "/"] },
    ] as const

    const layerThickness = radius / layers.length
    const startAngle = -Math.PI / 2

    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i]
      const sectionAngle = (Math.PI * 2) / layer.parts
      const currentRadius = radius - i * layerThickness
      const innerRadius = Math.max(currentRadius - layerThickness, 0)

      for (let j = 0; j < layer.parts; j++) {
        const s = startAngle + j * sectionAngle
        const e = s + sectionAngle

        const outerStart = polar(cx, cy, currentRadius, s)
        const outerEnd   = polar(cx, cy, currentRadius, e)
        const innerStart = polar(cx, cy, innerRadius, s)
        const innerEnd   = polar(cx, cy, innerRadius, e)

        const d = [
          "M", outerStart.x, outerStart.y,
          "A", currentRadius, currentRadius, 0, +(sectionAngle > Math.PI), 1, outerEnd.x, outerEnd.y,
          "L", innerEnd.x, innerEnd.y,
          "A", innerRadius, innerRadius, 0, +(sectionAngle > Math.PI), 0, innerStart.x, innerStart.y,
          "Z",
        ].join(" ")

        const path = document.createElementNS(SVG_NS, "path")
        path.setAttribute("d", d)
        path.setAttribute("fill", layer.colors[j % layer.colors.length])
        root.appendChild(path)

        const mid = startAngle + sectionAngle * (j + 0.5)
        const textX = cx + (currentRadius - layerThickness / 2) * Math.cos(mid)
        const textY = cy + (currentRadius - layerThickness / 2) * Math.sin(mid)

        const link = document.createElementNS(SVG_NS, "a")
        const href = layer.links[j % layer.links.length]
        link.setAttribute("href", href)
        link.setAttributeNS(XLINK_NS, "xlink:href", href)

        const raw = layer.labels[j] ?? ""
        const [emoji, ...rest] = raw.split(" ")
        const label = rest.join(" ")

        const textIcon = document.createElementNS(SVG_NS, "text")
        textIcon.setAttribute("x", String(textX))
        textIcon.setAttribute("y", String(textY - 15))
        textIcon.setAttribute("text-anchor", "middle")
        textIcon.classList.add("label-icon")
        textIcon.textContent = emoji || ""

        const textLabel = document.createElementNS(SVG_NS, "text")
        textLabel.setAttribute("x", String(textX))
        textLabel.setAttribute("y", String(textY + 15))
        textLabel.setAttribute("text-anchor", "middle")
        textLabel.classList.add("label-text")
        textLabel.textContent = label

        link.appendChild(textIcon)
        link.appendChild(textLabel)
        root.appendChild(link)
      }
    }
  }

  // первый рендер (если на текущей странице есть #main_diagram)
  render()

  // на каждую SPA-навигацию Quartz
  document.addEventListener("nav", render)
  ;(window as any).addCleanup?.(() => document.removeEventListener("nav", render))
})()
