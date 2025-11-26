import { Page, Locator, expect } from '@playwright/test';
import { SchemaSelectionComponent } from "pages/common/schema_selection.component"
import { BasePage } from './common/BasePage';
import { setBorder } from './common/SetBorder.component';
import { title } from 'process';
import { time } from 'console';

export class AdvancePortfolioScanner extends BasePage {


    page: Page;
    path: string = "/Analysis/PTScannerAdvance";
    title: string = "Advanced Portfolio Scanner";
    readonly schemeSelection: SchemaSelectionComponent;
    readonly advancePortfolioScanner: AdvancePortfolioScanner;
    readonly searchSchemeInput: string = "#input-1";
    readonly TypeAmount: string = "//input[@value='amountVal']"


    constructor(page: Page) {
        super(page, "/Analysis/PTScannerAdvance", "Advanced Portfolio Scanner");
        this.page = page;
        this.schemeSelection = new SchemaSelectionComponent(page);

    }

    async addbutton() {
        const selector = "#addNewFund";
        await this.page.waitForSelector(selector, { state: 'visible' });
        await this.page.click(selector);

        await this.page.waitForLoadState('load');

        // issue is that when i add one scheme after that i am not able to add other scheme because add button not visible may waiting time required

    }
    // search and select from the dropdown
    async searchAndSelectScheme(scheme: string) {

        await this.page.locator(this.searchSchemeInput).clear();
        await this.page.fill(this.searchSchemeInput, scheme);
        const dropdownOption = this.page.locator(`//li[normalize-space()="${scheme}"]`);

        await dropdownOption.waitFor({ state: 'visible' });
        await dropdownOption.click({ force: true });
        await this.page.waitForLoadState();
    }


    // scenarios there are three tab -Amount , Unit and Allocation(In%) but by default Amount is select-
    // I need common tab select option so that i can switch the tab
    async switchTab(tab: string) {
        const name = tab.trim();
        const locator = this.page.locator(`//Label[normalize-space()='${name}']`);
        await setBorder(this.page, locator);
        await expect(locator).toBeVisible();
        await locator.click();

    }

    // I need to enter the amount in the amount column name Amount (In Rs.)	by row wise

    async fillAmountForScheme(schemeRowName: string, amount: string) {
        const row = this.page.getByRole('row', { name: schemeRowName });
        const spinButton = row.getByRole('spinbutton');
        await spinButton.click();
        await spinButton.fill(amount);
    }

    async clickShowReport() {
        await this.page.click("//button[normalize-space()='Show Report']");

    }


    async verifyReportDate() {
        const reportDate = await this.page.locator('//div[@class="report-as-on-dt"]/div[contains(text(),"Report Date")]');
        const reportDateText = await reportDate.textContent();

        // Format current date to match "06-Nov-2025"
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = now.toLocaleString('en-US', { month: 'short' });
        const year = now.getFullYear();
        const formattedDate = `${day}-${month}-${year}`
        // i need to set border highligh the report date
        await setBorder(this.page, reportDate);
        expect(reportDateText).toContain(formattedDate);
    }


    // See there is n number of Widget is showing for the selected scheme i need to check each wedget with their title is reflecting with their data 
    // async verifyWidgetData() {


    //   async validateAUCAllocation() {
    //     const locator = this.page.locator("//h2[normalize-space()='AMC Allocation']");
    //     await setBorder(this.page, locator);
    //     await expect(locator).toBeVisible();

    //     const canvas = this.page.locator("//div[@id='highcharts-rbghxqn-26']//*[name()='svg']");
    //     await setBorder(this.page, locator);
    //     await expect(canvas).toBeVisible();

    //     }


    // async validateWidget( expectedWidgets: {title: string}[] ) {
    //     for (const widget of expectedWidgets) {
    //         const widgetTitle = this.page.locator(`//h2[normalize-space()='${widget.title}']`);
    //        // await setBorder(this.page, widgetTitle);
    //         await expect(widgetTitle).toBeVisible({timeout: 10000});


    //         const widgetChart = this.page.locator(`//h2[normalize-space()='${widget.title}']/following-sibling::div//*[name()='svg']`);
    //       //  await setBorder(this.page, widgetChart);
    //         await expect(widgetChart).toBeVisible({timeout: 10000});

    //         console.log(`widget "${widget.title}" is visible with its chart.`);
    //     }


