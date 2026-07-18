const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

// 1. Add import if it doesn't exist
if (!current.includes('BeforeAfterSection')) {
  current = current.replace(
    'import Reveal from \'@/components/Reveal\';',
    'import Reveal from \'@/components/Reveal\';\nimport BeforeAfterSection from \'@/components/BeforeAfterSection\';'
  );
}

// 2. Insert BeforeAfterSection after "Servicios" and before "Nosotros"
const searchStr = '      {/* ── NOSOTROS / WHY US ── */}';
const insertStr = `      {/* ── BEFORE & AFTER SECTION ── */}
      <BeforeAfterSection />

`;

if (!current.includes('<BeforeAfterSection />')) {
  current = current.replace(searchStr, insertStr + searchStr);
}

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Restored BeforeAfterSection');
