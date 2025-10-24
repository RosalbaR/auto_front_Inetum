import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

setDefaultTimeout(60 * 1000); // extiende timeout a 60s para evitar timeouts cortos

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true }); // headless: false para depurar
  context = await browser.newContext();
  page = await context.newPage();
  // guardamos page en el World para que los steps lo usen
  (this as any).page = page;
});

After(async function () {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});
