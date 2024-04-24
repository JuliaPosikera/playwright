import { test, expect } from "../framework/fixtures/login.js";
import { ProductPage } from "../framework/pageObject/productPage.js";
import { expectedData } from "./testData/expectedResults.js";

test.describe("product page", () => {
  test("validating footer information", async ({
    productPage,
  }: {
    productPage: ProductPage;
  }) => {
    expect(await productPage.footer.getCopywhriteText()).toEqual(
      expectedData.copywhriteText
    );
    expect(await productPage.footer.getTwitterHref()).toEqual(
      expectedData.twitterInLink
    );
    expect(await productPage.footer.getFacebookHref()).toEqual(
      expectedData.facebookInLink
    );
    expect(await productPage.footer.getLinkedInHref()).toEqual(
      expectedData.linkedInLink
    );
  });

  test("add and delete items from cart", async ({
    productPage,
  }: {
    productPage: ProductPage;
  }) => {
    await productPage.addToCart();
    const cartQuantityLocator = productPage.header.cartQuantity;
    const newCartQuantity = await cartQuantityLocator.innerText();
    expect(newCartQuantity).toEqual("1");
    await productPage.deleteFromCart();

    expect(cartQuantityLocator).toBeHidden();
  });
});
