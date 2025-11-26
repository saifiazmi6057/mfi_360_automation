import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvancedPortfolioAnalysis } from '@pages/advanced_portfolio_analysis.page';
import { MutualFundSelector } from '@pages/Select_mutual_fund_advanceportfolio.component';

let page: Page;
let advancedportfolioanalysis: AdvancedPortfolioAnalysis;
let mutualFundSelector: MutualFundSelector;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advancedportfolioanalysis = new AdvancedPortfolioAnalysis(page);
})
// Test-1
//1. Navigate to the "Detailed Portfolio" tab.
// 2. Select a scheme from the Scheme Selection panel (e.g., Franklin India Corporate Debt Fund).
// 3.  select detail porfolio tab
// 4. Choose Portfolio Frequency ( Monthly).
// 5. Select Portfolio Periods.
// 6. Choose Portfolio Nature (e.g., Debt).
// 7. Select Code Feature (e.g., ISIN Code).
// 8. Choose Top Holding.
// 9. Set Market Value In to Crs.
// 10. Select Debt Details as "All".
// 11. Choose Market Cap (e.g., SFI or Custom).
// 12. Select Fund Size (e.g., Monthly Fund Size).
// 13. Choose Sector (e.g., MFI sector).
// 14. Select Long Term Rating.
// 15. Choose Group Company.
// 16. Check Instrument Set and Rating Set if needed.
// 17. Choose "multiple tab" Output.
// 18. Click "Show Report"
test("Verify user can configure all filters and generate a report successfully for Detailed Portfolio (for monthly )", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("Franklin India Corporate Debt Fund - Qtly IDCW");
    await advancedportfolioanalysis.schemeSelection.selectScheme("Franklin India Corporate Debt Fund - Qtly IDCW");

    
    await advancedportfolioanalysis.switchTab("Detailed Portfolio");
    await advancedportfolioanalysis.selectFrequency('Monthly');
    await advancedportfolioanalysis.selectPeriods(["Jun 2025","Feb 2025"]);
    await advancedportfolioanalysis.selectNature('Equity');
    await advancedportfolioanalysis.selectCodeFeature('BSE Code');
    await advancedportfolioanalysis.selectTopHolding('5');
    await advancedportfolioanalysis.setMarketValueInCrs('Million');
    await advancedportfolioanalysis.selectDebtDetails('All');
    await advancedportfolioanalysis.selectMarketCap('SEBI');
    await advancedportfolioanalysis.validateFundSizeIsMonthly();
    await advancedportfolioanalysis.selectSector('MFI sector');
    await advancedportfolioanalysis.selectLongTermRating('Long Term Rating');
    await advancedportfolioanalysis.selectGroupCompany('Yes');
    await advancedportfolioanalysis.checkInstrumentAndRatingSet(true, true);
    await advancedportfolioanalysis.clickShowReport();
  });




//Test -2
// 1. Navigate to the "New Entry/Exit" tab.
// 2. Select a scheme from the Scheme Selection panel (HDFC Arbitrage Fund - Dir - Growth,HDFC Retirement Savings Fund - Equity Plan - Reg - Growth).
// 3. Choose Portfolio Month (e.g., July 2025).
// 4. Select Stock Option (e.g., New Stocks, Stocks Exited, or Both).
// 5. Click "Show Report".
test("Verify report generation based on selected scheme, month, and stock option for  New entry/exist tab", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Retirement Savings Fund - Equity Plan - Reg - Growth");
    await page.keyboard.press('Enter');
    
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Retirement Savings Fund - Equity Plan - Reg - Growth");

    await advancedportfolioanalysis.switchTab("New Entry/Exit");

    await advancedportfolioanalysis.selectPortfolioMonth(["Jul 2025"]);

   await advancedportfolioanalysis.selectStockOption("New Stocks");
   //await advancedportfolioanalysis.selectStockOption("Stock Exited");
   //await advancedportfolioanalysis.selectStockOption("Both");

   await advancedportfolioanalysis.clickShowReport();
   //await advancedportfolioanalysis.clickResetFilters();
})

//test -4
//Verify that the Quants tab displays correct metrics for selected scheme across months 

// //"1. Navigate to the Quants tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3.Select Select Portfolio Month
// 4. Choose Portfolio Frequency (Monthly or Fortnightly).
// 5. Select Normalised option (e.g., As Disclosed by AMC).
// 6. Check metrics: Average Maturity, Modified Duration, Duration, Macaulay Duration (Days/Years).
// 7. Verify Maturity Profile ranges (e.g., 0–30, 31–91, etc.).

// 8. Verify Debt Holding range (e.g., 0–30 days).
// 9. Click Show Report."

test("Verify that the Quants tab displays correct metrics for selected scheme across months", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.switchTab("Quants");
    await advancedportfolioanalysis.selectPortfolioMonthDropdown(["Jun 2025","Feb 2025"]);
    await advancedportfolioanalysis.selectPortfolioFrequency('monthly');
    await advancedportfolioanalysis.clickShowReport();
});


//Test-5

//Verify that Market Cap report is generated correctly using SEBI classification

// "1. Navigate to the Market Cap tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Choose SEBI under Market Capitalization options.
// 4. Click Select Period.
// 5. Enter Range From and Range To values.
// 6. Click Show Report."

