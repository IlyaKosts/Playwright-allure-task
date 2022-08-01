const { expect } = require('@playwright/test');

exports.BasePage = class BasePage {

  
   constructor(page) {
    this.page = page;
    this.getSignInBtn = page.locator('[href="/login"]');
  }

  async SignInBtnClick() {
    await expect(this.getSignInBtn).toBeVisible();
    await this.getSignInBtn.click();
  }
}