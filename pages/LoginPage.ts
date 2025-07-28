import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    readonly page: Page;
    username: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async getErrorMessage() {
    return this.page.locator('text=Incorrect');
  }
}
