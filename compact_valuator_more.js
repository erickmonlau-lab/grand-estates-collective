import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replacements for tighter compaction of the Valuator section container
const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// Section padding
rep('py-6 md:py-10', 'py-2 md:py-5');
rep('p-6 sm:p-8 md:p-10', 'p-4 sm:p-6 md:p-8');

// Title size & margins
rep('text-4xl sm:text-5xl lg:text-6xl', 'text-3xl sm:text-4xl lg:text-5xl');
rep('mb-4', 'mb-2.5');
rep('mb-6', 'mb-3');

// Subtitle size & margins
rep('text-xl md:text-2xl lg:text-3xl font-bold leading-snug max-w-[580px] mb-6', 
    'text-base md:text-lg lg:text-xl font-bold leading-snug max-w-[520px] mb-4');

// Form container padding & margins
rep('p-4 md:p-6', 'p-3 md:p-4');
rep('mb-3.5', 'mb-2.5');
rep('mb-4', 'mb-2.5');
rep('mt-4', 'mt-3');

// Inputs padding
rep('px-5 py-4', 'px-4 py-2.5');
rep('py-3.5 px-5', 'py-2.5 px-4');
rep('py-2.5 px-4', 'py-2 px-3');

// Right column min-height
rep('min-h-[280px]', 'min-h-[220px]');
rep('p-6 flex', 'p-4 flex');

fs.writeFileSync(filePath, c, 'utf8');
console.log('More compact Valuator section applied!');
