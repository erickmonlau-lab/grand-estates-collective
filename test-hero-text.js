import { chromium } from 'playwright';

async function testWranglerText() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });

  await page.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('--- Initial ES ---');
  console.log('H1:', await page.locator('#hero h1').innerText());
  console.log('Subtitle:', await page.locator('#hero p').first().innerText());

  // Click CA
  console.log('\n--- Switching to CA ---');
  await page.locator('button:has-text("CA")').first().click();
  await page.waitForTimeout(1000);
  console.log('H1:', await page.locator('#hero h1').innerText());
  console.log('Subtitle:', await page.locator('#hero p').first().innerText());

  // Click EN
  console.log('\n--- Switching to EN ---');
  await page.locator('button:has-text("EN")').first().click();
  await page.waitForTimeout(1000);
  console.log('H1:', await page.locator('#hero h1').innerText());
  console.log('Subtitle:', await page.locator('#hero p').first().innerText());

  await browser.close();
}

testWranglerText().catch(console.error);
