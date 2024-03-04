import { test, expect } from "@playwright/test";
import { LoginPage } from "../framework/pageObject/loginPage";
import { ProductsPage } from "../framework/pageObject/productsPage";

const user = {
  user: process.env.USERNAME_STANDART,
  pass: process.env.PASSWORD_STANDART,
};

const newCookie = {
  name: "session-username",
  value: "standard_user",
  domain: "www.saucedemo.com",
  path: "/",
  expires: 9709547505,
  httpOnly: false,
  secure: true,
  sameSite: "None",
};

test.describe("products", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([newCookie]);
  });

  test("basic action", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();
    await productsPage.cartButton.hover();
    await productsPage.sortingNameZa();
    await productsPage.sortingNameAz();
    await expect(productsPage.linkedInIcon).toBeVisible();
  });
});
