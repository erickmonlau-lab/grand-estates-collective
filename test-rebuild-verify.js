import { chromium } from 'playwright';

async function captureRebuildVerification() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop 1440x900 viewport - First Viewport test
  console.log('Capturing Desktop 1440x900 First Viewport...');
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(500);

  // Exact viewport screenshot (0 to 900px height) to prove what fits above the fold
  await page1440.screenshot({ 
    path: 'screenshot-rebuild-1440-viewport.png', 
    clip: { x: 0, y: 0, width: 1440, height: 900 } 
  });

  // Slightly taller clip to capture Header + Hero + Search + Trust + Ribbon top
  await page1440.screenshot({ 
    path: 'screenshot-rebuild-1440-fullhero.png', 
    clip: { x: 0, y: 0, width: 1440, height: 1000 } 
  });

  // Test Dropdowns
  console.log('Opening Dropdown Zona...');
  const zonaBtn = page1440.locator('button:has-text("ZONA")').first();
  await zonaBtn.click();
  await page1440.waitForTimeout(300);
  await page1440.screenshot({ 
    path: 'screenshot-rebuild-dropdown-zona.png', 
    clip: { x: 100, y: 350, width: 1240, height: 400 } 
  });

  // 2. Mobile 375x812 viewport
  console.log('Capturing Mobile 375x812...');
  const pageMobile = await browser.newPage({ 
    viewport: { width: 375, height: 812 }, 
    isMobile: true, 
    hasTouch: true 
  });
  await pageMobile.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(500);
  await pageMobile.screenshot({ 
    path: 'screenshot-rebuild-mobile-viewport.png', 
    clip: { x: 0, y: 0, width: 375, height: 812 } 
  });
  await pageMobile.screenshot({ 
    path: 'screenshot-rebuild-mobile-fullhero.png', 
    clip: { x: 0, y: 0, width: 375, height: 1100 } 
  });

  console.log('Verification captures completed successfully!');
  await browser.close();
}

captureRebuildVerification().catch(e => {
  console.error(e);
  process.exit(1);
});
