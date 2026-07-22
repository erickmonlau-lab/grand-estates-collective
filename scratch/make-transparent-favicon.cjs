const sharp = require('sharp');
const path = require('path');

async function makeTransparentFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // 1. Convert pure white pixels (R > 225, G > 225, B > 225) to 100% transparent alpha
  const outputData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];

    const isWhite = r > 225 && g > 225 && b > 225;

    outputData[i * 4] = r;
    outputData[i * 4 + 1] = g;
    outputData[i * 4 + 2] = b;
    outputData[i * 4 + 3] = isWhite ? 0 : a;
  }

  // 2. Convert to PNG buffer and trim transparent outer space
  const transparentPng = await sharp(outputData, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  const trimmedPng = await sharp(transparentPng).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedPng).metadata();

  // 3. Extract the house emblem (left ~48% of the image) and trim it cleanly
  const emblemCrop = await sharp(trimmedPng)
    .extract({ left: 0, top: 0, width: Math.floor(trimmedMeta.width * 0.48), height: trimmedMeta.height })
    .trim()
    .toBuffer();

  const emblemMeta = await sharp(emblemCrop).metadata();
  console.log('Clean House Emblem Meta:', emblemMeta);

  // 4. CRITICAL FIX FOR CUT-OFF FAVICON:
  // Place the emblem inside a larger square with 15% internal safety padding (extend margin)
  // so no edge of the roof or chimney touches the canvas border!
  const maxDim = Math.max(emblemMeta.width, emblemMeta.height);
  const paddedSize = Math.floor(maxDim * 1.25); // 25% padding buffer

  const paddedEmblem = await sharp(emblemCrop)
    .resize(maxDim, maxDim, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.floor((paddedSize - maxDim) / 2),
      bottom: Math.floor((paddedSize - maxDim) / 2),
      left: Math.floor((paddedSize - maxDim) / 2),
      right: Math.floor((paddedSize - maxDim) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // 5. Generate 48x48 PNG (Google Favicon format)
  await sharp(paddedEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // Save 192x192 PNG (Android Chrome / Web App Icon)
  await sharp(paddedEmblem)
    .resize(192, 192)
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // Save 180x180 Apple Touch Icon (on white background for iOS home screen)
  await sharp(paddedEmblem)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Save favicon.ico
  await sharp(paddedEmblem)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('UN-CLIPPED PADDED TRANSPARENT HOUSE EMBLEM FAVICON GENERATED!');
}

makeTransparentFavicon().catch(err => console.error(err));
