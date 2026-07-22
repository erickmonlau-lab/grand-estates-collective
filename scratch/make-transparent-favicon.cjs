const sharp = require('sharp');
const path = require('path');

async function makeTransparentFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Create new RGBA buffer where white pixels (R > 235, G > 235, B > 235) become transparent
  const outputData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];

    const isWhite = r > 230 && g > 230 && b > 230;

    outputData[i * 4] = r;
    outputData[i * 4 + 1] = g;
    outputData[i * 4 + 2] = b;
    outputData[i * 4 + 3] = isWhite ? 0 : a;
  }

  // Convert raw transparent buffer to PNG
  const transparentPng = await sharp(outputData, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  // Trim transparent pixels
  const trimmedPng = await sharp(transparentPng).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedPng).metadata();
  console.log('Trimmed Transparent Logo Meta:', trimmedMeta);

  // Extract house emblem (left 45% of width)
  const emblemCrop = await sharp(trimmedPng)
    .extract({ left: 0, top: 0, width: Math.floor(trimmedMeta.width * 0.42), height: trimmedMeta.height })
    .trim()
    .toBuffer();

  const emblemMeta = await sharp(emblemCrop).metadata();
  console.log('Clean House Emblem Meta:', emblemMeta);

  // Fit emblem in a 512x512 square with 0 margin
  const squareSize = Math.max(emblemMeta.width, emblemMeta.height);
  const squareEmblem = await sharp(emblemCrop)
    .resize(squareSize, squareSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // Save 48x48 PNG (Google Favicon format)
  await sharp(squareEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // Save 192x192 PNG (Android Chrome)
  await sharp(squareEmblem)
    .resize(192, 192)
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // Save 180x180 Apple Touch Icon
  await sharp(squareEmblem)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Save favicon.ico
  await sharp(squareEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('PROPER TRANSPARENT HOUSE EMBLEM FAVICON CREATED SUCCESSFULLY!');
}

makeTransparentFavicon().catch(err => console.error(err));
