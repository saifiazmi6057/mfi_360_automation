import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { Reportbuilder } from '@pages/report_builder.page';
import { ReportReturnType } from '@pages/common/return_type.component';
import { ReportType } from '@type/report-type';
import { AdvanceReturnAnalysisPage } from '@pages/advance_return_analysis.page';
import { MFIPage } from '@pages/common/rating.component';
import * as path from 'path';
import { getPeriodsFromSheet } from '../../utils/excel-reader';



let page: Page;
let reportbuilder: Reportbuilder;
test.beforeAll(async ({ browser }, testInfo) => {
    test.setTimeout(60000);
    page = await browser.newPage();
    await page.setViewportSize({ width: 1366, height: 786 });//(1366x768)
    const login = new Login(page, testInfo);
    await login.login();

    reportbuilder = new Reportbuilder(page);
    const reportType = new ReportReturnType(page);
    const advance_return_analysis = new AdvanceReturnAnalysisPage(page);
    const mfiPage= new MFIPage(page);

});


//Test-1
//Verify that the user can access and interact with return tab , Statistical Ratios and Other Criteria section.

//1. Select the scheme from the dropdown.
// 2. Navigate to the **Return** tab.
// 3. Select both sections under the Return tab.
// 4. Choose the appropriate **Setting Set**.
// 5. Select the **Date Range** (start and end dates).
// 6. Add the **Period** and **Frequency**.
// 7. Select the **Index**.
// 8.Click on build report.
//
//------------------------------------------------------

// 13. Navigate to the **Other Criteria** tab.
// 14. Select **All** options from the Other Criteria section.
// 15. Navigate to the **Rating** section.
// 16. Click on the **Portfolio** tab.
// 17. Select **Top Summary**.
// 18. Choose any **3 options** from the following:
//     - % of Net Asset  
//     - Market Value  
//     - No of Shares  
//     - Market Cap  
//     - Asset Allocation  
//     - No of Scrips  
// 19. Click on the **Build Report** button.

test("Verify that the user can access and interact with return tab , Statistical Ratios and Other Criteria section", async () => {
    const reportTypes = [
        { type: "P2P", period: 3, periodType: "days", frequency: 4, frequencyType: "days", startDate: "1 July 2025", endDate: "5 July 2025" },
        { type: "Both", period: 5, periodType: "days", frequency: 5, frequencyType: "days", startDate: "6 July 2025", endDate: "10 July 2025" }
    ]

    const schemeName = "HDFC Liquid Fund - Growth"
    await reportbuilder.open();
    await reportbuilder.schemaSelection.searchScheme(schemeName);
    await reportbuilder.schemaSelection.selectScheme(schemeName);
    await reportbuilder.switchTab("Returns");
    await reportbuilder.reportTypeSection.selectReportType(ReportType.Both);
    await reportbuilder.selectSettingSet("abs");


    for (const report of reportTypes) {
        await reportbuilder.selectDateRange(report.startDate, report.endDate);
        await reportbuilder.reportTypeSection.selectPeriodForRolling(report.period, report.periodType)
        await reportbuilder.reportTypeSection.selectFrequency(report.frequency, report.frequencyType)
    }

    await reportbuilder.addbothtype();
    await reportbuilder.index.selectAllIndex();
    await reportbuilder.clickShowReport();
});

//Test-2
// Verify Verify that the user can access and interact with  Statistical Ratios tab 
// 1. Navigate to the **Statistical Ratios** tab.
// 2. Verify the selected **Period** and **Date Range**.
// 3. Re-select or confirm **Period** and **Frequency**.
// 4. Click on the **Add** button.
// 5. Check if the **Default Return Setting Set** is selected.
// 6. Navigate to the benchmark section
// 7. Select the all ratios
// 8. click on report builder

test("Verify that the user can access and interact with Statistical Ratios ", async () => {
    const reportTypes = [
        { type: "P2P", period: 3, periodType: "days", frequency: 4, frequencyType: "days", startDate: "1 July 2025", endDate: "5 July 2025" },
        { type: "Both", period: 5, periodType: "days", frequency: 5, frequencyType: "days", startDate: "6 July 2025", endDate: "10 July 2025" }
    ]

    const schemeName = "HDFC Liquid Fund - Growth"
    await reportbuilder.open();
    await reportbuilder.schemaSelection.searchScheme(schemeName);
    await reportbuilder.schemaSelection.selectScheme(schemeName);
    await reportbuilder.switchTab("Statistical Ratios");

    for (const report of reportTypes) {
    await reportbuilder.verifyDateRange(report.startDate, report.endDate);
    await reportbuilder.selectperiodstatisticalratio(report.period, report.periodType)
    await reportbuilder.selectFrequencystatisticalratio(report.frequency, report.frequencyType)
    }
    await reportbuilder.addbutton();
    await reportbuilder.selectSettingSet('abs');

    await reportbuilder.adjustZoomAndNavigateToBenchmark();
    await reportbuilder.selectAllRatiosFromDropdown();
    await reportbuilder.clickShowReport();


});

