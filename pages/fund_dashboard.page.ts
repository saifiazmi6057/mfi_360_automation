import { expect, Page } from "playwright/test";
import { setBorder } from "utils/util";

export class FundDashboardPage {
    page: Page;
    private mutualFundDropdown: string = '#LstAMC';
    private categoryDropdown: string = "#LstNature";
    private subCategoryDropdown: string = "#LstSubNature";
    private fundDropdown: string = "#LstFund";
    private title: string = "div.page-title h3"

    private expandDetailsButton: string = "//i[@class='fa fa-chevron-down']";
    private fundTitle: string = "h2[class='ng-binding']";
    private returnsTab: string = "#tab-profile-5";
    private statisticalRatiosTab: string = "#ratio-tab2";
    private ratiosSection: string = "div[class='col-md-12 col-sm-12 col-xs-12']";
    private portfolio: string = "#portfolio-tab2";
    private othersTab: string = "#profile-tab2";


    private fundSnapshot: any = {
        fundDetails: {
            mutual_Fund_Name: "//tr//b[normalize-space()='Mutual Fund Name']/../../td",
            benchmark_Index: "//td[normalize-space()='NIFTY Low Duration Debt Index A-I*']",
            fund_Manager: "//td[contains(text(),'Kaustubh Gupta,')]",
            launch_Date: "//td[normalize-space()='05-Jun-2003']",
            aum: "//tr[th[normalize-space()='AUM (In ₹ Crore)']]/td",
            exit_Load: "//td[normalize-space()='Nil']",
            scheme_Nature: "//td[normalize-space()='Debt']",
            scheme_Sub_Nature: "//td[normalize-space()='Floater Fund']",
            //balanced_Advantage: "//td[normalize-space()='122650']",
            amfi_Code: "//td[normalize-space()='122650']",
            rta_Code: "//td[normalize-space()='B152G']",
            minimum_Investment: "//td[normalize-space()='1,000.00']",
            expense_Ratio: "//td[normalize-space()='0.36%']",
        },
        aumMovementGraph: "#barcontainer svg",
        fundvsindex: "div#DvNavMovement svg",
        fundmanagerperiodsGraph: "div#FundManagercontainer svg",
        fundmanagerperiodsdetail: "#tblFundSnapShot"

    }

    private returns: any = {
        p2pReturnsChart: "(//div[@class='col-md-6 col-sm-6 col-xs-12'])[5]",
        calendarYearReturnsChart: " //div[@class='x_panel' and @data-step='2']",
        lumpsumPerformanceChart: "#tblLumpsumPerformance",
        rollingReturnsChart: "(//div[@class='col-md-12 col-sm-12 col-xs-12'])[2]",
        rollingReturnsGraph: "//*[@id='DirrFundDashboardRatio']/div[6]"
    }

    private riskReturnMatrixGraph: string = ".col-md-12.col-sm-12.col-xs-12.m-t-sm.m-b-sm";
    private showLegendButton: string = "//button[normalize-space()='Show Legend']";
    private displayedLegendDetails: string = "#customLegend";
    private hideLegendButton: string = "//button[normalize-space()='Hide Legend']";
    private top10HoldingsSection: string = "#tblTop10Holdings";
    private top5SectorsSection: string = "#tblTop5Sectors";
    //..
    private instrumentAllocationSection: string = "#ChartInstrumentAllocation";
    private ratingAllocationDetails: string = "#ChartAverageMaturity";
    private ratingAllocation: string = "#CreditQualitycontainer";
    private averageMaturity: string = "(//div[@class='col-xs-12 col-sm-6 col-md-6 m-t-xs'])[2]";
    private whatsInSection: string = "(//div[@class='col-md-6 col-sm-12 col-xs-12'])[1]";
    private whatsOutSection: string = "(//div[@class='col-md-6 col-sm-12 col-xs-12'])[2]";
    private detailedPortfolioSection: string = "#DvPortfolioDetails";

    //..

