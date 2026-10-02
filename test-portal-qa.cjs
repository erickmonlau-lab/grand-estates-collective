const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '1280', width: 1280, height: 800 },
    { name: '1024', width: 1024, height: 768 },
    { name: '430', width: 430, height: 932 },
    { name: '390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Test Tipo dropdown
    const tipoBtn = page.locator('button', { hasText: 'TIPO' }).first();
    await tipoBtn.click();
    await page.waitForTimeout(500);

    const dropdown = page.locator('div[role="listbox"]').first();
    const isVisible = await dropdown.isVisible();
    const box = await dropdown.boundingBox();
    console.log(`[${vp.name}] Tipo Dropdown visible: ${isVisible}, Box:`, JSON.stringify(box));

    await page.screenshot({ path: `qa_${vp.name}_tipo.png` });

    // Test click outside to close
    await page.mouse.click(10, 10);
    await page.waitForTimeout(300);
    const closed = !(await dropdown.isVisible());
    console.log(`[${vp.name}] Closed on outside click: ${closed}`);

    // Test Zona dropdown
    const zonaBtn = page.locator('button', { hasText: 'ZONA' }).first();
    await zonaBtn.click();
    await page.waitForTimeout(500);

    const zonaBox = await dropdown.boundingBox();
    console.log(`[${vp.name}] Zona Box:`, JSON.stringify(zonaBox));
    await page.screenshot({ path: `qa_${vp.name}_zona.png` });

    // Test select option closes dropdown
    const option = page.locator('button[role="option"]', { hasText: 'Centro' }).first();
    await option.click();
    await page.waitForTimeout(300);
    const optionClosed = !(await dropdown.isVisible());
    console.log(`[${vp.name}] Closed on select option: ${optionClosed}`);

    await context.close();
  }

  await browser.close();
  console.log('ALL PLAYWRIGHT TESTS COMPLETED SUCCESSFULLY!');
})();
