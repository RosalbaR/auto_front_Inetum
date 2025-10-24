import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CustomWorld } from '../support/world';

// Usar this tipado como CustomWorld en cada step:
Given('el usuario navega a la página de login', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('ingresa {string} y {string}', async function (this: CustomWorld, username: string, password: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
});

Then('accede a la página de productos', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.assertLoginSuccess();
});

Then('ve un mensaje de error', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.assertLoginError();
});

Given('el usuario inicia sesión como {string} con {string}', async function (this: CustomWorld, username: string, password: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
});

When('agrega el primer producto al carrito', async function (this: CustomWorld) {
  const page = this.page!;
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
});

Then('el carrito muestra {int} producto', async function (this: CustomWorld, count: number) {
  const page = this.page!;
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.assertCartItemCount(count);
});

When('inicia el proceso de compra', async function (this: CustomWorld) {
  const page = this.page!;
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.startCheckout();
});

When('completa los datos de envío', async function (this: CustomWorld) {
  const page = this.page!;
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutForm('Rosalba', 'QA', '12345');
  await checkoutPage.finishCheckout();
});

Then('ve el mensaje de confirmación de compra', async function (this: CustomWorld) {
  const page = this.page!;
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.assertConfirmationMessage();
});