import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async assertConfirmationMessage() {
    const selector = '.complete-header'; // ajusta el selector a tu aplicación
    const text = await this.page.textContent(selector); // string | null

    if (!text || !text.includes('Thank you for your order')) {
      throw new Error(`Mensaje de confirmación no encontrado. Texto actual: ${text}`);
    }
  }
}