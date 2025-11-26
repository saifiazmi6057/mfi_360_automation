

import { Page } from "playwright";

export async function changeElementStyle(page: Page, selector: string, property: string, value: string) {
  const elements = page.locator(selector);
  const count = await elements.count();

  for (let i = 0; i < count; i++) {
    await elements.nth(i).evaluate((element, [prop, val]) => {
      element.style.setProperty(prop, val);
    }, [property, value]);
  }
}

export async function setBorder(page: Page, selector: string) {
  await changeElementStyle(page, selector, "border", "3px dashed red");
}



