class DashboardPage {

constructor(page)
{
    this.page = page
    this.products = page.locator(".card-body")
    this.productsText = page.locator(".card-body b")
    this.cartBtn = page.locator("button[routerlink*=cart]")
    this.cartConfirm = page.locator('.cart')

}

async searchProductAddCart(productName)
{
    console.log(await this.productsText.allTextContents());

    const count = await this.products.count();
    for(let i = 0; i<count; ++i)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            await this.products.nth(i).locator(".fa-shopping-cart").click();
            break;
        }
    }
    await this.cartBtn.last().click();
    await this.cartConfirm.waitFor();

}

}
module.exports = {DashboardPage};