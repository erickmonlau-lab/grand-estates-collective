const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '1280', width: 1280, height: 800 },
    { name: '1024', width: 1024, height: 768 },
    { name: '430', width: 430, height: 932, isMobile: true },
    { name: '390', width: 390, height: 844, isMobile: true },
    { name: '360', width: 360, height: 740, isMobile: true },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile
    });
    await page.goto('http://127.0.0.1:8787', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '.png' });
    
    // Check dropdowns on 1440 and 390
    if (vp.name === '1440' || vp.name === '390') {
      const zonaBtn = await page.locator('#hero button:has-text("ZONA")').first();
      if (await zonaBtn.count() > 0) {
        await zonaBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-drop-zona.png' });
        
        // click an option
        const fondoOption = await page.locator('button:has-text("Fondo")').first();
        if (await fondoOption.count() > 0) {
          await fondoOption.click();
        }
      }

      // Check precio dropdown
      const precioBtn = await page.locator('#hero button:has-text("PRECIO")').first();
      if (await precioBtn.count() > 0) {
        await precioBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-drop-precio.png' });
      }

      // Test search action
      const searchBtn = await page.locator('#hero button:has-text("Buscar")').first();
      if (await searchBtn.count() > 0) {
        await searchBtn.click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-after-search.png' });
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED CLEANLY');
})();
