import { defineConfig } from '@playwright/test';
import config from './playwright.config';

export default defineConfig(
    config,
    {
        /* 
        Playwright Testing service reporter is added by default.
        This will override any reporter options specified in the base playwright config.
        If you are using more reporters, please update your configuration accordingly.
        */
        reporter: [['list'], ['html', { outputFolder: './.playwright-report', open: 'never' }]],
    }
);