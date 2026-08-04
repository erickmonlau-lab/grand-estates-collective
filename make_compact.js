import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Helper replacement
const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// 1. SECTION COMPACTNESS - REDUCE VERTICAL PADDING OF ALL SECTIONS
rep('py-10 md:py-20', 'py-6 md:py-10');
rep('py-10 md:py-32', 'py-6 md:py-12');
rep('py-8 md:py-16', 'py-4 md:py-8');
rep('py-6 md:py-14', 'py-4 md:py-8');
rep('p-6 sm:p-10 md:p-16', 'p-5 sm:p-7 md:p-10');
rep('p-6 sm:p-10 md:p-14', 'p-5 sm:p-7 md:p-10');
rep('p-5 md:p-7', 'p-4 md:p-5');
rep('p-6 md:p-8', 'p-4 md:p-6');
rep('p-10 md:p-16', 'p-6 md:p-10');
rep('p-10 md:p-14', 'p-6 md:p-10');
rep('py-12 sm:px-10 sm:py-16 md:p-16', 'py-8 sm:px-8 sm:py-10 md:p-10');
rep('pt-16 pb-0', 'pt-8 pb-0');

// 2. VALUATOR SECTION COMPACTNESS
rep('mb-10', 'mb-5');
rep('mb-8', 'mb-4');
rep('mb-6', 'mb-3');
rep('mb-5', 'mb-3');
rep('mb-4', 'mb-2.5');
rep('mb-12', 'mb-5');

// 3. INNER CARDS & CONTAINERS COMPACTNESS
rep('p-8 md:p-10', 'p-5 md:p-6');
rep('min-h-[340px]', 'min-h-[260px]');
rep('px-7 py-6', 'px-6 py-4');
rep('px-7 py-5', 'px-6 py-3.5');
rep('py-4 px-6', 'py-3 px-5');
rep('py-3.5 px-4', 'py-2.5 px-3.5');
rep('py-2.5', 'py-1.5');
rep('py-4', 'py-3');
rep('py-3.5', 'py-2.5');

// Save updated index.tsx
fs.writeFileSync(filePath, c, 'utf8');
console.log('Successfully made all sections compact!');
