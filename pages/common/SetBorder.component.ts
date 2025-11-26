import { Page, Locator } from "@playwright/test";

/**
 * Highlights an element by adding a red border.
 * Works with Playwright Locator directly.
 * @param page - Playwright Page instance
 * @param locator - Playwright Locator of the element
 */
export async function setBorder(page: Page, locator: Locator): Promise<void> {
    const elementHandle = await locator.elementHandle();
    if (elementHandle) {
        await page.evaluate((el) => {
            (el as HTMLElement).style.border = "3px solid red";
            (el as HTMLElement).style.padding = "2px";
            (el as HTMLElement).style.outline = "2px dashed yellow";
            el.scrollIntoView({ behavior: "smooth", block: "center" }); // Optional: bring into view
        }, elementHandle);
    }
}