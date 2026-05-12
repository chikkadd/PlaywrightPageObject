const {test, expect} = require('@playwright/test')

test('this is to test dialog pop ups', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")   
    page.on('dialog', dialog=>dialog.accept());
    await page.click('#alertBtn');

  // Optionally wait a short time to see if alert appears
  await page.waitForTimeout(2000);

  // Continue with your test steps
  await expect(page).toHaveTitle("Automation Testing Practice");

  const element1= await page.locator("//button[text()='New Tab']")

  const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'),
        element1.click()
    ]
  )
  const expectedValue= await newPage.locator("//a[text()='Online Training']").textContent();
  await expect(expectedValue).toEqual("Online Training");
})