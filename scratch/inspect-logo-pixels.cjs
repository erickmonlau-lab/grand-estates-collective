const sharp = require('sharp');
const path = require('path');

async function debugLogo() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const img = sharp(logoPath);

  // Trim transparent pixels
  const trimmedBuffer = await img.trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed Meta:', trimmedMeta);

  // Save trimmed logo
  await sharp(trimmedBuffer).toFile(path.join(__dirname, '../scratch/trimmed_logo.png'));

  // Test crop widths
  for (let w of [100, 120, 140, 160, 180, 200]) {
    const crop = await sharp(trimmedBuffer)
      .extract({ left: 0, top: 0, width: w, height: trimmedMeta.height })
      .toBuffer();
    const meta = await sharp(crop).metadata();
    console.log(`Crop width ${w} => resulting width: ${meta.width}, height: ${meta.height}`);
    await sharp(crop)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(__dirname, `../scratch/emblem_${w}.png`));
  }
}

debugLogo().catch(err => console.error(err));
