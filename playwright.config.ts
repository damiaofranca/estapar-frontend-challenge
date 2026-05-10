import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig, devices } from "@playwright/test"

const repoRoot = path.dirname(fileURLToPath(import.meta.url))
const distIndexHtml = path.join(repoRoot, "dist", "index.html")
const hasProductionBuild = fs.existsSync(distIndexHtml)
const forcePlaywrightBuild = Boolean(process.env.PLAYWRIGHT_FORCE_BUILD)
const isCi = Boolean(process.env.CI)

/** CI e builds forçados sempre rodam `yarn build`. Localmente, se `dist/` existir, só sobe o preview (mais rápido). */
const webServerCommand =
  isCi || forcePlaywrightBuild || !hasProductionBuild
    ? "yarn build && yarn vite preview --host 127.0.0.1 --port 4173 --strictPort"
    : "yarn vite preview --host 127.0.0.1 --port 4173 --strictPort"

const webServerTimeoutMs =
  isCi || forcePlaywrightBuild || !hasProductionBuild ? 180_000 : 60_000

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: webServerTimeoutMs,
    env: {
      ...process.env,
      VITE_API_URL: "http://127.0.0.1:59999",
    },
  },
})
