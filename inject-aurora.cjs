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

const newHero = fs.readFileSync('hero-aurora.tsx', 'utf8');
code = code.slice(0, i1) + newHero + code.slice(i2);

// 2. Add import for realistic image
if (!code.includes('realistic-bg.jpg')) {
  // Replace previous atriumImage or coverImage
  code = code.replace(
    /import \w+Image from ".*";/,
    'import realisticImage from "@/assets/realistic-bg.jpg";'
  );
  if (!code.includes('import realisticImage')) {
      code = code.replace(
        'import property1 from "@/assets/property-1.jpg";',
        'import realisticImage from "@/assets/realistic-bg.jpg";\nimport property1 from "@/assets/property-1.jpg";'
      );
  }
}

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Aurora Hero injected successfully.');
