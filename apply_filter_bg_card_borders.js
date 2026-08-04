import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Change filter console background from white to solid light gray (#f1f5f9 / bg-slate-100) with a clean border
c = c.replace(
  'bg-white border border-slate-200/90 rounded-[20px] shadow-md p-3 lg:p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40',
  'bg-[#e2e8f0] border-2 border-slate-300/80 rounded-[20px] shadow-inner p-3 lg:p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40'
);

// 2. Add fine 1.5px gray border to property cards (border-2 border-slate-300/80 with solid white background and crisp shadow)
c = c.replace(
  'className="group bg-white rounded-2xl flex flex-col h-full border border-slate-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"',
  'className="group bg-white rounded-2xl flex flex-col h-full border-2 border-slate-300/90 shadow-sm hover:border-[#005c99]/40 hover:shadow-xl transition-all duration-300 overflow-hidden"'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Filter console gray background and property cards border updated!');
