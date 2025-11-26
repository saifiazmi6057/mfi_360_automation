import { Page, Locator, expect } from '@playwright/test';
import { SchemaSelectionComponent } from "pages/common/schema_selection.component";
import { BasePage } from './common/BasePage';



export class StatisticalComprehensive extends BasePage {


    page: Page;
    path: string = "/SchemePerformance/StatisticalRatio";
    title: string = "Statistical Comprehensive";
    schemaSelection: SchemaSelectionComponent;
 


    constructor(page: Page) {
        super(page, "/SchemePerformance/StatisticalRatio", "Statistical Comprehensive");
        this.page = page;
        this.schemaSelection = new SchemaSelectionComponent(page);

    }

  //Navigate to the Benchmark component and click on 'Select Ratios' button and select from dropdown option
   async SelectAllRatiosFromBenchmark() {
   await this.page.getByRole('heading', { name: 'Benchmark Selection' }).click();
  await this.page.getByRole('button', { name: 'All Ratios' }).click();
  await this.page.locator('#MultiCheckAll > .checkbox').click();
  await this.page.getByRole('button', { name: 'Selected' }).click();
  }

  async clickGenerateReportBtn() {
    const generateReportBtn: Locator = this.page.getByRole('button', { name: 'Show Report' });
    await generateReportBtn.click();
    
}

async validateReportGeneration() {
    await expect(this.page.getByRole('heading', { name: 'Statistical Ratios' })).toBeVisible({ timeout: 15000 });
  }

 
async switchButton(buttonName: string) {
  const button = this.page.locator('.btn-group label', { hasText: buttonName });
  await button.click();
}

  }

