import { QuartzComponentConstructor } from "./types"

export default (() => {
  function ScrollRevealInit() {
    return <></>
  }

  ScrollRevealInit.afterDOMLoaded = `
    if (!window.ScrollReveal) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function run() {
      const sr = window.ScrollReveal({ distance: '16px', duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)', viewFactor: 0.15, reset: false });
      sr.reveal('h1, h2, h3, h4, h5, h6, p');
    }

    run();
    document.addEventListener('nav', run);
    window.addCleanup && window.addCleanup(() => document.removeEventListener('nav', run));
  `
  return ScrollRevealInit
}) satisfies QuartzComponentConstructor

