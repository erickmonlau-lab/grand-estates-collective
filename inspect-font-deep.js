import { chromium } from 'playwright';

async function deepInspect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // First check current production (pre-deploy of new commit)
  await page.goto('https://gesgrama.com/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const el = document.getElementById('propiedades');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(2000);

  // Fonts actually loaded by the browser
  const loadedFonts = await page.evaluate(() => {
    const entries = performance.getEntriesByType('resource');
    return entries
      .filter(e => e.name.includes('woff') || e.name.includes('font'))
      .map(e => ({
        name: e.name.split('/').pop(),
        size: Math.round(e.transferSize / 1024) + 'KB',
        duration: Math.round(e.duration) + 'ms'
      }));
  });
  console.log('\n=== LOADED FONTS ===');
  console.log(JSON.stringify(loadedFonts, null, 2));

  // Check if AG Book Rounded is actually in the document fonts
  const docFonts = await page.evaluate(() => {
    const fonts = [];
    document.fonts.forEach(f => {
      fonts.push({ family: f.family, weight: f.weight, style: f.style, status: f.status });
    });
    return fonts;
  });
  console.log('\n=== DOCUMENT FONTS STATUS ===');
  console.log(JSON.stringify(docFonts, null, 2));

  // Screenshot of the card area - BEFORE
  await page.screenshot({ path: 'font-before.png', clip: { x: 0, y: 500, width: 1400, height: 400 } });
  console.log('\nSaved font-before.png');

  // Check what font is actually USED via FontFaceObserver approach
  const actualFont = await page.evaluate(() => {
    // Create a test element with each font
    const test = document.createElement('span');
    test.style.position = 'fixed';
    test.style.visibility = 'hidden';
    test.style.top = '-9999px';
    test.textContent = 'VENTA';
    document.body.appendChild(test);
    
    const results = [];
    
    // Test AG Book Rounded at 700
    test.style.fontFamily = '"AG Book Rounded", monospace';
    test.style.fontWeight = '700';
    const w1 = test.getBoundingClientRect().width;
    
    // Test monospace alone
    test.style.fontFamily = 'monospace';
    test.style.fontWeight = '700';
    const w2 = test.getBoundingClientRect().width;
    
    results.push({ test: 'AG Book Rounded 700', width: w1 });
    results.push({ test: 'monospace (fallback)', width: w2 });
    results.push({ fontLoaded: Math.abs(w1 - w2) > 0.5, diff: w1 - w2 });
    
    // Test at 900
    test.style.fontFamily = '"AG Book Rounded", monospace';
    test.style.fontWeight = '900';
    const w3 = test.getBoundingClientRect().width;
    results.push({ test: 'AG Book Rounded 900', width: w3 });
    
    // Test system-ui
    test.style.fontFamily = 'system-ui';
    test.style.fontWeight = '700';
    const w4 = test.getBoundingClientRect().width;
    results.push({ test: 'system-ui 700', width: w4 });
    
    document.body.removeChild(test);
    return results;
  });
  console.log('\n=== FONT RENDERING COMPARISON ===');
  console.log(JSON.stringify(actualFont, null, 2));

  // Check RESERVADO contrast
  const contrastCheck = await page.evaluate(() => {
    const reservado = Array.from(document.querySelectorAll('span')).find(el =>
      el.textContent.trim().includes('Reservado') || el.textContent.trim().includes('RESERVADO')
    );
    if (!reservado) return { error: 'RESERVADO not found' };
    const cs = window.getComputedStyle(reservado);
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      className: reservado.className.substring(0, 100)
    };
  });
  console.log('\n=== RESERVADO CONTRAST ===');
  console.log(JSON.stringify(contrastCheck, null, 2));

  // Take zoomed screenshot of badges and button
  const cards = await page.$$('a[href^="/inmobiliaria/"]');
  if (cards.length > 0) {
    await cards[0].screenshot({ path: 'font-card-zoom.png' });
    console.log('Saved font-card-zoom.png');
  }

  await browser.close();
}

deepInspect().catch(console.error);
