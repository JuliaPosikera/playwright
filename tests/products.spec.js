import { test, expect } from "@playwright/test";
import { expectedData } from "./testData/expectedResults.js";
import { ProductsPage } from "../framework/pageObject/productsPage";
import { cookieForStandartUser } from "./testData/preparedData";

let productsPage;

test.describe("products", () => {
  test.beforeEach(async ({ page, context }) => {
    productsPage = new ProductsPage(page);
    await context.addCookies([cookieForStandartUser]);
    await productsPage.open();
  });

  test("validating footer information", async ({ page }) => {
    expect(await productsPage.getCopywhriteText()).toEqual(
      expectedData.copywhriteText
    );
    expect(await productsPage.getTwitterHref()).toEqual(
      expectedData.twitterInLink
    );
    expect(await productsPage.getFacebookHref()).toEqual(
      expectedData.facebookInLink
    );
    expect(await productsPage.getLinkedInHref()).toEqual(
      expectedData.linkedInLink
    );
  });

  test("sorting price from hight to low", async ({ page }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingPriceDesc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceHiLo.toString()
    ).toBeTruthy();
  });

  test("sorting price from low to hight", async ({ page }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingPriceAsc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceLoHi.toString()
    ).toBeTruthy();
  });

  test("sorting name from a-z ", async ({ page }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingNameAz();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameAZ.toString()
    ).toBeTruthy();
  });

  test("sorting name from z-a", async ({ page }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingNameZa();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameZA.toString()
    ).toBeTruthy();
  });

  test("addItemToCart", async ({ page }) => {
    const allItems = await productsPage.getAllItems();
    const itemQuantity = allItems.length;
    for (const item of allItems) {
      await item.getByRole("button").click();
      await expect(item.getByRole("button")).toHaveText("Remove");
    }
    await expect(productsPage.cartQuantity).toHaveText(itemQuantity.toString());
    const cartFromLocalStorage = await page.evaluate(() =>
      localStorage.getItem("cart-contents")
    );
    const cartFromLacalStorageArray = JSON.parse(cartFromLocalStorage);
    expect(cartFromLacalStorageArray.length).toEqual(itemQuantity);
  });

  test("side menu comands logout", async ({ page }) => {
    await productsPage.sidebarMenuButton.click();
    await productsPage.aboutMenuItem.click();
    expect(page.url()).toEqual("https://saucelabs.com/");
    await page.goBack();
    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });

  test("logout", async ({ page, context }) => {
    await productsPage.sidebarMenuButton.click();
    await productsPage.logoutMenuItem.click();
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    const cookies = await context.cookies();
    const sessionUsernameCookie = cookies.find(
      (cookie) => cookie.name === "session-username"
    );
    expect(sessionUsernameCookie).toBeFalsy();
  });
});
