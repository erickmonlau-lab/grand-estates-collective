const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateHouseFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const metadata = await sharp(logoPath).metadata();
  console.log('Logo Metadata:', metadata);

  // The emblem/icon is located on the left ~33% of the image
  // Crop the house emblem with trim to auto-crop whitespace/alpha around the house
  const cropWidth = Math.floor(metadata.width * 0.38);
  const cropHeight = metadata.height;

  const croppedEmblemBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
    .trim() // automatically trim any transparent/white margins around the house icon!
    .toBuffer();

  const trimmedMeta = await sharp(croppedEmblemBuffer).metadata();
  console.log('Trimmed Emblem Metadata:', trimmedMeta);

  // Generate 48x48 PNG (GoogleFavicon standard)
  await sharp(croppedEmblemBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // Generate 192x192 PNG (Android Chrome / Web App Icon)
  await sharp(croppedEmblemBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // Generate 180x180 Apple Touch Icon
  await sharp(croppedEmblemBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Generate favicon.ico (48x48)
  await sharp(croppedEmblemBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('House emblem favicons successfully generated!');
}

generateHouseFavicon().catch(err => console.error(err));
