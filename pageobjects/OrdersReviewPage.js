const {expect} = require('@playwright/test')
class OrdersReviewPage
{
    constructor(page)
    {
        this.page = page;
        this.countryDropDown = page.locator("[placeholder*='Country']")
        this.dropDownElement = page.locator(".ta-results")
        this.userNameLabel = page.locator(".user__name label");
        this.submit =  page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async SearchCountryAndSelect(placeHolderText, CountryName)
    {
    await this.countryDropDown.pressSequentially(placeHolderText);
    const dropdown= this.dropDownElement;
    await dropdown.waitFor();
    const optionsCount= await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text= await dropdown.locator("button").nth(i).textContent();
        if(text.trim()===CountryName)
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    }
    async validateEmail(email)
    {
        await expect (this.userNameLabel).toHaveText(email);
        
    }
    async SubmitAndGetOrderId()
    {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();    
    }

}
module.exports = {OrdersReviewPage}