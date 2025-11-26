import { Page } from "playwright";
export async function resetwebsiteState(page: Page) {
  await page.goto('https://mfi360-uat.icraanalytics.co.in:8443/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
}
