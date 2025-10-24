import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.click('.shopping_cart_link');
  }

  async assertCartItemCount(expectedCount: number) {
    const items = await this.page.$$('.cart_item');
    if (items.length !== expectedCount) {
      throw new Error(`Esperado ${expectedCount} productos, pero hay ${items.length}`);
    }
  }

  async startCheckout() {
    await this.page.click('[data-test="checkout"]');
  }
}