import { Page } from "playwright";
import { expect } from "playwright/test";

export abstract class BasePage {
    protected titleLocator: string = 'div.page-title h3';
    protected page: Page;
    protected path?: string = "";
    protected title?: string = ""

    // common in all pages
    private showReportSelector: string = "#ShowPerformanceReturn";
// some pages has no title then how to handle that?
  async open() {
    await this.page.goto(this.path);
    await this.page.waitForLoadState();
    
    const titleLocator = this.page.locator(this.titleLocator);
    if (await titleLocator.count() > 0) {
        await expect(titleLocator).toContainText(this.title);
    } else {
        console.log('Title not present, skipping assertion.');
    }
}

    constructor(page: Page, path?: string, title?: string) {
        this.page = page;
        this.path = path;
        this.title = title;
    }

    async clickShowReport(){
        await this.page.waitForSelector(this.showReportSelector, { state: 'visible' });
        await this.page.click(this.showReportSelector);
    }
    
}