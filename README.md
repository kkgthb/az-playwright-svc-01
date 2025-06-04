# Azure/Microsoft "Playwright Testing" service demo

---

## Execution instructions

```powershell
cd e2e-worldcat-search
npm install
npm run test
```

---

## Source code

* Here is a stripped-down version of what it looks like to have to author this test by hand in Playwright _(not so bad!)_:
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
* For contrast, here is the equivalent GUI configurator in BrowserStack _(honestly, I prefer the code version myself, especially since I can easily keep it right in the same Git version-controlled codebase as my website's source code)_:
    * ![Screenshot of setting up a test in Browserstack's desktop application](/README-browserstack-define-screenshot.png)

---

## Test results screenshot

Here is a portion of Microsoft's UI.  Not bad!  Screenshots, videos, a browser Network tab looking thing accompanied by screenshots and videos with little red dots on the screenshots indicating click actions, etc.

![Screenshot of test results displayed in Microsoft Playwright "reporting" service](/README-screenshot.png)

---

## Same test, different test engines:

* [splunk-synthetic-01](https://github.com/kkgthb/splunk-synthetic-01)
* [Browserstack](https://katiekodes.com/browserstack-windows-firewall-wss/)