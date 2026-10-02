import { chromium } from 'playwright';

async function captureLocal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  
  await page.goto('https://gesgrama.com/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const el = document.getElementById('propiedades');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1500);

  // Simulate font-ui-clean on badges/buttons by injecting CSS
  await page.addStyleTag({
    content: `
      /* Simulate font-ui-clean on all card badges and buttons */
      span.rounded-full,
      span.rounded-xl,
      div.rounded-xl {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      }
    `
  });

  await page.waitForTimeout(500);

  const cards = await page.$$('a[href^="/inmobiliaria/"]');
  if (cards.length > 0) {
    await cards[0].screenshot({ path: 'font-after-simulated.png' });
    console.log('Saved font-after-simulated.png');
  }

  await browser.close();
}

captureLocal().catch(console.error);
