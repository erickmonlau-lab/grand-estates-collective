const { chromium } = require('playwright');
const fs = require('fs');

async function testDropdown() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8099', { waitUntil: 'networkidle' });
  
  // Click on "Todo tipo"
  const tipoBtn = await page.locator('button', { hasText: 'Todo tipo' });
  await tipoBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'test_drop_1440.png' });
  
  await browser.close();
  console.log('Finished capturing test_drop_1440.png');
}

testDropdown().catch(console.error);
