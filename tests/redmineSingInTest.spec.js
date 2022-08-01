
const { test, expect } = require('@playwright/test');
const { BasePage } = require('../Pages/Base.page');
const { LoginPage } = require("../Pages/login.page");
const { ForPass } = require("../Pages/fpass.page");

test.describe("Test suit", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.redmine.org")
    })
   
    test("TC#1: Sign in (valid inputs, not active)", async ({ page }) => {
        const BasePg = new BasePage(page);
        const LoginPg = new LoginPage(page);
        await BasePg.SignInBtnClick();
        await LoginPg.UsernameFill();
        await LoginPg.PasswordFill();
        await LoginPg.LoginBtnClick();
        await expect(LoginPg.getError).toHaveText(["You haven't activated your account yet. If you want to receive a new activation email, please click this link."]);
    })

    test("TC#2: Sign in (invalid inputs (login))", async ({ page }) => {
        const BasePg = new BasePage(page);
        const LoginPg = new LoginPage(page);
        await BasePg.SignInBtnClick();
        await LoginPg.UsernameWrongFill();
        await LoginPg.PasswordFill();
        await LoginPg.LoginBtnClick();
        await expect(LoginPg.getError).toHaveText(["Invalid user or password"]);
    })

    test("TC#3: Sign in (invalid inputs (password))", async ({ page }) => {
        const BasePg = new BasePage(page);
        const LoginPg = new LoginPage(page);
        await BasePg.SignInBtnClick();
        await LoginPg.UsernameFill();
        await LoginPg.PasswordWrongFill();
        await LoginPg.LoginBtnClick();
        await expect(LoginPg.getError).toHaveText(["Invalid user or password"]);
    })

    test("TC#4: Sign in (empty inputs)", async ({ page }) => {
        const BasePg = new BasePage(page);
        const LoginPg = new LoginPage(page);
        await BasePg.SignInBtnClick();
        await LoginPg.LoginBtnClick();
        await expect(LoginPg.getError).toHaveText(["Invalid user or password"]);
    })

    test("TC#5: Sign in (forgot password)", async ({ page }) => {
        const BasePg = new BasePage(page);
        const LoginPg = new LoginPage(page);
        const ForPsPg = new ForPass(page);
        await BasePg.SignInBtnClick();
        await LoginPg.ForgotPassBtnClick();
        await ForPsPg.EmailInput();
        await ForPsPg.CommitBtnClick();
        await expect(ForPsPg.getErrorEmail).toHaveText(["Unknown user."]);
    })


})




