import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1 & 2. BADGE "HERRAMIENTA INTELIGENTE": Solid White background + Navy text and icon + SVG Building icon instead of emoji
const oldTag = `<span className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2 rounded-2xl shadow-md border border-white/10">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.valorador.tag}</span>
                </span>`;

const newTag = `<span className="inline-flex items-center gap-2 bg-white text-[#0b214a] text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2 rounded-2xl shadow-md border border-slate-200/80">
                  <Building2 className="w-4 h-4 text-[#005c99]" />
                  <span>{t.valorador.tag}</span>
                </span>`;

c = c.replace(oldTag, newTag);

// 3. TITLE UNDERLINE: Add thick underline highlight under "de tu Inmueble"
const oldTitle = `<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] mb-4 leading-[1.1] tracking-tight font-sans">
                {t.valorador.title} <span className="text-[#2563eb]">{t.valorador.titleAccent}</span>
              </h2>`;

const newTitle = `<h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-4 leading-[1.1] tracking-tight font-sans">
                {t.valorador.title}{" "}
                <span className="relative inline-block text-[#2563eb] pb-2">
                  {t.valorador.titleAccent}
                  <span className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#38bdf8] rounded-full" />
                </span>
              </h2>`;

c = c.replace(oldTitle, newTitle);

// 4. BORDER ON RIGHT PRICE CARD: Add crisp 2px border (border-2 border-slate-200) to white card
const oldCardDiv = `<div className="bg-white text-[#0f172a] rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-[380px] border border-slate-100">`;
const newCardDiv = `<div className="bg-white text-[#0f172a] rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-[380px] border-2 border-slate-200/90">`;

c = c.replace(oldCardDiv, newCardDiv);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Valuator 5 points applied directly in index.tsx!');
