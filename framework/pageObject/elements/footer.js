export class PageFooter {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
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
}
