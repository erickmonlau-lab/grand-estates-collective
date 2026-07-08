import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:8095/');
    // Wait a bit for React to hydrate and potentially crash
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error("Navigation error:", e);
  } finally {
    await browser.close();
  }
})();
