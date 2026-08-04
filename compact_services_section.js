import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. SECTION OUTER PADDING COMPACTION
c = c.replace(
  'section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14"',
  'section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-7"'
);

// 2. INNER CONTAINER PADDING COMPACTION
c = c.replace(
  'div className="bg-[#0f172a] rounded-[28px] md:rounded-[36px] shadow-xl border border-sky-500/20 p-6 sm:p-10 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white"',
  'div className="bg-[#0f172a] rounded-[24px] md:rounded-[32px] shadow-xl border border-sky-500/20 p-4 sm:p-6 md:p-8 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white"'
);

// 3. TITLE & SUBTITLE MARGIN COMPACTION
c = c.replace(
  'div className="text-center mb-12"',
  'div className="text-center mb-6 md:mb-8"'
);

c = c.replace(
  'h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4 tracking-tight font-sans"',
  'h2 key={language} className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-2 tracking-tight font-sans"'
);

c = c.replace(
  'p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"',
  'p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed"'
);

// 4. SERVICE CARDS COMPACTION (GAP, PADDING AND MARGINS)
c = c.replace(
  'className="group bg-white text-[#0f172a] rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full"',
  'className="group bg-white text-[#0f172a] rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 h-full"'
);

c = c.replace(
  'p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-4"',
  'p className="text-xs sm:text-sm text-slate-500 font-medium leading-snug mb-2.5"'
);

// Compact Saber más button slightly
c = c.replace(
  'className="mt-1 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 group/btn border-0"',
  'className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs py-2 px-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5 group/btn border-0"'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Services section neatly compacted!');
