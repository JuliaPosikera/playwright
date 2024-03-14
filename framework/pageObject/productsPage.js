import { PageHeader } from "./elements/header";
import { PageFooter } from "./elements/footer";

export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.url = "https://www.saucedemo.com/inventory.html";
    this.page = page;
    this.header = new PageHeader(page);
    this.footer = new PageFooter(page);
    this.sortingSelector = page.locator(".product_sort_container");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async sortingNameAz() {
    await this.sortingSelector.click();
    await this.sortingSelector.selectOption("az");
  }

  async sortingNameZa() {
    await this.sortingSelector.click();
    await this.sortingSelector.selectOption("za");
  }

  async sortingPriceDesc() {
    await this.sortingSelector.click();
    await this.sortingSelector.selectOption("hilo");
  }
  async sortingPriceAsc() {
    await this.sortingSelector.click();
    await this.sortingSelector.selectOption("lohi");
  }

  async getAllItems() {
    return this.page.locator(".inventory_item").all();
  }

  async addItemToCart(item) {
    return await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async deleteItemFromCart(item) {
    return await item.getByRole("button", { name: "Remove" }).click();
  }

  async getCartButtonOfItem(item) {
    return await item.getByRole("button");
  }

  async getPriceFromItem(item) {
    return await item.locator(".inventory_item_price").innerText();
  }

  async getProductsName(item) {
    return await item.locator(".inventory_item_name").innerText();
  }

  async goToProductPage(item) {
    const clickableNameOfProduct = item.locator(".inventory_item_name");
    await clickableNameOfProduct.click();
  }

  async getArrayProductsId(allItems) {
    let itemsArray = [];
    for (const item of allItems) {
      const idAttribute = await item
        .locator(".inventory_item_label")
        .getByRole("link")
        .getAttribute("id");
      const numberFromId = idAttribute
        ? parseInt(idAttribute.match(/\d+/)[0])
        : NaN;

      itemsArray.push(numberFromId);
    }
    return itemsArray;
  }
}
