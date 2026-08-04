import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. TAG BADGE: Replace small blue tag with nav-gray #757989 tag
c = c.replace(
  '<span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">\n                {t.testimonios.tag}\n              </span>',
  '<span className="inline-flex items-center gap-1.5 bg-[#757989] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase px-5 py-2 rounded-full mb-4 shadow-sm">\n                {t.testimonios.tag}\n              </span>'
);

// 2. TITLE AND SUBTITLE READABILITY:
c = c.replace(
  '<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">\n                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>\n              </h2>',
  '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-[#0f172a] tracking-tight mb-3 font-sans">\n                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>\n              </h2>'
);

c = c.replace(
  '<p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">',
  '<p className="text-slate-700 text-base sm:text-lg max-w-xl mx-auto font-bold leading-relaxed">'
);

// 3. TESTIMONIAL CARDS BACKGROUND & READABILITY:
// Change cards background from dull pale gray #eef2f7 to nav gray #757989 with white text, or clean white with crisp border
c = c.replace(
  'div className="bg-[#eef2f7] rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full border border-slate-200/60 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"',
  'div className="bg-[#757989] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"'
);

// Fix quote text color to high contrast white font-medium
c = c.replace(
  'p className="text-slate-600 text-base md:text-17px leading-relaxed italic mb-8 font-medium"',
  'p className="text-white text-base md:text-lg leading-relaxed italic mb-6 font-semibold"'
);

// Fix author and location color for high contrast
c = c.replace(
  '<strong className="font-bold text-base text-[#0f172a]">{item.author}</strong>',
  '<strong className="font-extrabold text-lg text-white">{item.author}</strong>'
);

c = c.replace(
  '<span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.location}</span>',
  '<span className="text-xs text-blue-100 font-extrabold uppercase tracking-wider">{item.location}</span>'
);

// Fix stars color to vibrant golden yellow for high contrast against nav gray card background
c = c.replaceAll(
  'Star key={s} className="w-5 h-5 fill-[#2563eb] text-[#2563eb]"',
  'Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400"'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Testimonials section readability and nav-gray styling updated!');
