const {test, expect} = require('@playwright/test')

test('this is to test dialog pop ups', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")   
    //page.on('dialog', dialog=>dialog.accept());
    await expect(page).toHaveTitle("Automation Testing Practice");
    
  const element1= await page.locator("//button[text()='Popup Windows']")

  const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'),
        element1.click()
    ]
  )
  await expect(newPage).toHaveTitle("Selenium");
  const pageTitle = newPage.title();
 // console.log(pageTitle);
 // await page.pause();
})