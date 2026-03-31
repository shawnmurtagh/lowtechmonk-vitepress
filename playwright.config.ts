import { defineConfig } from '@playwright/test'

const port = 4173

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: {
      width: 1440,
      height: 1600,
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npm run docs:dev -- --host 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
