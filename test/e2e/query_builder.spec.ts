import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { Querybuilder } from '@pages/query_builder.page';



test.describe('Asset Allocation Tests', () => {
  let page: Page;
  let querybuilder: Querybuilder;

  test.beforeEach(async ({ browser }, testInfo) => {
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();
    querybuilder = new Querybuilder(page);
  });

  test.afterEach(async () => {
    await page.close(); // ✅ Ensures clean state for next test
  });


//Test-1
// Verify that the user can access and interact with the Asset Allocation section
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Asset Allocation.	
// 3. In the input section, add Portfolio Month (AA).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
// • Nature of Instrument
// • Corpus Percent
// • Scheme Short Name	
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.
const aaAttrOptionsInput = [{ option: 'Portfolio Month(AA)', value: 'May 2025' }];
const aaAttrOptionsOutput =
    ["Nature of Instrument",
        "Portfolio Month(AA)",
        "Corpus Percent",
        "Scheme Short Name"];

test("Verify that the user can access and interact with the Asset Allocation section", async () => {

    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    //await querybuilder.selectSection("Asset Allocation");
    await querybuilder.selectAndValidateOpions("Asset Allocation", aaAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Asset Allocation", aaAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(aaAttrOptionsOutput);
    // i need to close the page after each test because when we run multiple test case at one time it gives alternate test case failed


});

//test-2
// // Verify that the user can access and interact with the Asset Allocation section
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Asset Allocation.	
// 3. In the input section, Portfolio Month(AAC).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
// -Country
// -Nature of Instrument
// -Corpus Percent
// -Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.
const aacAttrOptionsInput = [{ option: 'Portfolio Month(AAC)', value: 'May 2025' }];
const aacAttrOptionsOutput =
    ["Country",
        "Nature of Instrument",
        "Portfolio Month(AAC)",
        "Corpus Percent",
        "Scheme Short Name"];

test("Verify that the user can access and interact with the Asset Allocation Countrywise section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    //await querybuilder.selectSection("Asset Allocation Countrywise");
    await querybuilder.selectAndValidateOpions("Asset Allocation Countrywise", aacAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Asset Allocation Countrywise", aacAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(aacAttrOptionsOutput);
});

//test-3
// Verify that the user can access and interact with the Average Maturity
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Average Maturity.	
// 3. In the input section, Portfolio Month(AvgMat).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
// -Average Maturity as Disclosed by AMC
// -Average Maturity(InDays)
// -Average Maturity(InYears)
// -Portfolio Month(AvgMat)
// -Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const avgAttrOptionsInput = [{ option: 'Portfolio Month(AvgMat)', value: 'May 2025' }];
const avgAttrOptionsOutput =
    ["Average Maturity as Disclosed by AMC",
        "Average Maturity(InDays)",
        "Average Maturity(InYears)",
        "Portfolio Month(AvgMat)",
        "Scheme Short Name"];
test("Verify that the user can access and interact with the Average Maturity section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    //await querybuilder.selectSection("Average Maturity");
    await querybuilder.selectAndValidateOpions("Average Maturity", avgAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Average Maturity", avgAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(avgAttrOptionsOutput);
});

//Test-4
// Verify that the user can access and interact with the Corpus section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Average Maturity.	
// 3. In the input section, Portfolio Month(Corpus).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Corpus(Crs.)
//-Portfolio Month(Corpus)
//-Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const crsAttrOptionsInput = [{ option: 'Portfolio Month(Corpus)', value: 'May 2025' }];
const crsAttrOptionsOutput =
    ["Corpus(Crs.)",
        "Portfolio Month(Corpus)",
        "Scheme Short Name"];

test("Verify that the user can access and interact with the Corpus section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    //await querybuilder.selectSection("Corpus");
    await querybuilder.selectAndValidateOpions("Corpus", crsAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Corpus", crsAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(crsAttrOptionsOutput);
});

//Test-5
// Verify that the user can access and interact with the Entry Exit Load section
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Average Maturity.	
// 3. In the input section, Portfolio Month(Corpus).	
// 4. Set the expression to lessthen a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Corpus(Crs.)
//-Portfolio Month(Corpus)
//-Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const eelAttrOptionsInput = [{ option: 'Effective date', value: 'May 2025' }];
const eelAttrOptionsOutput =
    ["Effective date",
        "Exit Load",
        "Scheme Short Name"];

test("Verify that the user can access and interact with the Entry Exit Load section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    //await querybuilder.selectSection("Entry Exit Load");
    await querybuilder.selectAndValidateOpions("Entry Exit Load", eelAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Entry Exit Load", eelAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(eelAttrOptionsOutput);
});

//test-6
// Verify that the user can access and interact with Expense Ratio section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Average Maturity.	
// 3. In the input section, Effective date(ER).
// 4. Set the expression to EqualTo a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Corpus(Crs.)
//-Portfolio Month(Corpus)
//-Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const erlAttrOptionsInput = [{ option: 'Effective date(ER)', value: 'May 2025' }];
const erlAttrOptionsOutput =
    ["Expense Ratio",
        "Effective date(ER)",
        "Scheme Short Name"];

test("Verify that the user can access and interact with Expense Ratio  section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Expense Ratio", erlAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Expense Ratio", erlAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(erlAttrOptionsOutput);
});

//test-7
// Verify that the user can access and interact with Fund Size MutualFundwise section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Average Maturity.	
// 3. In the input section, Portfolio Month(FSM).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Corpus(Crs.)
//-Portfolio Month(Corpus)
//-Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const fsmAttrOptionsInput = [{ option: 'Portfolio Month(FSM)', value: 'May 2025' }];
const fsmAttrOptionsOutput =
    ["Average Fund Size(Crs.)",
        "Month End Fund Size(Crs.)",
        "Portfolio Month(FSM)",
        "MutualFund Name",
        "Scheme Short Name"
    ];
test("Verify that the user can access and interact with Fund Size MutualFundwise  section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Fund Size MutualFundwise", fsmAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Fund Size MutualFundwise", fsmAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(fsmAttrOptionsOutput);
});

//test-8
// Verify that the user can access and interact with Modified Duration section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Modified Duration.	
// 3. In the input section, Portfolio Month(MD).	
// 4. Set the expression to equal to a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Modified Duration as Disclosed by AMC
//-Modified Duration(InDays)
//-Modified Duration(InYears)
//-Portfolio Month(MD)
//-Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const mdAttrOptionsInput = [{ option: 'Portfolio Month(MD)', value: 'May 2025' }];
const mdAttrOptionsOutput =
    ["Modified Duration as Disclosed by AMC",
        "Modified Duration(InDays)",
        "Modified Duration(InYears)",
        "Portfolio Month(MD)",
        "Scheme Short Name"];
test("Verify that the user can access and interact with Modified Duration section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Modified Duration", mdAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Modified Duration", mdAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(mdAttrOptionsOutput);
});

