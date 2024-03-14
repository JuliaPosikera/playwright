export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.url = "https://www.saucedemo.com/";
    this.urlProducts = "https://www.saucedemo.com/inventory.html";
    this.page = page;
    this.loginField = page.locator('[data-test="username"]');
    this.passField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorUserIsRequired = page.getByText("Username is required");
    this.errorPassIsRequired = page.getByText("Password is required");
    this.errorUserIsLocked = page.getByText(
      "Sorry, this user has been locked out."
    );
    this.errorUserNotExist = page.getByText(
      "Username and password do not match any user in this service"
    );
  }

  async open() {
    await this.page.goto(this.url);
  }

  async openProductsUrl() {
    await this.page.goto(this.urlProducts);
  }

  async login({ user, pass }) {
    await this.loginField.fill(user);
    await this.passField.fill(pass);
    await this.loginButton.click();
  }
}
