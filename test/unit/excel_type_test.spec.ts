import { Reportbuilder } from "@pages/report_builder.page";
import { Login } from "@pages/login-page";
import { Page,test } from "@playwright/test";
import { getPeriodsPerRow } from "@utils/excelPeriod";
import * as path from "path";

let page: Page;
let reportbuilder: Reportbuilder;
test.beforeAll(async ({ browser }, testInfo) => {
    test.setTimeout(60000);
    page = await browser.newPage();
    await page.setViewportSize({ width: 1366, height: 786 });//(1366x768)
    const login = new Login(page, testInfo);
    await login.login();

    reportbuilder = new Reportbuilder(page);
});

const file = path.join(__dirname, "../data/Performance-08 Oct 25.xlsx");

test("select periods found in each row", async ({ page }) => {
    await reportbuilder.open();

  
    await reportbuilder.switchTab("Returns");
    await reportbuilder.selectSettingSet("abs");
  // get all rows' detected periods
  const rowsPeriods = getPeriodsPerRow(file, "Sheet1");

  //await page.goto("https://mfi360-uat.icraanalytics.co.in:8443/");

  // Example: loop each data row, then loop periods for that row
  for (const [rowStr, periods] of Object.entries(rowsPeriods)) {
    const rowNumber = Number(rowStr);
    console.log(`Row ${rowNumber} -> periods:`, periods);

    // if no period found, skip
    if (!periods || periods.length === 0) continue;

    for (const period of periods) {
      // wait for dropdown or control to be available
      // need to click on period then select the dropdown
      const selectperiod= page.getByRole("button", { name: "Select Period" });
      await selectperiod.click();

      const dropdown = page.locator("//ul[@class='dropdown-menu dropdown-menu-form ng-scope']"); // adapt selector
      await dropdown.waitFor({ state: "visible", timeout: 5000 }).catch(() => { /* ignore */ });

      // Try selecting by label first, fallback to clicking option by text
      try {
        await dropdown.selectOption({ label: period });
      } catch {
        // fallback: try to click option text (works for custom dropdowns)
        const option = page.getByRole("option", { name: period });
        if (await option.count() > 0) {
          await option.click();
        } else {
          // another fallback: try clicking any element that has the text
          const any = page.getByText(period, { exact: false });
          if (await any.count() > 0) await any.first().click();
          else console.warn(`Could not locate option for period: "${period}"`);
        }
      }

      // optionally wait after selection before asserting / moving on
      await page.waitForTimeout(300); // small throttle
    }

    // optional: do something for each row (save, add, assert)
    // await page.click("#addButton");
  }
});