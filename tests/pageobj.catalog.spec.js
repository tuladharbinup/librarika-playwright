const { test, expect } = require('@playwright/test');
const { CatalogPage } = require('../page-objects/catalog-page');

test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.gotoUrl('https://publibrary.librarika.com/');
    await catalogPage.login()
  });

test.describe('E2E tests for catalog categories', () => {
    test('view catalog categories', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.gotoUrl('https://publibrary.librarika.com/users/dashboard');
        await expect(await catalogPage.getByText('Discover')).toBeVisible();
        await catalogPage.clickCatalog();
        await catalogPage.clickCategories();
    });

    test('add duplicate catalog item', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.gotoUrl('https://publibrary.librarika.com/users/dashboard');
        await expect(await catalogPage.getByText('Discover')).toBeVisible();
        await catalogPage.clickCatalog();
        await catalogPage.clickCatalogItem();
        await expect(await catalogPage.page.getByText('Manage your library catalogs here.')).toBeVisible();
        await catalogPage.clickSmartAddButton();
        await catalogPage.fillIsbnTextbox('9781603400374');
        await catalogPage.clickAutoSaveButton();
        await expect(await catalogPage.getByText('The book already added to your library.')).toBeVisible();
        await catalogPage.clickViewBookButton();
        
    });

});
