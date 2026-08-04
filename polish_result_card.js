import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// 1. SIGHTLY COMPACT THE OUTER CONTAINER
rep('p-6 sm:p-8 md:p-12', 'p-5 sm:p-7 md:p-9');
rep('py-6 md:py-10', 'py-4 md:py-8');

// 2. MAKE RESULT CARD LEGIBLE & CLEAN (Fix pixelated font feel)
rep('text-6xl md:text-7xl font-black text-[#0b214a] leading-none tracking-tight font-sans',
    'text-5xl md:text-6xl font-black text-[#0b214a] leading-none font-sans tracking-normal');

rep('text-2xl font-black text-[#0b214a] font-sans',
    'text-xl sm:text-2xl font-bold text-[#0b214a] font-sans');

rep('text-xs font-black text-[#38bdf8] uppercase tracking-[0.2em] mb-1 font-sans flex items-center gap-1.5',
    'text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-1 font-sans flex items-center gap-1.5');

rep('text-base font-bold text-white/80 uppercase tracking-widest font-sans',
    'text-sm font-semibold text-white/90 uppercase tracking-wider font-sans');

rep('px-7 py-6', 'px-6 py-4.5');
rep('px-7 py-5', 'px-6 py-4');

// Reduce spacing inside result card
rep('mb-4', 'mb-3');
rep('mb-5', 'mb-3.5');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Result card typography and compactness polished successfully!');
