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

const newHero = '      <HeroCarousel />\n';
code = code.slice(0, i1) + newHero + code.slice(i2);

// 2. Add import for HeroCarousel
if (!code.includes('import HeroCarousel')) {
  code = code.replace(
    'import { motion, useTransform, animate, useMotionValue } from "framer-motion";',
    'import { motion, useTransform, animate, useMotionValue } from "framer-motion";\nimport HeroCarousel from "../hero-carousel";'
  );
}

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Carousel injected successfully.');
