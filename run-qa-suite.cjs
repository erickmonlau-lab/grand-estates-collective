const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop 1440
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(800);
  await page1440.screenshot({ path: 'screenshot-polished-1440.png' });
  console.log('1440 screenshot saved');

  // 2. Desktop 1280
  const page1280 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page1280.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page1280.waitForTimeout(800);
  await page1280.screenshot({ path: 'screenshot-polished-1280.png' });
  console.log('1280 screenshot saved');

  // 3. Mobile 390
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page390.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page390.waitForTimeout(800);
  await page390.screenshot({ path: 'screenshot-polished-390.png' });
  console.log('390 screenshot saved');

  // 4. Mobile 430
  const page430 = await browser.newPage({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true });
  await page430.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page430.waitForTimeout(800);
  await page430.screenshot({ path: 'screenshot-polished-430.png' });
  console.log('430 screenshot saved');

  // 5. Test Dropdowns (open Zona)
  const dropBtn = page1440.locator('section#hero button').filter({ hasText: /zona/i }).first();
  await dropBtn.click();
  await page1440.waitForTimeout(400);
  await page1440.screenshot({ path: 'screenshot-polished-dropdown-zona.png' });
  console.log('Dropdown screenshot saved');

  // 6. Test Search Interaction
  const fondoOpt = page1440.locator('section#hero button').filter({ hasText: 'Fondo' }).first();
  if (await fondoOpt.isVisible()) {
    await fondoOpt.click();
    console.log('Selected Fondo');
  }
  const searchBtn = page1440.locator('section#hero button').filter({ hasText: 'Buscar' }).first();
  await searchBtn.click();
  await page1440.waitForTimeout(1000);
  await page1440.screenshot({ path: 'screenshot-polished-after-search.png' });
  console.log('After search screenshot saved');

  await browser.close();
})();
