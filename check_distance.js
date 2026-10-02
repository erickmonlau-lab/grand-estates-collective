import { chromium } from 'playwright';

async function checkOverlap() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });
  const tipoBtn = await page.locator('button', { hasText: 'Todo tipo' });
  await tipoBtn.click();
  await page.waitForTimeout(200);
  const dropBbox = await page.locator('#hero .z-\\[60\\]').boundingBox();
  const ribbonBbox = await page.locator('text=GARANTÍAS Y ACREDITACIONES').first().boundingBox();
  console.log('Dropdown bottom:', dropBbox.y + dropBbox.height);
  console.log('Ribbon top:', ribbonBbox.y);
  console.log('Distance between dropdown bottom and ribbon top:', ribbonBbox.y - (dropBbox.y + dropBbox.height));
  await browser.close();
}

checkOverlap().catch(console.error);
