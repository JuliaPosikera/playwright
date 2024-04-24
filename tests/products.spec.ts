import { test, expect } from "../framework/fixtures/login.js";
import { ProductPage } from "../framework/pageObject/productPage.js";
import { ProductsPage } from "../framework/pageObject/productsPage.js";
import { expectedData } from "./testData/expectedResults.js";

test.describe("products", () => {
  test("validating footer information", async ({
    productsPage,
  }: {
    productsPage: ProductsPage;
  }) => {
    expect(await productsPage.footer.getCopywhriteText()).toEqual(
      expectedData.copywhriteText
    );
    expect(await productsPage.footer.getTwitterHref()).toEqual(
      expectedData.twitterInLink
    );
    expect(await productsPage.footer.getFacebookHref()).toEqual(
      expectedData.facebookInLink
    );
    expect(await productsPage.footer.getLinkedInHref()).toEqual(
      expectedData.linkedInLink
    );
  });

  test("sorting price from hight to low", async ({
    productsPage,
  }: {
    productsPage: ProductsPage;
  }) => {
    await productsPage.sortingPriceDesc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceHiLo.toString()
    ).toBeTruthy();
  });

  test("sorting price from low to hight", async ({
    productsPage,
  }: {
    productsPage: ProductsPage;
  }) => {
    await productsPage.sortingPriceAsc();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayPriceLoHi.toString()
    ).toBeTruthy();
  });

  test("sorting name from a-z ", async ({
    productsPage,
  }: {
    productsPage: ProductsPage;
  }) => {
    await productsPage.sortingNameAz();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameAZ.toString()
    ).toBeTruthy();
  });

  test("sorting name from z-a", async ({
    productsPage,
  }: {
    productsPage: ProductsPage;
  }) => {
    await productsPage.sortingNameZa();
    const allItems = await productsPage.getAllItems();
    const itemsId = await productsPage.getArrayProductsId(allItems);
    expect(
      itemsId.toString() === expectedData.ArrayNameZA.toString()
    ).toBeTruthy();
  });

  test("addItemToCart", async ({
    productsPage,
    page,
  }: {
    productsPage: ProductsPage;
    page: any;
  }) => {
    const allItems = await productsPage.getAllItems();
    const itemsQuantity = allItems.length;

    for (const item of allItems) {
      await productsPage.addItemToCart(item);
      await expect(await productsPage.getCartButtonOfItem(item)).toHaveText(
        "Remove"
      );
    }
    await expect(productsPage.header.cartQuantity).toHaveText(
      itemsQuantity.toString()
    );
    const cartFromLocalStorage = await page.evaluate(() =>
      localStorage.getItem("cart-contents")
    );
    const cartFromLacalStorageArray = JSON.parse(cartFromLocalStorage);
    expect(cartFromLacalStorageArray.length).toEqual(itemsQuantity);
  });

  test("redirect to product page", async ({
    productsPage,
    page,
  }: {
    productsPage: ProductsPage;
    page: any;
  }) => {
    const allItems = await productsPage.getAllItems();
    const firtsItem = allItems[0];
    const productPage = new ProductPage(page);
    const productPriceFromProductsPage = await productsPage.getPriceFromItem(
      firtsItem
    );
    const NameOfProduct = await productsPage.getProductsName(firtsItem);

    await productsPage.addItemToCart(firtsItem);
    await productsPage.goToProductPage(firtsItem);

    expect(await productPage.getNameOfItem()).toEqual(NameOfProduct);
    expect(await productPage.getPriceOfItem()).toEqual(
      productPriceFromProductsPage
    );

    await productPage.goToProductsPage();

    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });

  test("side menu comands", async ({
    productsPage,
    page,
  }: {
    productsPage: ProductsPage;
    page: any;
  }) => {
    await productsPage.header.sidebarMenuButton.click();
    await productsPage.header.aboutMenuItem.click();

    expect(page.url()).toEqual("https://saucelabs.com/");

    await page.goBack();

    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });

  test("logout", async ({
    productsPage,
    context,
    page,
  }: {
    productsPage: ProductsPage;
    context: any;
    page: any;
  }) => {
    await productsPage.header.sidebarMenuButton.click();
    await productsPage.header.logoutMenuItem.click();

    await expect(page.getByPlaceholder("Username")).toBeVisible();

    const cookies = await context.cookies();
    const sessionUsernameCookie = cookies.find(
      (cookie: any) => cookie.name === "session-username"
    );
    expect(sessionUsernameCookie).toBeFalsy();
  });
});
