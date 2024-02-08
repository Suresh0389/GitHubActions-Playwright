const {test, expect} = require('@playwright/test');

test('Client App login', async ({page})=>
{
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginBtn = page.locator("#login")
    const products = page.locator(".card-body")
    const productName = "ADIDAS ORIGINAL"
    const cartBtn = page.locator("button[routerlink*=cart]").last()

    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill("suresh1234@gmail.com");
    await password.fill("Suresh123");
    await loginBtn.click();

    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

    const count = await products.count();
    for(let i = 0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator(".fa-shopping-cart").click();
            break;
        }
    }
    await cartBtn.click();
    await page.locator('.cart').waitFor();
    await page.waitForTimeout(2000);
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();

    await page.locator("[name*='coupon']").fill("rahulshettyacademy");
    await page.locator("[type*='submit']").click();
    const couponText = await page.locator("text=* Coupon Applied").textContent();
    console.log(couponText);
    const confirmMail = page.locator("div.user__name [type='text']").first();
    await confirmMail.waitFor();
    await expect(confirmMail).toHaveText("suresh1234@gmail.com");

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

