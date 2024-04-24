import { PageFooter } from "./elements/footer";
import { PageHeader } from "./elements/header";
import { Page, Locator } from "@playwright/test";
export class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  page: Page;
  footer: PageFooter;
  header: PageHeader;
  buttonAddRemoveCart: Locator;
  buttonBackToProducts: Locator;
  largeInventoryName: Locator;
  productPrice: Locator;

  constructor(page: Page) {
    this.footer = new PageFooter(page);
    this.header = new PageHeader(page);
    this.buttonAddRemoveCart = page.locator(".btn_inventory");
    this.buttonBackToProducts = page.getByRole("button", {
      name: "Back to products",
    });
    this.largeInventoryName = page.locator(".inventory_details_name");
    this.productPrice = page.locator(".inventory_details_price");
  }

  async goToProductsPage() {
    await this.buttonBackToProducts.click();
  }

  async getNameOfItem() {
    return await this.largeInventoryName.innerText();
  }

  async getPriceOfItem() {
    return await this.productPrice.innerText();
  }

  async addToCart() {
    await this.buttonAddRemoveCart.click();
  }

  async deleteFromCart() {
    await this.buttonAddRemoveCart.click();
  }
}
