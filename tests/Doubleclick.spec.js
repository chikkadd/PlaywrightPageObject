const {test, expect} = require('@playwright/test')

test('this is to test doubleclicking on element', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")   
    const element = await page.getByText("Copy Text")
    await element.dblclick();
    await page.waitForTimeout(2000);
    await expect(page.locator("[id=field2]")).toHaveAttribute("type");
    
})