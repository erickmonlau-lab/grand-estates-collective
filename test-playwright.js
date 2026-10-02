import { chromium } from 'playwright';

async function testPage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const response = await page.goto('https://gesgrama.com/', { waitUntil: 'networkidle' });
  console.log('Status:', response.status());
  console.log('Console Errors:', consoleErrors);

  // Take screenshot
  await page.screenshot({ path: 'screenshot-prod-variante-b.png', fullPage: false });
  console.log('Screenshot saved to screenshot-prod-variante-b.png');

  // Check header, hero text, logo
  const title = await page.title();
  console.log('Page Title:', title);

  const heroHeading = await page.locator('h1').innerText();
  console.log('Hero Heading:', heroHeading.replace(/\n/g, ' '));

  await browser.close();
}

testPage().catch(console.error);
