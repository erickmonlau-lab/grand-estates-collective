import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Give background container the nav gray tint (#f1f5f9 / #e2e8f0 with subtle slate bg for console and pills)
c = c.replace(
  'div className="bg-white rounded-[24px] md:rounded-[30px] shadow-sm border border-slate-200/60 p-4 sm:p-5 md:p-6 mx-4 md:mx-auto max-w-[1300px] relative z-10"',
  'div className="bg-[#f8fafc] rounded-[28px] md:rounded-[36px] shadow-md border border-slate-200/80 p-5 sm:p-7 md:p-9 mx-4 md:mx-auto max-w-[1300px] relative z-10"'
);

// 2. Title & Subtitle breathing space and typography fix
c = c.replace(
  'h2 key={language} className="text-2xl sm:text-3xl font-black leading-tight text-[#0f172a] tracking-tight mb-1 font-sans"',
  'h2 key={language} className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-2.5 font-sans"'
);

c = c.replace(
  'p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl"',
  'p className="text-slate-600 text-base md:text-lg font-medium max-w-2xl leading-relaxed"'
);

c = c.replace(
  'span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-1.5 w-fit"',
  'span className="inline-flex items-center gap-1.5 bg-[#757989] text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3 w-fit shadow-xs"'
);

// 3. Search console card background - solid white with better padding
c = c.replace(
  'bg-white border-[1.5px] border-slate-200 rounded-[16px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-2 lg:p-1.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3 relative z-40',
  'bg-white border border-slate-200/90 rounded-[20px] shadow-md p-3 lg:p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40'
);

// 4. Pill badges for popular zones - nav gray #757989 for active, slate-200 for inactive
c = c.replaceAll('bg-[#2563eb] text-white shadow-xs', 'bg-[#757989] text-white shadow-xs');
c = c.replaceAll('bg-slate-100 hover:bg-slate-200 text-slate-700', 'bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 font-bold');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Properties section background and typography balance updated!');
