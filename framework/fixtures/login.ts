import { test as base } from "@playwright/test";
import { ProductsPage } from "../pageObject/productsPage";
import { cookieForStandartUser } from "../../tests/testData/preparedData";
import { ProductPage } from "../pageObject/productPage";
import { LoginPage } from "../pageObject/loginPage";

type MyFixtures = {
  productsPage: ProductsPage;
  productPage: ProductPage;
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  productsPage: async ({ page, context }, use) => {
    const productsPage = new ProductsPage(page);

    await context.addCookies([cookieForStandartUser]);
    await productsPage.open();
    await use(productsPage);
  },
  productPage: async ({ page, productsPage }, use) => {
    const productPage = new ProductPage(page);
    const allItems = await productsPage.getAllItems();
    const firtsItem = allItems[0];

    await productsPage.goToProductPage(firtsItem);
    await use(productPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await use(loginPage);
  },
});

export const expect = base.expect;
