const sharp = require('sharp');
const path = require('path');

async function inspectColors() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const trimmedBuffer = await sharp(logoPath).trim().toBuffer();
  const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Print non-white pixel bounds on left side
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // If pixel has alpha and is not pure white (#ffffff)
      if (a > 20 && !(r > 245 && g > 245 && b > 245)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Non-white bounds: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
}

inspectColors().catch(err => console.error(err));
