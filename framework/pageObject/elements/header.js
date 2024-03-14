export class PageHeader {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.cartButton = page.locator(".shopping_cart_link");
    this.cartQuantity = page.locator(".shopping_cart_badge");
    this.sidebarMenuButton = page.locator("#react-burger-menu-btn");
    this.allProductsMenuItem = page.locator("#inventory_sidebar_link");
    this.aboutMenuItem = page.locator("#about_sidebar_link");
    this.logoutMenuItem = page.locator("#logout_sidebar_link");
    this.resetMenuItem = page.locator("#reset_sidebar_link");
  }
}
