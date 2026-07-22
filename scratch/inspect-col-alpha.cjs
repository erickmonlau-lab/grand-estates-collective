const sharp = require('sharp');
const path = require('path');

async function inspectColAlpha() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const trimmedBuffer = await sharp(logoPath).trim().toBuffer();
  const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const colCounts = [];
  for (let x = 0; x < width; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      const alphaIndex = (y * width + x) * channels + 3;
      if (data[alphaIndex] > 30) {
        count++;
      }
    }
    colCounts.push({ x, count });
  }

  console.log('Columns 100 to 220:');
  console.log(colCounts.slice(100, 220).map(c => `x=${c.x}:${c.count}`).join(', '));
}

inspectColAlpha().catch(err => console.error(err));
