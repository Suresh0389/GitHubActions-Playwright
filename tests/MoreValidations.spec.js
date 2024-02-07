const {test, expect} = require('@playwright/test');

test('Popup Validations', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "ScreenshotOnLocator.png"})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "FullPageScreenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();

    // expect(await page.screenshot()).toMatchSnapshot("Landing.png")  => For visual Testing(To match actual and expected Screenshots)

    await page.locator("#name").fill("Suresh")
    page.on('dialog',async dialog => {
        console.log(await dialog.type());
        console.log(await dialog.message());
        expect(await dialog.message().includes("Suresh")).toBeTruthy();
        await dialog.accept();
        // dialog.dismiss();
      });
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator("#courses-iframe")
    await framesPage.locator("li [href*=lifetime-access]:visible").click();
    const frameText = await framesPage.locator(".text h2").textContent();
    console.log(frameText.split(" ")[1]);


});