//Test-9
// Verify that the user can access and interact with NAV Master section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Modified Duration.	
// 3. In the input section, Portfolio Month(MD).	
// 4. Set the expression to lessthen a specific month (e.g., "June 2025").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//["Bonus Corporate",
// "Bonus Individual",
// "Dividend Corporate",
// "Is Dividend",
// "Dividend Individual",
// "NAV(Rs.)",
// "NAV Date"
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const nmAttrOptionsInput = [{ option: 'NAV Date', value: 'May 2025' }];
const nmAttrOptionsOutput =
    ["Bonus Corporate",
        "Bonus Individual",
        "Dividend Corporate",
        "Is Dividend",
        "Dividend Individual",
        "NAV(Rs.)",
        "NAV Date"
    ];

test("Verify that the user can access and interact with NAV Master section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("NAV Master", nmAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("NAV Master", nmAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(nmAttrOptionsOutput);
});


//Test-10
// Verify that the user can access and interact with P2P Returns (based on latest NAV) section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Modified Duration.	
// 3. In the input section, 1 Month.	
// 4. Set the expression to GreaterThan a specific month (e.g., "1").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-1 Days
// -3 Days
// -1 Week
// -2 Weeks
// -1 Month
// -2 Months
// -3 Months
// -6 Months
// -1 Year
// -2 Years
// -3 Years
// -5 Years
// -10 Year
// -15 Year
// -YTD
// -FYTD
// Since Inception
// Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const p2pAttrOptionsInput = [{ option: '1 Month', value: "1" }];
const p2pAttrOptionsOutput =
    ["1 Days",
        "3 Days",
        "1 Week",
        "2 Weeks",
        "1 Month",
        "2 Months",
        "3 Months",
        "6 Months",
        "1 Year",
        "2 Years",
        "3 Years",
        "5 Years",
        "10 Year",
        "15 Year",
        "YTD",
        "FYTD",
        "Since Inception",
        "Scheme Short Name"
    ];

