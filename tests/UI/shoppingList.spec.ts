import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ShoppingListPage } from '../../pages/ShoppingListPage';

test.describe('Shopping Item Tests', () => {


  let login: LoginPage;
  let list: ShoppingListPage;


  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    list = new ShoppingListPage(page);
    await login.goto();
    await login.validateText("Shopping List Login");
    await login.login('demo', '1234');
    await login.validateText("My Shopping List");

  });

  test('validate add, edit, and delete an item', async ({ page }) => {
    await list.clearTheList();
    await list.addItem('Bananas');
    await list.validateText("Bananas");
    await list.clickEditBtn(0);
    await list.editItemTo("Grapes");
    await list.clickUpdateBtn(0);
    await list.validateText("Grapes");
    await list.clickDeleteBtn(0);
    await page.waitForTimeout(2000);
    expect(await list.isTextNotVisible("Grapes")).toBeTruthy();

  });


});
