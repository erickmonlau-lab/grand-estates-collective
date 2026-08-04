import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace line 755 with solid nav gray (#757989) background for the search console bar
c = c.replace(
  'className="bg-white border-[1.5px] border-slate-200 rounded-[16px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-4 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40"',
  'className="bg-[#757989] border border-white/20 rounded-[20px] shadow-lg p-3 lg:p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40 text-white"'
);

// Update dropdown buttons inside search console to highlight when an active selection is made (e.g. Piso / Apartamento)
c = c.replace(
  'className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"',
  'className={`w-full flex items-center justify-between text-left px-3.5 py-3 rounded-xl transition-all group cursor-pointer ${consoleFilters.tipo !== "Cualquier tipo" ? "bg-white/25 ring-2 ring-white/40" : "hover:bg-white/10"}`}'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Search console bar updated to solid nav gray #757989!');
