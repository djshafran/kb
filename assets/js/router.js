import {
  apply,
  navigate,
  prefetch,
  router,
} from "https://unpkg.com/million@1.11.5/dist/router.mjs"
// #TODO: Так работает, но ругается, что не находит файл. Разбираться с ES6 буду потом
import { drawMainDiagram } from './main_diagram.js'

export const attachSPARouting = (init, rerender) => {
  // Attach SPA functions to the global Million namespace
  window.Million = {
    apply,
    navigate,
    prefetch,
    router,
  }

  const render = () => requestAnimationFrame(rerender)
  window.addEventListener("DOMContentLoaded", () => {
    apply((doc) => init(doc))
    init()
    router(".singlePage")
    render()
    drawMainDiagram()
  })
  window.addEventListener("million:navigate", render)
}
