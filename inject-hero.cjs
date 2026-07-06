const fs = require('fs');

const heroCode = fs.readFileSync('hero-template.tsx', 'utf8');
let mainCode = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Find where the old hero starts and the properties section starts
const heroStartMarkers = [
  '      {/* HERO — "Sistema en Orden" */}',
  '      {/* HERO — "Architecture of Trust" */}',
  '      {/* HERO — Sistema en Orden */}',
  '      {/* HERO — Clean Professional, no photo */}',
  '      {/* HERO — Premium Dark Editorial */}',
];

let i1 = -1;
for (const marker of heroStartMarkers) {
  i1 = mainCode.indexOf(marker);
  if (i1 !== -1) { console.log('Found hero start:', marker.trim()); break; }
}

const heroEndMarker = '\n      {/* PROPERTIES SECTION */}';
const i2 = mainCode.indexOf(heroEndMarker);

if (i1 === -1) { console.error('Hero start NOT found'); process.exit(1); }
if (i2 === -1) { console.error('Hero end NOT found'); process.exit(1); }

console.log('Replacing chars', i1, 'to', i2, '(', i2-i1, 'chars removed)');

mainCode = mainCode.slice(0, i1) + heroCode + '\n' + mainCode.slice(i2 + 1);
fs.writeFileSync('src/routes/index.tsx', mainCode);
console.log('Done. New file size:', mainCode.length, 'chars');
