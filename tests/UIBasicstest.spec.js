const {test, expect} = require('@playwright/test');
// test.describe.configure({mode:'parallel'});

test('Browser Context Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    console.log(await page.url());

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('#password').fill("learningg");
    await page.locator('.checkmark').last().click();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').click();
    await page.locator("input[type='submit']").click();

    console.log(await page.locator("div[style*='block']").textContent());
    await expect(page.locator("div[style*='block']")).toContainText('Incorrect');

    await page.locator('#password').fill("");
    await page.locator('#password').fill("learning");
    await page.locator("input[type='submit']").click();

    // console.log(await page.locator('.card-title a').first().textContent());
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-title a').first().waitFor();
    console.log(await page.locator('.card-title a').allTextContents());

});


test('UI Controls', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const UserName = page.locator('#username')
    const Password = page.locator('#password')
    const radioButton = page.locator('.checkmark').last()
    const popUp = page.locator('#okayBtn')
    const dropDown = page.locator("select.form-control")
    const checkBox = page.locator('#terms')
    const loginButton = page.locator("input[type='submit']")

    await UserName.fill("rahulshettyacademy")
    await Password.fill("learning")
    // Radio Button
    await radioButton.click();
    // Assertions
    await expect(radioButton).toBeChecked();
    expect(await radioButton.isChecked()).toBeTruthy();

    // await page.pause()
    console.log(await radioButton.isChecked());
    // General PopUp
    await popUp.click();
    // Select or Static Dropdown
    await dropDown.selectOption("Consultant");
    // CheckBox
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    // Button
    await loginButton.click();

});

test('Child Tab Handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const UserName = page.locator('#username');
    const newPageLocator = page.locator(".blinkingText");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [page2] = await Promise.all(
    [
        context.waitForEvent('page'),
        newPageLocator.click(),
    ])
    console.log(page2.url());
    const mailText = await page2.locator(".red").textContent();
    console.log(mailText);
    // await console.log(page2.locator(".red").textContent());

    const arrayText = mailText.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await UserName.fill(domain);
    console.log(await UserName.textContent());

});