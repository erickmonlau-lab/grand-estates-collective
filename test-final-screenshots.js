import { chromium } from 'playwright';

async function verifyScreenshots() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop 1440
  console.log('Testing Desktop 1440x900...');
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(500);

  // Take screenshot of Desktop hero
  await page1440.screenshot({ path: 'screenshot-final-hero-1440.png', clip: { x: 0, y: 0, width: 1440, height: 1100 } });

  // Open "Zona" dropdown
  const zonaBtn1440 = page1440.locator('button:has-text("ZONA")').first();
  await zonaBtn1440.click();
  await page1440.waitForTimeout(300);
  await page1440.screenshot({ path: 'screenshot-final-dropdown-zona.png', clip: { x: 200, y: 400, width: 1040, height: 450 } });

  // 2. Desktop 1280
  console.log('Testing Desktop 1280x800...');
  const page1280 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page1280.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page1280.waitForTimeout(500);
  await page1280.screenshot({ path: 'screenshot-final-hero-1280.png', clip: { x: 0, y: 0, width: 1280, height: 1100 } });

  // 3. Mobile 375
  console.log('Testing Mobile 375x812...');
  const pageMobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  await pageMobile.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(500);
  await pageMobile.screenshot({ path: 'screenshot-final-hero-mobile.png', clip: { x: 0, y: 0, width: 375, height: 1200 } });

  // Check texts and selectors
  const heroText = await page1440.locator('#hero').innerText();
  console.log('Hero contains "Selecciona zona":', heroText.includes('Selecciona zona'));
  console.log('Hero contains "Selecciona tipo":', heroText.includes('Selecciona tipo'));
  console.log('Hero contains "Comprar":', heroText.includes('Comprar'));
  console.log('Hero contains "Alquilar":', heroText.includes('Alquilar'));
  console.log('Hero contains "Buscar":', heroText.includes('Buscar'));
  console.log('Hero contains metrics (should be false):', heroText.includes('4.500+') || heroText.includes('Comunidades'));

  // Check section transition (Hero -> Ribbon -> Propiedades)
  const ribbonText = await page1440.locator('.animate-marquee').first().innerText();
  console.log('Ribbon active:', ribbonText.includes('GARANTÍAS') || ribbonText.includes('AICAT'));

  const propHeading = await page1440.locator('#propiedades h2').innerText();
  console.log('Propiedades heading:', propHeading);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

verifyScreenshots().catch(e => {
  console.error(e);
  process.exit(1);
});
