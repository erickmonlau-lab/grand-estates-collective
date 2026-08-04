import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. REPLACE BADGE "HISTORIAS REALES" WITH STICKER BADGE (Solid Navy #0b214a background, rotated -3deg, shadow-lg, rounded-2xl)
const oldBadge = `<span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 font-sans">
                {t.testimonios.tag}
              </span>`;

const newStickerBadge = `<span className="inline-inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl shadow-xl border border-white/10 rotate-[-3deg] transform hover:rotate-0 transition-transform duration-300 inline-block mb-6 cursor-default">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{t.testimonios.tag}</span>
              </span>`;

c = c.replace(oldBadge, newStickerBadge);

// 2. ADD WAVY UNDERLINE (SQUIGGLE / GARABATO) UNDER "clientes" IN THE TITLE
const oldTitleText = `<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">
                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>
              </h2>`;

const newTitleText = `<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">
                Lo que dicen nuestros{" "}
                <span className="relative inline-block text-[#2563eb]">
                  clientes
                  {/* Thick Wavy Underline SVG Accent */}
                  <svg className="absolute -bottom-3 left-0 w-full h-4 text-amber-400 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                    <path d="M0 12 Q 25 3, 50 12 T 100 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>`;

c = c.replace(oldTitleText, newTitleText);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Sticker badge & wavy underline accent applied to Testimonials section!');
