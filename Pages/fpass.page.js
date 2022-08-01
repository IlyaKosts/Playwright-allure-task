const { expect } = require('@playwright/test');

//random email
let endings = ["gmail.com"],
    symbols = "qwertyuiopasdfghjklzxcvbnm1234567890";
 
function rand(min, max) {
    return (min + Math.random() * (max - min + 1)) | 0
};
 
function getRandomStr(len) {
    let ret = ""
    for (let i = 0; i < len; i++)
        console.log(ret += symbols[rand(0, symbols.length - 1)]);
    return ret;
};
 
function getEmail() {
    let a = getRandomStr(rand(3, 5)),
        b = getRandomStr(rand(3, 5));
    return a + "." + b + "@" + endings[rand(0, endings.length - 1)];
};

exports.ForPass = class ForPass {

  
   constructor(page) {
    this.page = page;
    this.getEmailInput = page.locator('[name="mail"]');
    this.getCommitBtn = page.locator('[name="commit"]');
    this.getErrorEmail = page.locator('[class="flash error"]');
  }

  async EmailInput() {
    await expect(this.getEmailInput).toBeVisible();
    await this.getEmailInput.fill(getEmail());
  }

  async CommitBtnClick() {
    await expect(this.getCommitBtn).toBeVisible();
    await this.getCommitBtn.click();
  }
}