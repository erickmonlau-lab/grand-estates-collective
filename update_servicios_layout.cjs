const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '{/* ── SERVICES SECTION ── */}';
const endMarker = '{/* ── BEFORE & AFTER SECTION ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── SERVICES SECTION (NEW DARK GRID MOCKUP) ── */}
      <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 bg-[#080d1a] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <div className="inline-block mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0082c8] border border-[#0082c8]/30 px-5 py-2 rounded-full">
                  Áreas de Experiencia
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Nuestros <span className="text-[#0082c8]">Servicios</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Soluciones integrales para transformar espacios y maximizar su valor.
              </p>
            </Reveal>
          </div>

          {/* Grid de 4 tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { 
                icon: <Building2 className="w-5 h-5" />, 
                label: "Comunidades", 
                desc: "Gestión integral de comunidades con transparencia y eficiencia.",
                bg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
              },
              { 
                icon: <TrendingUp className="w-5 h-5" />, 
                label: "Inversión", 
                desc: "Asesoramiento estratégico para inversiones inmobiliarias seguras.",
                bg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                icon: <Shield className="w-5 h-5" />, 
                label: "Gestión Patrimonial", 
                desc: "Protegemos y optimizamos su patrimonio inmobiliario a largo plazo.",
                bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
              },
              { 
                icon: <Paintbrush className="w-5 h-5" />, 
                label: "Reformas", 
                desc: "Transformamos espacios con diseño, calidad y funcionalidad.",
                bg: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative h-[480px] w-full rounded-3xl overflow-hidden cursor-pointer border border-[#151f32] bg-[#0b1221] transition-all duration-500 hover:border-[#0082c8]/50 hover:shadow-[0_0_30px_rgba(0,130,200,0.1)] flex flex-col">
                  {/* Mitad superior: Imagen */}
                  <div className="relative h-[60%] w-full overflow-hidden">
                    <img src={item.bg} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1221]" />
                  </div>
                  
                  {/* Icono circular superpuesto */}
                  <div className="absolute top-[60%] left-6 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0b1221] border border-[#005c99]/50 flex items-center justify-center text-white z-10 shadow-lg group-hover:bg-[#005c99] transition-colors duration-300">
                    {item.icon}
                  </div>

                  {/* Mitad inferior: Contenido */}
                  <div className="flex-1 flex flex-col justify-end p-8 pt-10">
                    <h3 className="text-[22px] font-bold text-white mb-3">
                      {item.label}
                    </h3>
                    <p className="text-[14px] font-medium text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    <div className="mt-auto">
                      <ArrowRight className="w-6 h-6 text-[#005c99] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      `;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the Services section to the new dark grid mockup');
