import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvanceFundScreenerPage } from '@pages/advance_fund_scanner.page';


let page: Page;
let advancefundscreener: AdvanceFundScreenerPage;


test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advancefundscreener = new AdvanceFundScreenerPage(page);
})

//Test-1
    // Verify the advance fund scanner page with basic search
    //Step to Reproduce:
    //1- login to the application
    //2- Navigate to advance fund scanner page
    //3- Verify the advabce fund scanner page is showing correctly or not
    //4- Click on filter button
    //5- Verify the filter panel is showing correctly or not
    //6- Click on the  Naure of Fund and select from the drop down (eg.Equity)
    //7- CLikc on the Sub Nature  and select from the drop down (eg.Small cap Fund)
    //8- CLick on OPtion and select ALL
    //9- Click on Return Period and selec the drop down (eg. 1 year)
    //10-Click on Lunch period and select from the drop down (eg. 2024)
    //11-Click on Top Fund and you can increase or decrease the number by clicking + and - icon button 
    //12-Click on submit button
    //13-Verify the result i.e List of Schemes is showing correctly or not
    //14-CLick on Green Arrow to move scheme from List of Schemes to selected scheme
    //15-Click on Red Arrow to move scheme from selected scheme to List of Schemes
    //16-Click on Scheme Set section and fill the scheme set name and click on save button
    //17-after save it will pop up message should be displayed as "Schemes add to new scheme set successfully"


    test("@last Verify the advance fund scanner page with basic search", async() => {
        await advancefundscreener.open();
        await advancefundscreener.verifyAdvanceFundScreenerPage();
        await advancefundscreener.clickFilterButton();
        await advancefundscreener.verifyFilterPanel();
        await advancefundscreener.selectFundNature("Equity");
        await advancefundscreener.selectSubFundNature("Small cap Fund");
        await advancefundscreener.selectOption("Select All");
        await advancefundscreener.selectReturnPeriod("182 Days");
        await advancefundscreener.selectLaunchPeriod("2023");
        await advancefundscreener.TypeTopFund("3");
        await advancefundscreener.clickSubmitButton();
        await advancefundscreener.verifyResult();
        await advancefundscreener.clickonGreenArrow();
        await advancefundscreener.verifyMovedScheme();
        await advancefundscreener.clickRedArrow();
        await advancefundscreener.clickonGreenArrow();
        await advancefundscreener.schemeSet("Scheme");
        await advancefundscreener.save();
        await advancefundscreener.verifyTheMessage("Schemes add to new scheme set successfully");
        await advancefundscreener.clickFilterButton();
        await advancefundscreener.ClickOnResetButton();
       
        

        
    })

//Test-2
    // Verify the advance fund scanner page with Advance search
    //Step to Reproduce:
    //1- login to the application
    //2- Navigate to advance fund scanner page
    //3- Verify the advabce fund scanner page is showing correctly or not
    //4- Click on filter button
    //5- Verify the filter panel is showing correctly or not
    //6- Navigate to the Advance Search Tab
    //7- Verify the Advance Search Tab is showing correctly or not
    //8- Select only one radio button under Average Maturity card(Year/Month/Day)
    //9- Select only one radio button under Macaulay’s Duration card(Year/Month/Day)
    //13- Select only one radio button under Modified Duration (Year/Month/Day) card
    //18- Select the Select Rating from the drop down
    //19- Select the Expression from the drop down
    //20- Type Range 
    //21- Click on Addbutton(+)
    //22- Click on submit button
    //23- Verify the result i.e List of Schemes is showing correctly or not


    test("@last Verify the advance fund scanner page with Advance search", async() => {
        await advancefundscreener.open();
        await advancefundscreener.verifyAdvanceFundScreenerPage();
        await advancefundscreener.clickFilterButton();
        await advancefundscreener.verifyFilterPanel();
        await advancefundscreener.switchTab("Advance");
        await advancefundscreener.verifyAdvanceSearchTab();
        // await advancefundscreener.selectAverageMaturity("Year");
        await advancefundscreener.selectradiobutton("Average Maturity","FndScrnMdl.AdvangeFilter.IsAverageMaturityYear");
        await advancefundscreener.setRangeForCard(0, 2.5, 10.5);
        await advancefundscreener.selectradiobutton("Macaulay’s Duration","FndScrnMdl.AdvangeFilter.IsMacDurYear");
        await advancefundscreener.setRangeForCard(1, 3.5, 11.5);
        await advancefundscreener.selectradiobutton("Modified Duration","FndScrnMdl.AdvangeFilter.IsModDurYear");
        await advancefundscreener.setRangeForCard(5, 5, 10);
        await advancefundscreener.selectradiobutton("Expense Ratio (%)","FndScrnMdl.AdvangeFilter.ExpenseRatioIsDir");
        await advancefundscreener.setRangeForCard(2, 1, 1.5)
        await advancefundscreener.selectRating("Sovereign");
        await advancefundscreener.selectSymbol(">");
        await advancefundscreener.TypeRange("7");
        await advancefundscreener.clickAddButton();
        await advancefundscreener.clickSubmitButton();
        await advancefundscreener.verifyResult();
    })





 //Test-3
     // Verify the advance fund scanner page with Advance search
    //Step to Reproduce:
    //1- login to the application
    //2- Navigate to advance fund scanner page
    //3- Verify the advabce fund scanner page is showing correctly or not
    //4- Click on filter button
    //5- Verify the filter panel is showing correctly or not
    //6- Navigate to the Advance Search Tab
    //7- Verify the Advance Search Tab is showing correctly or not
    //8- Select only one radio button under Expense Ratio (%)(Reg/DIr)
    //9- Select only one radio button under Corpus (Cr.)(AUM/QAAUM)
    //10- Select range slider under card YTM (%)
    //11- Select range slider under  Portfolio Turnover Ratio
    //18- Select the Select Rating from the drop down
    //19- Select the Expression from the drop down
    //20- Type Range 
    //21- Click on Addbutton(+)
    //22- Click on submit button
    //23- Verify the result i.e List of Schemes is showing correctly or not


   test("@last Verify the advance fund scanner page with Advance search with slider", async() => {
        await advancefundscreener.open();
        await advancefundscreener.verifyAdvanceFundScreenerPage();
        await advancefundscreener.clickFilterButton();
        await advancefundscreener.verifyFilterPanel();
        await advancefundscreener.switchTab("Advance");
        await advancefundscreener.verifyAdvanceSearchTab();
        await advancefundscreener.selectradiobutton("Corpus (Cr.)","FndScrnMdl.AdvangeFilter.IsQaum");
        await advancefundscreener.setRangeForCard(3, -10000,20000);
        await advancefundscreener.setRangeForCard(4, 1,10);
        await advancefundscreener.selectRating("AAA & Eq");
        await advancefundscreener.selectSymbol("<");
        await advancefundscreener.TypeRange("7");
        await advancefundscreener.clickAddButton();
        await advancefundscreener.clickSubmitButton();
        await advancefundscreener.verifyResult();
       

    });
      
    // //test-4
    // test("@last Resest fund scanner page", async() => {
    //     test.setTimeout(60000);
    //     await advancefundscreener.open();
    //     await advancefundscreener.verifyAdvanceFundScreenerPage();
    //     await advancefundscreener.clickRedArrow();
    //     await advancefundscreener.mywatchlist();
    //     await advancefundscreener.selectUserSet();
    //     await advancefundscreener.selectUserset1();
    //     await advancefundscreener.selectUsersetfromDropdown();
       
    //     await advancefundscreener.clickonGreenArrow();
/// })


