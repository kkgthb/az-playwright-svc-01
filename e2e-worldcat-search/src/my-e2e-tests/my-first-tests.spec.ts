import { test, expect } from "@playwright/test";
const url_to_visit = `https://search.worldcat.org/search?q=automation&itemSubType=book-printbook&limit=10&offset=21&itemSubTypeModified=book-printbook`;

test("Has correct phrase in title", async ({ page }) => {
    await page.goto(url_to_visit);
    await expect(page).toHaveTitle(/^automation - Search Results$/);
});