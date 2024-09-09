import { Page, Locator } from "@playwright/test";
import { PageHeader } from "./elements/header";
import { PageFooter } from "./elements/footer";

export class checkoutStepTwoPage {
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

  async addFirstLastZip({
    firstName,
    lastName,
    zipCode,
  }: {
    firstName: string;
    lastName: string;
    zipCode: string;
  }) {
    await this.page.locator("first-name").fill(firstName);
    await this.page.locator("last-name").fill(lastName);
    await this.page.locator("postal-code").fill(zipCode);
  }

  async clickCancel(page: Page) {
    await page.locator("cancel").click();
  }
  async clickFinish(page: Page) {
    await page.locator("finish").click();
  }
}
