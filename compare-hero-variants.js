import { chromium } from 'playwright';
import fs from 'fs';

async function captureComparison() {
  const browser = await chromium.launch({ headless: true });
  
  const devices = [
    { name: 'iphone_se', w: 375, h: 667, dpr: 2 },
    { name: 'iphone_14', w: 390, h: 844, dpr: 3 }
  ];

  for (const dev of devices) {
    const context = await browser.newContext({
      viewport: { width: dev.w, height: dev.h },
      deviceScaleFactor: dev.dpr,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();

    const variants = [
      { id: 'A', name: 'Actual_360x554', path: 'src/assets/family_barcelona_mobile_lcp.webp' },
      { id: 'B', name: 'VariantB_450x692', path: 'src/assets/hero_variant_b.webp' },
      { id: 'C', name: 'VariantC_520x800', path: 'src/assets/hero_variant_c.webp' }
    ];

    for (const v of variants) {
      const dataUri = 'data:image/webp;base64,' + fs.readFileSync(v.path).toString('base64');
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #F8FAFC; overflow: hidden; font-family: sans-serif; }
            .hero-container {
              position: relative;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
            }
            .img-wrapper {
              position: absolute;
              right: 0;
              top: 0;
              width: 64%;
              height: 78%;
              overflow: hidden;
            }
            picture, img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center top;
              display: block;
            }
            .feather-left {
              position: absolute;
              top: 0; bottom: 0; left: 0;
              width: 7rem;
              background: linear-gradient(to right, #F8FAFC, rgba(248, 250, 252, 0.85), transparent);
              z-index: 10;
              pointer-events: none;
            }
            .feather-top {
              position: absolute;
              top: 0; left: 0; right: 0;
              height: 10rem;
              background: linear-gradient(to bottom, #F8FAFC 35%, rgba(248, 250, 252, 0.8) 70%, transparent);
              z-index: 20;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="hero-container">
            <div class="img-wrapper" id="target-hero">
              <div class="feather-left"></div>
              <div class="feather-top"></div>
              <picture>
                <img src="${dataUri}" />
              </picture>
            </div>
          </div>
        </body>
        </html>
      `;

      await page.setContent(html);
      await page.waitForTimeout(300);

      // Screenshot 1: Full hero image
      await page.locator('#target-hero').screenshot({
        path: `screenshot-hero-${dev.name}-${v.id}.png`
      });

      // Screenshot 2: Zoom on faces/details
      const box = await page.locator('#target-hero').boundingBox();
      await page.screenshot({
        path: `screenshot-face-zoom-${dev.name}-${v.id}.png`,
        clip: {
          x: box.x + box.width * 0.25,
          y: box.y + box.height * 0.15,
          width: box.width * 0.60,
          height: box.height * 0.40
        }
      });
      console.log(`Captured ${dev.name} ${v.name}`);
    }
    await context.close();
  }
  await browser.close();
}

captureComparison().catch(err => {
  console.error(err);
  process.exit(1);
});
