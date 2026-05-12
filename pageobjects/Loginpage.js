const {expect} = require('@playwright/test')

class Loginpage {

    constructor(page)
    {
        this.page=page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.LoginButton = page.locator("#login");

    }
    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username, password)
    {    
        await expect(this.username).toBeVisible();
        await this.username.fill(username);
        await expect(this.password).toBeVisible();
        await this.password.fill(password);
        await expect(this.LoginButton).toBeVisible();
        await this.LoginButton.click();
    }
}
module.exports = {Loginpage};