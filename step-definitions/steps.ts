import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Ya no usamos variables de navegador a nivel de módulo.
// Las instancias de browser/page las maneja support/world.ts (Before/After).

Given('el usuario navega a la página de login', async function () {
  const page = (this as any).page;
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('ingresa {string} y {string}', async function (username: string, password: string) {
  const page = (this as any).page;
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
});

Then('accede a la página de productos', async function () {
  const page = (this as any).page;
  const loginPage = new LoginPage(page);
  await loginPage.assertLoginSuccess();
  // NO cerrar browser aquí; After() en support/world.ts lo hará por escenario
});

Then('ve un mensaje de error', async function () {
  const page = (this as any).page;
  const loginPage = new LoginPage(page);
  await loginPage.assertLoginError();
});

Given('el usuario inicia sesión como {string} con {string}', async function (username: string, password: string) {
  const page = (this as any).page;
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  // no cerramos nada, creamos objects cuando haga falta
});

When('agrega el primer producto al carrito', async function () {
  const page = (this as any).page;
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
});

Then('el carrito muestra {int} producto', async function (count: number) {
  const page = (this as any).page;
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.assertCartItemCount(count);
  // No cerrar el browser aquí.
});

When('inicia el proceso de compra', async function () {
  const page = (this as any).page;
  const cartPage = new CartPage(page);
  // En lugar de depender de una variable global cartPage, la creamos aquí
  await cartPage.goto();
  await cartPage.startCheckout();
  // checkoutPage se puede crear cuando se necesite
});

When('completa los datos de envío', async function () {
  const page = (this as any).page;
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutForm('Rosalba', 'QA', '12345');
  await checkoutPage.finishCheckout();
});

Then('ve el mensaje de confirmación de compra', async function () {
  const page = (this as any).page;
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.assertConfirmationMessage();
});