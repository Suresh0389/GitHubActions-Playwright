const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const dataset = JSON.parse(JSON.stringify(require('../Utils/ClientAppPOTestData.json')));


for(const data of dataset)
{

test(`Client App login for ${data.productName}`, async ({page})=>
{

    //Login Page PO
    const loginpage = new LoginPage(page);
    await loginpage.GoTo();
    await loginpage.validLogin(data.username, data.password);

    // Dashboard Page PO
    const dashboardpage = new DashboardPage(page);
    await dashboardpage.searchProductAddCart(data.productName);

    // Cart Page PO
    // const textMatch = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    // await expect(textMatch).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();

    // Orders Review Page PO
    await page.locator("[name*='coupon']").fill("rahulshettyacademy");
    await page.locator("[type*='submit']").click();
    const couponText = await page.locator("text=* Coupon Applied").textContent();
    console.log(couponText);
    const confirmMail = page.locator("div.user__name [type='text']").first();
    await confirmMail.waitFor();
    await expect(confirmMail).toHaveText(data.username);

    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    const dropDown =  page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
        const countryText = await dropDown.locator("button").nth(i).textContent();
        if(countryText === " India")
        {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator("div a.btnn").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("[routerlink*=myorders]").first().click();

    // Orders History Page PO
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowsCount = await rows.count();
    for(let i=0; i<rowsCount; ++i)
    {
        const orderText = await rows.nth(i).locator("th").textContent();
        console.log(orderText);
        if(orderId.includes(orderText))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const oderIdDetails = await page.locator(".col-text").textContent();
    console.log(oderIdDetails)
    await expect(orderId.includes(oderIdDetails)).toBeTruthy();
    

});

}
