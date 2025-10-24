import fs from 'fs';
import path from 'path';
import { Before, After, setDefaultTimeout, IWorld } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

setDefaultTimeout(60 * 1000); // 60s por escenario

// Tipado simple para el World que usamos en los steps.
// Lo exportamos para poder hacer: const world = this as CustomWorld;
export interface CustomWorld extends IWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

Before(async function (this: CustomWorld) {
  // Lanzar browser por escenario
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  // Si falla, guardar screenshot y html para debugging
  try {
    const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    if (scenario && (scenario.result as any)?.status === 'FAILED') {
      if (this.page && !this.page.isClosed()) {
        const name = (scenario.pickle && scenario.pickle.name)
          ? scenario.pickle.name.replace(/\s+/g, '_')
          : `failed_${Date.now()}`;
        const screenshotPath = path.join(screenshotsDir, `${name}.png`);
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        // Además guardar HTML de la página
        try {
          const html = await this.page.content();
          fs.writeFileSync(path.join(screenshotsDir, `${name}.html`), html, 'utf8');
        } catch (e) {
          // ignore small failures saving html
        }
      }
    }
  } catch (err) {
    // no bloquear el cierre si falla el guardado de artefactos
    // console.error('Error saving screenshot:', err);
  } finally {
    // Cerrar recursos siempre (no bloquear si están undefined)
    try {
      if (this.page && !this.page.isClosed()) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (e) {
      // ignore
    }
  }
});