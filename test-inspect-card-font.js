import { chromium } from 'playwright';

async function inspectFonts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://gesgrama.com/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    const el = document.getElementById('propiedades');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1500);

  // Take screenshot of the first property card
  const cards = await page.$$('a[href^="/inmobiliaria/"]');
  console.log('Cards found:', cards.length);
  if (cards.length > 0) {
    await cards[0].screenshot({ path: 'property-card-full.png' });
    console.log('Saved card screenshot to property-card-full.png');
  }

  await browser.close();
}

inspectFonts().catch(console.error);
