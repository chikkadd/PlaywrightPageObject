const {expect} = require('@playwright/test')
class Dashboardpage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='/dashboard/cart']");
        this.orders = page.getByRole("button", {name: '  ORDERS'});
    }

    async searchProductAndAddToCart(productName)
    {
    
    await this.productsText.first().waitFor();
    const titles =await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for(let i=0;i<count;++i)    
    {
        if(await this.products.nth(i).locator("b").textContent()===productName)
        {
           // await products.nth(i).locator("text=Add To Cart").click(); 
           await this.products.nth(i).getByText("Add To Cart").click(); 
            console.log("Product added to cart");
            break;
        }
    }
    }
    async navigateToCart()
    {
        await this.cart.click();

    }
    async navigateToOrders()
    {
        await this.orders.click();
    }
}
module.exports={Dashboardpage};