test("Verify that the user can access and interact with  P2P Returns (based on latest NAV) section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("P2P Returns (based on latest NAV)", p2pAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("P2P Returns (based on latest NAV)", p2pAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(p2pAttrOptionsOutput);
});

//Test-11
// Verify that the user can access and interact with QAAUM section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on QAAUM.	
// 3. In the input section, Date and Feb 2025.	
// 4. Set the expression to GreaterThan a specific month (e.g., "1").	
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-Fund Name
// -Quarterly Average AUM
// -Date
// -Scheme Short Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const qaAttrOptionsInput = [{ option: 'Date', value: 'Feb 2025' }];
const qaAttrOptionsOutput =
    ["Fund Name",
        "Quarterly Average AUM",
        "Date",
        "Scheme Short Name"]

test("Verify that the user can access and interact with  QAAUM section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("QAAUM", qaAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("QAAUM", qaAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(qaAttrOptionsOutput);
});

//Test-12
// Verify that the user can access and interact with Scheme Portfolio section.
// 1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Scheme Portfolio.		
// 4. Set the expression to Equalto a specific month 
// 5. Verify that the query detail appears below the input section.	
// 6. In the output section, add the following sub-asset allocation fields:
//-["BSE Code",
// "Company Code",
// "Corpus Percent",
// "Instrument",
// "Market Value(Crs.)",
// "Company Name",
// "Nature of Instrument",
// "No of Shares",
// "Scheme Short Name",
// "Company ISIN",
// "Coupon Rate",
// "Market Cap",
// "Maturity Date",
// "NSE Code",
// "Portfolio Date",
// "Rating Agency",
// "Rating",
// "Sector Name"]
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const spAttrOptionsInput = [{ option: 'Portfolio Date', value: 'May 2025' }];
const spAttrOptionsOutput =
    ["BSE Code",
        "Company Code",
        "Corpus Percent",
        "Instrument",
        "Market Value(Crs.)",
        "Company Name",
        "Nature of Instrument",
        "No of Shares",
        "Scheme Short Name",
        "Company ISIN",
        "Coupon Rate",
        "Market Cap",
        "Maturity Date",
        "NSE Code",
        "Portfolio Date",
        "Rating Agency",
        "Rating",
        "Sector Name"]

test("Verify that the user can access and interact with  Scheme Portfolio section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Scheme Portfolio", spAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Scheme Portfolio", spAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(spAttrOptionsOutput);

});

//Test-13
// Verify that the user can access and interact with Schemes Master section.
//1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Scheme Portfolio.		
// 3. Set the expression to LessThan to prefilled  month 
// 4. Verify that the query detail appears below the input section.	
// 5. In the output section, add the following sub-asset allocation fields:
// Additional Investment
// -AMC Code
// -AMC Name
// -AMFI Code
// -Available for Investment
// -Face Value
// -Fund Manager
// -Fund Name
// -Incremental Investment
// -Index Name
// -SIP
// -ISIN (Payout/Growth)
// -ISIN (Reinvest)
// -Issue Date
// -Launch Date
// -Launch Price
// -Minimum Investment
// -Fund Name
// -Nature
// -NFO Close Date
// -Investment Option
// -Parent Scheme
// -Previous Name
// -RTA Code(Payout)
// -RTA Code(Reinvest)
// -Scheme Short Name
// -Scheme Code
// -Scheme Name
// -Sector Classification
// -Special Category
// -Structure
// -Sub Nature
// -Sub Plan
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const smAttrOptionsInput = [{ option: 'Issue Date', value: 'May 2025' }];
const smAttrOptionsOutput =
    ["Additional Investment",
        "AMC Code",
        "AMC Name",
        "AMFI Code",
        "Available for Investment",
        "Face Value",
        "Fund Manager",
        //"Fund Name",
        "Incremental Investment",
        "Index Name",
        "SIP",
        "ISIN (Payout/Growth)",
        "ISIN (Reinvest)",
        "Issue Date",
        "Launch Date",
        "Launch Price",
        "Minimum Investment",
        //"Fund Name",
        "Nature",
        "NFO Close Date",
        "Investment Option",
        "Parent Scheme",
        "Previous Name",
        "RTA Code(Payout)",
        "RTA Code(Reinvest)",
        "Scheme Short Name",
        "Scheme Code",
        "Scheme Name",
        "Sector Classification",
        "Special Category",
        "Structure",
        "Sub Nature"]
