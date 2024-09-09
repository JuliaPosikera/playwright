import { Page, Locator } from "@playwright/test";
import { PageHeader } from "./elements/header";
import { PageFooter } from "./elements/footer";

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  page: Page;
  header: PageHeader;
  footer: PageFooter;

  constructor(page: Page) {
    this.header = new PageHeader(page);
    this.footer = new PageFooter(page);
  }

  async clickGoToShoppingButton(page: Page) {
    await page.locator("continue-shopping").click();
  }

  async clickCheckout(page: Page) {
    await page.locator("checkout").click();
  }
}
