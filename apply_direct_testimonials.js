import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

const targetStr = `<span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                {t.testimonios.tag}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">
                Lo que dicen nuestros <span className="text-[#2563eb]">clientes</span>
              </h2>`;

const replacementStr = `<div className="flex justify-center mb-6">
                <span 
                  style={{ transform: "rotate(-3deg)", boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
                  className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-white/20 transition-transform hover:rotate-0"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-6 font-sans">
                Lo que dicen nuestros{" "}
                <span className="relative inline-block text-[#2563eb] pb-3">
                  clientes
                  {/* Garabato SVG Ondulado Grueso en Amarillo/Dorado */}
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

c = c.replace(targetStr, replacementStr);
fs.writeFileSync(filePath, c, 'utf8');
console.log('Direct script execution successful!');
