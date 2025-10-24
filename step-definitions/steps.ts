import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';

import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

import { CheckoutPage } from '../pages/CheckoutPage';


let browser: Browser;
let page: Page;
let loginPage: LoginPage;

let productsPage: ProductsPage;
let cartPage: CartPage;

let checkoutPage: CheckoutPage;

Given('el usuario navega a la página de login', async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('ingresa {string} y {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('accede a la página de productos', async () => {
  await loginPage.assertLoginSuccess();
  await browser.close();
});

Then('ve un mensaje de error', async () => {
  await loginPage.assertLoginError();
  await browser.close();
});

Given('el usuario inicia sesión como {string} con {string}', async (username: string, password: string) => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  productsPage = new ProductsPage(page);
});

When('agrega el primer producto al carrito', async () => {
  await productsPage.addFirstProductToCart();
});

Then('el carrito muestra {int} producto', async (count: number) => {
  cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.assertCartItemCount(count);
  await browser.close();
});


When('inicia el proceso de compra', async () => {
  await cartPage.goto();
  await cartPage.startCheckout();
  checkoutPage = new CheckoutPage(page);
});

When('completa los datos de envío', async () => {
  await checkoutPage.fillCheckoutForm('Rosalba', 'QA', '12345');
  await checkoutPage.finishCheckout();
});

Then('ve el mensaje de confirmación de compra', async () => {
  await checkoutPage.assertConfirmationMessage();
  await browser.close();
});