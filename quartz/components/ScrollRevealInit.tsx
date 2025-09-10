import { QuartzComponentConstructor } from "./types"

export default (() => {
  function ScrollRevealInit() {
    return <></>
  }

  ScrollRevealInit.afterDOMLoaded = `
    if (!window.ScrollReveal) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function karaoke(el) {
      el.style.backgroundImage = 'linear-gradient(90deg, currentColor, currentColor)';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundSize = '0% 100%';
      el.style.backgroundClip = 'text';
      el.style.webkitBackgroundClip = 'text';
      el.style.color = 'transparent';
      el.style.transition = 'background-size 1.5s linear';
      requestAnimationFrame(() => {
        el.style.backgroundSize = '100% 100%';
      });
    }

    function run() {
      const sr = window.ScrollReveal({ distance: '16px', duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)', viewFactor: 0.15, reset: false });

      sr.reveal('h1, h2, h3, h4, h5, h6', {
        distance: '0px',
        opacity: 1,
        beforeReveal: karaoke
      });

      sr.reveal('p', {
        origin: 'right',
        distance: '80px',
        duration: 600,
        easing: 'cubic-bezier(.2,.8,.2,1)'
      });
    }

    run();
    document.addEventListener('nav', run);
    window.addCleanup && window.addCleanup(() => document.removeEventListener('nav', run));
  `
  return ScrollRevealInit
}) satisfies QuartzComponentConstructor
