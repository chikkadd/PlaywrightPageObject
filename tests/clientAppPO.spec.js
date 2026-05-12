const {test, expect} = require('@playwright/test')
const {Loginpage} = require('../pageobjects/Loginpage')
const {Dashboardpage} = require('../pageobjects/Dashboardpage');
const {Cartpage} = require('../pageobjects/Cartpage')
const {OrdersReviewPage} = require('../pageobjects/OrdersReviewPage')
const {OrdersHistoryPage} = require('../pageobjects/OrdersHistoryPage')
const dataSet = JSON.parse(JSON.stringify(require('../utils/Testdata.json')))


for(const data of dataSet)
{
test(`to implement page object model design for ${data.productName}`, async({page}) => 
{
    
    
     const loginpage = new Loginpage(page);
    await loginpage.goto();
    await loginpage.validLogin(data.username,data.password);
    await page.waitForLoadState('networkidle');
    const dashboardpage = new Dashboardpage(page);
    await dashboardpage.searchProductAndAddToCart(data.productName);
    await dashboardpage.navigateToCart();
    const cartpage = new Cartpage(page)
    await cartpage.verifyProductIsDisplayed(data.productName);
    await cartpage.checkout();
    const ordersReviewPage = new OrdersReviewPage(page);
    await ordersReviewPage.SearchCountryAndSelect("ind", "India");
    await ordersReviewPage.validateEmail(data.username);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardpage.navigateToOrders();
    const ordersHistoryPage = await new OrdersHistoryPage(page)
    await ordersHistoryPage.searchOrderAndSelect(orderId)
})
}