import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: "./src/my-e2e-tests",
    testMatch: "**/*.@(spec|test|e2e)?(.playwright).?(c|m)[jt]s?(x)",
    outputDir: "./.test-results",
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
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 13'],
            },
        },
        // // https://github.com/vikrantd1203/PW_Local/blob/f650bdc360d70d23de14cef5be2ef1cbb9217354/package.json#L9
        // // https://www.browserstack.com/docs/automate/playwright/playwright-android#Using_legacy
        // // https://www.browserstack.com/docs/automate/playwright/playwright-ios#Using_legacy
        // // Allegedly, this stuff should work as an alternative to Microsoft Playwright Testing Service, 
        // // but the docs don't match the official example, so keeping commented out for now.
        // {
        //     name: 'chrome@Samsung Galaxy S22:13@browserstack-mobile',
        //     use: {
        //         browserName: 'chromium',
        //         channel: 'chrome'
        //     }
        // },
        // {
        //     name: 'safari@iPhone 15 Pro Max:17@browserstack-mobile',
        //     use: {
        //         browserName: 'safari',
        //         channel: 'safari'
        //     }
        // }
    ],
    use: {
        trace: 'on',
        video: 'on',
        screenshot: 'on'
    }
});