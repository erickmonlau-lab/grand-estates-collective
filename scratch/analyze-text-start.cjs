const sharp = require('sharp');
const path = require('path');

async function findIconBounds() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const trimmedBuffer = await sharp(logoPath).trim().toBuffer();
  const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Scan vertical columns from left to right to find columns of transparent pixels between the house emblem and the text "Gesgrama"
  const colAlphaCount = new Array(width).fill(0);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const alphaIndex = (y * width + x) * channels + 3;
      if (data[alphaIndex] > 20) { // non-transparent
        colAlphaCount[x]++;
      }
    }
  }

  // Find where column alpha drops to zero or minimal between x = 100 and x = 300
  let gapStart = -1;
  let gapEnd = -1;
  for (let x = 100; x < 300; x++) {
    if (colAlphaCount[x] < 5) {
      if (gapStart === -1) gapStart = x;
      gapEnd = x;
    } else if (gapStart !== -1 && gapEnd !== -1 && colAlphaCount[x] > 10) {
      console.log(`Found gap between icon and text from x=${gapStart} to x=${gapEnd}`);
      break;
    }
  }

  console.log('Gap scanning finished. Gap start:', gapStart, 'Gap end:', gapEnd);

  // Exact icon width is gapStart or (gapStart + gapEnd) / 2
  const exactIconWidth = gapStart > 0 ? gapStart : 160;

  // Extract ONLY the emblem
  const cleanEmblemBuffer = await sharp(trimmedBuffer)
    .extract({ left: 0, top: 0, width: exactIconWidth, height: height })
    .trim()
    .toBuffer();

  const cleanMeta = await sharp(cleanEmblemBuffer).metadata();
  console.log('Clean House Emblem Metadata:', cleanMeta);

  // Make it a PERFECT square by padding or containing cleanly
  const size = Math.max(cleanMeta.width, cleanMeta.height);
  const squareBuffer = await sharp(cleanEmblemBuffer)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // Generate 48x48 PNG (Google Favicon)
  await sharp(squareBuffer)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // Generate 192x192 PNG (Android Chrome)
  await sharp(squareBuffer)
    .resize(192, 192)
    .toFile(path.join(__dirname, '../public/favicon-192x192.png'));

  // Generate 180x180 Apple Touch Icon (on clean white background for iOS)
  await sharp(squareBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Generate favicon.ico
  await sharp(squareBuffer)
    .resize(48, 48)
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('PERFECT HOUSE EMBLEM FAVICON CREATED!');
}

findIconBounds().catch(err => console.error(err));
