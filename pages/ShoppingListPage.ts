import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingListPage extends BasePage{

    readonly page: Page;
    newitem: Locator;
    addBtn: Locator;
    logOutBtn: Locator;
    deleteBtn: Locator;
    editBtn: Locator;
    updateBtn: Locator;
    editItemTxt: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.newitem = page.getByRole('textbox', { name: 'New item' });
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.logOutBtn = page.getByRole('button', { name: 'Logout' })
        this.deleteBtn = page.getByRole('button', { name: 'Delete' });
        this.editBtn = page.getByRole('button', { name: 'Edit' });
        this.updateBtn = page.getByRole('button', { name: 'Update' });
        this.editItemTxt = page.getByRole('listitem').getByRole('textbox');
    }



  async addItem(name: string) {
    await this.newitem.fill(name);
    await this.addBtn.click();
  }



  async editItemTo(newName: string) {
    await this.editItemTxt.fill(newName);
  }

  async clickDeleteBtn(index: number) {
    await this.deleteBtn.nth(index).click();
  }


  async clearTheList() {
    // Keep deleting the first item as long as a Delete button is visible
    while (await this.deleteBtn.first().isVisible().catch(() => false)) {
      await this.deleteBtn.first().click();
      // Optionally wait for the list to update before checking again
      await this.page.waitForTimeout(100); // small delay to allow DOM update
    }
  }

  async clickEditBtn(index: number) {
    await this.editBtn.nth(index).click();
  }

  async clickUpdateBtn(index: number) {
    await this.updateBtn.nth(index).click();
  }

  async itemExists(name: string) {
    return this.page.locator(`text=${name}`).isVisible();
  }
}