    private minLumpsumInvestment: string = "(//div[@class='col-lg-2 col-md-2 col-sm-4 col-xs-12 ng-scope'])[1]";
    private monthlySIPDates: string = "(//div[@class='col-lg-2 col-md-2 col-sm-4 col-xs-12 ng-scope'])[2]";
    private stylebox: string = "(//div[@class='databox radius-bordered databox-shadowed'])[3]";
    // private peRatio: string = "//div[normalize-space()='P/E Ratio']/following-sibling::div";
    // private pbRatio: string = "//div[normalize-space()='P/B Ratio']/following-sibling::div";
    private YTM: string = "//div[normalize-space()='YTM']/following-sibling::div";
    private averageMaturitytab: string = "(//div[@class='databox radius-bordered databox-shadowed'])[5]";
    private macaulayDuration: string = "//div[normalize-space()='Macaulay Duration']/following-sibling::div";
    //private dividendYield: string = "//div[normalize-space()='Dividend Yield']/following-sibling::div";
    private fundComparisonSection: string = "#tblFundComparison";
    private dividendHistory: string = "//md-progress-linear[@ng-show='FDOthers.DividendHistoryLoader']//following-sibling::div[@class='x_panel']";
    private amcNewsSection: string = "//div[normalize-space()='AMC/Fund News']/following-sibling::div";
    private addendums: string = "//div[normalize-space()='Addendums']/following-sibling::div";
    // private portfolioTurnoverRatio: string = "//div[normalize-space()='Portfolio Turnover Ratio']/following-sibling::div";
    // private weightedAverageMarketCap: string = "//div[normalize-space()='Weighted Average Market Cap']/following-sibling::div";
    private fundDatabox: string  = "//div[contains(@ng-if,\"natureName == 'Debt'\")]";

