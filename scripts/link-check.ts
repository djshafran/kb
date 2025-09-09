import { spawn } from "node:child_process"

async function startQuartz() {
  const proc = spawn("npx", ["quartz", "build", "--serve"], {
    stdio: ["ignore", "pipe", "pipe"],
  })

  proc.stdout.setEncoding("utf-8")
  proc.stderr.setEncoding("utf-8")

  await new Promise<void>((resolve, reject) => {
    const onData = (data: string) => {
      process.stdout.write(data)
      if (data.includes("Started a Quartz server")) {
        proc.stdout.off("data", onData)
        resolve()
      }
    }
    proc.stdout.on("data", onData)
    proc.stderr.on("data", (d) => process.stderr.write(d))
    proc.once("error", reject)
    proc.once("exit", (code) => reject(new Error(`quartz exited with code ${code}`)))
  })

  return proc
}

async function crawl(base: string) {
  const visited = new Set<string>()
  const broken: Array<{ url: string; status: number }> = []

  async function visit(url: string): Promise<void> {
    if (visited.has(url)) return
    visited.add(url)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        broken.push({ url, status: res.status })
        return
      }
      const html = await res.text()
      const regex = /href="(.*?)"/g
      let match: RegExpExecArray | null
      while ((match = regex.exec(html)) !== null) {
        const href = match[1]
        if (
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("javascript:")
        ) {
          continue
        }
        const resolved = new URL(href, url).href
        if (resolved.startsWith(base)) {
          await visit(resolved)
        }
      }
    } catch {
      broken.push({ url, status: -1 })
    }
  }

  await visit(base)
  return broken
}

async function main() {
  const proc = await startQuartz()
  const base = "http://localhost:8080/"
  const broken = await crawl(base)
  proc.kill()

  if (broken.length > 0) {
    console.error("Broken links found:")
    for (const b of broken) {
      console.error(`${b.url} => ${b.status}`)
    }
    process.exit(1)
  } else {
    console.log("No broken links found.")
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
