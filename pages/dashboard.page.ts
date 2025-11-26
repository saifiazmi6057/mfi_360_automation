import { Page, Locator, expect } from '@playwright/test';
import { SchemaSelectionComponent } from "pages/common/schema_selection.component";
import { BasePage } from './common/BasePage';
import { setBorder } from 'utils/util';
export class Dashboard extends BasePage {
  page: Page;
  path: string = "/UserDashboard/Details";
  schemaSelection: SchemaSelectionComponent;

  readonly AgeingAnalysis: Locator;
  readonly NFOUpdate: Locator;
  readonly Macros: Locator;
  readonly Resources: Locator;
  readonly IndustryAsset: Locator;
  readonly TransactionTrends: Locator;
  readonly SchemeNameChangeDetails: Locator;
  readonly SIPCalculator: Locator;
  readonly STPCalculator: Locator;
  readonly SWPCalculator: Locator;
  readonly RetirementCalculator: Locator;
  readonly PortfolioScanner: Locator;
  readonly AdvancedPortfolioScanner: Locator;
  readonly FundSizeChangeOverNAV: Locator;
  readonly ReportBuilder: Locator;
  readonly QueryBuilder: Locator;
  readonly DataStatus: Locator;
  readonly CustomReport: Locator;
  readonly FundDashboard: Locator;
  readonly ReturnAnalysis: Locator;
  readonly AdvancedReturnAnalysis: Locator;
  readonly IndexPerformanceAnalysis: Locator;
  readonly NetAssetValueNAV: Locator;
  readonly LumpsumPerformance: Locator;
  readonly RiskReturnMatrix: Locator;
  readonly StatisticalComprehensive: Locator;
  readonly FundFactSheet: Locator;
  readonly ISINLookUp: Locator;
  readonly DataCentre: Locator;
  readonly AssetWatch: Locator;
  readonly GeographicDistribution: Locator;
  readonly AMCFinancials: Locator;
  readonly FundManagerDashboard: Locator;

  //lower section widgets locators for validation
   readonly Performance: Locator;
   readonly Portfolio: Locator;
   readonly Industry: Locator;
   readonly Tools: Locator;


  readonly categoryTableRows: Locator;
  readonly etfResultsTableRows: Locator;
  readonly showMoreButton: Locator;


