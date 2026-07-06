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

const newHero = fs.readFileSync('hero-3d.tsx', 'utf8');
code = code.slice(0, i1) + newHero + code.slice(i2);

// 2. Add import for archImage
if (!code.includes('arch-day.jpg')) {
  code = code.replace(
    'import property1 from "@/assets/property-1.jpg";',
    'import archImage from "@/assets/arch-day.jpg";\nimport property1 from "@/assets/property-1.jpg";'
  );
}

// 3. Make sure mouseX and mouseY are defined
if (!code.includes('const mouseX = useMotionValue(0);')) {
  code = code.replace(
    'const [searchType, setSearchType] = useState<"comprar" | "alquilar">("comprar");',
    'const [searchType, setSearchType] = useState<"comprar" | "alquilar">("comprar");\n  const mouseX = useMotionValue(0);\n  const mouseY = useMotionValue(0);'
  );
}

fs.writeFileSync('src/routes/index.tsx', code);
console.log('3D Hero injected successfully.');
