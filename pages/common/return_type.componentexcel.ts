import { getPeriodsFromSheetName } from '../../utils/excel-period-mapper';
import { Page } from 'playwright';

export class ReportReturnType {
  constructor(private page: Page) {}

  async selectPeriodsFromSheet(sheetName: string) {
    const periods = getPeriodsFromSheetName(sheetName);
    for (const period of periods) {
      const checkbox = this.page.locator(`//label[contains(text(),'${period}')]//preceding-sibling::input[@type='checkbox']`);
      if (await checkbox.isVisible()) {
        await checkbox.check();
      }
    }
  }
}
