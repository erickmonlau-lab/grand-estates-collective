import { chromium } from 'playwright';

async function testLocalPreview() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const responses = [];
  page.on('response', res => {
    const url = res.url();
    if (url.includes('.js')) {
      responses.push(url.split('/').pop());
    }
  });

  console.log('Navigating to http://localhost:8098/ ...');
  const res = await page.goto('http://localhost:8098/', { waitUntil: 'networkidle' });
  console.log('HTTP Status:', res.status());

  await page.waitForTimeout(1000);

  // Check initial ES texts
  const heroText = await page.locator('#hero').innerText();
  console.log('Initial text has ES:', heroText.includes('Administración de Fincas') || heroText.includes('Tu próximo hogar'));
  console.log('Initial text has CA:', heroText.includes('Administració de Finques'));

  console.log('Initial scripts loaded:');
  responses.forEach(s => console.log('  -', s));

  // Verify whether CA / EN translation chunk was loaded on initial render
  const caChunkLoadedInitially = responses.some(s => s.includes('translations-ca'));
  const enChunkLoadedInitially = responses.some(s => s.includes('translations-en'));
  console.log('Was CA loaded initially?', caChunkLoadedInitially);
  console.log('Was EN loaded initially?', enChunkLoadedInitially);

  // Switch to CA
  console.log('\nClicking CA language button...');
  const caBtn = page.locator('button:has-text("CA")').first();
  await caBtn.click();
  await page.waitForTimeout(1000);

  const heroTextCa = await page.locator('#hero').innerText();
  console.log('After switch to CA, has CA text:', heroTextCa.includes('Proper') || heroTextCa.includes('administració') || heroTextCa.includes('Administració') || heroTextCa.includes('finques') || heroTextCa.includes('Finques') || heroTextCa.includes('pròxim'));

  const caChunkLoadedNow = responses.some(s => s.includes('translations-ca'));
  console.log('Was CA loaded after clicking CA?', caChunkLoadedNow);

  // Switch to EN
  console.log('\nClicking EN language button...');
  const enBtn = page.locator('button:has-text("EN")').first();
  await enBtn.click();
  await page.waitForTimeout(1000);

  const heroTextEn = await page.locator('#hero').innerText();
  console.log('After switch to EN, has EN text:', heroTextEn.includes('Property') || heroTextEn.includes('Real Estate') || heroTextEn.includes('closer') || heroTextEn.includes('home'));

  const enChunkLoadedNow = responses.some(s => s.includes('translations-en'));
  console.log('Was EN loaded after clicking EN?', enChunkLoadedNow);

  // Switch back to ES
  console.log('\nClicking ES language button...');
  const esBtn = page.locator('button:has-text("ES")').first();
  await esBtn.click();
  await page.waitForTimeout(1000);

  console.log('\nTotal Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
}

testLocalPreview().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