  constructor(page: Page) {
    super(page, "/UserDashboard/Details");
    this.page = page;
    this.schemaSelection = new SchemaSelectionComponent(page);
    this.AgeingAnalysis = page.locator("(//h4[contains(text(),'Ageing Analysis')])[2]");
    this.NFOUpdate = page.locator("(//h4[contains(text(),'NFO Update')])[2]");
    this.Macros = page.locator("(//h4[contains(text(),'Macros')])[2]");
    this.Resources = page.locator("(//h4[contains(text(),'Resources')])[2]");
    this.IndustryAsset = page.locator("(//h4[contains(text(),'Industry Asset')])[2]");
    this.TransactionTrends = page.locator("(//h4[contains(text(),'Transaction Trends')])[2]");
    this.SchemeNameChangeDetails = page.locator("(//h4[contains(text(),'Scheme Name Change Details')])[2]");
    this.SIPCalculator = page.locator("(//h4[contains(text(),'SIP Calculator')])[2]");
    this.STPCalculator = page.locator("(//h4[contains(text(),'STP Calculator')])[2]");
    this.SWPCalculator = page.locator("(//h4[contains(text(),'SWP Calculator')])[2]");
    this.RetirementCalculator = page.locator("(//h4[contains(text(),'Retirement Calculator')])[2]");
    //this.PortfolioScanner = page.locator("(//h4[contains(text(),'Portfolio Scanner')])[2]");
    this.AdvancedPortfolioScanner = page.locator("(//h4[contains(text(),'Advanced Portfolio Scanner')])[2]");
    this.FundSizeChangeOverNAV = page.locator("(//h4[contains(text(),'Fund Size Change Over NAV')])[2]");
    this.ReportBuilder = page.locator("(//h4[contains(text(),'Report Builder')])[2]");
    this.QueryBuilder = page.locator("(//h4[contains(text(),'Query Builder')])[2]");
    this.DataStatus = page.locator("(//h4[contains(text(),'Data Status')])[2]");
    this.CustomReport = page.locator("(//h4[contains(text(),'Custom Report')])[2]");
    this.FundDashboard = page.locator("(//h4[contains(text(),'Fund Dashboard')])[1]");
    this.ReturnAnalysis = page.locator("(//h4[contains(text(),'Return Analysis')])[2]");
    this.AdvancedReturnAnalysis = page.locator("(//h4[contains(text(),'Advanced Return Analysis')])[2]");
    this.IndexPerformanceAnalysis = page.locator("(//h4[contains(text(),'Index Performance Analysis')])[2]");
    this.NetAssetValueNAV = page.locator("(//h4[contains(text(),'Net Asset Value (NAV)')])[2]");
    this.LumpsumPerformance = page.locator("(//h4[contains(text(),'Lumpsum Performance')])[2]");
    this.RiskReturnMatrix = page.locator("(//h4[contains(text(),'Risk Return Matrix')])[2]");
    this.StatisticalComprehensive = page.locator("(//h4[contains(text(),'Statistical Comprehensive')])[2]");
    this.FundFactSheet = page.locator("(//h4[contains(text(),'Fund FactSheet')])[2]");
    this.ISINLookUp = page.locator("(//h4[contains(text(),'ISIN LookUp')])[1]");
    this.DataCentre = page.locator("(//h4[contains(text(),'Data Centre')])[2]");
    this.AssetWatch = page.locator("(//h4[contains(text(),'Asset Watch')])[2]");
    this.GeographicDistribution = page.locator("(//h4[contains(text(),'Geographic Distribution')])[2]");
    this.AMCFinancials = page.locator("(//h4[contains(text(),'AMC Financials')])[2]");
    this.FundManagerDashboard = page.locator("(//h4[contains(text(),'Fund Manager Dashboard')])[2]");

    this.categoryTableRows = page.locator("//div[@id='tableContainer4']//tbody//tr");
    this.etfResultsTableRows = page.locator("//div[@id='tableContainer5']//tbody//tr");
    this.showMoreButton = page.locator("//a[normalize-space()='Show More']");

    this.Performance = page.locator("//h4[normalize-space()='Performance']");
    this.Portfolio = page.locator("//h4[normalize-space()='Portfolio']");
    this.Industry = page.locator("//h4[normalize-space()='Industry']");
    this.Tools = page.locator("//h4[normalize-space()='Tools']");



  }
  async clickSearchButton() {
    const searchButton: Locator = this.page.locator("#dvMainSearchAuto");
    await searchButton.click();

  }
  // type on search box and select from dropdown

