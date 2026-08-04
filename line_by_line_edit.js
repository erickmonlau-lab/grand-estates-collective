import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Replace line by line by line index
lines[1321] = `              <div className="flex justify-center mb-6">
                <span 
                  style={{ transform: "rotate(-3deg)", boxShadow: "0 8px 22px rgba(11,33,74,0.3)" }}
                  className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-white/20"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
              </div>`;

lines[1324] = `              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-6 font-sans">
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

// Remove original span line 1322 & 1323 (which shifted)
lines.splice(1322, 2);
lines.splice(1323, 2);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Line-by-line edit applied successfully!');
