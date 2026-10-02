import { chromium } from 'playwright';

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
    
    // Dismiss cookie banner if present so it doesn't obstruct clicks
    const acceptCookies = page.locator('button:has-text("Aceptar todas"), button:has-text("Aceptar")');
    if (await acceptCookies.count() > 0) {
      await acceptCookies.first().click().catch(() => {});
      await page.waitForTimeout(150);
    }

    await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '.png' });
    
    // Check dropdowns on 1440 and 390
    if (vp.name === '1440' || vp.name === '390') {
      const zonaBtn = page.locator('#hero button:has-text("ZONA")').first();
      if (await zonaBtn.count() > 0) {
        await zonaBtn.click();
        await page.waitForTimeout(250);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-drop-zona.png' });
        
        // click an option to close
        const fondoOption = page.locator('button:has-text("Fondo")').first();
        if (await fondoOption.count() > 0) {
          await fondoOption.click();
          await page.waitForTimeout(150);
        }
      }

      // Check precio dropdown
      const precioBtn = page.locator('#hero button:has-text("PRECIO")').first();
      if (await precioBtn.count() > 0) {
        await precioBtn.click();
        await page.waitForTimeout(250);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-drop-precio.png' });
        
        // click first price to close
        const precioOption = page.locator('button:has-text("Hasta 200.000 €")').first();
        if (await precioOption.count() > 0) {
          await precioOption.click();
          await page.waitForTimeout(150);
        } else {
          await page.locator('#hero').click({ position: { x: 50, y: 50 } }).catch(() => {});
        }
      }

      // Test search action
      const searchBtn = page.locator('#hero button:has-text("Buscar")').first();
      if (await searchBtn.count() > 0) {
        await searchBtn.click();
        await page.waitForTimeout(700);
        await page.screenshot({ path: 'screenshot-searchfirst-' + vp.name + '-after-search.png' });
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED CLEANLY');
})();