  async typeInSearchBox(searchText: string) {
    // Click on the search box
    await this.page.getByRole('combobox', { name: 'Search for Menu...' }).click();

    // Fill the search text
    await this.page.getByRole('combobox', { name: 'Search for Menu...' }).fill(searchText);

    // Click on the button for Fund Dashboard and wait for navigation
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.getByRole('button', { name: 'Fund Dashboard' }).click()
    ]);

    // Now re-locate the heading on the new page
    const heading = this.page.locator("//h3[normalize-space()='Fund Dashboard']");
    await heading.waitFor({ state: 'visible' });
    await heading.click();
  }

  async setborderToWidget(element: Locator) {
    await element.evaluate((el) => {
      el.style.border = '3px solid #ff0033ff';
      el.style.borderRadius = '8px';
    });
  }

  async openWidget(widget: Locator) {
    await expect(widget, "Widget should be visible").toBeVisible();
    await this.setborderToWidget(widget);
    await widget.click();
  }

  async validateAllWidgets() {
    await this.openWidget(this.AgeingAnalysis);
    await this.page.goBack();

    await this.openWidget(this.NFOUpdate);
    await this.page.goBack();

    await this.openWidget(this.IndustryAsset);
    await this.page.goBack();

    await this.openWidget(this.TransactionTrends);
    await this.page.goBack();

    await this.openWidget(this.SchemeNameChangeDetails);
    await this.page.goBack();

    await this.openWidget(this.SIPCalculator);
    await this.page.goBack();

    await this.openWidget(this.STPCalculator);
    await this.page.goBack();

    await this.openWidget(this.SWPCalculator);
    await this.page.goBack();

    await this.openWidget(this.RetirementCalculator);
    await this.page.goBack();

    //    await this.openWidget(this.PortfolioScanner);
    //     await this.page.goBack();

    await this.openWidget(this.AdvancedPortfolioScanner);
    await this.page.goBack();

    await this.openWidget(this.FundSizeChangeOverNAV);
    await this.page.goBack();

    await this.openWidget(this.ReportBuilder);
    await this.page.goBack();

    await this.openWidget(this.QueryBuilder);
    await this.page.goBack();

    await this.openWidget(this.DataStatus);
    await this.page.goBack();

    await this.openWidget(this.CustomReport);
    await this.page.goBack();

    await this.openWidget(this.FundDashboard);
    await this.page.goBack();

    await this.openWidget(this.ReturnAnalysis);
    await this.page.goBack();

    await this.openWidget(this.AdvancedReturnAnalysis);
    await this.page.goBack();

    await this.openWidget(this.IndexPerformanceAnalysis);
    await this.page.goBack();

    await this.openWidget(this.NetAssetValueNAV);
    await this.page.goBack();

    await this.openWidget(this.LumpsumPerformance);
    await this.page.goBack();

    await this.openWidget(this.RiskReturnMatrix);
    await this.page.goBack();

    await this.openWidget(this.StatisticalComprehensive);
    await this.page.goBack();

    await this.openWidget(this.FundFactSheet);
    await this.page.goBack();

    await this.openWidget(this.ISINLookUp);
    await this.page.goBack();

    await this.openWidget(this.DataCentre);
    await this.page.goBack();

    await this.openWidget(this.AssetWatch);
    await this.page.goBack();

    await this.openWidget(this.GeographicDistribution);
    await this.page.goBack();

    await this.openWidget(this.AMCFinancials);
    await this.page.goBack();

    await this.openWidget(this.FundManagerDashboard);
    await this.page.goBack();


  }




    // Adjust these based on actual table locators
 

  async setBorder(element: Locator) {
  await element.evaluate((el) => {
    el.style.border = "2px solid red";
    el.style.borderRadius = "4px";
  });
}

  async validateEachCategoryRowUpdatesETFTable() {
  const count = await this.categoryTableRows.count();

  for (let i = 0; i < count; i++) {
    const row = this.categoryTableRows.nth(i);

    await this.setBorder(row);
    await expect(row).toBeVisible();

    const categoryName =(await row.textContent())?.trim() || `Row ${i + 1}`;
    console.log(`Clicking on category row: ${categoryName}`);

    // Before click: left table must refresh
    await expect(this.etfResultsTableRows.first()).toBeVisible();
    const before = await this.etfResultsTableRows.first().textContent();

    await row.click();

    // After click: right table must refresh
    await expect(this.etfResultsTableRows.first()).toBeVisible();
    const after = await this.etfResultsTableRows.first().textContent();

  }
}

  async validateShowMoreNavigation() {
  await this.setBorder(this.showMoreButton);
  await expect(this.showMoreButton).toBeVisible();

  await this.showMoreButton.click();
}

 async validateLowerSectionWidgets() {
    await this.openWidget(this.Performance);
    await this.page.goBack();

    await this.openWidget(this.Portfolio);
    await this.page.goBack();

    await this.openWidget(this.Industry);
    await this.page.goBack();

    await this.openWidget(this.Tools);
    await this.page.goBack();
  










}
}














