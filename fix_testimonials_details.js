import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. INCREASE BADGE "HISTORIAS REALES" SIZE AND USE SOLID NAVY BACKGROUND #0b214a WITH WHITE TEXT IN UPPERCASE
c = c.replace(
  '<span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">\n                {t.testimonios.tag}\n              </span>',
  '<span className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-full mb-5 shadow-md border border-white/10">\n                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />\n                {t.testimonios.tag}\n              </span>'
);

// 2. ADD ACCENT UNDERLINE TO "clientes" IN THE TITLE
c = c.replace(
  '<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">\n                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>\n              </h2>',
  '<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">\n                Lo que dicen nuestros <span className="relative inline-block pb-2"><span className="relative z-10 text-[#2563eb]">clientes</span><span className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#38bdf8] rounded-full" /></span>\n              </h2>'
);

// 3. ADD TOP BORDER ACCENT (3px BLUE / CYAN BORDER-TOP) TO TESTIMONIAL CARDS
c = c.replace(
  'div className="bg-[#757989] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"',
  'div className="bg-[#757989] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-white/20 border-t-4 border-t-[#38bdf8] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden"'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Testimonials section badge, title accent and card top border updated!');
