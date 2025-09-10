import { QuartzComponentConstructor } from "./types"

export default (() => {
  function ScrollRevealInit() {
    return <></>
  }

  ScrollRevealInit.afterDOMLoaded = `
if (!window.ScrollReveal) return;
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

(function () {
  const EASING = 'cubic-bezier(.2,.8,.2,1)';
  const supportsClipText =
    CSS.supports?.('background-clip: text') || CSS.supports?.('-webkit-background-clip: text');

  function karaokeSetup(el) {
    if (!supportsClipText) return; // фолбэк: без клипа оставляем обычный текст
    // Берём реальный текущий цвет до того, как сделаем текст прозрачным
    const c = getComputedStyle(el).color;
    el.style.setProperty('--karaoke-color', c);

    el.style.backgroundImage = \`linear-gradient(90deg, \${c}, \${c})\`;
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = '0% 100%';          // стартовая маска (скрыто)
    el.style.backgroundClip = 'text';
    el.style.webkitBackgroundClip = 'text';
    el.style.color = 'transparent';               // текст прозрачен, виден только градиент
    el.style.transition = 'background-size 1.5s linear';
    el.style.willChange = 'background-size';
  }

  function karaokeIn(el) {
    // на всякий случай подготовим, если по какой-то причине не подготовили раньше
    if (!el.style.backgroundImage) karaokeSetup(el);
    // запускаем рост маски на следующий кадр
    requestAnimationFrame(() => {
      el.style.backgroundSize = '100% 100%';
    });
  }

  function karaokeOut(el) {
    // обратная «караоке»-анимация
    el.style.backgroundSize = '0% 100%';
  }

  function run() {
    const sr = window.ScrollReveal({
      distance: '16px',
      duration: 450,
      easing: EASING,
      viewFactor: 0.15,
      reset: true, // важно: элементы возвращаются в исходное состояние при выходе из вьюпорта
    });

    // 1) Подготовка заголовков заранее, чтобы не было «мигания»
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(karaokeSetup);

    // 2) Заголовки — только караоке без смещения/прозрачности от SR
    sr.reveal('h1, h2, h3, h4, h5, h6', {
      distance: '0px',
      opacity: 1,             // не трогаем прозрачность, иначе конфликт с нашим градиентом
      beforeReveal: karaokeIn,
      beforeReset: karaokeOut, // обратное «караоке» при уходе из вьюпорта
    });

    // 3) Параграфы — «приезжают» справа и «уезжают» обратно благодаря reset:true
    sr.reveal('p', {
      origin: 'right',
      distance: '80px',
      duration: 600,
      easing: EASING,
      reset: true, // можно убрать, если выше уже reset:true
    });
  }

  run();
  document.addEventListener('nav', run);
  window.addCleanup && window.addCleanup(() => document.removeEventListener('nav', run));
})();
  `
  return ScrollRevealInit
}) satisfies QuartzComponentConstructor
