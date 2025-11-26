import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { StatisticalComprehensive } from '@pages/statistical_comprehensive.page';


let page: Page;
let statisticalComprehensive: StatisticalComprehensive;

test.beforeAll(async ({ browser }, testInfo) => {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    statisticalComprehensive = new StatisticalComprehensive(page);
})

test.afterAll(async () => {
    await page.close();
}
);


// Test-1
// Verify that the user can access and interact with the statistical comprehensive section with default selection only i need to select one scheme and ratio from benchmark 
// step to reproduce:
// 1- login to the application
// 2- Navigate to the Statistical Comprehensive Page[Tools>StatisticalComprehensive]
// 3- Select one scheme from the search scheme section
// 4- Validate after adding the scheme is reflecting in the below selection table
// 5- Navigate to the benchmark section and select ratio section then select all option
// 6- Validate that the ratio is reflecting in the selection tab
// 7- Click on the generate report button
// 8- Validate that the report is generated successfully with the selected scheme and ratio
test.describe('Statistical Comprehensive E2E Tests', () => {
    test('Verify that the user can access and interact with the Statistical Comprehensive section', async () => {
        const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
        await statisticalComprehensive.open();
        await statisticalComprehensive.schemaSelection.searchScheme(schemeName);
        await statisticalComprehensive.schemaSelection.selectScheme(schemeName);
        await statisticalComprehensive.SelectAllRatiosFromBenchmark();
       await statisticalComprehensive.clickGenerateReportBtn();
       await statisticalComprehensive.validateReportGeneration();

    });
});

//Test-2
//Verify that the user can access and interact with the statistical comprehensive section with default selection only i need to select one scheme and switch to AMFI of Period & Date Range Selection and ratio from benchmark 
// step to reproduce:
// 1- login to the application
// 2- Navigate to the statistical comprehensive Page[SchemePerformance>StatisticalComprehensive]
// 3- Select one scheme 2 schemes from the search scheme section
// 4- Validate after adding the scheme is reflecting in the below selection table
// 5- Navigate to the Period & Date Range Selection section and switch to AMFI
// 6- Validate that the AMFI is reflecting in the selection tab
// 7- Navigate to the benchmark section and select ratio section then select all option
// 8- Validate that the ratio is reflecting in the selection tab
// 9- Click on the generate report button
test.describe('Statistical Comprehensive E2E Tests', () => {
test("Verify that the user can access and interact with the Statistical Comprehensive section with AMFI Period & Date Range Selection", async () => {
    const schemeName1 = "Franklin India Corporate Debt Fund - Qtly IDCW";
    const schemeName2 = "HDFC Liquid Fund - Growth";
    await statisticalComprehensive.open();
    await statisticalComprehensive.schemaSelection.searchScheme(schemeName1);
    await statisticalComprehensive.schemaSelection.selectScheme(schemeName1);
    await statisticalComprehensive.schemaSelection.searchScheme(schemeName2);   
    await statisticalComprehensive.schemaSelection.selectScheme(schemeName2);
    await statisticalComprehensive.switchButton("AMFI");
    await statisticalComprehensive.SelectAllRatiosFromBenchmark();
    await statisticalComprehensive.clickGenerateReportBtn();
    await statisticalComprehensive.validateReportGeneration();
});
});