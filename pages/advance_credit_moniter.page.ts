import { Page, Locator, expect } from '@playwright/test';
import { SchemaSelectionComponent } from "pages/common/schema_selection.component"
import { BasePage } from './common/BasePage';
import { AdvancedPortfolioAnalysis } from './advanced_portfolio_analysis.page';

export class AdvanceCreditMonitorPage extends BasePage {
    page: Page;

    readonly schemeSelection: SchemaSelectionComponent;
    readonly advancedPortfolioAnalysis: AdvancedPortfolioAnalysis;
    readonly tab_locator = "//a[normalize-space()='%s']";

    constructor(page: Page) {
        super(page, "CreditRatingMonitor/Advance", "Advanced Credit Rating Monitor")
        this.page = page;
        this.schemeSelection = new SchemaSelectionComponent(page);
        this.advancedPortfolioAnalysis = new AdvancedPortfolioAnalysis(page);

    }
    // //export class AdvanceCreditMonitorPage {
    // page: Page;

    // constructor(page: Page) {
    //     this.page = page;
    //     // other initialization if needed
    // }

    async open() {
        {
            await super.open();
            await this.page.waitForLoadState();


        }
    }

//navigate to the issuer/isin wise section

async switchTab(tab: string) {
        const locator = this.tab_locator.replace('%s', tab);
        await this.page.click(locator);
    }

    // Type the issuer name in the search box and select the issuer from the dropdown
    async selectIssuer(issuerName: string) {
        const issuerInput = this.page.locator('//*[@id="input-2"]');
        await issuerInput.fill(issuerName);
        const dropdownOption = this.page.locator(`//li[@role="button"]//span[text()="${issuerName}"]`);
        await dropdownOption.waitFor({ state: 'visible' });
        await dropdownOption.click({ force: true });
    }

async clickFindRatingsButton() {
    const findRatingsButton = this.page.locator('#findRating');
    await expect(findRatingsButton).toBeVisible();
    await findRatingsButton.click();
}

async validateReportTables() {
    const ratingSummaryReport = this.page.locator('#DivCompanyWiseRating');

    // Wait for the report to become visible after clicking
    await expect(ratingSummaryReport).toBeVisible({ timeout: 10000 });
}


// Need to select the two fund from the selection
// async selectFund(fundName: string) {
//     const fundInput = this.page.locator('#txtSchmeFilter');
//     await fundInput.fill(fundName);
//     const dropdownOption = this.page.locator(`//a[normalize-space()=="${fundName}"]`);
//     await dropdownOption.waitFor({ state: 'visible' });
//     await dropdownOption.click({ force: true });

async selectFund(fundNames: string[]) {
    const fundInput = this.page.locator('#txtSchmeFilter');

    for (const fundName of fundNames) {
        await fundInput.fill(fundName);
        const dropdownOption = this.page.locator(`//a[normalize-space()="${fundName}"]`);
        await dropdownOption.waitFor({ state: 'visible' });
        await dropdownOption.click({ force: true });

        // Optional: wait for the selection to be registered before proceeding
        await this.page.waitForTimeout(500); // adjust as needed
    }
}

// i need to select the primary fund from the drop down 
// async selectPrimaryMutualFund(fundName: string) {
//     const primaryFundDropdown = this.page.locator('#LstPrimary');
//     await primaryFundDropdown.click();
//     const option = this.page.locator(`//option[@label="${fundName}"]`);
//     await option.click();
// }

async selectPrimaryMutualFund(fundName: string) {
    const primaryFundDropdown = this.page.locator('#LstPrimary');
    await primaryFundDropdown.selectOption({ label: fundName });
}



    // i need to type rating name then select the option from dropdown
    // async selectRatingName(ratingName: string) {
    //     const ratingNameInput = this.page.locator('#FundWiseRatingSetListForCompare_chosen');
    //     await ratingNameInput.fill(ratingName);
    //     const dropdownOption = this.page.locator(`//a[normalize-space()="${ratingName}"]`);
    //     await dropdownOption.waitFor({ state: 'visible' });
    //     await dropdownOption.click({ force: true });
    // }
async selectRatingName(ratingName: string) {
    // Step 1: Click the Chosen container to activate the dropdown
    await this.page.locator('#FundWiseRatingSetListForCompare_chosen').click();

    // Step 2: Type into the Chosen search input
    const searchInput = this.page.locator('#FundWiseRatingSetListForCompare_chosen input');
    await searchInput.fill(ratingName);

    // Step 3: Wait for and click the matching option
    const dropdownOption = this.page.locator(`//li[contains(@class, "active-result") and text()="${ratingName}"]`);
    await dropdownOption.waitFor({ state: 'visible' });
    await dropdownOption.click();
}

// i need to select the compare with peer either show market value
    async selectCompareWithPeer(option: string) {
        const compareWithPeer = this.page.locator('#btnCompareWithPeer');
        await compareWithPeer.click();
        const optionLocator = this.page.locator(`//label[contains(@class, 'btn-success') and text()="${option}"]`);
        await optionLocator.click();
    }
// i need  to click on check rating composition button
    async clickCheckRatingCompositionButton() {
        const checkRatingCompositionButton = this.page.locator('#btnFundWiseCompare');
        await checkRatingCompositionButton.click();
        await this.page.waitForLoadState('networkidle');
    // wait for the results to load
        await this.page.waitForTimeout(5000); 
    }

    // after click on check rating composition buttion - it will be generate result - in the result there is two tab -first is table view 
    // and second is graph view - i need to validate the table view data tab
    // async validateTableViewDataTab() {
    //     const tableViewTab = this.page.locator('#tabFundWiseRatTbl');
    //     await expect(tableViewTab).toBeVisible();
    //     await tableViewTab.click();
    // }

   async validateTableViewDataTab() {
    const tableViewTab = this.page.locator("//a[@id='tabFundWiseRatTbl']");

    // Wait for the tab to be attached (not necessarily visible)
    await expect(tableViewTab).toBeAttached();

    // Click to activate the tab
    await tableViewTab.click();

    // Wait for the tab content to be visible
    const table = this.page.locator("//div[@id='tabFundWiseRatTbl_Content']");
    await expect(table).toBeVisible();

    // Validate number of rows
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
}
 // Ensure table has data

 


   // after click on check rating composition buttion - it will be generate result - in the result there is two tab -first is table view
   // and second is graph view - i need to validate the graph view tab

async validateGraphViewTab() {
    const graphViewTab = this.page.locator("//a[@id='tabFundWiseRatGrp']");

    // Wait for the tab to be attached (not necessarily visible)
    await expect(graphViewTab).toBeAttached();

    // Click to activate the tab
    await graphViewTab.click();

    // Wait for the graph container to be visible
    const graphContainer = this.page.locator("//div[@id='tabFundWiseRatGrp_Content']");
    await expect(graphContainer).toBeVisible();
}

    async portfoliomonthselect_credit(periods: string[]) {
    const tableLocator = this.page.locator("//*[@id='divMultiFundWisePortDate']/div/button[text()='Select Portfolio Month']");
    await expect(tableLocator).toBeVisible();
    await tableLocator.click();
    const option_selector = "//ul//*[text()='%s']";
    for (const period of periods) {
      const periodLocator = this.page.locator(option_selector.replace('%s', period));
      await periodLocator.click();
    }
     await this.page.mouse.click(0, 0);
  }

  // i need to Select Portfolio Frequency monthly/Fortnightly
                                                                

async selectFrequency(frequency: string) {
    const frequencyOption = this.page.locator(`label:has-text("${frequency}")`);
    await frequencyOption.click();
}




  }