test("Verify that Market Cap report is generated correctly using SEBI classification", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.switchTab("Market Cap");
    //await advancedportfolioanalysis.selectMarketCap("SEBI");
    await advancedportfolioanalysis.selectPeriod(["Jan 2025", "Feb 2025"]);
    //await advancedportfolioanalysis.enterRangeValues(["100", "200"]);
    await advancedportfolioanalysis.clickShowReport();
});

//Test-6
//Verify that Trade Analysis report is generated correctly for selected mutual fund and settlement date

// "1. Navigate to the Trade Analysis tab.
// 2. Select a mutual fund from the list (e.g., Axis Mutual Fund).
// 3. Choose a Settlement Date range (e.g., 08 Aug 2025 - 08 Aug 2025).
// 4. Click Show Report."

test("Verify that Trade Analysis report is generated correctly for selected mutual fund and settlement date", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.switchTab("Trade Analysis");
    await advancedportfolioanalysis.analyzePortfolio.call(advancedportfolioanalysis);
    //await advancedportfolioanalysis.verifySettlementDateRange("16 Aug 2025", "16 Aug 2025");
    await advancedportfolioanalysis.clickShowReport();
    await advancedportfolioanalysis.tradeanalysisReportTableIsVisible();
});

//Test-7
//Verify that the Search tab generates report based on selected company, sector, and portfolio filters

// "1. Navigate to the Search tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Choose Parameter: % of Net Assets / Market Value / No. of Shares.
// 4. Select Portfolio Nature: Equity / Debt / Others.
// 5. Choose Equity Component: All / Futures & Options / Equity Instrument.
// 6. Select Sector: MFI sector.
// 7. Toggle ""Show details of debt securities"" to Yes.
// 8. Choose Market Cap: SEBI.
// 9. Select Portfolio Month.
// 10. Add Company Name: HDFC Bank Ltd.
// 11. Click Show Report."

test("Verify that the Search tab generates report based on selected company, sector, and portfolio filters", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.switchTab("Search");
    await advancedportfolioanalysis.portfoliomonthselect(["Jun 2025"]);
    await advancedportfolioanalysis.searchAndAddCompany("HDFC Bank Ltd.");
    await advancedportfolioanalysis.clickShowReport();
});

//Test-8
//Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period
// 1. Navigate to the Risk O Meter & PRC tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Choose a Portfolio Period from the dropdown.
// 4. Select a Riskometer Type from the dropdown.
// 5. Click Show Report."


test("Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.switchTab("Risk-O-Meter & PRC");
    await advancedportfolioanalysis.verifytabisvisible("RiskoMeter");
    await advancedportfolioanalysis.monthselection(["Dec 2024"], "Riskometer");
    await advancedportfolioanalysis.selectRiskometerType([  "Low Riskometer",  "Low to Moderate Riskometer"], "Riskometer");
    await advancedportfolioanalysis.clickShowReport();
});


//Test-9
//Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period for PRC
//"1. Navigate to the Risk O Meter & PRC tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Select PRC sub tab
// 4. Choose a Portfolio Period from the dropdown.
// 5. Select PRC Type from the dropdown.
// 6. Click Show Report."
test("Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period for PRC", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.switchTab("Risk-O-Meter & PRC");
    await advancedportfolioanalysis.verifytabisvisible("PRC");
    await advancedportfolioanalysis.monthselection(["Dec 2024"], "PRC");
    await advancedportfolioanalysis.selectPRCType(["B-I"], "PRC");
    await advancedportfolioanalysis.clickShowReport();
}
);      

//Test-10
//Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period for both
// 1. Navigate to the Risk O Meter & PRC tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Choose a Portfolio Period from the dropdown.
// 4. Select a both Type from the dropdown.
// 5. Click Show Report.
test("Verify that Risk O Meter & PRC report is generated correctly for selected scheme and portfolio period for both", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Liquid Fund - Growth");
    await advancedportfolioanalysis.switchTab("Risk-O-Meter & PRC");
    await advancedportfolioanalysis.verifytabisvisible("Both");
    await advancedportfolioanalysis.monthselection(["Dec 2024"], "Both");
    await advancedportfolioanalysis.selectRiskometerType(["Low Riskometer", "Low to Moderate Riskometer"], "Both");
    //await advancedportfolioanalysis.selectBothType([  "Low Riskometer",  "Low to Moderate Riskometer"], ["B-I"]);
    await advancedportfolioanalysis.selectPRCType(["B-I"], "Both");
    await advancedportfolioanalysis.clickShowReport();
}
);

//test-11
//Verify that stress testing and liquidity analysis report is generated correctly for selected scheme and portfolio parameters
// 1. Navigate to the Stress Testing & Liquidity Analysis tab.
// 2. Select the scheme HDFC Mid Cap Fund - Growth.
// 3. Choose Portfolio Type and Portfolio Period.
// 4. Configure stress test and liquidity percentages.
// 5. Select expressions for Top 10 Investors, Portfolio Trailing PE, and Portfolio Turnover Ratio.
// 6. Click Show Report."

test("Verify that stress testing and liquidity analysis report is generated correctly for selected scheme and portfolio parameters", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Mid Cap Fund - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Mid Cap Fund - Growth");
    await advancedportfolioanalysis.switchTab("Stress Testing & Liquidity Analysis");
    await advancedportfolioanalysis.selectPortfolioType("Scheme Wise")
    await advancedportfolioanalysis.SelectPortfolioPeriod(["Jun 2025"]);
    //await advancedportfolioanalysis.StressTestandLiquidity();
    await advancedportfolioanalysis.clickShowReport();
    }
);

