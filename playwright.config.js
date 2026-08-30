/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './test/e2e',
  testMatch: '*.spec.js',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 400, height: 700 },
    launchOptions: {
      args: ['--no-sandbox', '--disable-gpu'],
    },
  },
  webServer: {
    command: 'node test/e2e/server.js',
    port: 3456,
    reuseExistingServer: true,
    timeout: 10000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
};

module.exports = config;
