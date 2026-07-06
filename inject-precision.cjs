const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

// 1. Replace Hero Section
const heroStart = '      {/* ════════════════════════════════════════════════════════════\n          HERO';
const heroEnd = '\n      {/* PROPERTIES SECTION */}';

let i1 = code.indexOf(heroStart);
let i2 = code.indexOf(heroEnd);

if (i1 === -1 || i2 === -1) {
  console.log("Error finding bounds", i1, i2);
  process.exit(1);
}

const newHero = fs.readFileSync('hero-precision.tsx', 'utf8');
code = code.slice(0, i1) + newHero + code.slice(i2);

// 2. Add import for atriumImage
if (!code.includes('bright-atrium.jpg')) {
  // It probably has coverImage from the previous step. We'll replace it.
  code = code.replace(
    /import coverImage from ".*";/,
    'import atriumImage from "@/assets/bright-atrium.jpg";'
  );
  // Just in case it wasn't there
  if (!code.includes('import atriumImage')) {
      code = code.replace(
        'import property1 from "@/assets/property-1.jpg";',
        'import atriumImage from "@/assets/bright-atrium.jpg";\nimport property1 from "@/assets/property-1.jpg";'
      );
  }
}

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Precision Hero injected successfully.');
