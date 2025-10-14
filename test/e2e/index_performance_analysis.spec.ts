import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { ReportType } from '@type/report-type';
import { IndexPerformanceAnalysis } from '@pages/index_performance_analysis.page';

let page: Page;
let indexPerformanceAnalysis: IndexPerformanceAnalysis;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    indexPerformanceAnalysis = new IndexPerformanceAnalysis(page);
})

test.afterAll( async() => {
    await page.close()
})


// 1. Verify P2P report with single index with other criteria '52 Week High'
// 2. Verify Rolling report with multiple index customize index , other criteria '52 Week High'
// 3. Verify Fixed perodic with single composite index, other criteria '52 Week High' and show rank, show min max
// 4. Verify P2P report with single index and customize index combination and other criteria multiple with check rank and min max 
// 5. Verify Rolling report with single composite index and customize index combination and other criteria multiple with check show min max 
// 6. Verify Fixed Perodic report with single composite index and customize index combination and other criteria multiple with check show min max 
//        check fixed period data with actual date
//        all other criteria
//        show min max other criteria

test("Verify 'P2P' report with single index with other criteria '52 Week High'", async () => {
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    await indexPerformanceAnalysis.index.searchIndex("BSE Sensex")
    await indexPerformanceAnalysis.index.selectIndex("BSE Sensex")

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.P2P)
    await indexPerformanceAnalysis.returnType.selectPeriodsForP2P(["1 Day", "3 Days"])
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");
    await indexPerformanceAnalysis.otherCriteria.select("52 Week High")

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
});

test("Verify 'Rolling' report with multiple index customize index , other criteria '52 Week Low'", async () => {
    const indexes = ["BSE Sensex", "BSE SENSEX Next 30 Index"];
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    for(const index of indexes) {
        await indexPerformanceAnalysis.index.searchIndex(index)
        await indexPerformanceAnalysis.index.selectIndex(index)
    }

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.Rolling)
    await indexPerformanceAnalysis.returnType.checkWithCalculationDate();
    await indexPerformanceAnalysis.returnType.selectPeriodForRolling(5, "days")
    await indexPerformanceAnalysis.returnType.selectFrequency(5, "days");
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");

    await indexPerformanceAnalysis.otherCriteria.select("52 Week Low")

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
});

test("Verify 'Fixed perodic' with single composite index, other criteria '52 Week High' and show rank, show min max", async () => {
    const indexes = ["Composite index personal"];
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    await indexPerformanceAnalysis.index.expandSectionCompositeIndex();
    for(const index of indexes) {
        await indexPerformanceAnalysis.index.searchCompositeIndex(index)
        await indexPerformanceAnalysis.index.selectCompositeIndex(index)
    }

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.FixedPeriodic)
    await indexPerformanceAnalysis.returnType.selectPeriodsForFixed("MoM")
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");
    await indexPerformanceAnalysis.otherCriteria.select("52 Week High")

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
});

test("Verify P2P report with single index and customize index combination and other criteria multiple with check rank and min max ", async () => {
    const index = "BSE 100";
    const customize_index = "Custom Index Generic";
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    await indexPerformanceAnalysis.index.searchIndex(index);
    await indexPerformanceAnalysis.index.selectIndex(index);
    await indexPerformanceAnalysis.index.expandSectionCustomizeIndex();
    await indexPerformanceAnalysis.index.searchCustomizeIndex(customize_index);
    await indexPerformanceAnalysis.index.selectCustomizeIndex(customize_index);

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.P2P)
    await indexPerformanceAnalysis.returnType.selectPeriodsForP2P(["1 Day", "3 Days"])
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");

    await indexPerformanceAnalysis.otherCriteria.select("52 Week High")
    await indexPerformanceAnalysis.otherCriteria.select("52 Week Low")
    await indexPerformanceAnalysis.otherCriteria.select("Highest Index Value")
    await indexPerformanceAnalysis.otherCriteria.checkShowRank();
    await indexPerformanceAnalysis.otherCriteria.checkSchemeShowMinMaxAvg();

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
})

test("Verify Rolling report with single composite index and customize index combination and other criteria multiple with check rank and min max", async () => {
    const customize_index = "Custom Index Generic";
    const composite_index = "Composite index personal";
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    await indexPerformanceAnalysis.index.expandSectionCustomizeIndex();
    await indexPerformanceAnalysis.index.searchCustomizeIndex(customize_index);
    await indexPerformanceAnalysis.index.selectCustomizeIndex(customize_index);
    
    await indexPerformanceAnalysis.index.expandSectionCompositeIndex();
    await indexPerformanceAnalysis.index.selectCompositeIndex(composite_index);
    await indexPerformanceAnalysis.index.selectCompositeIndex(composite_index);

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.Rolling)
    await indexPerformanceAnalysis.returnType.checkSinceInceptionIndex();
    await indexPerformanceAnalysis.returnType.checkWithCalculationDate();
    await indexPerformanceAnalysis.returnType.selectFrequency(5, "days");
    await indexPerformanceAnalysis.returnType.selectPeriodForRolling(3, "days");
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");

    await indexPerformanceAnalysis.otherCriteria.select("52 Week High")
    await indexPerformanceAnalysis.otherCriteria.select("52 Week Low")
    await indexPerformanceAnalysis.otherCriteria.select("Highest Index Value")
    await indexPerformanceAnalysis.otherCriteria.checkShowMinMaxAvg();

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
})

test("Verify Fixed Perodic report with single composite index and customize index combination and other criteria multiple with check show min max", async () => {
    const customize_index = "Custom Index Generic";
    const composite_index = "Composite index personal";
    await indexPerformanceAnalysis.open();

    await page.waitForLoadState();
    await page.waitForTimeout(15000)

    await indexPerformanceAnalysis.index.expandSectionCustomizeIndex();
    await indexPerformanceAnalysis.index.searchCustomizeIndex(customize_index);
    await indexPerformanceAnalysis.index.selectCustomizeIndex(customize_index);
    
    await indexPerformanceAnalysis.index.expandSectionCompositeIndex();
    await indexPerformanceAnalysis.index.searchCompositeIndex(composite_index);
    await indexPerformanceAnalysis.index.selectCompositeIndex(composite_index);

    await indexPerformanceAnalysis.returnType.selectReportType(ReportType.FixedPeriodic)
    await indexPerformanceAnalysis.returnType.selectPeriodsForFixed("MoM")
    await indexPerformanceAnalysis.returnType.checkFixedPeriodDataWithActualtDate();
    await indexPerformanceAnalysis.returnType.selectSettingSet("abs");

    await indexPerformanceAnalysis.otherCriteria.select("52 Week High")
    await indexPerformanceAnalysis.otherCriteria.select("52 Week Low")
    await indexPerformanceAnalysis.otherCriteria.select("Highest Index Value")
    await indexPerformanceAnalysis.otherCriteria.checkShowMinMaxAvg();

    await indexPerformanceAnalysis.showReport();

    await page.waitForLoadState();
})