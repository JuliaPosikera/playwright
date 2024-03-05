import { test as base } from "@playwright/test";
import { ProductsPage } from "../pageObject/productsPage";
import { cookieForStandartUser } from "../../tests/testData/preparedData";

export const test = base.test.extend({
  productsPage: async ({ page, context }, use) => {
    const productsPage = new ProductsPage(page);
    await context.addCookies([cookieForStandartUser]);
    await productsPage.open();
    await use(productsPage);
  },
});

export const expect = base.expect;
