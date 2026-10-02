import fs from 'fs';
import zlib from 'zlib';

const assets = '.output/public/assets';
const manifestFile = fs.readdirSync('.output/server').find(f => f.includes('manifest'));
const manifest = fs.readFileSync('.output/server/' + manifestFile, 'utf8');

console.log('=== PRELOADS ANALYZER ===');
const rootMatches = manifest.match(/__root__:[^}]+preloads:\s*\[([^\]]+)\]/);
const homeMatches = manifest.match(/"\/":\s*\{[^}]+preloads:\s*\[([^\]]+)\]/);

const rootList = rootMatches ? rootMatches[1].replace(/["'\s]/g, '').split(',').filter(Boolean) : [];
const homeList = homeMatches ? homeMatches[1].replace(/["'\s]/g, '').split(',').filter(Boolean) : [];

console.log('Root preloads:', rootList);
console.log('Home preloads:', homeList);

const allPreloads = [...new Set([...rootList, ...homeList])].map(p => p.split('/').pop());

let totalRaw = 0, totalGz = 0, totalBr = 0;
console.log('\nCritical Initial Chunks:');
allPreloads.forEach(name => {
  const p = assets + '/' + name;
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p);
    const gz = zlib.gzipSync(raw);
    const br = zlib.brotliCompressSync(raw);
    totalRaw += raw.length;
    totalGz += gz.length;
    totalBr += br.length;
    console.log(name.padEnd(35), (raw.length / 1024).toFixed(2).padStart(8) + ' KB raw', (gz.length / 1024).toFixed(2).padStart(8) + ' KB gz', (br.length / 1024).toFixed(2).padStart(8) + ' KB br');
  }
});

console.log('----------------------------------------------------------------------');
console.log('TOTAL INITIAL PRELOADED JS:', (totalRaw / 1024).toFixed(2) + ' KB raw', (totalGz / 1024).toFixed(2) + ' KB gz', (totalBr / 1024).toFixed(2) + ' KB br');
