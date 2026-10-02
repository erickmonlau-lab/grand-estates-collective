import { chromium } from 'playwright';

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1024', width: 1024, height: 768 },
  { name: '430', width: 430, height: 932 },
  { name: '390', width: 390, height: 844 },
];

async function runQA() {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });

    // Test Tipo dropdown
    const tipoBtn = await page.locator('button', { hasText: 'Todo tipo' });
    await tipoBtn.click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `qa_${vp.name}_tipo.png` });

    // Close and open Zona
    await page.locator('#hero').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(100);

    const zonaBtn = await page.locator('button', { hasText: 'Santa Coloma' });
    await zonaBtn.click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `qa_${vp.name}_zona.png` });

    await page.close();
    console.log(`Captured QA screenshots for ${vp.name}`);
  }

  await browser.close();
  console.log('All QA screenshots captured successfully.');
}

runQA().catch(console.error);
