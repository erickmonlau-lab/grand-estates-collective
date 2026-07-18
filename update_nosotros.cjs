const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '      {/* ── NOSOTROS / WHY US ── */}';
const endMarker = '      {/* ── TESTIMONIOS ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── NOSOTROS / WHY US (NEW MOCKUP) ── */}
      <section id="nosotros" className="py-28 md:py-36 px-6 md:px-12 bg-[#0b1221] text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-16">
          <Reveal>
            <div className="max-w-3xl">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0082c8] mb-4">
                  Por qué Gesgrama
                </p>
                <div className="w-12 h-0.5 bg-[#0082c8]"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white mb-8" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Experiencia.<br/>
                Compromiso y<br/>
                <span className="text-[#0082c8]">cercanía.</span>
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                Más de 25 años ayudando a comunidades a funcionar mejor, con transparencia y un trato cercano.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              
              {/* Card 1 */}
              <div className="bg-[#151f32] border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-[#0082c8]/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#005c99] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  {/* Shield Check SVG */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">Experiencia que aporta valor</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Más de 25 años gestionando comunidades con éxito.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#151f32] border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-[#0082c8]/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#005c99] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  {/* Users SVG */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">Compromiso real</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Estamos a tu lado, resolviendo lo que realmente importa.
                  </p>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the Nosotros section to the new dark design');
