import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.validateText("Shopping List Login");
      });

  test('validate show error for wrong password', async ({ page }) => {
    await loginPage.login('demo', '12345');
    await loginPage.validateText("Incorrect password");
  });

  test('validate show error for wrong username', async ({ page }) => {
    await loginPage.login('dema', '1234');
    await loginPage.validateText("Incorrect username");
  });

  test('validate login with valid credentials', async ({ page }) => {
    await loginPage.login('demo', '1234');
    await loginPage.validateText("My Shopping List");
  });

  test.afterEach(async ({ page }, testInfo) => {
    await page.close();
  });
});
