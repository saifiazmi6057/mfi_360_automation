import { expect, Page } from '@playwright/test';
import { BasePage } from './common/BasePage';
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { ReportReturnType } from "@pages/common/return_type.component";
import { ReportType } from '@type/report-type';
import { Index } from "@pages/common/Index.component";
import { OtherCriteria } from "@pages/common/other_criteria.component";
import { MFIPage } from './common/rating.component';


export class Reportbuilder extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    //reportTypeSection: ReportReturnType;
    protected page: Page;
    readonly tab_locator = "//a[text()='%s']"
    reportTypeSection: ReportReturnType;
    otherCriteria: OtherCriteria;
    index: Index;
    mfipage: MFIPage;
    private Scheme_Benchmark_Suitable_Index  ="span[id='StatisticalRatioIndexSelectionchkIsSchemeIndex'] span[role='button']";
    
    constructor(page: Page) {
        super(page, "Report/MFReportBuilder", "Report Builder")
        this.page = page;
        this.schemaSelection = new SchemaSelectionComponent(page);
        this.reportTypeSection = new ReportReturnType(page);
        this.index = new Index(page);
        this.otherCriteria = new OtherCriteria(page, "Advanced Return Analysis");
        this.mfipage= new MFIPage(page);



    }


    async switchTab(tab: string) {
        const locator = this.tab_locator.replace('%s', tab);
        await this.page.click(locator);
    }

    // async selectSettingSet(settingSet: string) {
    //     const s2 = '//label[text()="Select Setting Set"]';
    //     const dropdownParent = this.page.locator(s2).filter({ visible: true });
    //     await dropdownParent.waitFor({ state: 'visible' });
    //     const parent = dropdownParent.locator("..").locator("#DrpSettingSet_chosen")
    //     await parent.click();

    //     const settingOption = this.page.locator(`//ul[@class='chosen-results']//li[normalize-space()='${settingSet}']`);
    //     await settingOption.click();
    // }

    async selectSettingSet(settingSet: string) {
        const labelLocator = this.page.locator('//label[text()="Select Setting Set"]');
        const dropdownParent = labelLocator.filter({ visible: true });
        await dropdownParent.waitFor({ state: 'visible' });

        const parent = dropdownParent.locator('..').locator('#DrpSettingSet_chosen');
        await parent.click();

        const settingOption = this.page.locator(`//ul[@class='chosen-results']//li[normalize-space()='${settingSet}']`);
        await settingOption.waitFor({ state: 'visible', timeout: 5000 }); // ✅ Add timeout to avoid test ending abruptly
        await settingOption.click();
    }


    async addbothtype() {
        const selector = "button[ng-click='AddMultipleDateSel()']"
        await this.page.waitForSelector(selector, { state: 'visible' });
        await this.page.click(selector);
    }

    async verifyDateRange(start: string, end: string) {
        const dateRangePicker = this.page.locator("//h2[normalize-space()='Period & Date Range Selection']")
        const visiblePicker = dateRangePicker.filter({ visible: true });
        await visiblePicker.nth(0).click();

        const startDatePicker = this.page.locator("#Statsfromdate")
        const visibleStartDate = startDatePicker.filter({ visible: true });
        const startInput = visibleStartDate.nth(0);
        await startInput.fill(start);
        await startInput.press('Enter')

        const endDatePicker = this.page.locator('#StatsToDate')
        const visibleEndDate = endDatePicker.filter({ visible: true });
        const endInput = visibleEndDate.nth(0);
        await endInput.fill(end);
        await endInput.press('Enter');
        await visiblePicker.nth(0).press('Enter');
    }

    async selectperiodstatisticalratio(count: number, dayOrMonth: string) {
        const period = await this.page.locator("#txtStatsPeriod");
        await period.fill(count.toString())
        if (dayOrMonth.toLocaleLowerCase() == "days")
            this.page.click("//label[@ng-class='StatsDaysClass']")
        else {
            this.page.click("//label[@ng-class='StatsMonthClass']")
        }
    }

    async selectFrequencystatisticalratio(count: number, dayOrMonth: string) {
        await this.page.fill("#txtStatsFreq", count.toString())
        if (dayOrMonth.toLocaleLowerCase() == 'days')
            await this.page.click("//label[@ng-class='StatsFreqDaysClass']");
        else
            await this.page.click("//label[@ng-class='StatsFreqMonthClass']");
    }

    async addbutton() {
        const selector = "//button[@ng-click='AddMultipleRatioDateSel()']";
        await this.page.waitForSelector(selector, { state: 'visible' });
        await this.page.click(selector);
    }

    async adjustZoomAndNavigateToBenchmark() {
        // Reduce zoom to 75%
        await this.page.evaluate(() => {
            document.body.style.zoom = '75%';
        });

        // Wait and click the benchmark section
        const benchmarkTab = this.page.locator("//h2[normalize-space()='Benchmark Selection']");
        await benchmarkTab.waitFor({ state: 'visible' });
        await benchmarkTab.click();
    }


    async selectAllRatiosFromDropdown() {
        const dropdown = this.page.locator("div[id='divMultiRatios'] button[type='button']"); // Adjust ID as needed
        await dropdown.click();

        const selectAllOption = this.page.locator("//div[@id='divMultiRatios']//ul/li/span[normalize-space()='Select All']");
        await selectAllOption.click();

        // Optional: click outside to close dropdown
        await this.page.click('body');

    }

    async checkSchemeBenchmark(isTriCheck: boolean = false) {
        await this.page.waitForSelector(this.Scheme_Benchmark_Suitable_Index);
    }


    async selectDateRange(start: string, end: string) {
    try {
        if (this.page.isClosed()) {
            console.warn("Page is already closed. Cannot proceed with date selection.");
            return;
        }

        const dateRangePicker = this.page.locator('[name="FromToDateRange"]');
        const visiblePicker = dateRangePicker.filter({ visible: true });

        if (await visiblePicker.count() === 0) {
            console.warn("Date range picker not visible.");
            return;
        }

        await visiblePicker.nth(0).click();

        const startDatePicker = this.page.locator("[name='daterangepicker_start']");
        const visibleStartDate = startDatePicker.filter({ visible: true });

        if (await visibleStartDate.count() === 0) {
            console.warn("Start date input not visible.");
            return;
        }

        const startInput = visibleStartDate.nth(0);
        await startInput.fill(start);
        await startInput.press('Enter');

        const endDatePicker = this.page.locator('[name="daterangepicker_end"]');
        const visibleEndDate = endDatePicker.filter({ visible: true });

        if (await visibleEndDate.count() === 0) {
            console.warn("End date input not visible.");
            return;
        }

        const endInput = visibleEndDate.nth(0);
        await endInput.fill(end);
        await endInput.press('Enter');

    } catch (error) {
        console.error("Error in selectDateRange:", error);
    }
}

    


}
