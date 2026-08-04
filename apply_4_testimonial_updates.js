import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Change badge "HISTORIAS REALES" background from gray bg-[#757989] to solid navy bg-[#0b214a] and text to white
const oldBadgeSpan = `className="inline-flex items-center gap-2 bg-[#757989] text-[#0f172a] text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-slate-300/60"`;
const newBadgeSpan = `className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-white/20"`;

c = c.replace(oldBadgeSpan, newBadgeSpan);

// 2. Change wavy underline SVG color from text-amber-400 (yellow) to text-[#2563eb] or text-[#38bdf8] (brand blue/cyan)
c = c.replace(
  'className="absolute -bottom-1 left-0 w-full h-4 text-amber-400 overflow-visible pointer-events-none"',
  'className="absolute -bottom-1 left-0 w-full h-4 text-[#38bdf8] overflow-visible pointer-events-none"'
);

// 3. Remove location line under author name and increase quote font size from text-base md:text-lg to text-lg md:text-xl
c = c.replace(
  'p className="text-white text-base md:text-lg leading-relaxed italic mb-6 font-semibold"',
  'p className="text-white text-lg sm:text-xl leading-relaxed italic mb-6 font-semibold"'
);

const oldAuthorDiv = `<div className="pt-4 border-t border-slate-200/60 flex flex-col items-start gap-1">
                    <strong className="font-extrabold text-lg text-white">{item.author}</strong>
                    <span className="text-xs text-blue-100 font-extrabold uppercase tracking-wider">{item.location}</span>
                  </div>`;

const newAuthorDiv = `<div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <strong className="font-black text-lg sm:text-xl text-white font-sans">{item.author}</strong>
                    <span className="inline-flex items-center gap-1 bg-white/15 border border-white/20 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      <span>Verificado</span>
                    </span>
                  </div>`;

c = c.replace(oldAuthorDiv, newAuthorDiv);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Applied 4 requested testimonial updates: Navy badge, blue wave accent, larger quote font, removed location line!');
