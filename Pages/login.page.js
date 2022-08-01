const { expect } = require('@playwright/test');

//random username
function gen_username() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//random password
function gen_password(len){
  if(len > 10) len = 10;
  len = len * (-1);
  return Math.random().toString(36).slice(len);
};

exports.LoginPage = class LoginPage {

  
   constructor(page) {
    this.page = page;
    this.getUsernameInp = page.locator('[name="username"]');
    this.getPasswordInp = page.locator('[name="password"]');
    this.getLoginBtn = page.locator('[name="login"]');
    this.getFOrgPassBtn = page.locator('[href="/account/lost_password"]');
    this.getError = page.locator('[class="flash error"]');
  }

  async UsernameFill() {
    await expect(this.getUsernameInp).toBeVisible();
    await this.getUsernameInp.fill("forRedmineTester3478");
  }

  async UsernameWrongFill() {
    await expect(this.getUsernameInp).toBeVisible();
    await this.getUsernameInp.fill(gen_username());
  }

  async PasswordFill() {
    await expect(this.getPasswordInp).toBeVisible();
    await this.getPasswordInp.fill("test4321");
  }

  async PasswordWrongFill() {
    await expect(this.getPasswordInp).toBeVisible();
    await this.getPasswordInp.fill(gen_password());
  }

  async ForgotPassBtnClick() {
    await expect(this.getFOrgPassBtn).toBeVisible();
    await this.getFOrgPassBtn.click();
  }

  async LoginBtnClick() {
    await expect(this.getLoginBtn).toBeVisible();
    await this.getLoginBtn.click();
  }
}
