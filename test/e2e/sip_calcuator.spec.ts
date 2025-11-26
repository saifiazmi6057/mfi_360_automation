import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { SIPCalculatorPage } from '@pages/SIPCalculatorPage';



test.describe('SIP calculator Tests', () => {
  let page: Page;
  let sipCalculatorPage: SIPCalculatorPage;

  test.beforeEach(async ({ browser }, testInfo) => {
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();
    sipCalculatorPage = new SIPCalculatorPage(page);
  });

  //   test.afterEach(async () => {
  //     await page.close(); // ✅ Ensures clean state for next test
  //   });

  //test- 1
  // Verify basic tab feature in SIP Calculator
  //Step to Reproduce:
  // 1- login to the application
  // 2- Navigate to SIP calculator page
  // 3- Verify that the Date Range tab is selected by default
  // 4- Select a scheme from the scheme dropdown
  // 5- Select SEBI Mapping From Index option check box
  // 6- Navigate to  the Basic tab 
  // 7- Fill SIP Amount
  // 8- Select Since Inception Option 
  // 9- Select  Report Date till today on Report as on Date
  // 10- Click on Submit button

  test('Verify basic tab feature in SIP Calculator', async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await sipCalculatorPage.open();
    await sipCalculatorPage.isDateRangeTabSelected();
    await sipCalculatorPage.schemaSelection.searchScheme(schemeName);
    await sipCalculatorPage.schemaSelection.selectScheme(schemeName);
    await sipCalculatorPage.selectSEBIMapping();
    await sipCalculatorPage.switchTab(' Basic');
    await sipCalculatorPage.fillSIPAmount(5000);
    await sipCalculatorPage.selectSinceInception();
    await sipCalculatorPage.selectReportDate(new Date().toISOString().split('T')[0]);
    await sipCalculatorPage.submit();
    // After that it is landed to SIP Calculator result page
    // There is two tab one is Summary Report and other is Detailed Report
    // i need to check each tab is visible and clickable
    await sipCalculatorPage.isSummaryReportTabVisible();
    await sipCalculatorPage.isDetailedReportTabVisible();
  });


  //Test -2
  //Verify the Top-up SIP Feature in SIP calculator
  // Step to Reproduce:
  // 1- login to the application
  // 2- Navigate to SIP calculator page
  // 3- Verify that the Period tab is selected by selection of the tab
  // 4- Select a scheme from the scheme dropdown
  // 5- Select Scheme Benchmark / Suitable Index in index section
  // 6- Navigate to the Basic Tab
  // 7- Fill SIP Amount
  // 8- Select period from the dropdown
  // 9- Select  Report Date till today on Report as on Date
  // 10- Swtich tab to Top-up SIP
  // 11- Select Period wise 
  // 12-Select Period from the dropdown
  // 13-Select  SIP Days from the dropdown
  // 14- Fill the SIP Amount
  // 15-Select Frequency from the dropdown
  // 16- Click on submit button

  test('Verify Top-up SIP feature in SIP Calculator', async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await sipCalculatorPage.open();
    await sipCalculatorPage.switchDateAndPeriodTab(' Period');
    await sipCalculatorPage.schemaSelection.searchScheme(schemeName);
    await sipCalculatorPage.schemaSelection.selectScheme(schemeName);
    await sipCalculatorPage.SelectSchemeBenchmarkSuitableIndex();
    await sipCalculatorPage.switchTab(' Basic');
    await sipCalculatorPage.fillSIPAmount(5000);
    await sipCalculatorPage.selectPeriodFromDropdown(["1 Month", "3 Months", "6 Months", "1 Year"])
    await sipCalculatorPage.selectReportDate(new Date().toISOString().split('T')[0]);
    await sipCalculatorPage.switchTab('Top-up SIP');
    await sipCalculatorPage.switchTab1(' Period Wise ');
    await sipCalculatorPage.ChooseSipPeriod('1 Month');
    await sipCalculatorPage.selectSIPDay('2');
    await sipCalculatorPage.fillSIPAmount1(5000);
    await sipCalculatorPage.selectFrequency('Monthly');
    await sipCalculatorPage.submit();
    await page.waitForLoadState();

    // after submit it will navigate to the myTabContent page which contain two tab one is summary report and other is detailt report- i need to first check summary report data available and then swtich for detail report section and validate the date
    await sipCalculatorPage.switchtablecontent('Detailed Report');
});

    //Test-3
    //Verify the Top-up SIP Feature in SIP calculator with date wise
    // Step to Reproduce:
    // 1- login to the application
    // 2- Navigate to SIP calculator page
    // 3- Verify that the Period tab is selected by selection of the tab
    // 4- Select a scheme from the scheme dropdown
    // 5- Select Scheme Benchmark / Suitable Index in index section
    // 6- Navigate to the Basic Tab
    // 7- Fill SIP Amount
    // 8- Select period from the dropdown
    // 9- Select  Report Date till today on Report as on Date
    // 10- Swtich tab to Top-up SIP
    // 11- Select Date wise 
    // 12-Select date Range
    // 13-Select  SIP Days from the dropdown
    // 14- Fill the SIP Amount
    // 15-Select Frequency from the dropdown
    // 16- click on add button
    // 16- Click on submit button

    test('Verify Top-up SIP feature in SIP Calculator for date wise', async () => {
      const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
      await sipCalculatorPage.open();
      await sipCalculatorPage.switchDateAndPeriodTab(' Period');
      await sipCalculatorPage.schemaSelection.searchScheme(schemeName);
      await sipCalculatorPage.schemaSelection.selectScheme(schemeName);
      await sipCalculatorPage.SelectSchemeBenchmarkSuitableIndex();
      await sipCalculatorPage.switchTab(' Basic');
      await sipCalculatorPage.fillSIPAmount(10000);
      await sipCalculatorPage.selectPeriodFromDropdown(["1 Month", "3 Months", "6 Months", "1 Year"])
      await sipCalculatorPage.selectReportDate(new Date().toISOString().split('T')[0]);
      await sipCalculatorPage.switchTab('Top-up SIP');
      await sipCalculatorPage.switchTab1(' Date Wise ');
      await sipCalculatorPage.selectDateRange({ day: 1, month: 1, year: 2023 }, { day: 2, month: 2, year: 2023 });
      await sipCalculatorPage.TypeSIPAmount(10000);
      await sipCalculatorPage.ChooseFrequencyDatewise('Monthly');
      await sipCalculatorPage.selectSIPDatewise('2');
      await sipCalculatorPage.addbutton();
      await sipCalculatorPage.submit();
      await page.waitForLoadState();
      await sipCalculatorPage.switchtablecontent('Detailed Report');
      await sipCalculatorPage.downloadExcel();

});







  });