import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace padding of outer card for properties grid
c = c.replace(
  'div className="bg-white rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/60 p-4 sm:p-4 md:p-5 mx-4 md:mx-auto max-w-[1300px] relative z-10"',
  'div className="bg-white rounded-[24px] md:rounded-[30px] shadow-sm border border-slate-200/60 p-4 sm:p-5 md:p-6 mx-4 md:mx-auto max-w-[1300px] relative z-10"'
);

// Reduce title margin and size even further
c = c.replace(
  'h2 key={language} className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-[#0f172a] tracking-tight mb-2 font-sans"',
  'h2 key={language} className="text-2xl sm:text-3xl font-black leading-tight text-[#0f172a] tracking-tight mb-1 font-sans"'
);

// Reduce tag badge margin
c = c.replace(
  'span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3 w-fit"',
  'span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-1.5 w-fit"'
);

// Compact Search console bar margins & paddings
c = c.replace('mt-4 mb-2', 'mt-2 mb-2');

// Compact category pills bar (Zonas populares)
c = c.replace('mb-6', 'mb-3');
c = c.replace('gap-2', 'gap-1.5');
c = c.replaceAll('px-3.5 py-1.5', 'px-2.5 py-1');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Properties section ultra-compacted!');
