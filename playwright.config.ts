import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup.ts/setup.ts'),
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  snapshotDir: "images",

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright']
  ],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 60000,
    actionTimeout: 60000,
    baseURL: "https://mfi360-uat.icraanalytics.co.in:8443",
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        launchOptions: {
          args: ["--start-maximized"]
        },
        viewport: null
      },
      metadata: {
        username: "user@testing.com",
        password: "Charli@123"
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['Desktop Firefox']
    //   },
    //   metadata: {
    //     username: "user@testing.com",
    //     password: "Charli@123"
    //   }
    //},
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  
});