import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace Title in Properties Grid section from massive text-4xl/5xl/6xl to neat text-3xl/4xl
c = c.replace(
  'h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-[#0f172a] tracking-tight mb-3 font-sans"',
  'h2 key={language} className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-[#0f172a] tracking-tight mb-2 font-sans"'
);

// Reduce subtitle font size & line height
c = c.replace(
  'p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium"',
  'p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl"'
);

// Stat card size adjustment (4 propiedades disponibles)
c = c.replace(
  'div className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl md:rounded-3xl p-5 md:pr-8 shrink-0"',
  'div className="flex items-center gap-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3 px-5 shrink-0"'
);

c = c.replace(
  'p className="text-3xl font-black text-[#0f172a] mb-0.5"',
  'p className="text-2xl font-black text-[#0f172a] leading-none mb-0.5"'
);

// Search Console Bar margin top
c = c.replace('mt-8 mb-3', 'mt-4 mb-2');
c = c.replace(
  'p-4 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40',
  'p-2 lg:p-1.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3 relative z-40'
);

// Search console buttons padding
c = c.replaceAll('px-4 py-3.5 rounded-xl', 'px-3 py-2.5 rounded-lg');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Properties section title and search console compacted neatly!');
