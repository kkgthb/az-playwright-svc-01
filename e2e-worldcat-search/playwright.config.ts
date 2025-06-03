import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: "./src/my-e2e-tests",
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
});