    expandDetailsSectionLocator: any;
    FundTitle: any;


    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto("/FundDashboard/Index")
        await this.page.waitForLoadState()
        await expect(this.page.locator(this.title)).toContainText('Fund Dashboard');
    }

    async selectMutualFund(fundName: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const mutualFundDropdown = this.page.locator(this.mutualFundDropdown);
        await mutualFundDropdown.selectOption(fundName);
    }

    async selectCategory(category: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const categoryDropdown = this.page.locator(this.categoryDropdown);
        await categoryDropdown.selectOption(category);
    }

    async selectSubCategory(subCategory: string) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        const subCategoryDropdown = this.page.locator(this.subCategoryDropdown);
        await subCategoryDropdown.selectOption(subCategory);
    }

    async selectFund(fundName: string) {
        const fundDropdown = this.page.locator(this.fundDropdown);
        await fundDropdown.selectOption(fundName);
    }

    async expandDetailsSection() {
        const sideArrow = this.page.locator('//i[@class="fa fa-chevron-down"]');
        await sideArrow.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('div#filter1')).toBeVisible();
    }
    async collapseDetailsSection() {
        const sideArrow = this.page.locator('//i[@class="fa fa-chevron-up"]');
        await sideArrow.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page.locator('div#filter1')).toBeHidden();
    }

    async validateMutualFundName(name: string) {
        await expect(this.page.locator(this.fundTitle)).toContainText(name);


    }
    async validatefunddetail() {
        const fundDetailsFields = [
            'Mutual Fund Name',
            'Benchmark Index',
            'Fund Manager',
            'Launch Date',
            'AUM (In ₹ Crore)',
            'Exit Load',
            'Scheme Nature',
            'Scheme Sub Nature',
            'Balanced Advantage',
            'AMFI Code',
            'RTA Code',
            'Minimum Investment',
            'Expense Ratio (Monthly)'
        ];

        await setBorder(this.page, this.fundSnapshot.fundDetails.mutual_Fund_Name);//for highlight the step
        await expect(this.page.locator(this.fundSnapshot.fundDetails.mutual_Fund_Name)).toContainText('Aditya Birla Sun Life Mutual Fund');

        await setBorder(this.page, this.fundSnapshot.fundDetails.benchmark_Index);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.benchmark_Index)).toContainText('NIFTY Low Duration Debt Index A-I*');

        await setBorder(this.page, this.fundSnapshot.fundDetails.fund_Manager);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.fund_Manager)).toContainText('Kaustubh Gupta, Harshil Suvarnkar');

        await setBorder(this.page, this.fundSnapshot.fundDetails.launch_Date);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.launch_Date)).toContainText('05-Jun-2003');

        await setBorder(this.page, this.fundSnapshot.fundDetails.aum);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.aum)).not.toHaveText('');

        await setBorder(this.page, this.fundSnapshot.fundDetails.exit_Load);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.exit_Load)).toContainText('Nil');

        await setBorder(this.page, this.fundSnapshot.fundDetails.scheme_Nature);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.scheme_Nature)).toContainText('Debt');

        await setBorder(this.page, this.fundSnapshot.fundDetails.scheme_Sub_Nature);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.scheme_Sub_Nature)).toContainText('Floater Fund');

        await setBorder(this.page, this.fundSnapshot.fundDetails.amfi_Code);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.amfi_Code)).toContainText('122650');

        await setBorder(this.page, this.fundSnapshot.fundDetails.rta_Code);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.rta_Code)).toContainText('B152G');

        await setBorder(this.page, this.fundSnapshot.fundDetails.minimum_Investment);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.minimum_Investment)).toContainText('1,000.00');

        await setBorder(this.page, this.fundSnapshot.fundDetails.expense_Ratio);
        await expect(this.page.locator(this.fundSnapshot.fundDetails.expense_Ratio)).toContainText('0.36%');
    }

    async validateAUMChartVisible() {
        const locator = this.page.locator(this.fundSnapshot.aumMovementGraph);
        await setBorder(this.page, this.fundSnapshot.aumMovementGraph);
        await expect(locator).toBeVisible();
    }

    async validateFundVsIndexChartVisible() {
        const locator = this.page.locator(this.fundSnapshot.fundvsindex);
        await locator.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.fundSnapshot.fundvsindex);
        await expect(locator).toBeVisible();
    }

    async validateFundManagerPeriodsChartVisible() {
        const locator = this.page.locator(this.fundSnapshot.fundmanagerperiodsGraph);
        await locator.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.fundSnapshot.fundmanagerperiodsGraph);
        await expect(locator).toBeVisible();
    }

    // // Validate Manager Name, Management Period, and Return (%)

    async validateFundManagerPeriodsDetails() {
        await setBorder(this.page, "#tblFundSnapShot tbody td");

        const cellLocators = this.page.locator("#tblFundSnapShot tbody td");
        await cellLocators.first().waitFor();
        const allTextContents = await cellLocators.allTextContents();

        //console.log(cellLocators.count());

        for (const textContent of allTextContents) {
            expect(textContent).not.toBe('');
            console.log(`Text content: ${textContent}`);
        }
    }

    // async selectTabProfile(tabProfile: string) {
    //     await this.page.click(tabProfile);
    //}

    async clickReturnsTab() {
        await this.page.click(this.returnsTab);
    }


    async validateP2PReturnsChartVisible() {
        const locator = this.page.locator(this.returns.p2pReturnsChart);
        await setBorder(this.page, this.returns.p2pReturnsChart);
        await expect(locator).toBeVisible();
    }

    async validateCalendarYearReturnsChartVisible() {
        const locator = this.page.locator(this.returns.calendarYearReturnsChart);
        await setBorder(this.page, this.returns.calendarYearReturnsChart);
        await expect(locator).toBeVisible();

    }

    async validateLumpsumPerformanceChartVisible() {
        const locator = this.page.locator(this.returns.lumpsumPerformanceChart);
        await locator.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.returns.lumpsumPerformanceChart);
        await expect(locator).toBeVisible();
    }

    async validateRollingReturnsChartVisible() {
        const locator = this.page.locator(this.returns.rollingReturnsChart);
        await locator.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.returns.rollingReturnsChart);
        await expect(locator).toBeVisible();

    }

    async validateRollingReturnsGraphVisible() {
        const locator = this.page.locator(this.returns.rollingReturnsGraph);
        await locator.scrollIntoViewIfNeeded();

     //   await locator.waitFor({ state: 'visible', timeout: 10000 });
        await setBorder(this.page, this.returns.rollingReturnsGraph);

        await expect(locator).toBeVisible();
    }


    async statisticalRatios() {
        await this.page.click(this.statisticalRatiosTab);
    }

    async validateRatiosSectionVisible() {
        const locator = this.page.locator(this.ratiosSection);
        await setBorder(this.page, this.ratiosSection);
        await expect(locator).toBeVisible();
    }

    async validateRiskReturnMatrixGraphVisible() {
        const locator = this.page.locator(this.riskReturnMatrixGraph);
        await setBorder(this.page, this.riskReturnMatrixGraph);
        await expect(locator).toBeVisible();
    }

    async validateShowLegendButtonFunctionality() {
        const locator = this.page.locator(this.showLegendButton);
        await setBorder(this.page, this.showLegendButton);
        await expect(locator).toBeVisible();


        await locator.click();

       // await this.page.waitForTimeout(45000);

        // Wait for the legend details to appear
        const legendDetails = this.page.locator(this.displayedLegendDetails);
        await setBorder(this.page, this.showLegendButton);
        await expect(legendDetails).toBeVisible();

        await this.page.locator(this.hideLegendButton).click();

        // Validate legend details are hidden
        await expect(legendDetails).toBeHidden();

    }

    async portfolioTab() {
        await this.page.click(this.portfolio);
    }

    async validateTop10HoldingsSection() {
        const top10HoldingsSection = this.page.locator(this.top10HoldingsSection);
        await setBorder(this.page, this.top10HoldingsSection);
        await expect(top10HoldingsSection).toBeVisible();
    }

    async validateTop5SectorsSection() {
        const top5SectorsSection = this.page.locator(this.top5SectorsSection);
        await setBorder(this.page, this.top5SectorsSection);
        await expect(top5SectorsSection).toBeVisible();
    }

    async validateInstrumentAllocationSection() {
        const instrumentAllocationSection = this.page.locator(this.instrumentAllocationSection);
        await instrumentAllocationSection.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.instrumentAllocationSection);
        await expect(instrumentAllocationSection).toBeVisible();
    }

    async validateAverageMaturity() {
        const averageMaturity = this.page.locator(this.averageMaturity);
        await averageMaturity.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.averageMaturity);
        await expect(averageMaturity).toBeVisible();
    }

    async validateRatingAllocation() {
        const ratingAllocation = this.page.locator(this.ratingAllocation);
        await ratingAllocation.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.ratingAllocation);
        await expect(ratingAllocation).toBeVisible();
    }

    async validateRatingAllocationDetails() {
        const ratingAllocationDetails = this.page.locator(this.ratingAllocationDetails);
        await setBorder(this.page, this.ratingAllocationDetails);
        await expect(ratingAllocationDetails).toBeVisible();
    }

    async validateWhatsInSection() {
        const whatsInSection = this.page.locator(this.whatsInSection);
        await whatsInSection.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.whatsInSection);
        await expect(whatsInSection).toBeVisible();
    }

    async validateWhatsOutSection() {
        const whatsOutSection = this.page.locator(this.whatsOutSection);
        await setBorder(this.page, this.whatsOutSection);
        await expect(whatsOutSection).toBeVisible();
    }

    async validateDetailedPortfolioSection() {
        const detailedPortfolioSection = this.page.locator(this.detailedPortfolioSection);
        await detailedPortfolioSection.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.detailedPortfolioSection);
        await expect(detailedPortfolioSection).toBeVisible();
    }

    async validateothersTab() {
        await this.page.click(this.othersTab);
        await setBorder(this.page, this.othersTab);
        await expect(this.page.locator(this.othersTab)).toBeVisible();
    }

    async validateMinimumLumpsumInvestmentAmount() {
        /*const minLumpsumInvestment = this.page.locator(this.fundDatabox);
        await setBorder(this.page, this.fundDatabox);
        const listItems = this.page.locator(this.fundDatabox).all();
        for (const item of listItems) {
            ; 
        }
        await expect(minLumpsumInvestment).toBeVisible();*/

        const items =this.page.locator(this.fundDatabox);
        const count = await items.count();
        console.log(`Total items found: ${count}`);
        expect(count).toEqual(6);

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            await setBorder(this.page, this.fundDatabox);
            await expect(item).toBeVisible();
        }
    }
    async validateMonthlySIPDates() {
        const monthlySIPDates = this.page.locator(this.monthlySIPDates);
        await setBorder(this.page, this.monthlySIPDates);
        const listItems = this.page.locator(this.fundDatabox).all();
        console.log(listItems);
        //await expect(monthlySIPDates).toBeVisible();
    }

    async validateStylebox() {
        const stylebox = this.page.locator(this.stylebox);
        await setBorder(this.page, this.stylebox);
        await expect(stylebox).toBeVisible();
    }

    async validateYTM() {
        const ytm = this.page.locator(this.YTM);
        await setBorder(this.page, this.YTM);
        await expect(ytm).toBeVisible();
    }

    async validateAverageMaturitytab() {
        const averageMaturity = this.page.locator(this.averageMaturitytab);
        await setBorder(this.page, this.averageMaturitytab);
        await expect(averageMaturity).toBeVisible();
    }
    async validateMacaulayDuration() {
        const macaulayDuration = this.page.locator(this.macaulayDuration);
        await setBorder(this.page, this.macaulayDuration);
        await expect(macaulayDuration).toBeVisible();
    }

    async validateFundComparisonSection() {
        const fundComparisonSection = this.page.locator(this.fundComparisonSection);
        await fundComparisonSection.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.fundComparisonSection);
        await expect(fundComparisonSection).toBeVisible();
    }



    async validateDividendHistory() {
        const dividendHistory = this.page.locator(this.dividendHistory);
        await setBorder(this.page, this.dividendHistory);
        await expect(dividendHistory).toBeVisible();
    }

    async validateAMCNews() {
        const amcNewsSection = this.page.locator(this.amcNewsSection);
        await amcNewsSection.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.amcNewsSection);
        await expect(amcNewsSection).toBeVisible();
    }

    async validateAddendums() {
        const addendums = this.page.locator(this.addendums);
        await addendums.scrollIntoViewIfNeeded();
        await setBorder(this.page, this.addendums);
        await expect(addendums).toBeVisible();
    }
}
