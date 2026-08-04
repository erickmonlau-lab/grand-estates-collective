import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `<span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                {t.testimonios.tag}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">
                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>
              </h2>`;

const replacement = `<div className="flex justify-center mb-6">
                <span 
                  style={{ transform: "rotate(-3deg)", boxShadow: "0 6px 18px rgba(11,33,74,0.3)" }}
                  className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-white/20"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-6 font-sans">
                Lo que dicen nuestros{" "}
                <span className="relative inline-block text-[#2563eb] pb-3">
                  clientes
                  {/* Wavy Underline Garabato SVG */}
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-4 text-amber-400 overflow-visible pointer-events-none" 
                    viewBox="0 0 100 20" 
                    preserveAspectRatio="none" 
                    fill="none"
                  >
                    <path 
                      d="M2 14 C 20 4, 35 18, 55 8 C 75 2, 88 16, 98 10" 
                      stroke="currentColor" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </span>
              </h2>`;

if (!content.includes(target)) {
  console.error("Target string NOT found in index.tsx!");
  process.exit(1);
}

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log("SUCCESSFULLY REPLACED IN INDEX.TSX!");
