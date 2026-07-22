const sharp = require('sharp');
const path = require('path');

async function extractEmblemFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const logoBuffer = await sharp(logoPath).trim().toBuffer();

  // Extract left part where the house emblem is
  const emblemBuffer = await sharp(logoBuffer)
    .extract({ left: 0, top: 0, width: 240, height: 307 })
    .trim()
    .toBuffer();

  const emblemMeta = await sharp(emblemBuffer).metadata();
  console.log('House Emblem metadata:', emblemMeta);

  // Generate 48x48 PNG (Google Favicon format)
  await sharp(emblemBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // 192x192 PNG (Android Chrome / Web App Icon)
  await sharp(emblemBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // 180x180 Apple Touch Icon
  await sharp(emblemBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // favicon.ico (48x48)
  await sharp(emblemBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('Emblem Favicon generated successfully!');
}

extractEmblemFavicon().catch(err => console.error(err));
