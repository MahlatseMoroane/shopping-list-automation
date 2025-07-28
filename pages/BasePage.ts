import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly url = "http://localhost:3000";

    constructor(page: Page) {
        this.page = page;
    }


  async validateText(expectedText: string) {
    await this.page.waitForLoadState("networkidle");
    const timeout = 5000;
    try {
      await expect(this.page.getByText(expectedText).first()).toBeVisible({ timeout });
    } catch {
      const xpathSelector = `//*[contains(@value, "${expectedText}")]`;
      try {
        await expect(this.page.locator(xpathSelector).first()).toBeVisible({ timeout });
      } catch (error) {
        console.error(`Text "${expectedText}" is not visible on the page within ${timeout / 1000} seconds.`);
        throw error;
      }
    }
  }


  async isTextVisible(expectedText: string): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    const timeout = 5000;
    const xpathSelector = `//*[contains(text(), "${expectedText}") or contains(@value, "${expectedText}")]`;
    let element = this.page.locator(xpathSelector).first();
    if (!(await element.isVisible({ timeout }))) {
      return false;
    }
    try {
      const isVisible = await element.isVisible({ timeout });
      return isVisible; 
    } catch (error) {
      return false;
    }
  }

  async isTextNotVisible(expectedText: string): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    const timeout = 5000; 
    const xpathSelector = `//*[contains(text(), "${expectedText}") or contains(@value, "${expectedText}")]`;
    let element = this.page.locator(xpathSelector).first();
    if (!(await element.isVisible({ timeout }))) {
      return true; 
    }
    try {
      const isVisible = await element.isVisible({ timeout });
      return !isVisible;
    } catch (error) {
      return true; 
    }
  }

}