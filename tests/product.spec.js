import { test, expect } from "../framework/fixtures/login.js";
import { expectedData } from "./testData/expectedResults.js";

test.describe("product page", () => {
  test("validating footer information", async ({ productPage }) => {
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
});
