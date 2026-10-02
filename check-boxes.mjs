import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8787', { waitUntil: 'networkidle' });
  
  const navBox = await page.locator('nav').first().boundingBox();
  const heroH1Box = await page.locator('#hero h1').first().boundingBox();
  const searchPill = await page.locator('#hero button:has-text("Buscar")').first().boundingBox();

  console.log('Nav Bottom:', navBox ? navBox.y + navBox.height : 'N/A');
  console.log('Hero H1 Top:', heroH1Box ? heroH1Box.y : 'N/A');
  console.log('Search Pill Y:', searchPill ? searchPill.y : 'N/A');

  await browser.close();
})();
