import fs from 'fs';

const manifestFile = fs.readdirSync('.output/server').find(f => f.includes('manifest'));
console.log('Manifest:', manifestFile);
const m = fs.readFileSync('.output/server/' + manifestFile, 'utf8');

const target = '"/":';
const idx = m.indexOf(target);
if (idx !== -1) {
  console.log(m.substring(idx, idx + 450));
} else {
  console.log('Target not found');
}
