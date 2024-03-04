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
    // this.sortingAz = sortingSelector.selectOption("az");
    // this.sortingAz = sortingSelector.selectOption("za");
    // this.sortingAz = sortingSelector.selectOption("lohi");
    // this.sortingAz = sortingSelector.selectOption("hilo");

    this.linkedInIcon = page.getByRole("link", { name: "LinkedIn" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.copyRightText = page.getByText("© 2024 Sauce Labs. All Rights");
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
}
