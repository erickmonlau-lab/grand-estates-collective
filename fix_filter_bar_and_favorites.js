import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. BARRA DE FILTROS: Fondo sólido gris corporativo #757989 con texto blanco e iconos legibles
c = c.replace(
  'bg-[#e2e8f0] border-2 border-slate-300/80 rounded-[20px] shadow-inner p-3 lg:p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40',
  'bg-[#757989] border border-white/20 rounded-[20px] shadow-lg p-3 lg:p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40 text-white'
);

// Update dropdown buttons inside search console to look clear on gray background
c = c.replaceAll('hover:bg-slate-50 transition-colors group cursor-pointer', 'hover:bg-white/10 transition-colors group cursor-pointer');
c = c.replaceAll('text-slate-400 uppercase tracking-widest', 'text-blue-100 uppercase tracking-widest');
c = c.replaceAll('text-sm font-bold text-onyx leading-none font-sans', 'text-sm font-extrabold text-white leading-none font-sans');
c = c.replaceAll('bg-slate-100 flex items-center justify-center shrink-0', 'bg-white/15 flex items-center justify-center shrink-0');
c = c.replaceAll('text-[#005c99]', 'text-white');
c = c.replaceAll('text-slate-400 group-hover:text-onyx', 'text-white/70 group-hover:text-white');
c = c.replaceAll('bg-slate-200 shrink-0', 'bg-white/20 shrink-0');

// 2. CORRECCIÓN DEL INDICADOR DE SELECCIÓN EN LA BARRA (Marcar en gris/resaltado cuando no es "Cualquier tipo" / "Cualquier zona")
// Search console field 1 trigger button background when active:
c = c.replace(
  'className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"',
  'className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors group cursor-pointer ${consoleFilters.tipo !== "Cualquier tipo" ? "bg-white/20 ring-1 ring-white/40" : "hover:bg-white/10"}`}'
);

// 3. FAVORITOS / CORAZONES CON TOAST Y CONTADOR SENSATO (con aviso de guardado local)
// Add sonner toast notification when clicking favorite
c = c.replace(
  'toggleFavorite(property.id);',
  'toggleFavorite(property.id);\n                          const added = !favorites.includes(property.id);\n                          toast(added ? "Guardado en tus favoritos guardados localmente" : "Eliminado de tus favoritos", { icon: "❤️" });'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Search bar nav-gray styling & favorites functionality polished!');