    // }



  




async validateWidget(expectedWidgets: { title: string }[]) {
    const widgetIdMap: Record<string, string> = {
        'AMC Allocation': 'dvchartAMCAllocation',
        'Category Allocation - Current Month': 'dvchartSebiCurrent',
        'Asset Allocation-(Current Month)': 'dvchartAssetCuurent',
        'Asset Allocation-(Previous Month)': 'dvchartAssePrevious',
        'Average for Last 12 Months': 'highcharts-0ch0ucf-17',
        'Market Capitalization(Current Month)': 'dvchartMarketCapCurent',
        'Market Capitalization(Previous Month)': 'dvchartMarketCapPrevious',
        'Sector Allocation(Current Month)': 'tblSectorAllocation',
        'Sector Allocation(Previous Month)': 'tblPreviousSectorAllocation',
        'Sector Allocation-(Average for Last 12 Months)': 'tblSectorAllocationLastMonth',
        'Holding Analysis (Company)- Table': 'tblCompanyHoldingAnalysis',
        'Holding Analysis (Sector)- Table': 'tblSectorHoldingAnalysis',
        'Maturity Profile - Current Month Graph Table': 'DivMaturityProfile',
        'Average Maturity': 'DivAverageMaturity',
        'Instrument Allocation - Top 20-Table': 'tblInstrumentAllocation',
        'Instrument Allocation - Current Month -Table': 'DivInstrumentAllocation',
        'Return Analysis Graph': 'DivReturnAnalysis',
        'P2P Returns (In %)': 'tblP2PReturns',
        'Calendar Year Returns (In %)': 'tblCalendarYearReturns',
        'Lumpsum Performance (Growth of Rs. 10,000)': 'tblLumpsumPerformance',
        'Risk Return Matrix': 'DivRiskRetMatrix',
        'Statistical Comprehensive': 'tblStatisticalComprehensive',
        "What's In": 'tblWhatsIn',
        "What's Out": 'tblWhatsOut',
        'Correlation Matrix': 'tblCorrelationMatrix',
        'Portfolio Overlap Matrix': 'tblPortfolioOverlapMatrix',

    };

    for (const widget of expectedWidgets) {
        console.log(`Validating widget: "${widget.title}"`);

        let widgetLocator;

        // Special handling for Holding Analysis Table
        if (widget.title === "Holding Analysis (Company)- Table") {
            // Locate the <h2> title
            widgetLocator = this.page.locator(
                'xpath=//div[contains(@class, "x_panel")]//h2[normalize-space()="Holding Analysis (Company)"]'
            );
            await expect(widgetLocator).toBeVisible({ timeout: 30000 });
            await setBorder(this.page, widgetLocator);

            // Locate the table by ID
            const tableLocator = this.page.locator(`#${widgetIdMap[widget.title]}`);
            await expect(tableLocator).toBeVisible({ timeout: 30000 });
            await setBorder(this.page, tableLocator);

            console.log(`Widget "${widget.title}" table is visible.`);
            continue;
        }

        // For charts and other widgets
        const mappedId = widgetIdMap[widget.title];

        if (mappedId) {
            // Prefer ID-based locator
            widgetLocator = this.page.locator(`#${mappedId} svg`);
        } else {
            // Fallback: locate by <h2> + sibling SVG
            widgetLocator = this.page.locator(
                `xpath=//h2[normalize-space()="${widget.title}"]/following-sibling::div//*[name()='svg']`
            );
        }

        const count = await widgetLocator.count();
        if (count === 0) {
            console.warn(`No locator found for "${widget.title}". Check widgetIdMap.`);
            continue;
        }

        // Validate visibility and set border
        await expect(widgetLocator.first()).toBeVisible({ timeout: 30000 });
        await setBorder(this.page, widgetLocator.first());

        console.log(`Widget "${widget.title}" chart is visible.`);
    }

    console.log('All expected widgets validated successfully.');
}


//-------------------------------------------



async validateWidgets(expectedWidgets: { title: string }[]) {
    // ✅ Map widget titles to their known container IDs (charts or tables)
    const widgetIdMap: Record<string, string> = {
        'AMC Allocation': 'dvchartAMCAllocation',
        'Category Allocation - Current Month': 'dvchartSebiCurrent',
        'Asset Allocation-(Current Month)': 'dvchartAssetCuurent',
        'Asset Allocation-(Previous Month)': 'dvchartAssePrevious',
        'Average for Last 12 Months': 'highcharts-0ch0ucf-17',
        'Market Capitalization(Current Month)': 'dvchartMarketCapCurent',
        'Market Capitalization(Previous Month)': 'dvchartMarketCapPrevious',
        'Sector Allocation(Current Month)': 'tblSectorAllocation',
        'Sector Allocation(Previous Month)': 'tblPreviousSectorAllocation',
        'Sector Allocation-(Average for Last 12 Months)': 'tblSectorAllocationLastMonth',
        'Holding Analysis (Company)- Table': 'tblCompanyHoldingAnalysis',
        'Holding Analysis (Sector)- Table': 'tblSectorHoldingAnalysis',
        'Maturity Profile - Current Month Graph Table': 'DivMaturityProfile',
        'Average Maturity': 'DivAverageMaturity',
       // 'Instrument Allocation - Top 20-Table': 'tblInstrumentAllocation',
       // 'Instrument Allocation - Current Month -Table': 'DivInstrumentAllocation',
        'Return Analysis Graph': 'DivReturnAnalysis',
        'P2P Returns (In %)': 'tblP2PReturns',
        'Calendar Year Returns (In %)': 'tblCalendarYearReturns',
        'Lumpsum Performance (Growth of Rs. 10,000)': 'tblLumpsumPerformance',
        'Risk Return Matrix': 'DivRiskRetMatrix',
        'Statistical Comprehensive': 'tblStatisticalComprehensive',
        "What's In": 'tblWhatsIn',
        "What's Out": 'tblWhatsOut',
      //  'Correlation Matrix': 'tblCorrelationMatrix',
        'Portfolio Overlap Matrix': 'tblPortfolioOverlapMatrix',
    };

    for (const widget of expectedWidgets) {
        console.log(`\n🧩 Validating widget: "${widget.title}"`);

        let widgetLocator: Locator | null = null;
        const mappedId = widgetIdMap[widget.title];

        // 🟡 Step 1: Handle Holding Analysis (Company)-Table separately
        if (widget.title === "Holding Analysis (Company)- Table") {
            const titleLocator = this.page.locator(
                '//div[contains(@class, "x_panel")]//h2[normalize-space()="Holding Analysis (Company)"]'
            );
            await expect(titleLocator).toBeVisible({ timeout: 30000 });
            await setBorder(this.page, titleLocator);

            const tableLocator = this.page.locator(`#${mappedId}`);
            await expect(tableLocator).toBeVisible({ timeout: 30000 });
            await setBorder(this.page, tableLocator);

            console.log(`✅ Widget "${widget.title}" table is visible.`);
            continue;
        }

        // 🟡 Step 2: Try locating using ID map (preferred)
        if (mappedId) {
            widgetLocator = this.page.locator(`#${mappedId} svg, #${mappedId} table`);
        }

        // 🟡 Step 3: Fallback - dynamic detection by title (if ID not mapped or not found)
        if (!mappedId || (await widgetLocator.count()) === 0) {
            const panel = this.page.locator(
                `//div[contains(@class,'x_panel') and .//h2[contains(normalize-space(), "${widget.title.replace(/- Table$/, '')}")]]`
            );

            if ((await panel.count()) > 0) {
                // Wait for loader if exists
                const loader = panel.locator('md-progress-linear');
                if (await loader.isVisible()) {
                    console.log(`⏳ Waiting for loader in "${widget.title}"...`);
                    await loader.waitFor({ state: 'hidden', timeout: 30000 });
                }

                // Detect chart or table
                const chart = panel.locator('svg');
                const table = panel.locator('table');

                if (await chart.count()) {
                    widgetLocator = chart.first();
                } else if (await table.count()) {
                    widgetLocator = table.first();
                }
            }
        }

        // 🟡 Step 4: Validate found locator
        if (!widgetLocator || (await widgetLocator.count()) === 0) {
            console.warn(`🚫 No locator found for "${widget.title}". Check widgetIdMap or structure.`);
            continue;
        }

       // await widgetLocator.scrollIntoViewIfNeeded();
        await expect(widgetLocator).toBeVisible({ timeout: 30000 });
        await setBorder(this.page, widgetLocator);

        console.log(`✅ Widget "${widget.title}" is visible.`);
    }

    console.log('\n🎯 All expected widgets validated successfully.');
}


   async fillUnitForScheme(schemeRowName: string, unit: string) {
        const row = this.page.getByRole('row', { name: schemeRowName });
        const spinButton = row.getByRole('spinbutton');
        await spinButton.click();
        await spinButton.fill(unit);
    }   

     async fillAllocationForScheme(schemeRowName: string, allocation: string) {
        const row = this.page.getByRole('row', { name: schemeRowName });
        const spinButton = row.getByRole('spinbutton');
        await spinButton.click();
        await spinButton.fill(allocation);
    }  



}


























