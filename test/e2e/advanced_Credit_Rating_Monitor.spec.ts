import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { MutualFundSelector } from '@pages/Select_mutual_fund_advanceportfolio.component';
import { AdvanceCreditMonitorPage } from '@pages/advance_credit_moniter.page';

let page: Page;
let advanceCreditMonitorPage: AdvanceCreditMonitorPage
let mutualFundSelector: MutualFundSelector;

test.beforeAll(async ({ browser }, testInfo) => {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advanceCreditMonitorPage = new AdvanceCreditMonitorPage(page);
     mutualFundSelector = new MutualFundSelector(page);
})

//Test- 1
//Verify that the user can access and interact with Credit Rating Monitor section and select Isuer/ISIN wise
//step to reproduce:
// 1- Navigate to the advance credit rating monitor section
// 2- Goto the Isuer/ISIN wise
// 3- Select Issuer or ISIN
// 4- Select Portfolio Month
// 5- Select Portfolio Frequency
// 6- Click on Find Ratings
// 7-Validate the expected result: there should be two report table generated one is Rating Summary Report and Issuer level detailed Report


test("Verify that the user can access and interact with Credit Rating Monitor section and select Isuer/ISIN wise", async () => {

    await advanceCreditMonitorPage.open();
    await advanceCreditMonitorPage.switchTab('Issuer/ISIN wise');
    await advanceCreditMonitorPage.selectIssuer('HDFC Bank Ltd.');
    await advanceCreditMonitorPage.advancedPortfolioAnalysis.portfoliomonthselect(["Nov 2023"]);
    await advanceCreditMonitorPage.advancedPortfolioAnalysis.selectFrequency('Monthly');
    await advanceCreditMonitorPage.clickFindRatingsButton();
    await advanceCreditMonitorPage.validateReportTables();



});

//Test -2
//Verify that the user can access and interact with Credit Rating Monitor section and select Fund Wise section
// 1-Navigate to the advance credit rating monitor section
// 2- Goto the Fund Wise section
// 3- Select fund from the selection
// 4-select portfolio month
// 5- select primary mutual fund from the drop
// 6- Select the Rating Set
// 7-Select Portfolio Frequency
// 8-Select compare with peer either show market value
// 9-Click on "Check Rating composition"
// 10- Validate Table view data tab 
// 11- navigate to the graph view tab


test("Verify that the user can access and interact with Credit Rating Monitor section and select Fund Wise section", async () => {
    await advanceCreditMonitorPage.open();
    await advanceCreditMonitorPage.switchTab('Fund Wise');

    // i need to select two fund from the selection
    await advanceCreditMonitorPage.selectFund(['ICICI Prudential Money Market Fund', 'HDFC Liquid Fund']);
    await advanceCreditMonitorPage.portfoliomonthselect_credit(["Sep 2025"]);
    await advanceCreditMonitorPage.selectPrimaryMutualFund('HDFC Liquid Fund');
    await advanceCreditMonitorPage.selectRatingName('IAL Rating Set');
    //await advanceCreditMonitorPage.selectFrequency('Monthly');
    await advanceCreditMonitorPage.selectCompareWithPeer('Compare with Peer');
    
    await advanceCreditMonitorPage.clickCheckRatingCompositionButton();
   await advanceCreditMonitorPage.validateTableViewDataTab();
    await advanceCreditMonitorPage.validateGraphViewTab();




});