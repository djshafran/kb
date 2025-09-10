import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    // pageTitle: "ГИПЕР·ИТ",
    pageTitle: "DDBE",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ru-RU",
    baseUrl: "giperit.ru",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      // typography: {
      //   header: { name: "Lora", weights: [400, 700], includeItalic: true },
      //   body:   { name: "Inter", weights: [300, 400, 600, 700] },
      //   code:   { name: "JetBrains Mono", weights: [400, 600] },
      // },
      // typography: {
      //   header: { name: "Inter Tight", weights: [300, 400, 600], includeItalic: false },
      //   body:   { name: "Inter",       weights: [300, 400],       includeItalic: false },
      //   code:   { name: "IBM Plex Mono", weights: [300, 400, 500] },
      // },     
      // typography: {
      //   header: { name: "Space Grotesk", weights: [300, 400, 600], includeItalic: false },
      //   // body:   { name: "Work Sans",     weights: [300, 400],       includeItalic: false },
      //   body:   { name: "JetBrains Mono",     weights: [300, 400],       includeItalic: false },
      //   code:   { name: "JetBrains Mono", weights: [300, 400, 500] },
      // },     
      typography: {
        header: { name: "Plus Jakarta Sans", weights: [300, 400, 600], includeItalic: false },
        body:   { name: "Plus Jakarta Sans", weights: [300, 400],       includeItalic: false },
        code:   { name: "JetBrains Mono",     weights: [300, 400, 500] },
      },        
      colors: {
        lightMode: {
          light: "#f8f6f3",
          lightgray: "#e8e2da",
          gray: "#6b625b",
          darkgray: "#14110f",
          dark: "#14110f",
          secondary: "#8b5d3b",
          tertiary: "#84a59d",
          highlight: "rgba(139, 93, 59, 0.12)",
          textHighlight: "#fde6c988",
        },
        darkMode: {
          light: "#0f1115",
          lightgray: "#2b2f36",
          gray: "#8a93a1",
          darkgray: "#e9e9e9",
          dark: "#e9e9e9",
          secondary: "#d1a87a",
          tertiary: "#8ab4ff",
          highlight: "rgba(209,168,122,0.15)",
          textHighlight: "#233555",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
