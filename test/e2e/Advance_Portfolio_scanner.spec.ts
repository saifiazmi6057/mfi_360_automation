import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvancePortfolioScanner } from '@pages/Advance_portfolio_scanner.page';
import { title } from 'process';



let page: Page;
let advancePortfolioScanner: AdvancePortfolioScanner;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advancePortfolioScanner = new AdvancePortfolioScanner(page);
})


//Test-1
// Verify the advance portfolio scanner page when we select  two scheme and provide amount after that i need to validate the result 
// is showing correct or not 
//Step to Reproduce:
// 1- login to the application
// 2- Navigate to the Advance Portfolio Scanner Page[Tools>AdvancePortfolioScanner]
// 3- Select two scheme from the search scheme section
// 4- Validate after adding the scheme is reflecting in the below selection table
// 5- Navigate to the amount section and enter the amount for both scheme 
// 6- click on submit button

// 7- After Selecting scheme verify the result is showing correctly or not
// 8- Verfiy the report date is current date-"Report Date: 04-Nov-2025"
// 9 - Verify the below result should be available with their respective data:
    //1-AMC Allocation
    // 2-Category Allocation - Current Month
    //3-Asset Allocation-(Current Month)
    //4-Asset Allocation-(Previous Month)
    //5-Average for Last 12 Months
    //6-Market Capitalization(Current Month)
    //7-Market Capitalization(Previous Month)
    //8-Average for Last 12 Months
    //9-Sector Allocation(Current Month)
    //10-Sector Allocation(Previous Month)
    //11-Sector Allocation-(Average for Last 12 Months)
    //12-Holding Analysis (Company)- Table
    //13-Holding Analysis (Sector)- Table
    //14-Maturity Profile - Current Month Graph Table
    //15-Instrument Allocation - Top 20-Table
    //16-Instrument Allocation - Current Month -Table
    //17-Return Analysis Graph
    //18-P2P Returns (In %)
    //19-Calendar Year Returns (In %)
    //20-Lumpsum Performance (Growth of Rs. 10,000)
    //21-Risk Return Matrix
    //22-Statistical Comprehensive
    //23-What's In
    //24-What's Out
    //25-Correlation Matrix
    //26-Portfolio Overlap Matrix
test('Verify the advance portfolio scanner page when we select  two scheme and provide amount after that i need to validate the result is showing correct or not', async () => {
   test.setTimeout(120000);

    await advancePortfolioScanner.open();
    await advancePortfolioScanner.searchAndSelectScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth");
    await advancePortfolioScanner.addbutton();
     await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Axis Liquid Fund - Growth");
    await advancePortfolioScanner.addbutton();
//    // await advancePortfolioScanner.switchTab("Amount");
    await advancePortfolioScanner.fillAmountForScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth", "1000");
    await advancePortfolioScanner.fillAmountForScheme("Axis Liquid Fund - Growth", "1000");
    await advancePortfolioScanner.clickShowReport();
    await advancePortfolioScanner.verifyReportDate();
    await advancePortfolioScanner.page.waitForLoadState('load');
    await advancePortfolioScanner.validateWidget([
        {title:"AMC Allocation"},
        {title:"AMC Allocation"},       
        {title:"Category Allocation - Current Month"},
        {title:"Asset Allocation-(Current Month)"},
        {title:"Asset Allocation-(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Market Capitalization(Current Month)"},
        {title:"Market Capitalization(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Sector Allocation(Current Month)"},
        {title:"Sector Allocation(Previous Month)"},
        {title:"Sector Allocation-(Average for Last 12 Months)"},
        {title:"Holding Analysis (Company)- Table"},
        {title:"Holding Analysis (Sector)- Table"},
        {title:"Maturity Profile - Current Month Graph Table"},
        {title:"Average Maturity"},
        {title:"Instrument Allocation - Top 20-Table"},
        {title:"Instrument Allocation - Current Month -Table"},
        {title:"Return Analysis Graph"},
        {title:"P2P Returns (In %)"},
        {title:"Calendar Year Returns (In %)"},
        {title:"Lumpsum Performance (Growth of Rs. 10,000)"},
        {title:"Risk Return Matrix"},
       // {title: "Statistical Comprehensive"},
        {title:"What's In"},
        {title:"What's Out"},    
        {title:"Correlation Matrix"},
        {title:"Portfolio Overlap Matrix"},
    

    
    ]);

});

//Test-2
// Verify the advance portfolio scanner page when we select  three scheme and provide amount after that i need to validate the result 
// is showing correct or not 
//Step to Reproduce:
// 1- login to the application
// 2- Navigate to the Advance Portfolio Scanner Page[Tools>AdvancePortfolioScanner]
// 3- Select three scheme from the search scheme section
// 4- Validate after adding the scheme is reflecting in the below selection table
// 5- Navigate to the unit section and enter the unit for all three scheme 
// 6- click on submit 
// 7- After Selecting scheme verify the result is showing correctly or not
// 8- Verfiy the report date is current date-"Report Date: 04-Nov-2025"
// 9 - Verify the below result should be available with their respective data:
    //1-AMC Allocation
    // 2-Category Allocation - Current Month
    //3-Asset Allocation-(Current Month)

