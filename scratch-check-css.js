const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.join('.output', 'public', 'assets');
if (fs.existsSync(publicAssetsDir)) {
  const publicAssets = fs.readdirSync(publicAssetsDir).filter(f => f.endsWith('.css'));
  console.log('CSS files in .output/public/assets:', publicAssets);
  for (const f of publicAssets) {
    const stat = fs.statSync(path.join(publicAssetsDir, f));
    console.log(f, stat.size, 'bytes');
  }
} else {
  console.log('No .output/public/assets directory found');
}
