import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { MultiplePorfolioOverlap } from '@pages/multiple_portfolio_overlap.page';
import { time } from 'console';
import { TIMEOUT } from 'dns/promises';



test.describe('Multiple Portfolio Overlap', () => {
  let page: Page;
  let multipleportfoliooverlap: MultiplePorfolioOverlap;

  test.beforeEach(async ({ browser }, testInfo) => {
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();
    multipleportfoliooverlap = new MultiplePorfolioOverlap(page);

  });

  test.afterEach(async () => {
    await page.close(); // Close the page after each test
  })


  //Test-1
  // verify the multiple portfolio overlap page is showing correct result when we select one scheme 
  //Step to Reproduce:
  // 1- login to the application
  // 2- Navigate to the Multiple Portfolio Overlap Page[Portfolio>MultiplePortfolio]
  // 3- Select one scheme from the scheme Selection component
  // 4- After Selecting scheme verify the result is showing correctly or not
  // 5- Verify the selected scheme is displayed in the results table




  test('verfiy the multiple porfolio overlap page is showing correct result when we select one scheme', async () => {
    test.setTimeout(40000);
    await multipleportfoliooverlap.open();
    await multipleportfoliooverlap.schemaSelection.selectScheme("HDFC Liquid Fund - Growth");
    await multipleportfoliooverlap.schemaSelection.selectScheme("HDFC Liquid Fund - Growth");
    await multipleportfoliooverlap.validateFundPresent([
      'HDFC Liquid Fund - Growth'
    ]);
    await multipleportfoliooverlap.selectAllFundsAndDeleteWithConfirmation();

  });


  //Test-2
  // Verify the multiple portfolio overlap page is showing correct result when we select two scheme
  // Step to Reproduce
  // 1-login to the application
  // 2-Navigate to the multiple portfolio overlap page
  // 3-Select one scheme from the scheme selection component 
  // 4- Select another scheme from the add section
  // 5- After selecting two scheme verify the result is showing correctly - it show both scheme in the result table
  // 6- Verify the selected scheme is displayed in the results table
  // 7- Verify the overlap percentage is showing correctly in the result table
  // 8- After selecting the fund verify the common fund showing in the similarity measurement table
  test('verify the multiple portfolio overlap page is showing correct result when we select two scheme', async () => {
    test.setTimeout(60000);
    const mfname = 'Axis Mutual Fund';
    const fundName = 'Axis Large Cap Fund';
    await multipleportfoliooverlap.open();
    await multipleportfoliooverlap.schemaSelection.searchScheme("HDFC Liquid Fund - Growth");
    await multipleportfoliooverlap.schemaSelection.selectScheme("HDFC Liquid Fund - Growth");
    // Select mutual fund from add sectiion
    await multipleportfoliooverlap.selectMutualFund(mfname);
    await multipleportfoliooverlap.selectCategory('Equity');
    await multipleportfoliooverlap.selectSubCategory('Large Cap Fund');
    await multipleportfoliooverlap.selectFund(fundName);
    await multipleportfoliooverlap.ClickOnAddButton();
    await multipleportfoliooverlap.validateFundPresent([
      'HDFC Liquid Fund - Growth',
      'Axis Large Cap Fund - Growth'
    ]);
    await multipleportfoliooverlap.selectFundsForComparison([
      'HDFC Liquid Fund - Growth',
      'Axis Large Cap Fund - Growth'
    ]);
    await multipleportfoliooverlap.clickOnCompareAndWaitForResults();
    await multipleportfoliooverlap.selectFundAndVerifyTable("Fund B");
    await multipleportfoliooverlap.selectAllFundsAndDeleteWithConfirmation();









  })




});