import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000);
  await page.goto('https://mfi360-uat.icraanalytics.co.in:8443/Account/login');

  await page.getByRole('textbox', { name: 'User ID' }).fill('user@testing.com');
  await page.getByRole('textbox', { name: '●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●' }).fill('Charli@123');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('link', { name: 'Performance', exact: true }).click();
  await page.locator('#mCSB_1_container').getByRole('link', { name: 'Fund Dashboard' }).click();
  await page.locator('#LstAMC').selectOption('57');
  await page.locator('#LstNature').selectOption('4');
  await page.locator('#LstSubNature').selectOption('53');
  await page.locator('#LstFund').selectOption('18728');
  await page.getByRole('tab', { name: 'Returns' }).click();
  await page.getByRole('tab', { name: 'Statistical Ratios' }).click();
  await page.getByRole('tab', { name: 'Portfolio' }).click();
  await page.getByRole('tab', { name: 'Others' }).click();
});