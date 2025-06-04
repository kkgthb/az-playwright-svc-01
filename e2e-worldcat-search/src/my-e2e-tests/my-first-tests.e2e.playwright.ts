import { test, expect, type Page } from "@playwright/test";
const url_to_visit = `https://search.worldcat.org/search?q=Katie&itemSubType=book-printbook&limit=10&offset=21&itemSubTypeModified=book-printbook`;

test('Worldcat search works', async ({ page }, testInfo) => {

    // Action
    await test.step('Open search results, filtered and on results page 3', async () => {
        await page.goto(url_to_visit);
    });

    // Action
    await test.step('Reject cookies', async () => {
        await page.getByLabel(/^Cookie banner$/).screenshot({ path: testInfo.outputPath('cookie-banner.png') }); // Just for fun
        await page.getByRole('button', { name: 'Reject unnecessary cookies' }).click();
    });

    // Validation
    await test.step('Validate that we are on page 3', async () => {
        await expect(page.getByLabel(/^page 3$/)).toHaveText(`3`);
    })

    // Validation
    await test.step('Validate that there are 10 search results (because we paginated at 10 and searched a common word)', async () => {
        await expect(page.getByTestId(/^search-result-item-/)).toHaveCount(10);
    })

    // Action
    await test.step('Clear filter', async () => {
        await page.getByTestId('facet-container-format-reset-button').click();
    })

    // Validation
    await test.step('Validate that we are on page 1', async () => {
        await expect(page.getByLabel(/^page 1$/)).toHaveText(`1`);
    })

    // Validation
    await test.step('Validate that there are also 10 search results now', async () => {
        await expect(page.getByTestId(/^search-result-item-/)).toHaveCount(10);
    })
});