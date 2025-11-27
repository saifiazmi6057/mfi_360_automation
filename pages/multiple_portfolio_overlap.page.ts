import { Locator, Page } from "playwright";
import { BasePage } from "./common/BasePage";
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { setBorder } from "utils/util";
import { FundDashboardPage } from "./fund_dashboard.page";
import { expect } from "playwright/test";

export class MultiplePorfolioOverlap extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    readonly tableSelector: string;
    readonly fundDashboardPage: FundDashboardPage;
    private fund_name: string = '//td[contains(normalize-space(.), "${name}")]';

    private readonly fundCheckboxSelector = "//td[contains(text(),'%s')]/../td//input[@type='checkbox']";
    private readonly compareButtonSelector = '//button[normalize-space()="Compare"]';
    

    private mutualFundDropdown: string = "//select[@name='AMCSelected']";
    private categoryDropdown: string = "//select[@name='CategorySelected']";
    private subCategoryDropdown: string = "//select[@name='SubCategorySelected']";



    constructor(page: Page) {
        super(page, "/Portfolio/MultiplePortfolio", "Multiple Portfolio Overlap")
        this.schemaSelection = new SchemaSelectionComponent(page);
        this.tableSelector = "//table[@class='table table-bordered compare']";
        this.fundDashboardPage = new FundDashboardPage(page);

    }

    async highlight(selector: string) {
      const el = this.page.locator(selector);
      await el.evaluate((node)=>{
        node.style.border = '3px solid red';
        node.style.borderRadius = '8px';
      })
    }



    async validateFundPresent(fund_names: string[]) {
        for (const name of fund_names) {
            // Wait for table to be visible first
            await this.page.waitForSelector(this.tableSelector);

            // Create a more specific locator within the table
            const locator = this.page.locator(`${this.tableSelector}//td[contains(text(), "${name}")]`);


            // Wait for the element and verify it's visible
            await expect(locator).toBeVisible({ timeout: 10000 });
            await this.highlight(`${this.tableSelector}//td[contains(text(), "${name}")]`);

            // Optional: Verify the exact text content
            const text = await locator.textContent();
            if (!text?.includes(name)) {
                throw new Error(`Fund "${name}" not found in table. Found text: "${text}"`);
            }
        }
    }

    async selectFundsForComparison(fundNames: string[]) {
        for (const fundName of fundNames) {
            // Wait for the fund row to be visible
            const checkboxLocator = this.page.locator(
                this.fundCheckboxSelector.replace('%s', fundName)
            );
            await checkboxLocator.waitFor({ state: 'visible', timeout: 30000 });
            await this.highlight(this.fundCheckboxSelector.replace('%s', fundName));

            // Click the checkbox
            await checkboxLocator.click();

            // Verify the checkbox is checked
            await expect(checkboxLocator).toBeChecked();
        }
    }
    

   

    async selectMutualFund(fundName: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const mutualFundDropdown = this.page.locator(this.mutualFundDropdown);
        await this.highlight(this.mutualFundDropdown);
        await mutualFundDropdown.selectOption(fundName);
    }

    async selectCategory(category: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const categoryDropdown = this.page.locator(this.categoryDropdown);
        await this.highlight(this.categoryDropdown);
        await categoryDropdown.selectOption(category);
    }

    async selectSubCategory(subCategory: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const subCategoryDropdown = this.page.locator(this.subCategoryDropdown);
        await this.highlight(this.subCategoryDropdown);
        await subCategoryDropdown.selectOption(subCategory);
    }

    async selectFund(fundName: string) {
        const fundInput = this.page.locator('//input[@ng-model="$mdAutocompleteCtrl.scope.searchText"]');
        await fundInput.click();
        await fundInput.fill(fundName); 

        // Wait for the dropdown options to appear
        const option = this.page.locator(`//span[@title='${fundName}']`);
        await this.highlight(`//span[@title='${fundName}']`);
        await option.waitFor({ state: 'visible' });
        // need to select from the dropdown
        await option.click({force: true});

    }
    // I need click on add button method here
    async ClickOnAddButton(): Promise<void> {
        const addButton = this.page.locator("//button[normalize-space()='Add']");
        await this.highlight("//button[normalize-space()='Add']");
        await addButton.click();
    }

     async clickOnCompareAndWaitForResults(){
        const compareButton = this.page.locator(this.compareButtonSelector);
        await compareButton.click({ force: true });
        await expect(this.page.locator(this.tableSelector)).toBeVisible({ timeout : 60000});
        await this.highlight(this.tableSelector);
       
    }

    //i need to add refresh/load the page here

    async refreshPage() {
        await this.page.reload();
        await this.page.waitForLoadState('load');
    }


 
async selectFundAndVerifyTable(fundName: string) {
  const fundDropdown = this.page.locator("#cstmslct");
  const table = this.page.locator("#smTble");
  const tableRows = this.page.locator("#smTble tbody tr");

  console.log(`Selecting fund: ${fundName}`);

  // Ensure dropdown is visible
  await expect(fundDropdown).toBeVisible({ timeout: 10000 });
  await this.highlight("#cstmslct");

  // Handle navigation if selectOption triggers reload
  await Promise.all([
    this.page.waitForLoadState("domcontentloaded"),
    fundDropdown.selectOption({ label: fundName }),
  ]);

  console.log("Waiting for table to appear...");
  await this.page.waitForSelector("#smTble", { timeout: 60000 });
  await this.highlight("#smTble");

  // Wait for rows to load
  try {
    await this.page.waitForSelector("#smTble tbody tr", { timeout: 60000 });
  } catch (error) {
    if (this.page.isClosed()) {
      throw new Error("Page was closed during waitForSelector.");
    }
    throw new Error(`Table rows did not appear within timeout. Error: ${error}`);
  }

  const rowCount = await tableRows.count();
  console.log(`Total rows found: ${rowCount}`);

  if (rowCount === 0) {
    const tableHTML = await table.innerHTML();
    console.error("Table is visible but contains no rows. HTML dump:");
    console.error(tableHTML);
    throw new Error("Table is visible but contains no rows.");
  }

  expect(rowCount).toBeGreaterThan(0);

  for (let i = 0; i < rowCount; i++) {
    const row = tableRows.nth(i);
    const cellCount = await row.locator("td").count();
    console.log(`Row ${i + 1} has ${cellCount} cells`);
    expect(cellCount).toBeGreaterThan(1);
  }
}


async selectAllFundsAndDeleteWithConfirmation() {
  // Step 1: Wait for the table to be visible
  await this.page.waitForSelector("//table[@class='table table-bordered compare']");

  // Step 2: Select all checkboxes in the table body
  const fundCheckboxes = this.page.locator("//tbody//input[@type='checkbox' and @ng-model='x.IsSelected']");
  const count = await fundCheckboxes.count();
  console.log(`Total funds found: ${count}`);

  for (let i = 0; i < count; i++) {
    await fundCheckboxes.nth(i).check();
    console.log(`Selected fund ${i + 1}`);
  }

  // Step 3: Click the Delete button at the bottom
  const deleteButton = this.page.locator("//button[@class='btn btn-danger' and @ng-click='DeleteAllFund()']");
  await deleteButton.click();
  console.log("Clicked Delete button");

  // Step 4: Handle confirmation dialog (Yes/No)
  const confirmButton = this.page.locator("//button[text()='Yes']");
  await confirmButton.click();
  console.log("Confirmed deletion");


}
async reloadpage() {
  await this.page.reload();
  await this.page.waitForLoadState('load');

}
}
