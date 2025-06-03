import { test, expect, type Page } from "@playwright/test";
const url_to_visit = `https://search.worldcat.org/search?q=Katie&itemSubType=book-printbook&limit=10&offset=21&itemSubTypeModified=book-printbook`;

test.describe.configure({ mode: 'serial' });
let page: Page;

test.describe('Worldcat search works', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    })

    test('Load the page, reject cookies, and validate the site title', async () => {
        await page.goto(url_to_visit);
        await page.getByRole('button', { name: 'Reject unnecessary cookies' }).click();
        await expect(page).toHaveTitle(/^Katie - Search Results$/);
    });

    test('Validate that we are on page 3', async () => {
        await expect(page.getByLabel(/^page 3$/)).toHaveText(`3`);
    })

    test('Validate that there are 10 search results (because we paginated at 10 and searched a common word)', async () => {
        await expect(page.getByTestId(/^search-result-item-/)).toHaveCount(10);
    })

    test('Clear filter and validate that we are on page 1', async () => {
        await page.getByTestId('facet-container-format-reset-button').click();
        await expect(page.getByLabel(/^page 1$/)).toHaveText(`1`);
    })

    test('Validate that there are also 10 search results now', async () => {
        await expect(page.getByTestId(/^search-result-item-/)).toHaveCount(10);
    })

    test.afterAll(async () => {
        await page.close();
    });

});