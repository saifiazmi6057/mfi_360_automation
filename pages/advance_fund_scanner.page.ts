import { expect } from "playwright/test";


export class AdvanceFundScreenerPage {

    private title: string = "div.page-title h3"
    page: any;

    constructor(page: any) {
        this.page = page;



    }
    async open() {
        await this.page.goto("/AMC/FundScreenerAdvance")
        await this.page.waitForLoadState()
        await expect(this.page.locator(this.title)).toContainText('Advanced Fund Screener');
    }

    async verifyAdvanceFundScreenerPage() {
        await expect(this.page.locator("//h3[normalize-space()='Advanced Fund Screener']")).toBeVisible();
    }

    async clickFilterButton() {
        await this.page.locator("#schemeSelectionFilterBtn").click();
    }

    async verifyFilterPanel() {
        await expect(this.page.locator("//ul[@class='list-inline select-scheme-filter__set']")).toBeVisible();
        await this.page.waitForLoadState();
    }


    // first i need to click fundnature and search the fundnature after select

    async selectFundNature(fundnature: string) {
        const fundnatureButton = this.page.locator("//button[normalize-space()='All Nature']");
        await fundnatureButton.click();
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState();
        const optionLocator = this.page.locator(`//span[contains(text(),'${fundnature}')]`);
        await optionLocator.waitFor({ state: 'attached', timeout: 10000 });

        await optionLocator.click();
        await this.page.mouse.click(0, 0);
    }

    async selectSubFundNature(subnature: string) {
        const subnatureButton = this.page.locator("//button[normalize-space()='All Sub Nature']");
        await subnatureButton.click();
        await this.page.waitForLoadState();
        await this.page.locator(`//li[normalize-space()='${subnature}']`).click();
        await this.page.mouse.click(0, 0);
    }

    async selectOption(option: string) {
        const Optionbutton = this.page.locator("//button[normalize-space()='All Option']");
        await Optionbutton.click();
        await this.page.waitForLoadState();
        await this.page.locator(`//span[normalize-space()='${option}']/span`).click();
        await this.page.mouse.click(0, 0);

    }

    async selectReturnPeriod(period: string) {
        const returnPeriodDropdown = this.page.locator("//select[@id='DrpPeriod']");
        await returnPeriodDropdown.selectOption({ label: period });
        await this.page.waitForLoadState();
    }


    async selectLaunchPeriod(period: string) {
        const launchPeriodDropdown = this.page.locator("//div[@id='divLaunchPeriod']");
        await launchPeriodDropdown.click();
        await this.page.waitForTimeout(500);
        const optionLocator = this.page.locator(`//span[contains(text(),'${period}')]`);
        await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
        await optionLocator.click();
        await this.page.mouse.click(0, 0);
    }
    // i need to type topfund 
    async TypeTopFund(topfund: string) {
        const topfundInput = this.page.locator("#BtnNumberTopFund");
        await topfundInput.fill(topfund);

        await this.page.waitForLoadState();
    }

    async clickSubmitButton() {
        await this.page.locator("#submitFilter").click();
        await this.page.waitForLoadState();
    }

    async verifyResult() {
        await expect(this.page.locator("//*[@id='tableContainer']/table/tbody[1]")).toBeVisible();
    }

    async clickonGreenArrow() {
        await this.page.locator("//button//i[@class='glyphicon glyphicon-arrow-right']").click();
    }

    async verifyMovedScheme() {
        await expect(this.page.locator('//*[@id="DivSelectedSchemeTable"]/table/tbody')).toBeVisible();
    }

    async clickRedArrow() {
        await this.page.locator("//button//i[@class='glyphicon glyphicon-arrow-left']").click();
    }

    // i need to fill the scheme set name and save it

    async schemeSet(baseName: string) {
        const uniqueName = `${baseName}-${Date.now()}`;
        const name = this.page.locator("//input[@id='input-1']");
        await name.fill(uniqueName);
        await this.page.waitForLoadState();
        await this.page.mouse.click(0, 0);
    }


    async save() {
        await this.page.locator("//button[@id='btnSetUserSchemeSet']//i[@class='fa fa-floppy-o']").click();

    }


    async verifyTheMessage(expectedMessage: string) {
        const messageLocator = this.page.locator("//div[@class='ng-binding']");
        await expect(messageLocator).toBeVisible();
        await expect(messageLocator).toHaveText(expectedMessage);
        // i need to click on ok button
        await this.page.locator("//button[normalize-space()='OK']").click();
    }

