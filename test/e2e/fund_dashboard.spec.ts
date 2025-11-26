import { expect, Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
// Update the import path if the file is located at 'src/pages/fund-dashboard-page.ts'
import { FundDashboardPage } from '@pages/fund_dashboard.page';

let page: Page;
let fundDashboardPage: FundDashboardPage;

// Set long enough timeout for hooks
test.describe.configure({ timeout: 60000 }); // 60s

test.setTimeout(45000);

test.beforeAll(async ({ browser }, testInfo) => {
  console.log('Opening page...');
  page = await browser.newPage();

  console.log('Logging in...');
  const login = new Login(page, testInfo);
  await login.login();

  console.log('Navigating to dashboard...');
  fundDashboardPage = new FundDashboardPage(page);
  await fundDashboardPage.open();
  await expect(page).toHaveURL(/FundDashboard/);

  console.log('beforeAll complete');
});

test.afterAll(async () => {
  await page.close();
});

// 1.Navigate to the Fund Dashboard page.
// 2.Select the following from the dropdowns:
// • Mutual Fund: Aditya Birla Sun Life Mutual Fund
// • Category: Debt
// • Sub-Category: Corporate Bond Fund
// • Fund: Corporate Bond Fund
// 3.Click the side arrow to expand the Details section.
// 4.Validate that the Fund Snapshot displays the following fields under Fund Details:
// • Mutual Fund Name
// • Benchmark Index
// • Fund Manager
// • Launch Date
// • AUM (In ₹ Crore)
// • Exit Load
// • Scheme Nature
// • Scheme Sub Nature
// • Balanced Advantage
// • AMFI Code
// • RTA Code
// • Minimum Investment
// • Expense Ratio (Monthly)
// 5.Verify that the AUM Movement graph is visible and displays month-end AUM data.
// 6.Check that the Fund vs Index line graph is visible and compares fund performance with the benchmark index.
// 7.Ensure the Fund Manager Periods chart is visible, showing manager tenure over time.
// 8.Validate that the Fund Manager Periods section includes:
// • Manager Name
// • Management Period
// • Return (%)
// 9.Check that the Excel export option for manager details is visible and downloadable.

test("Verify the Fund Snapshot and Details section for the selected Mutual Fund, Category, Sub-Category,and Fund", async () => {
  test.setTimeout(60000);
  const mfname = 'Aditya Birla Sun Life Mutual Fund';
  const fundName = 'Aditya Birla Sun Life Floating Rate Fund';
  await fundDashboardPage.open();

  await fundDashboardPage.selectMutualFund(mfname);
  await fundDashboardPage.selectCategory('Debt');
  await fundDashboardPage.selectSubCategory('Floater Fund');
  await fundDashboardPage.selectFund(fundName);


  await page.waitForLoadState();
  await page.waitForTimeout(10000);


  // Expand Details section
  await fundDashboardPage.expandDetailsSection();

  await fundDashboardPage.collapseDetailsSection();

  await fundDashboardPage.validateMutualFundName(fundName);

  //await page.waitForTimeout(6000);


  // Validate that the Fund Snapshot displays the following fields under Fund Details:
  await fundDashboardPage.validatefunddetail();

  // Verify that the AUM Movement graph is visible and displays month-end AUM data.
  await fundDashboardPage.validateAUMChartVisible();

  //6.Check that the Fund vs Index line graph is visible and compares fund performance with the benchmark index.
  await fundDashboardPage.validateFundVsIndexChartVisible();

  //7.Ensure the Fund Manager Periods chart is visible, showing manager tenure over time.
  // 8.Validate that the Fund Manager Periods section includes:
  // • Manager Name
  // • Management Period
  // • Return (%)

  await fundDashboardPage.validateFundManagerPeriodsChartVisible();
  await fundDashboardPage.validateFundManagerPeriodsDetails();


});
// "1.Navigate to the Fund Dashboard page.
// 2.Select the following from the dropdowns:
// • Mutual Fund: Aditya Birla Sun Life Mutual Fund
// • Category: Debt
// • Sub-Category: Corporate Bond Fund
// • Fund: Corporate Bond Fund
// 3.Click on the Returns tab.
// 4.Verify that the following charts and data sections are available:
// i. P2P Returns (In %)
// • Displays monthly and yearly performance
// • Includes Excel download option
// ii. Calendar Year Returns (In %)
// • Shows yearly return breakdown
// • Includes Excel download option
// iii. Lumpsum Performance
// • Shows performance by month and year
// • Includes Excel download option
// iv. Rolling Returns (In %)
// • Displays rolling return data by month/year
// • Includes Excel download option
// v. Rolling Returns Graph
// • Graph should be visible and correctly rendered"



test("Verify the Returns tab for the selected Mutual Fund, Category, Sub-Category, and Fund configuration", async () => {
test.setTimeout(60000);
  const mfname = 'Aditya Birla Sun Life Mutual Fund';
  const fundName = 'Aditya Birla Sun Life Floating Rate Fund';
  await fundDashboardPage.open();

  await fundDashboardPage.selectMutualFund(mfname);
  await fundDashboardPage.selectCategory('Debt');
  await fundDashboardPage.selectSubCategory('Floater Fund');
  await fundDashboardPage.selectFund(fundName);


  await page.waitForLoadState();
  await page.waitForTimeout(10000);

  //Click on the Returns tab.

  await fundDashboardPage.clickReturnsTab();

  await fundDashboardPage.validateP2PReturnsChartVisible();
  await fundDashboardPage.validateCalendarYearReturnsChartVisible();
  await fundDashboardPage.validateLumpsumPerformanceChartVisible();
  await fundDashboardPage.validateRollingReturnsChartVisible();
  await fundDashboardPage.validateRollingReturnsGraphVisible();

});
// "1-Navigate to the Fund Dashboard page.
// 2-Select the following from the dropdowns:
// • Mutual Fund: Aditya Birla Sun Life Mutual Fund
// • Category: Debt
// • Sub-Category: Corporate Bond Fund
// • Fund: Corporate Bond Fund
// 3-Click on the Statistical Ratios tab.
// 4-Validate that the Ratios section displays the following details:
// • Scheme Name
// • Standard Deviation
// • Beta
// • Sharpe Ratio
// • Excel icon with downloadable functionality
// 5-Verify that the Risk Return Matrix graph is visible and correctly rendered.
// 6-Check that the Show Legend button is available under the Risk Return Matrix and functions properly when clicked."


test("Verify the Statistical Ratios tab for the selected Mutual Fund, Category, Sub-Category, and Fund configuration", async () => {
 test.setTimeout(60000);
  const mfname = 'Aditya Birla Sun Life Mutual Fund';
  const fundName = 'Aditya Birla Sun Life Floating Rate Fund';
  await fundDashboardPage.open();

  await fundDashboardPage.selectMutualFund(mfname);
  await fundDashboardPage.selectCategory('Debt');
  await fundDashboardPage.selectSubCategory('Floater Fund');
  await fundDashboardPage.selectFund(fundName);


  await page.waitForLoadState();
  await page.waitForTimeout(10000);

  await fundDashboardPage.statisticalRatios();

  await fundDashboardPage.validateRatiosSectionVisible();
  await fundDashboardPage.validateRiskReturnMatrixGraphVisible();
  await fundDashboardPage.validateShowLegendButtonFunctionality();


})

//Test -4

// "1-Navigate to the Fund Dashboard page.
// 2-Select the following from the dropdowns:
// • Mutual Fund: Aditya Birla Sun Life Mutual Fund
// • Category: Debt
// • Sub-Category: Corporate Bond Fund
// • Fund: Corporate Bond Fund
// 3-Click on the Portfolio tab.
// 4-Validate that the Top 10 Holdings section is visible and includes the following columns:
// • Company Name
// • Asset Type
// • Allocation (In %)
// • Excel icon with downloadable functionality
// 5-Validate that the Top 5 Sectors section is visible with the following columns:
// • Sector Name
// • Allocation (In %)
// 6-Verify that the following charts are visible:
// • Asset Allocation
// • Instrument Allocation
// • Market Capitalization
// • Average Maturity
// • Rating Allocation
// 7-Validate that the Rating Allocation Details section includes:
// • Rating Set
// • Company Name
// • Allocation (%)
// • Excel icon with downloadable functionality
// 8-Validate that the ""What's In"" section includes:
// • Company Name
// • ISIN Code
// • Portfolio Nature
// • Net Asset (In %)
// • Market Value (In Cr.)
// • Excel icon with downloadable functionality
// 9-Validate that the ""What's Out"" section is visible and includes:
// • Company Name
// • ISIN Code
// • Portfolio Nature
// • Net Asset (In %)
// • Market Value (In Cr.)
// • Excel icon with downloadable functionality
// 10-Validate that the Detailed Portfolio section is visible and includes the following columns:
// • Company Name
// • Sector Name
// • ISIN Code
// • BSE Code
// • NSE Code
// • Instrument
// • Rating
// • Rating Agency Name
// • Quantity
// • Market Value (In Cr.)
// • % of Net Assets
// • Market Cap
// • Coupon Rate
// • Maturity Date"


test("Verify the Portfolio tab for the selected Mutual Fund, Category, Sub-Category, and Fund configuration", async () => {
 test.setTimeout(60000);
  const mfname = 'Aditya Birla Sun Life Mutual Fund';
  const fundName = 'Aditya Birla Sun Life Floating Rate Fund';
  await fundDashboardPage.open();

  await fundDashboardPage.selectMutualFund(mfname);
  await fundDashboardPage.selectCategory('Debt');
  await fundDashboardPage.selectSubCategory('Floater Fund');
  await fundDashboardPage.selectFund(fundName);


  await page.waitForLoadState();
  await page.waitForTimeout(10000);

  await fundDashboardPage.portfolioTab();

  await fundDashboardPage.validateTop10HoldingsSection();
  await fundDashboardPage.validateTop5SectorsSection();
  await fundDashboardPage.validateInstrumentAllocationSection();
  await fundDashboardPage.validateAverageMaturity();
  await fundDashboardPage.validateRatingAllocation();
  await fundDashboardPage.validateRatingAllocationDetails();
  await fundDashboardPage.validateWhatsInSection();
  await fundDashboardPage.validateWhatsOutSection();
  await fundDashboardPage.validateDetailedPortfolioSection();

})


// Test -5
//Verify the others for the selected Mutual Fund, Category, Sub-Category, and Fund configuration

// "1-Navigate to the Fund Dashboard page.
// 2-Select the following from the dropdowns:
// • Mutual Fund: Aditya Birla Sun Life Mutual Fund
// • Category: Debt
// • Sub-Category: Corporate Bond Fund
// • Fund: Corporate Bond Fund
// 3-Click on the Others tab.
// 4-Validate that the following fund attributes are displayed:
// • Minimum Lumpsum Investment Amount
// • Monthly SIP Dates
// • Stylebox
// • YTM
// . Average Maturity
//. Macaulay Duration
// 5-Validate that the Fund Comparison section is visible and includes the following columns:
// • Scheme Name
// • AUM (In Cr.)
// • Launch Date
// • Returns (%)
// 6-Validate that the Dividend History section is visible and displays relevant data for the selected fund.
// 7-Validate that the AMC/Fund News section is visible and contains clickable news items that open in a new page.
// 8-Validate that the Addendums section is available and includes the following columns:
// • Title
// • Date
// • PDF download icon (functionality should allow downloading the addendum file)"

test("Verify the Others tab for the selected Mutual Fund, Category, Sub-Category, and Fund configuration", async () => {
 test.setTimeout(60000);
  const mfname = 'Aditya Birla Sun Life Mutual Fund';
  const fundName = 'Aditya Birla Sun Life Floating Rate Fund';
  await fundDashboardPage.open();

  await fundDashboardPage.selectMutualFund(mfname);
  await fundDashboardPage.selectCategory('Debt');
  await fundDashboardPage.selectSubCategory('Floater Fund');
  await fundDashboardPage.selectFund(fundName);


  await page.waitForLoadState();
  await page.waitForTimeout(10000);

  await fundDashboardPage.validateothersTab();

  await page.waitForTimeout(6000);
  

  await fundDashboardPage.validateMinimumLumpsumInvestmentAmount();
  /*await fundDashboardPage.validateMonthlySIPDates();
  await fundDashboardPage.validateStylebox();
  await fundDashboardPage.validateYTM();
  await fundDashboardPage.validateAverageMaturity();
  await fundDashboardPage.validateMacaulayDuration();*/
  await fundDashboardPage.validateFundComparisonSection();
  await fundDashboardPage.validateDividendHistory();
  await fundDashboardPage.validateAMCNews();
  await fundDashboardPage.validateAddendums();

})

