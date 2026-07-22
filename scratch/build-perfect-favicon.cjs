const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function buildPerfectFavicon() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Make pure white pixels transparent
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

  const trimmedPng = await sharp(transparentPng).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedPng).metadata();

  // Extract house emblem (width 210 x height 307)
  const emblemCrop = await sharp(trimmedPng)
    .extract({ left: 0, top: 0, width: 210, height: trimmedMeta.height })
    .trim()
    .toBuffer();

  const emblemMeta = await sharp(emblemCrop).metadata();
  console.log('House Emblem Meta:', emblemMeta);

  // Fit emblem in a 512x512 square canvas with 20% internal padding margin
  const maxDim = Math.max(emblemMeta.width, emblemMeta.height);
  const targetSize = Math.floor(maxDim * 1.35); // 35% margin surrounding emblem

  const finalEmblemPng = await sharp(emblemCrop)
    .resize(maxDim, maxDim, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.floor((targetSize - maxDim) / 2),
      bottom: Math.floor((targetSize - maxDim) / 2),
      left: Math.floor((targetSize - maxDim) / 2),
      right: Math.floor((targetSize - maxDim) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // Write all favicons
  await sharp(finalEmblemPng).resize(32, 32).toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(finalEmblemPng).resize(48, 48).toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(finalEmblemPng).resize(192, 192).toFile(path.join(__dirname, '../public/favicon-192x192.png'));
  await sharp(finalEmblemPng).resize(512, 512).toFile(path.join(__dirname, '../public/favicon-512x512.png'));
  await sharp(finalEmblemPng).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(finalEmblemPng).resize(48, 48).toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('ALL PERFECT FAVICONS GENERATED WITH SAFETY MARGIN!');
}

buildPerfectFavicon().catch(err => console.error(err));
