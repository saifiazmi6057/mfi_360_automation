import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { Dashboard } from '@pages/dashboard.page';

let page: Page;
let dashboard: Dashboard;

test.beforeAll(async ({ browser }, testInfo) => {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    dashboard = new Dashboard(page);
})

test.afterAll(async () => {
    await page.close();
}
);


// Test-1
// Verify the dashboard of the MFI 360 application with search functionality and naviaget to the respective page
// Step to be performed:
// 1.login to the application
// 2.Navigate to the dashboard Page
// 3.Verify the dashboard title
// 4.Perform search operation with any search criteria like 'Fund dashboard'
// 5.Verify the search result and navigate to the respective page

test.describe('Dashboard Tests', () => {
    test('Verify the dashboard of the MFI 360 application with search functionality and naviaget to the respective page', async () => {
           test.setTimeout(60000);
        await dashboard.open();
        await dashboard.clickSearchButton()    
        await dashboard.typeInSearchBox('Fund dashboard') 
    })
})




//Test-2
// Verify all widgets in the dashboard of the MFI 360 application 
// Step to be performed:
// 1.login to the application
// 2.Navigate to the dashboard Page
// 3.Verify the dashboard title
// 4.Verify all widgets are present in the dashboard page like Fund Overview, Portfolio Summary, Risk Analysis etc.

test.describe('Dashboard Widgets Test', () => {
    test('Verify all widgets in the dashboard of the MFI 360 application', async () => {
        test.setTimeout(150000);
        await dashboard.open();
        await dashboard.validateAllWidgets();
    })
})



// Test-3
// Verify the dashboad  of the mfi 360 application with Category Performance table
// step to performed
// 1.login to the application
// 2.Navigate to the dashboard Page
// 3-Point to the category performance table
// 4-Verify the category performance table is showing correctly or not
// 5-Verify  by clicking each row of category performance table  side table"Other FoF - Domestic - Top Performing Funds" table data changed 


test.describe('Dashboard Category Performance Table Test', () => {
    test('Verify the dashboad  of the mfi 360 application with Category Performance table', async () => {
        test.setTimeout(150000);
        await dashboard.open();
        await dashboard.validateEachCategoryRowUpdatesETFTable();
        await dashboard.validateShowMoreNavigation();
    })
})

//test-4
// Verify the dashboard of the mfi 360 application with lower section of the dashboard
// step to performed
// 1.login to the application
// 2.Navigate to the dashboard Page
// 3.Verify the lower seection  widgets of the dashboard
// 4.Verify that each widget  functionality is working or not

test.describe('Dashboard Lower Section Widgets Test', () => {
    test('Verify the dashboard of the mfi 360 application with lower section of the dashboard', async () => {
        test.setTimeout(60000);
        await dashboard.open();
        await dashboard.validateLowerSectionWidgets();
    })
})