    async ClickOnResetButton() {
        await this.page.locator("//button[normalize-space()='Reset']").click();
        // there is pop up message i need to click on yes reset button
        await this.page.locator("//button[normalize-space()='Yes, reset']").click();
    }


    // i need to switch the tab to advance
   async switchTab(tab: string) {
        const name = tab.trim();
        const locator = this.page.locator(`//a[normalize-space()='${name}']`);
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async verifyAdvanceSearchTab() {
        await expect(this.page.locator("#tab_content2")).toBeVisible();
        // provide more load time 
        await this.page.waitForLoadState('networkidle');    

    }
    
async setRangeForCard(cardIndex: number, minValue: number, maxValue: number) {
    // Scope to the correct card
    const card = this.page.locator('.card1-body').nth(cardIndex);

    // Find slider inside that card
    const sliderTrack = card.locator('.custom-slider.rzslider').filter({ has: this.page.locator(':visible') }).first();
   // await sliderTrack.waitFor({ state: 'visible', timeout: 5000 });

    const minHandle = sliderTrack.locator('.rz-pointer.rz-pointer-min');
    const maxHandle = sliderTrack.locator('.rz-pointer.rz-pointer-max');

    const trackBox = await sliderTrack.boundingBox();
    if (!trackBox) throw new Error('Slider track not found');

    // Get dynamic max value from DOM
    const maxAttr = await maxHandle.getAttribute('aria-valuemax');
    const sliderMax = parseFloat(maxAttr || '100');

    const sliderWidth = trackBox.width;
    const minX = trackBox.x + (minValue / sliderMax) * sliderWidth;
    const maxX = trackBox.x + (maxValue / sliderMax) * sliderWidth;
    const y = trackBox.y + trackBox.height / 2;

    // Drag min handle
    await minHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(minX, y);
    await this.page.mouse.up();

    // Drag max handle
    await maxHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(maxX, y);
    await this.page.mouse.up();
}

async selectRating(period: string) {
  const selectLocator = this.page.locator('#Ddlrating');

  await selectLocator.waitFor({ state: 'visible', timeout: 5000 });

  // Use selectOption instead of clicking hidden option
  await selectLocator.selectOption({ label: period });
}


/// there is dropdown name select symbol  first i need to click then  need to  select the rating from the dropdwon

async selectSymbol(symbol: string) {
  const selectLocator = this.page.locator('//select[@ng-model="selectedExpression"]');

  await selectLocator.waitFor({ state: 'visible', timeout: 5000 });

  // Use selectOption instead of clicking hidden option
  await selectLocator.selectOption({ label: symbol });
}

//there is input field where i only need to put any number which i given in test script so create method 

 async TypeRange(topfund: string) {
        const topfundInput = this.page.locator("#percentval");
        await topfundInput.fill(topfund);

        await this.page.waitForLoadState();
    }

// now i need to click add button
async clickAddButton(){

    await this.page.locator("//i[@class='fa fa-plus']").click();

}


  //common function

  async selectradiobutton(widgetName: string ,radiong:string) {
    const sectionLocator = this.page.locator(`//h5[normalize-space()='${widgetName}']`);
    await sectionLocator.waitFor({ state: 'visible', timeout: 5000 });

    const optionLocator = this.page.locator(`//span[@ng-model="${radiong}"]`);
    //span[@type='radio' and contains(@ng-click,'${period}')]
   
    await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
    await optionLocator.click();
}
//step-1 click on red arrow
//step-2 Navigate to the User Set / My Watch List and select "user set" from the dropdown of User Set / My Watch List 
// step-3 After selection of the userset ,there is userset dropdown comesup 
// step-4 Select the "test1-2" from the userset dropdown
// setep -5 click on Green Arrow

async mywatchlist(){
    await this.page.locator("//select[@ng-model='SelectedId']").click();

}

async selectUserSet() {

    await this.page.selectOption("//select[@ng-model='SelectedId']", "User Set");
   // await this.page.locator("//option[normalize-space()='User Set']").click();

}

async selectUserset1(){
    await this.page.locator("//button[normalize-space()='All User Set']").click();
}
async selectUsersetfromDropdown(){
    await this.page.locator("//span[contains(text(),'test1-2')]").click();
    await this.page.mouse.click(0, 0);
    await this.page.waitForLoadState();
 }

}


    


      


