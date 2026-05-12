const {expect} = require('@playwright/test')
class Cartpage
{
    constructor(page)
    {
        this.page = page;
        this.checkoutbtn = page.locator("text=Checkout");
        this.listOfProducts = page.locator("div li")
    }
    async verifyProductIsDisplayed(productName)
    {
        await  this.listOfProducts.first().waitFor();
        const bool =  await this.page.locator("h3:has-text('"+productName+"')").isVisible() 
        await expect(bool).toBeTruthy();
    }

    async checkout()
    {
        await this.checkoutbtn.click();
    }
}

module.exports = {Cartpage};