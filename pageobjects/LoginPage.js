class LoginPage {

constructor(page)
{
    this.page = page
    this.username = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
    this.loginBtn = page.locator("#login")
    this.productsText = page.locator(".card-body b")

}

async GoTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");

}

async validLogin(username, password)
{
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    // await page.waitForLoadState('networkidle');
    await this.productsText.first().waitFor();
}




}
module.exports = {LoginPage};