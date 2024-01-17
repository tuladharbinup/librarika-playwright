// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://publibrary.librarika.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Binup's Public Library/);
  await page.locator("#UserUsername").fill('fomade4112@talmetry.com');
  await page.getByLabel('Password').fill('fomade4112@talmetry.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
});

test.describe('E2E tests for catalog categories', () => {
  test('view catalog categories', async ({ page }) => {
    await page.goto('https://publibrary.librarika.com/users/dashboard');
    await expect(page.getByText('Discover')).toBeVisible();
    await page.locator('i[class="feather icon-folder"]').hover();
    await page.locator('i[class="feather icon-folder"]').click();
    await page.getByText('Categories').click();
    await expect(page.getByRole('link', { name: 'New Category' }).first()).toBeVisible();

  });
  test('add duplicate catalog item', async ({ page }) => {
    await page.goto('https://publibrary.librarika.com/users/dashboard');
    await expect(page.getByText('Discover')).toBeVisible();
    await page.locator('i[class="feather icon-folder"]').hover();
    await page.locator('i[class="feather icon-folder"]').click();
    await page.getByText('Catalog Items').click();
    await expect(page.getByText('Manage your library catalogs here.')).toBeVisible();
    await page.getByRole('link', { name: 'Smart Add' }).first().hover();
    await page.getByRole('link', { name: 'Smart Add' }).first().click();
    await expect(page.getByRole('heading', { name: 'Add by ISBN' })).toBeVisible();
    await page.getByLabel('ISBN-10 or ISBN-').fill('9781603400374');
    await page.getByRole('button', { name: 'Auto Save' }).click(); 
    await expect(page.getByText('The book already added to your library.')).toBeVisible();
    await page.getByRole('link', { name: 'View Book' }).click();

  });

});

