import { chromium } from 'playwright';

async function testFullDropdown() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  const zonaBtn = page.locator('button:has-text("ZONA")').first();
  await zonaBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshot-full-dropdown-visible.png', clip: { x: 50, y: 650, width: 1340, height: 500 } });
  await browser.close();
}

testFullDropdown().catch(console.error);
