import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Compact ALL sections cleanly while preserving structure and readability
const replacements = [
  // 1. SECTION DISTANCES (Outer padding of sections)
  { from: 'py-6 md:py-10', to: 'py-4 md:py-6' },
  { from: 'py-8 md:py-14', to: 'py-5 md:py-8' },
  { from: 'py-5 md:py-8', to: 'py-4 md:py-6' },
  { from: 'py-4 md:py-6', to: 'py-3 md:py-5' },

  // 2. MAIN CARD PADDINGS (Hero container, Valuator container, Property Grid container, etc.)
  { from: 'p-4 sm:p-6 md:p-8', to: 'p-4 sm:p-5 md:p-6' },
  { from: 'p-5 sm:p-8 md:p-12', to: 'p-4 sm:p-6 md:p-8' },
  { from: 'p-6 sm:p-8 md:p-10', to: 'p-4 sm:p-6 md:p-7' },

  // 3. INNER CARDS (Services, Testimonials, News, Form)
  { from: 'p-5 md:p-6', to: 'p-4 md:p-5' },
  { from: 'p-6 md:p-8', to: 'p-4 md:p-5' },
  { from: 'p-5 md:p-7', to: 'p-4 md:p-5' },

  // 4. VERTICAL GAPS BETWEEN HEADINGS AND CONTENT
  { from: 'mb-12', to: 'mb-6' },
  { from: 'mb-10', to: 'mb-5' },
  { from: 'mb-8', to: 'mb-4' },
  { from: 'mb-6', to: 'mb-3' }
];

replacements.forEach(r => {
  c = c.replaceAll(r.from, r.to);
});

fs.writeFileSync(filePath, c, 'utf8');
console.log('All sections neatly compacted!');
