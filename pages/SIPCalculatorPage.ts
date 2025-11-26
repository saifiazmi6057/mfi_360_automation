import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from './common/BasePage';
import { SchemaSelectionComponent } from "./common/schema_selection.component";



export class SIPCalculatorPage extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    protected page: Page;



    readonly tab_locator = "//a[normalize-space='%s']"
    private period_dropdown: string = "//button[normalize-space()='Select Period']";
    private period_search_field: string = "//button[normalize-space()='Select Period']";
    private periods_options: string = "//li//span[text()='%s']/..";

    //a[normalize-space()='Top-up SIP'])[1]
    ////a[normalize-space(text())='%s']



    constructor(page: Page) {
        super(page, "SIP/SIPCalculator#!#SumGraph", "SIP Calculator")
        this.page = page;
        this.schemaSelection = new SchemaSelectionComponent(page);

    }

    //Navigate to "please select the scheme" button
    async open() {
        await super.open();
        await this.page.waitForLoadState();
    }




    // There is two tab one is Date Range Tab and another Period Tab
    // I need to check which tab is selected by providing the label name
    //then i need to click on tab

    async isDateRangeTabSelected(): Promise<boolean> {
        return await this.page.locator("//label[normalize-space()='Date Range']").getAttribute('class').then(cls => cls?.includes('active') ?? false);
    }

    async switchDateAndPeriodTab(tabName: string) {

        const locator = this.page.getByRole('button', { name: 'Period' });
        await expect(locator).toBeVisible();
        await locator.click();

    }




    async selectScheme(schemeName: string) {
        await this.page.click('div#schemeSelection');
        await this.page.click(`text=${schemeName}`);
    }

    async selectSEBIMapping() {
        await this.page.click("span[id='sebimapping'] span[role='button']");
    }



    async switchTab(tab: string) {
        const name = tab.trim();
        const locator = this.page.locator(`//a[normalize-space()='${name}']`);
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async fillSIPAmount(amount: number) {
        await this.page.fill("//input[@ng-model='SIPBasicAmt']", amount.toString());
    }

    async selectSinceInception() {
        await this.page.click("//span[contains(text(),'Since Inception')]");
    }

    async selectReportDate(date: string) {
        await this.page.fill("//input[@id='AsOnDateSIPBasic']", date);
    }

    async submit() {
        await this.page.click("//button[@id='ShowSIPReport']");
        await this.page.waitForLoadState();
    }


    async isSummaryReportTabVisible() {
        return await this.page.locator("//a[normalize-space()='Summary Report']").isVisible();

    }

    async isDetailedReportTabVisible() {
        return await this.page.locator("//a[normalize-space()='Detailed Report']").isVisible();
    }


    async SelectSchemeBenchmarkSuitableIndex() {
        await this.page.click("//span[@id='schemebenchmark']//span[@role='button']");
    }



    // i need to select the  period from the dropdown and dropdown contain check box of multiple option and also search box to search the period

    async selectPeriodFromDropdown(periods: string[]) {
        const periodDropdown = this.page.locator("//button[normalize-space()='Select Period']");
        const searchField = this.page.locator("//input[@placeholder='Search...']");
        await periodDropdown.click();

        for (const period of periods) {
            await searchField.clear();
            await searchField.fill(period);
            const periodLocator = this.page.locator(`//li//span[text()='%s']/..`.replace('%s', period));
            if (await periodLocator.isVisible()) {
                await periodLocator.click();
            } else {
                console.warn(`Period ${period} not found in the dropdown.`);
            }
        }
        await this.page.mouse.click(0, 0);
    }


    // i need to switch tab date and periodwise 

    async switchTab1(tab: string) {
        const name = tab.trim();
        const locator = this.page.locator(`//label[normalize-space()='${name}']`);
        await expect(locator).toBeVisible();
        await locator.click();

    }




    async selectSIPDay(day: string) {
        const SIPDaysDropdown = this.page.locator("select[ng-model='PeriodwiseTopupSIPDate']");
        await SIPDaysDropdown.selectOption({ label: day });
    }
    //  i need to select period  from the dropdown

    async ChooseSipPeriod(period: string) {
        const SIPDaysDropdown = this.page.locator("select[ng-model='PeriodwiseTopupSIPPeriod']");
        await SIPDaysDropdown.selectOption({ label: period });
    }

    async fillSIPAmount1(amount: number) {
        await this.page.fill("//input[@ng-model='SIPPeriodwiseAmt']", amount.toString());
    }

    async selectFrequency(frequency: string) {
        await this.page.selectOption("//select[@ng-model='SIPPeriodwiseFeq']", frequency)

    }

    // after submit it will navigate to the myTabContent page which contain two tab one is summary report and other is detailt report- i need to first check summary report data available and then swtich for detail report section and validate the date
    async switchtablecontent(tab: string) {
        const name = tab.trim();
        const locator = this.page.locator(`//a[normalize-space()='${name}']`);
        await expect(locator).toBeVisible();
        await locator.click();
    }

    
    async addbutton() {
        const selector = "//button[@ng-click='AddTopupSIPRec()']";
        await this.page.waitForSelector(selector, { state: 'visible' });
        await this.page.click(selector);
    }

    async TypeSIPAmount(amount: number) {
        await this.page.fill("//input[@ng-model='SIPDatewiseAmt']", amount.toString());
    }

     async ChooseFrequencyDatewise(frequency: string) {
        await this.page.selectOption("//select[@ng-model='SIPDatewiseFeq']", frequency)

    }

       async selectSIPDatewise(day: string) {
        const SIPDaysDropdown = this.page.locator("select[ng-model='DatawiseTopupSIPDate']");
        await SIPDaysDropdown.selectOption({ label: day });
    }

   
// async selectDateRange(fromDate: string, toDate: string): Promise<void> {
//     // Click the date range input to open the calendar
//     await this.page.locator("#FromToDateRangeTopup").click();

//     // Select the 'from' date
//     await this.page.locator(`//td[@data-date='${fromDate}']`).click();

//     // Select the 'to' date
//     await this.page.locator(`//td[@data-date='${toDate}']`).click();
// }
async selectDateRange(from: { day: number, month: number, year: number }, to: { day: number, month: number, year: number }): Promise<void> {
    // Step 1: Click the input to open the calendar
    await this.page.locator("#FromToDateRangeTopup").click();

    // Step 2: Find the first visible calendar container
    const calendarContainers = this.page.locator(".daterangepicker.dropdown-menu.ltr.show-calendar");
    const count = await calendarContainers.count();

    let visibleCalendar;
    for (let i = 0; i < count; i++) {
        const candidate = calendarContainers.nth(i);
        if (await candidate.isVisible()) {
            visibleCalendar = candidate;
            break;
        }
    }

    if (!visibleCalendar) {
        throw new Error("No visible calendar found after opening date range picker.");
    }

    // Step 3: Select month and year in left calendar (start date)
    await visibleCalendar.locator(".calendar.left .monthselect").selectOption(from.month.toString()); // 0-based
    await visibleCalendar.locator(".calendar.left .yearselect").selectOption(from.year.toString());

    // Step 4: Click the day in left calendar (exclude 'off' dates)
    await visibleCalendar.locator(`.calendar.left td.available:not(.off):text-is("${from.day}")`).click();

    // Step 5: Select month and year in right calendar (end date)
    await visibleCalendar.locator(".calendar.right .monthselect").selectOption(to.month.toString()); // 0-based
    await visibleCalendar.locator(".calendar.right .yearselect").selectOption(to.year.toString());

    // Step 6: Click the day in right calendar (exclude 'off' dates)
    await visibleCalendar.locator(`.calendar.right td.available:not(.off):text-is("${to.day}")`).click();

    // Step 7: Click Apply if present
    const applyButton = visibleCalendar.locator("button:has-text('Apply')");
    if (await applyButton.isVisible()) {
        await applyButton.click();
    }
}

// i need to download the xl file and validate the data
async downloadExcel() {
    const downloadButton = this.page.locator("//a[@title='Export to Excel']");
    await downloadButton.click();
    await this.page.waitForLoadState();


}
}




