const sharp = require('sharp');
const path = require('path');

async function inspectLogo() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);

  // Trim to get bounding box of non-transparent pixels
  const trimmedBuffer = await img.trim().toBuffer();

  // Extract house emblem (left 0 to 220px) and trim any remaining transparent margins
  const houseEmblem = await sharp(trimmedBuffer)
    .extract({ left: 0, top: 0, width: 220, height: 307 })
    .trim()
    .toBuffer();

  const houseMeta = await sharp(houseEmblem).metadata();
  console.log('Final House Emblem Bounds:', houseMeta);

  // Place house emblem centered on a square canvas with padding
  const squareEmblem = await sharp(houseEmblem)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Save 48x48 PNG (Google Favicon)
  await sharp(squareEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // Save 192x192 PNG (Android Chrome)
  await sharp(squareEmblem)
    .resize(192, 192)
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // Save 180x180 Apple Touch Icon (on white background for iOS home screen)
  await sharp(squareEmblem)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Save favicon.ico
  await sharp(squareEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('Favicons generated cleanly!');
}

inspectLogo().catch(err => console.error(err));
