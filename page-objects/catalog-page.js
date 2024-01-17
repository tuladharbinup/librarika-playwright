const { expect } = require('@playwright/test');

exports.CatalogPage = class CatalogPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator("#UserUsername");
    this.password = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.catalogIcon = page.locator('i[class="feather icon-folder"]')
    this.newCategory = page.getByRole('link', { name: 'New Category' }).first();
    this.smartAddButton = page.getByRole('link', { name: 'Smart Add' }).first();
    this.addByISBNHeader = page.getByRole('heading', { name: 'Add by ISBN' });
    this.isbnTextbox = page.getByLabel('ISBN-10 or ISBN-');
    this.autoSaveButton = page.getByRole('button', { name: 'Auto Save' }); 
    this.viewBookButton = page.getByRole('link', { name: 'View Book' })

  }

  async gotoUrl(url) {
    await this.page.goto(url);
  }

  async getByText(text){
    return this.page.getByText(text)
  }

  async login() {
    await this.gotoUrl('https://publibrary.librarika.com/');
    // Expect a title "to contain" a substring.
    await expect(this.page).toHaveTitle(/Binup's Public Library/);
    await this.username.fill('fomade4112@talmetry.com');
    await this.password.fill('fomade4112@talmetry.com');
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard');
  }

  async clickCatalog() {
    await this.catalogIcon.hover();
    await this.catalogIcon.click();
  }

  async clickCatalogItem() {
    await this.page.getByText('Catalog Items').click();
  }

  async clickCategories() {
    await this.page.getByText('Categories').click();
    await expect(this.newCategory).toBeVisible();
  }

  async clickSmartAddButton() {
    await this.smartAddButton.hover();
    await this.smartAddButton.click();
    await expect(this.addByISBNHeader).toBeVisible();
  }

  async fillIsbnTextbox(isbn) {
    await this.isbnTextbox.fill(isbn);
  }

  async clickAutoSaveButton() {
    await this.autoSaveButton.click();
  }

  async clickViewBookButton() {
    await this.viewBookButton.click();
  }

};