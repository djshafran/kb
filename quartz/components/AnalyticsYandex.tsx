// quartz/components/AnalyticsYandex.tsx
import type { QuartzComponentConstructor, QuartzComponentProps, StringResource } from "./types"
// @ts-ignore: inline bundle → импорт даёт СТРОКУ скрипта
import ymScript from "./scripts/ym.inline"

export default (() => {
  function AnalyticsYandex(_props: QuartzComponentProps) {
    // noscript-пиксель в <body>
    return (
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/94492191" style="position:absolute; left:-9999px;" alt="" />
        </div>
      </noscript>
    )
  }
  // скрипт загрузится ДО того, как DOM готов (в <head>)
  AnalyticsYandex.beforeDOMLoaded = ymScript as StringResource
  return AnalyticsYandex
}) satisfies QuartzComponentConstructor
