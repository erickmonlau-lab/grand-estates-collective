const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '      {/* ── CTA ── */}';
const endMarker = '      {/* ── ÚLTIMAS NOTICIAS (BLOG) ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── CTA (SPLIT LAYOUT) ── */}
      <section className="bg-[#f8fafc] text-onyx overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[600px] xl:min-h-[700px]">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-6 md:px-12 py-20 lg:py-24 flex flex-col justify-center">
            <Reveal>
              <div className="mb-8">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#005c99] mb-4">
                  Administración de Fincas en Barcelona
                </p>
                <div className="w-12 h-0.5 bg-[#005c99]"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl xl:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-onyx mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Su comunidad,<br/>
                en las <span className="text-[#005c99]">mejores</span> manos.
              </h2>
              
              <p className="text-slate-500 text-lg md:text-xl max-w-md mb-10 font-medium">
                Gestión profesional, transparente y cercana para comunidades que funcionan.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
                <a href="#propiedades" className="bg-[#1f5da3] hover:bg-[#154682] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 group w-full sm:w-auto">
                  Ver propiedades en venta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contacto" className="text-onyx font-bold text-sm border-b border-onyx pb-0.5 hover:text-[#1f5da3] hover:border-[#1f5da3] transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center sm:justify-start">
                  Hablar con un asesor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Stats Grid */}
              <div className="flex items-stretch gap-6 md:gap-10">
                {/* Stat 1 */}
                <div className="flex flex-col">
                  <div className="text-[#1f5da3] mb-3">
                    <Building2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-onyx mb-1 tracking-tight">300+</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-tight max-w-[100px]">Comunidades gestionadas</p>
                </div>
                
                {/* Divider */}
                <div className="w-px bg-slate-200"></div>

                {/* Stat 2 */}
                <div className="flex flex-col">
                  <div className="text-[#1f5da3] mb-3">
                    <Shield className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-onyx mb-1 tracking-tight">25+</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-tight max-w-[100px]">Años de experiencia</p>
                </div>

                {/* Divider */}
                <div className="w-px bg-slate-200"></div>

                {/* Stat 3 */}
                <div className="flex flex-col">
                  <div className="text-[#1f5da3] mb-3">
                    {/* Inline Smiley Face SVG */}
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-onyx mb-1 tracking-tight">98%</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-tight max-w-[100px]">Índice de satisfacción</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <Reveal delay={0.2} className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Edificio residencial moderno" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] to-transparent w-32 hidden lg:block"></div>
            </Reveal>
          </div>

        </div>
      </section>

`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the CTA section to the new split layout');
