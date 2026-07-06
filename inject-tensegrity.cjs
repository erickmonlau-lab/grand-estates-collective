const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

const heroStart = '      {/* ════════════════════════════════════════════════════════════';
const heroEnd = '\n      {/* PROPERTIES SECTION */}';

let i1 = code.indexOf(heroStart);
let i2 = code.indexOf(heroEnd);

if (i1 === -1 || i2 === -1) {
  console.log("Error finding bounds", i1, i2);
  process.exit(1);
}

const newHero = fs.readFileSync('hero-tensegrity.tsx', 'utf8');

code = code.slice(0, i1) + newHero + code.slice(i2);
fs.writeFileSync('src/routes/index.tsx', code);
console.log('Hero injected successfully.');
