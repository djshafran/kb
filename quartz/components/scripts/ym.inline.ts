// quartz/components/scripts/ym.inline.ts
// Не экспортируйте ничего из этого файла — Quartz инлайнит его как строку
(function () {
  // Подключение тега Метрики (защита от повторной вставки)
  (function(m:any,e:any,t:any,r:any,i:any,k?:any,a?:any){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}
    m[i].l=1*new Date()
    for (var j=0;j<e.scripts.length;j++){ if (e.scripts[j].src===r){ return } }
    k=e.createElement(t), a=e.getElementsByTagName(t)[0], k.async=1, k.src=r, a.parentNode.insertBefore(k,a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

  try {
    // init один раз
    if (!(window as any).__YM_INIT__) {
      (window as any).__YM_INIT__ = true
      ;(window as any).ym(94492191, 'init', {
        webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true
      })
    }
  } catch (_) {}

  // SPA: отправляем хит на каждую навигацию Quartz
  if (!(window as any).__YM_NAV_BOUND__) {
    (window as any).__YM_NAV_BOUND__ = true
    document.addEventListener('nav', function () {
      try {
        (window as any).ym && (window as any).ym(94492191, 'hit', location.pathname + location.search)
      } catch (_) {}
    })
  }
})();