//Test-3
// Verify Verify that the user can access and interact with  Statistical Ratios tab 
// 1. Navigate to the **Statistical Ratios** tab.
// 2. Verify the selected **Period** and **Date Range**.
// 3. Re-select or confirm **Period** and **Frequency**.
// 4. Click on the **Add** button.
// 5. Check if the **Default Return Setting Set** is selected.
// 6. Navigate to the index section
// 7. Select all index
// 8. click on report builder
    

    test("Verify that the user can access and interact with Statistical Ratios with index ", async (w) => {
    const reportTypes = [
        { type: "P2P", period: 3, periodType: "days", frequency: 4, frequencyType: "days", startDate: "1 July 2025", endDate: "5 July 2025" },
        { type: "Both", period: 5, periodType: "days", frequency: 5, frequencyType: "days", startDate: "6 July 2025", endDate: "10 July 2025" }
    ]

    const schemeName = "HDFC Liquid Fund - Growth"
    await reportbuilder.open();
    await reportbuilder.schemaSelection.searchScheme(schemeName);
    await reportbuilder.schemaSelection.selectScheme(schemeName);
    await reportbuilder.switchTab("Statistical Ratios");

    for (const report of reportTypes) {
    await reportbuilder.verifyDateRange(report.startDate, report.endDate);
    await reportbuilder.selectperiodstatisticalratio(report.period, report.periodType)
    await reportbuilder.selectFrequencystatisticalratio(report.frequency, report.frequencyType)
    }
    await reportbuilder.addbutton();
    await reportbuilder.selectSettingSet('abs');
    await reportbuilder.selectAllRatiosFromDropdown();
    await reportbuilder.checkSchemeBenchmark();
    await reportbuilder.clickShowReport();

    }
);

//test-4
// Verify Verify that the user can access and interact with  other criteria tab 
// 1- 1. Select the scheme from the dropdown.
// 2. Navigate to the **Return** tab.
// 3. Select both sections under the Return tab.
// 4. Choose the appropriate **Setting Set**.
// 5. Select the **Date Range** (start and end dates).
// 6. Add the **Period** and **Frequency**.
// 7. Navigate to the **Other Criteria** tab.
// 8. Select **All** options from the Other Criteria section.
// 9. Navigate to the **Rating** section.
// 10. Click on the **Portfolio** tab.
// 11. Select **Top Summary**.
// 12. Choose any **3 options** from the following:
//     - % of Net Asset  
//     - Market Value  
//     - No of Shares  
//     - Market Cap  
//     - Asset Allocation  
//     - No of Scrips  
// 13. Click on the **Build Report** button.

const userDataFile = path.join(__dirname,'../../data/Performance-08 Oct 25.xlsx');

test("Verify that the user can access and interact with Other Criteria section", async () => {
    const reportTypes = [
        { type: "P2P", period: 3, periodType: "days", frequency: 4, frequencyType: "days", startDate: "1 July 2025", endDate: "5 July 2025" },
        { type: "Both", period: 5, periodType: "days", frequency: 5, frequencyType: "days", startDate: "6 July 2025", endDate: "10 July 2025" }
    ]

    const schemeName = "HDFC Liquid Fund - Growth"
    await reportbuilder.open();
    await reportbuilder.schemaSelection.searchScheme(schemeName);
    await reportbuilder.schemaSelection.selectScheme(schemeName);
    await reportbuilder.switchTab("Returns");
    await reportbuilder.reportTypeSection.selectReportType(ReportType.Both);
    await reportbuilder.selectSettingSet("abs");


    for (const report of reportTypes) {
        await reportbuilder.selectDateRange(report.startDate, report.endDate);
        await reportbuilder.reportTypeSection.selectPeriodForRolling(report.period, report.periodType)
        await reportbuilder.reportTypeSection.selectFrequency(report.frequency, report.frequencyType)
    }

    await reportbuilder.addbothtype();

    //navigate to the Other Criteria
    await reportbuilder.switchTab("Other Criteria");
    await reportbuilder.otherCriteria.selectAll();
    await reportbuilder.mfipage.selectRating('AAA');
    await reportbuilder.mfipage.selectInstrument('ADS');
    
    await reportbuilder.mfipage.checkportfolio();
    await reportbuilder.mfipage.enableTopHolding(3);

    //there are radio button for summary and detailed view
    await reportbuilder.mfipage.selectSummaryView('Summary')

    await reportbuilder.mfipage.toggleMarketValueCheckbox('% of Net Asset');
    await reportbuilder.mfipage.toggleMarketValueCheckbox('Market Value');
    await reportbuilder.mfipage.toggleMarketValueCheckbox('No of Shares');
    await reportbuilder.clickShowReport();



});









    