test('Verify the advance portfolio scanner page when we select  three scheme and provide unit after that i need to validate the result is showing correct or not', async () => {
     test.setTimeout(120000);
   
    await advancePortfolioScanner.open();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth");
    await advancePortfolioScanner.addbutton();
     await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Axis Liquid Fund - Growth");
    await advancePortfolioScanner.addbutton();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Franklin India Large Cap Fund - Growth");
    await advancePortfolioScanner.addbutton();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.switchTab("Unit");
    await advancePortfolioScanner.fillUnitForScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth", "10");
    await advancePortfolioScanner.fillUnitForScheme("Axis Liquid Fund - Growth", "20");
    await advancePortfolioScanner.fillUnitForScheme("Franklin India Large Cap Fund - Growth", "30");
    await advancePortfolioScanner.clickShowReport();
    await advancePortfolioScanner.verifyReportDate();
    await advancePortfolioScanner.page.waitForLoadState('load');
    

    await advancePortfolioScanner.validateWidgets([
        {title:"AMC Allocation"},
        {title:"Category Allocation - Current Month"},
        {title:"Asset Allocation-(Current Month)"},
        {title:"Asset Allocation-(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Market Capitalization(Current Month)"},
        {title:"Market Capitalization(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Sector Allocation(Current Month)"},
        {title:"Sector Allocation(Previous Month)"},
        {title:"Sector Allocation-(Average for Last 12 Months)"},
        {title:"Holding Analysis (Company)- Table"},
        {title:"Holding Analysis (Sector)- Table"},
        {title:"Maturity Profile - Current Month Graph Table"},
        {title:"Average Maturity"},
       {title:"Instrument Allocation - Top 20-Table"},
       {title:"Instrument Allocation - Current Month -Table"},
        {title:"Return Analysis Graph"},
        {title:"P2P Returns (In %)"},
        {title:"Calendar Year Returns (In %)"},
        {title:"Lumpsum Performance (Growth of Rs. 10,000)"},
        {title:"Risk Return Matrix"},
       {title: "Statistical Comprehensive"},
        {title:"What's In"},
        {title:"What's Out"},    
       {title:"Correlation Matrix"},
        {title:"Portfolio Overlap Matrix"},
    ]);

});


//Test-3
// Verify the advance portfolio scanner page when we select  multiple scheme and provide Allocation (In%) after that i need to validate the result
// is showing correct or not
//Step to Reproduce:
// 1- login to the application
// 2- Navigate to the Advance Portfolio Scanner Page[Tools>AdvancePortfolioScanner]
// 3- Select multiple scheme from the search scheme section
// 4- Validate after adding the scheme is reflecting in the below selection table
// 5- Navigate to the Allocation (In%) section and enter the Allocation (In%) for all schemeRowName 
// 6- click on submit 
// 7- After Selecting scheme verify the result is showing correctly or not
// 8- Verfiy the report date is current date-"Report Date: 04-Nov-2025"
// 9 - Verify the below result should be available with their respective data:    
    //1-AMC Allocation
    // 2-Category Allocation - Current Month
    //3-Asset Allocation-(Current Month)
test('Verify the advance portfolio scanner page when we select  multiple scheme and provide Allocation (In%) after that i need to validate the result is showing correct or not', async () => {
     test.setTimeout(120000);
    await advancePortfolioScanner.open();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth");
    await advancePortfolioScanner.addbutton();    
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Axis Liquid Fund - Growth");
    await advancePortfolioScanner.addbutton();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("Franklin India Large Cap Fund - Growth");
    await advancePortfolioScanner.addbutton();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.searchAndSelectScheme("HDFC Income Fund - Growth");
    await advancePortfolioScanner.addbutton();
    await advancePortfolioScanner.page.waitForTimeout(5000);
    await advancePortfolioScanner.switchTab("Allocation (In%)");
    await advancePortfolioScanner.fillAllocationForScheme("Aditya Birla Sun Life Large Cap Fund - Reg - Growth", "10");
    await advancePortfolioScanner.fillAllocationForScheme("Axis Liquid Fund - Growth", "20");
    await advancePortfolioScanner.fillAllocationForScheme("Franklin India Large Cap Fund - Growth", "30");
    await advancePortfolioScanner.fillAllocationForScheme("HDFC Income Fund - Growth", "40");
    await advancePortfolioScanner.clickShowReport();
    await advancePortfolioScanner.verifyReportDate();
    await advancePortfolioScanner.page.waitForLoadState('load');
    await advancePortfolioScanner.validateWidgets([
        {title:"AMC Allocation"},
        {title:"Category Allocation - Current Month"},
        {title:"Asset Allocation-(Current Month)"},
        {title:"Asset Allocation-(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Market Capitalization(Current Month)"},
        {title:"Market Capitalization(Previous Month)"},
        {title:"Average for Last 12 Months"},
        {title:"Sector Allocation(Current Month)"},
        {title:"Sector Allocation(Previous Month)"},    
        {title:"Sector Allocation-(Average for Last 12 Months)"},   
        {title:"Holding Analysis (Company)- Table"},
        {title:"Holding Analysis (Sector)- Table"},
        {title:"Maturity Profile - Current Month Graph Table"},
        {title:"Average Maturity"},
         {title:"Instrument Allocation - Top 20-Table"},
         {title:"Instrument Allocation - Current Month -Table"},
        {title:"Return Analysis Graph"},
        {title:"P2P Returns (In %)"},
        {title:"Calendar Year Returns (In %)"},
        {title:"Lumpsum Performance (Growth of Rs. 10,000)"},
        {title:"Risk Return Matrix"},
       {title: "Statistical Comprehensive"},
        {title:"What's In"},
        {title:"What's Out"},    
       {title:"Correlation Matrix"},
        {title:"Portfolio Overlap Matrix"},
    ]);

});