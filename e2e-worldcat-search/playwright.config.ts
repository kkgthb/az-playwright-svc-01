import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: "./src/my-e2e-tests",
    testMatch: "**/*.@(spec|test|e2e)?(.playwright).?(c|m)[jt]s?(x)",
    fullyParallel: true,
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
    use: {
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'on'
    }
});