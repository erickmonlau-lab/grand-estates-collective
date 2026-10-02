const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @font-face {
            font-family: 'AG Book Rounded';
            src: url('http://localhost:8099/fonts/AGBookRounded-Medium.woff2') format('woff2');
            font-weight: 500;
          }
          body { font-family: 'AG Book Rounded', sans-serif; font-size: 20px; padding: 40px; background: white; color: #0b214a; line-height: 1.6; }
          .row { margin-bottom: 25px; }
          .label { font-size: 14px; color: #64748b; font-family: sans-serif; margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <div class="row">
          <div class="label">font-weight: 500 (Nativo Medium):</div>
          <div style="font-weight: 500;">Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia. Ya sea para comprar, vender o administrar tu propiedad.</div>
        </div>
        <div class="row">
          <div class="label">font-weight: 600 (Semibold leve):</div>
          <div style="font-weight: 600;">Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia. Ya sea para comprar, vender o administrar tu propiedad.</div>
        </div>
        <div class="row">
          <div class="label">font-weight: 700 (Bold - actual):</div>
          <div style="font-weight: 700;">Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia. Ya sea para comprar, vender o administrar tu propiedad.</div>
        </div>
        <div class="row">
          <div class="label">font-weight: 800 / 900 (Extra/Black):</div>
          <div style="font-weight: 900;">Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia. Ya sea para comprar, vender o administrar tu propiedad.</div>
        </div>
        <div class="row">
          <div class="label">Inter / System Sans (weight: 600):</div>
          <div style="font-family: system-ui, -apple-system, sans-serif; font-weight: 600;">Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia. Ya sea para comprar, vender o administrar tu propiedad.</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-font-weights.png' });
  await browser.close();
  console.log('Saved test-font-weights.png');
})();
