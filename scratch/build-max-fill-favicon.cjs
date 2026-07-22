const sharp = require('sharp');
const path = require('path');

async function buildMaxFillFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // 1. Remove white background → transparent
  const outputData = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    const isWhite = r > 220 && g > 220 && b > 220;
    outputData[i * 4] = r;
    outputData[i * 4 + 1] = g;
    outputData[i * 4 + 2] = b;
    outputData[i * 4 + 3] = isWhite ? 0 : a;
  }

  const transparentPng = await sharp(outputData, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  // 2. Trim and extract ONLY the house emblem (left ~46% of trimmed width)
  const trimmedPng = await sharp(transparentPng).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedPng).metadata();

  const emblemWidth = Math.floor(trimmedMeta.width * 0.46);
  const emblemCrop = await sharp(trimmedPng)
    .extract({ left: 0, top: 0, width: emblemWidth, height: trimmedMeta.height })
    .trim()  // re-trim to remove any internal whitespace gaps
    .toBuffer();

  const emblemMeta = await sharp(emblemCrop).metadata();
  console.log('House Emblem Final Dimensions:', emblemMeta.width, 'x', emblemMeta.height);

  // 3. Scale to FILL the favicon canvas with MINIMAL 8% padding so edges breathe
  //    Use fit:'contain' with a very small background extend so the emblem fills ~92% of the square
  const SIZES = [32, 48, 192, 512];
  const PADDING_PERCENT = 0.08; // Only 8% breathing room — emblem fills 84% of each favicon

  for (const size of SIZES) {
    const innerSize = Math.round(size * (1 - PADDING_PERCENT * 2));
    const pad = Math.round(size * PADDING_PERCENT);

    const scaled = await sharp(emblemCrop)
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: pad,
        bottom: pad,
        left: pad,
        right: pad,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .resize(size, size) // final exact size
      .toBuffer();

    const outFile = size === 32
      ? path.join(__dirname, '../public/favicon-32x32.png')
      : size === 48
      ? path.join(__dirname, '../public/favicon-48x48.png')
      : size === 192
      ? path.join(__dirname, '../public/favicon-192x192.png')
      : path.join(__dirname, '../public/favicon-512x512.png');

    await sharp(scaled).toFile(outFile);
    console.log(`Wrote ${outFile}`);
  }

  // 4. Apple touch icon on white background
  const inner180 = Math.round(180 * (1 - PADDING_PERCENT * 2));
  const pad180 = Math.round(180 * PADDING_PERCENT);
  await sharp(emblemCrop)
    .resize(inner180, inner180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: pad180, bottom: pad180, left: pad180, right: pad180, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .resize(180, 180)
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // 5. favicon.ico = 32x32 PNG copy
  const ico32 = await sharp(emblemCrop)
    .resize(Math.round(32 * (1 - PADDING_PERCENT * 2)), Math.round(32 * (1 - PADDING_PERCENT * 2)), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: Math.round(32 * PADDING_PERCENT),
      bottom: Math.round(32 * PADDING_PERCENT),
      left: Math.round(32 * PADDING_PERCENT),
      right: Math.round(32 * PADDING_PERCENT),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .resize(32, 32)
    .toBuffer();

  await sharp(ico32).toFile(path.join(__dirname, '../public/favicon.ico'));
  console.log('favicon.ico written');
  console.log('DONE — house emblem fills 84% of every favicon canvas');
}

buildMaxFillFavicon().catch(err => console.error(err));
