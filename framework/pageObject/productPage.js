import { PageFooter } from "./elements/footer";
import { PageHeader } from "./elements/header";

export class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
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