test("Verify that the user can access and interact with  Schemes Master section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Schemes Master", smAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Schemes Master", smAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(smAttrOptionsOutput);

});

//Test-14
// Verify that the user can access and interact with Sector Allocation CUSTOM section.
//1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Sector Allocation CUSTOM.		
// 3. Set the expression to LessThan and select the month
// 4. Verify that the query detail appears below the input section.	
// 5. In the output section, add the following sub-asset allocation fields:
// -Corpus Percent
// -Portfolio Month(CUSTOM)
// -Market Value(Crs.)
// -Scheme Short Name
// -Sector Name
// -No of Shares
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const smcAttrOptionsInput = [{ option: 'Portfolio Month(CUSTOM)', value: 'May 2025' }];
const smcAttrOptionsOutput = [
    "Corpus Percent",
    "Portfolio Month(CUSTOM)",
    "Market Value(Crs.)",
    "Scheme Short Name",
    "Sector Name",
    "No of Shares"]

test("Verify that the user can access and interact with  Sector Allocation CUSTOM", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Sector Allocation CUSTOM", smcAttrOptionsInput);
    await querybuilder.selectexpression("LessThan");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Sector Allocation CUSTOM", smcAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(smcAttrOptionsOutput);

});

//Test-15--
// Verify that the user can access and interact with Sector Allocation MFI section.
//1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Sector Allocation MFI.		
// 3. Set the expression to EqualTo and select the month
// 4. Verify that the query detail appears below the input section.	
// 5. In the output section, add the following sub-asset allocation fields:
//-Market Value(Crs.)
// -Portfolio Month(MFI)
// -No of Shares
// -Corpus Percent
// -Scheme Short Name
// -Sector Name
// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.

const mfiAttrOptionsInput = [{ option: 'Portfolio Month(MFI)', value: 'May 2025' }];
const mfiAttrOptionsOutput = [
    "Market Value(Crs.)",
    "Portfolio Month(MFI)",
    "No of Shares",
    "Corpus Percent",
    "Scheme Short Name",
    "Sector Name"]

test("Verify that the user can access and interact with   Sector Allocation MFI ", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Sector Allocation MFI", mfiAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Sector Allocation MFI", mfiAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(mfiAttrOptionsOutput);

});


//Test-16
// Verify that the user can access and interact with Yield To Maturity section.
//1. Select the scheme from the dropdown or input field.	
// 2. Navigate to the sidebar and click on Yield To Maturity.		
// 3. Set the expression to EqualTo and select the month
// 4. Verify that the query detail appears below the input section.	
// 5. In the output section, add the following sub-asset allocation fields:
//--Portfolio Month(YTM)
// -Scheme Short Name
// -YTM

// 7. Click on the Search button.	
// 8. Validate that the results are displayed correctly based on the input and output criteria.


const ytmAttrOptionsInput = [{ option: 'Portfolio Month(YTM)', value: 'May 2025' }];
const ytmAttrOptionsOutput = [
    "Portfolio Month(YTM)",
    "Scheme Short Name",
    "YTM"]

test("Verify that the user can access and interact with   Yield To Maturity ", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await querybuilder.open();
    await querybuilder.schemaSelection.searchScheme(schemeName);
    await querybuilder.schemaSelection.selectScheme(schemeName);
    await querybuilder.closedthepopup();
    await querybuilder.selectAndValidateOpions("Yield To Maturity", ytmAttrOptionsInput);
    await querybuilder.selectexpression("EqualTo");
    await querybuilder.togglebutton("IsInput");
    await querybuilder.selectOutputAttributes("Yield To Maturity", ytmAttrOptionsOutput);
    await querybuilder.clickSearchBtn();
    await querybuilder.validateOutputHeaders(ytmAttrOptionsOutput);

})
});



















