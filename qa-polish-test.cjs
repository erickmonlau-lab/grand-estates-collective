const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });

  // Baseline screenshot
  await page.screenshot({ path: 'qa-polish-1440.png' });

  // Open Tipo dropdown
  const tipoBtn = await page.locator('button:has-text("TIPO")').first();
  await tipoBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'qa-polish-1440-tipo.png' });

  // Open Barrio dropdown
  const barrioBtn = await page.locator('button:has-text("BARRIO")').first();
  await barrioBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'qa-polish-1440-barrio.png' });

  // Mobile 390
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:8099', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'qa-polish-390.png' });

  // Mobile 390 with Tipo open
  const mobTipoBtn = await mobilePage.locator('button:has-text("TIPO")').first();
  await mobTipoBtn.click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: 'qa-polish-390-tipo.png' });

  await browser.close();
  console.log('Screenshots saved successfully');
})();
