import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addFirstProductToCart() {
    await this.page.click('.inventory_item button'); // primer botón "Add to cart"
  }
}