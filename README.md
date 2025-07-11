# Azure/Microsoft "Playwright Testing" service demo

---

## Execution instructions

### On Azure, if you have it set up

```powershell
# Get into the right folder
cd e2e-worldcat-search

# Install the Node.js packages from this codebase onto your computer
npm install

# Run Playwright on Azure
npm run test

# Viewing results:  see your CLI output for the Azure link
```

### On your local computer

```powershell
# Get into the right folder
cd e2e-worldcat-search

# Install the Node.js packages from this codebase onto your computer
npm install

# Run Playwright on your own computer
npm run test-local

# Viewing results:  here is an example of opening the "trace"
npx playwright show-trace .\.test-results\my-first-tests.e2e.playwright.ts-Worldcat-search-works-chromium\trace.zip
```

---

## Source code

* Here is a stripped-down version of what it looks like to have to author this test by hand in Playwright _(not so bad -- especially since I let [the VSCode plugin](https://playwright.dev/docs/codegen) do all of the hard work of recording my actions in the browser for starters, and then just cleaned it up to match my stylistic preferences!)_:
    * _([Full code here](/e2e-worldcat-search/src/my-e2e-tests/my-first-tests.e2e.playwright.ts))_; snippet below:
        ```typescript
        import { test, expect, type Page } from "@playwright/test";
        const url_to_visit = `https://search.worldcat.org/search?q=Katie&itemSubType=book-printbook&limit=10&offset=21&itemSubTypeModified=book-printbook`;

        test('Worldcat search works', async ({ page }, testInfo) => {

            // Action
            await test.step('Open search results, filtered and on results page 3', async () => {
                await page.goto(url_to_visit);
            });

            // Action
            await test.step('Reject cookies', async () => {
                await page.getByRole('button', { name: 'Reject unnecessary cookies' }).click();
            });

            // Validation
            await test.step('Validate that we are on page 3', async () => {
                await expect(page.getByLabel(/^page 3$/)).toHaveText(`3`);
            })

            // Action
            await test.step('Clear filter', async () => {
                await page.getByTestId('facet-container-format-reset-button').click();
            })

            // Validation
            await test.step('Validate that we are on page 1', async () => {
                await expect(page.getByLabel(/^page 1$/)).toHaveText(`1`);
            })

        });
        ```
* For contrast, here is a screenshot of the equivalent GUI configurator in BrowserStack:
    * ![Screenshot of setting up a test in Browserstack's desktop application](/README-browserstack-define-screenshot.png)
    * Honestly, I prefer the code-heavier Playwright version myself, especially since:
        * I can easily keep it right in the same Git version-controlled codebase as my website's source code.
        * I can pull in secrets and variables for test variants from Azure App Configuration or Azure Key Vault or a database instead of having to data-load them all into, and trust, BrowserStack's secrets store.
        * I don't need to deal with a dedicated standalone desktop application _(although I did need to have Node.js installed onto my computer to run the tests on my computer, and I did need a VSCode plugin to help me write the tests)_.

---

## Test results screenshot

Here is a portion of Microsoft's UI.  Not bad!  Screenshots, videos, a browser Network tab looking thing accompanied by screenshots and videos with little red dots on the screenshots indicating click actions, etc.

![Screenshot of test results displayed in Microsoft Playwright "reporting" service](/README-screenshot.png)

_(Note:  Playwright, out of the box, also includes all of that when run locally on your machine.  See execution instructions up top.)_

![Screenshot of test result "trace" displayed in plain-old Node.js on my local desktop after a local test run](/README-desktop-trace-screenshot.png)

---

## Same test, different test engines:

* [splunk-synthetic-01](https://github.com/kkgthb/splunk-synthetic-01)
* [Browserstack](https://katiekodes.com/browserstack-windows-firewall-wss/)