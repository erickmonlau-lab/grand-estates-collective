import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replacements to increase text sizes throughout the website
const replacements = [
  // Section subtitulos / descripciones de sección
  { from: 'text-slate-500 text-base md:text-lg', to: 'text-slate-700 text-xl md:text-2xl font-bold' },
  { from: 'text-slate-600 text-base md:text-lg', to: 'text-slate-700 text-xl md:text-2xl font-bold' },
  { from: 'text-[#1e293b] text-lg md:text-xl leading-relaxed font-bold', to: 'text-[#1e293b] text-xl md:text-2xl leading-relaxed font-bold' },
  { from: 'text-slate-300 text-base md:text-lg', to: 'text-white text-xl md:text-2xl font-bold' },
  { from: 'text-slate-500 text-sm md:text-base', to: 'text-slate-700 text-lg md:text-xl font-bold' },
  { from: 'text-slate-600 text-sm md:text-base', to: 'text-slate-700 text-lg md:text-xl font-bold' },
  { from: 'text-xs text-slate-500', to: 'text-sm text-slate-600 font-bold' },
  { from: 'text-xs text-slate-400', to: 'text-sm text-slate-500 font-bold' },
  { from: 'text-[11px]', to: 'text-xs' },
  { from: 'text-[10px]', to: 'text-xs' },
  { from: 'text-xs font-semibold', to: 'text-sm font-bold' },
  { from: 'text-xs font-medium', to: 'text-sm font-bold' },
  { from: 'text-xs leading-relaxed', to: 'text-sm sm:text-base leading-relaxed' },
  { from: 'text-sm leading-relaxed', to: 'text-base sm:text-lg leading-relaxed' }
];

replacements.forEach(r => {
  content = content.replaceAll(r.from, r.to);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Global font sizes increased!');
