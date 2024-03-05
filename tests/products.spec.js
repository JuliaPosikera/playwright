import { test, expect } from "../framework/fixtures/login.js";
import { expectedData } from "./testData/expectedResults.js";

test.describe("products", () => {
  test("validating footer information", async ({ productsPage }) => {
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

  test("sorting price from hight to low", async ({ productsPage }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingPriceDesc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceHiLo.toString()
    ).toBeTruthy();
  });

  test("sorting price from low to hight", async ({ productsPage }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingPriceAsc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceLoHi.toString()
    ).toBeTruthy();
  });

  test("sorting name from a-z ", async ({ productsPage }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingNameAz();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameAZ.toString()
    ).toBeTruthy();
  });

  test("sorting name from z-a", async ({ productsPage }) => {
    await productsPage.sortingSelector.click();
    await productsPage.sortingNameZa();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameZA.toString()
    ).toBeTruthy();
  });

  test("addItemToCart", async ({ productsPage, page }) => {
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

  test("side menu comands logout", async ({ productsPage, page }) => {
    await productsPage.sidebarMenuButton.click();
    await productsPage.aboutMenuItem.click();
    expect(page.url()).toEqual("https://saucelabs.com/");
    await page.goBack();
    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });

  test("logout", async ({ productsPage, context, page }) => {
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
