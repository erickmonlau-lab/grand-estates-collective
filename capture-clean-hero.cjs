const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const vps = [
    { name: 'hero_clean_1440', w: 1440, h: 900 },
    { name: 'hero_clean_1280', w: 1280, h: 800 },
    { name: 'hero_clean_430', w: 430, h: 932 },
    { name: 'hero_clean_390', w: 390, h: 844 },
  ];
  for (const v of vps) {
    const context = await browser.newContext({ viewport: { width: v.w, height: v.h } });
    const page = await context.newPage();
    await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: v.name + '.png' });
    await context.close();
  }
  await browser.close();
  console.log('CLEAN HERO SCREENSHOTS CAPTURED');
})();
