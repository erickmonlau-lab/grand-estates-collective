import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replacements specifically for ultra-compacting sections & cards
const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// 1. SECTION PADDING (Ultra compact vertical height)
rep('py-6 md:py-10', 'py-3 md:py-6');
rep('py-6 md:py-12', 'py-3 md:py-6');
rep('py-4 md:py-8', 'py-2 md:py-4');
rep('py-10 md:py-20', 'py-3 md:py-6');

// 2. INNER CONTAINER PADDING (Valuator & main cards)
rep('p-5 sm:p-7 md:p-10', 'p-4 sm:p-5 md:p-6');
rep('p-4 md:p-6', 'p-3 md:p-4');
rep('p-4 md:p-5', 'p-3 md:p-4');
rep('p-6 md:p-10', 'p-4 md:p-6');

// 3. VALUATOR SPECIFIC ULTRA-COMPACTION
rep('mb-6', 'mb-2');
rep('mb-5', 'mb-2');
rep('mb-4', 'mb-2');
rep('mb-3', 'mb-1.5');
rep('mb-2.5', 'mb-1.5');

// Inputs height and padding
rep('px-5 py-4', 'px-4 py-2');
rep('py-3 px-5', 'py-2.5 px-4');
rep('py-3.5 px-4', 'py-2 px-3');
rep('py-2.5 px-3.5', 'py-1.5 px-3');
rep('py-2.5', 'py-1');
rep('min-h-[260px]', 'min-h-[200px]');
rep('p-10 flex', 'p-4 flex');

// Gaps in grid
rep('gap-10 lg:gap-16', 'gap-4 lg:gap-6');
rep('gap-10 lg:gap-14', 'gap-4 lg:gap-6');
rep('gap-8', 'gap-4');
rep('gap-6', 'gap-3');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Successfully made sections ULTRA compact!');
