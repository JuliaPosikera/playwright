import { expect } from "@playwright/test";

export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.url = "https://www.saucedemo.com/inventory.html";
    this.page = page;
    this.cartButton = page.locator(".shopping_cart_link");
    this.cartQuantity = page.locator(".shopping_cart_badge");
    this.sortingSelector = page.locator(".product_sort_container");

    this.sidebarMenuButton = page.locator("#react-burger-menu-btn");
    this.allProductsMenuItem = page.locator("#inventory_sidebar_link");
    this.aboutMenuItem = page.locator("#about_sidebar_link");
    this.logoutMenuItem = page.locator("#logout_sidebar_link");
    this.resetMenuItem = page.locator("#reset_sidebar_link");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async sortingNameAz() {
    await this.sortingSelector.selectOption("az");
  }

  async sortingNameZa() {
    await this.sortingSelector.selectOption("za");
  }

  async getLinkedInHref() {
    return await this.page
      .getByRole("link", { name: "LinkedIn" })
      .getAttribute("href");
  }

  async getFacebookHref() {
    return await this.page
      .getByRole("link", { name: "Facebook" })
      .getAttribute("href");
  }
  async getTwitterHref() {
    return await this.page
      .getByRole("link", { name: "Twitter" })
      .getAttribute("href");
  }

  async getCopywhriteText() {
    return await this.page.locator(".footer_copy").textContent();
  }

  async sortingPriceDesc() {
    await this.sortingSelector.selectOption("hilo");
  }
  async sortingPriceAsc() {
    await this.sortingSelector.selectOption("lohi");
  }

  async getAllItems() {
    return this.page.locator(".inventory_item").all();
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
