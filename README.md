# 🧪 Proyecto de Automatización Sauce Demo

## 🎯 Objetivo
Automatizar el flujo de compra de la aplicación web [Sauce Demo](https://www.saucedemo.com/) usando Playwright + Cucumber + TypeScript, aplicando el patrón Page Object Model.

---

## 🛠 Tecnologías
- [Playwright](https://playwright.dev/)
- [Cucumber-js](https://github.com/cucumber/cucumber-js)
- TypeScript
- Page Object Model (POM)

---

## 📁 Estructura del Proyecto
node_modules
sauce-demo-tests/
├── features/
│   ├── login.feature
│   ├── carrito.feature
│   └── compra.feature
├── step-definitions/
│   └── steps.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── support/
│   └── world.ts
├── tsconfig.json
├── cucumber.js
├── README.md
package-lock.json
package.json


---

## 🚀 Instalación

1. Instala Node.js v20 o superior
2. Clona el repositorio
3. Ejecuta:
   ```bash
   npm install
   npx playwright install