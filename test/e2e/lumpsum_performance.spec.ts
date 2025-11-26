import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { LumpsumPerformance } from '@pages/lumpsum_performance.page';

let page: Page;
let lumpsumPerformance : LumpsumPerformance;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(40000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    lumpsumPerformance = new LumpsumPerformance(page);
})

//Franklin India Corporate Debt Fund - Qtly IDCW
//ICICI Prudential Floating Interest Fund - Dir -  Dly IDCW
//ICICI Prudential Floating Interest Fund - Dly IDCW
//ICICI Prudential Money Market Fund - Dir-  Dly IDCW
//ICICI Prudential Money Market Fund - Reg - Dly IDCW
//ICICI Prudential Savings Fund - Dir - Dly IDCW
//ICICI Prudential Savings Fund - Reg - Dly IDCW
//ICICI Prudential Ultra Short Term Fund - Dir - Daily IDCW
//ICICI Prudential Ultra Short Term Fund - Reg - Dly IDCW

//Invesco India - Invesco Global Consumer Trends Fund of Fund - Dir - Growth
//Invesco India - Invesco Global Consumer Trends Fund of Fund - Dir - IDCW


// create mapping with check last day or month
// create mapping with return type CAGR
// create mapping with return type Absolute
// create mapping with return type Simpel Annualised

test("create mapping with single scheme only", async () => {
    test.setTimeout(40000);
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    // date section
    await lumpsumPerformance.dateSelection.selectDate("30 July 2025")
    await lumpsumPerformance.dateSelection.checkLastDayOfMonth()
    await lumpsumPerformance.dateSelection.setInvestedValue("5000")
    await lumpsumPerformance.dateSelection.selectReturnPeriod(["7 Days", "15 Days"])
    await lumpsumPerformance.dateSelection.selectReturnType("CAGR")

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await page.waitForLoadState();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await lumpsumPerformance.showReport([scheme]);

    await page.waitForLoadState()
});

// done Negative
test("create mapping which is already exists", async () => {
      test.setTimeout(40000);
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW"; // already created in previous test
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.dateSelection.selectDate("30 July 2025")
    await lumpsumPerformance.dateSelection.checkLastDayOfMonth()

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validateMapAlreadyPresentErrorMessage();
    await page.waitForLoadState()
});

// done
test("create mapping with multiple scheme and return type absolute", async () => {
      test.setTimeout(40000);
    const schemes = [
        "ICICI Prudential Floating Interest Fund - Dir -  Dly IDCW",
        "ICICI Prudential Floating Interest Fund - Dly IDCW"
    ];
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    for(const scheme of schemes) {
        await lumpsumPerformance.schemaSelection.searchScheme(scheme)
        await lumpsumPerformance.schemaSelection.selectScheme(scheme)
    }

    await lumpsumPerformance.dateSelection.selectDate("30 July 2025")
    await lumpsumPerformance.dateSelection.checkLastDayOfMonth()
    await lumpsumPerformance.dateSelection.selectReturnType("Absolute")

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent(schemes);
    await page.waitForLoadState()
})

// done
test("create mapping with single schema and index only and custom date", async () => {
      test.setTimeout(40000);
    const scheme = "ICICI Prudential Money Market Fund - Dir-  Dly IDCW"
    const index = "BSE 100";
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.searchIndex(index);
    await lumpsumPerformance.index.selectIndex(index);

    await lumpsumPerformance.dateSelection.selectDate("30 July 2025")

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// done
test("create mapping with scheme, customize index, custom date with last day of the month", async () => {
      test.setTimeout(40000);
    const scheme = "ICICI Prudential Money Market Fund - Reg - Dly IDCW"
    const customize_index = "Custom Index Generic";

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCustomizeIndex()
    await lumpsumPerformance.index.searchCustomizeIndex(customize_index);
    await lumpsumPerformance.index.selectCustomizeIndex(customize_index);

    await lumpsumPerformance.dateSelection.selectDate("30 July 2025")
    await lumpsumPerformance.dateSelection.checkLastDayOfMonth()

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// done
test("create mapping with scheme, composite index, invested value and return periods", async () => {
      test.setTimeout(40000);
    const scheme = "ICICI Prudential Savings Fund - Dir - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.dateSelection.setInvestedValue("15000");
    await lumpsumPerformance.dateSelection.selectReturnPeriod(["7 Days", "15 Days"])

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// Negative
test("create mappping with index, customize index or composite index and same addition index", async () => {
      test.setTimeout(40000);
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// Negative
test("create mapping with additioanal index and additional index 2", async () => {
    test.setTimeout(40000);
    const scheme = "ICICI Prudential Ultra Short Term Fund - Dir - Daily IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// Negative
test("create mapping with schema and combined index and composiete or customized", async () => {
    test.setTimeout(40000);
    const scheme = "ICICI Prudential Ultra Short Term Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})
