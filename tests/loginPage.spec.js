// @ts-check

import { test, expect } from "@playwright/test";
import { LoginPage } from "../framework/pageObject/loginPage";

const user = {
  user: process.env.USERNAME_STANDART,
  pass: process.env.PASSWORD_STANDART,
};
const userWoutUserName = { user: "", pass: process.env.PASSWORD_STANDART };
const userWOutPass = { user: process.env.USERNAME_STANDART, pass: "" };
const userNotExist = { user: process.env.USERNAME_NOTEXIST, pass: "1234" };
const userLocked = {
  user: process.env.PASSWORD_LOCKED,
  pass: process.env.PASSWORD_STANDART,
};

let loginPage;

test("login_w/out username", async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(userWoutUserName);
  expect(loginPage.errorUserIsRequired).toBeVisible();
});

test("login_w/out password", async ({ page }) => {
  await loginPage.open();
  await loginPage.login(userWOutPass);
  expect(loginPage.errorPassIsRequired).toBeVisible();
});

test("login user that not exist", async ({ page }) => {
  await loginPage.open();
  await loginPage.login(userNotExist);
  await expect(loginPage.errorUserNotExist).toBeVisible();
});

test("login user that is locked", async ({ page }) => {
  await loginPage.open();
  await loginPage.login(userLocked);
  await expect(loginPage.errorUserIsLocked).toBeVisible();
});

test("login with standart user", async ({ page }) => {
  await loginPage.open();
  await loginPage.login(user);
  await expect(page).toHaveURL(loginPage.urlProducts);
});

test("trying to open products page w/out login", async ({ page }) => {
  await loginPage.openProductsUrl();
  await expect(page).toHaveURL(loginPage.url, { timeout: 1000 });
});
