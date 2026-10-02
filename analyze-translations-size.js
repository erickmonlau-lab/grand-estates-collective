import fs from 'fs';
import zlib from 'zlib';

const assets = '.output/public/assets';

function analyzeFile(name) {
  const filePath = assets + '/' + name;
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  const gz = zlib.gzipSync(content);
  const br = zlib.brotliCompressSync(content);
  return {
    name,
    raw: (content.length / 1024).toFixed(2) + ' KB',
    gzip: (gz.length / 1024).toFixed(2) + ' KB',
    brotli: (br.length / 1024).toFixed(2) + ' KB',
    rawBytes: content.length,
    gzBytes: gz.length,
    brBytes: br.length
  };
}

const files = fs.readdirSync(assets).filter(f => f.includes('translat'));
console.log('=== Translation Files in .output/public/assets ===');
files.forEach(f => {
  const info = analyzeFile(f);
  if (info) console.log(`${info.name.padEnd(35)} Raw: ${info.raw.padStart(9)} | Gzip: ${info.gzip.padStart(8)} | Brotli: ${info.brotli.padStart(8)}`);
});
