// quartz/components/MainDiagramLoader.tsx
import type { QuartzComponentConstructor, QuartzComponentProps, StringResource } from "./types"
// @ts-ignore: inline bundle — этот импорт даёт СТРОКУ (инлайн-скрипт), не функцию
import mainDiagramScript from "./scripts/main_diagram.inline"

export default (() => {
  const Loader = (_props: QuartzComponentProps) => <></>
  Loader.afterDOMLoaded = mainDiagramScript as StringResource
  return Loader
}) satisfies QuartzComponentConstructor
