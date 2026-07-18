const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startNosotros = current.indexOf('<section id="nosotros"');
const endNosotros = current.indexOf('</section>', startNosotros) + 10;

const newNosotros = `<section id="nosotros" className="py-32 md:py-48 px-6 md:px-12 bg-[#0F172A] relative overflow-hidden text-white">
        {/* Subtle texture/gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-24 lg:gap-32">
          
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold text-[#0082c8] tracking-[0.25em] uppercase mb-6">
                Por qué Gesgrama
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-white mb-8">
                <span className="text-[#0082c8]">Más de 15 años</span><br className="hidden md:block"/> cuidando comunidades.
              </h2>
              <p className="text-[17px] text-white/60 leading-relaxed font-light">
                Administramos comunidades con transparencia, rapidez y un trato totalmente personalizado.
              </p>
            </div>
          </Reveal>

          {/* 4 Column Benefits - Editorial Style */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {/* Item 1 */}
              <div className="flex flex-col gap-5 py-12 lg:pr-12 lg:border-r border-white/10 border-b lg:border-b-0">
                <Clock className="w-8 h-8 text-[#0082c8] stroke-[1.5]" />
                <h4 className="text-xl font-bold text-white tracking-tight">Respuesta rápida</h4>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">
                  Respondemos incidencias en menos de 24 horas.
                </p>
              </div>
              
              {/* Item 2 */}
              <div className="flex flex-col gap-5 py-12 lg:px-12 lg:border-r border-white/10 border-b lg:border-b-0">
                <Shield className="w-8 h-8 text-[#0082c8] stroke-[1.5]" />
                <h4 className="text-xl font-bold text-white tracking-tight">Total transparencia</h4>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">
                  Portal online con cuentas y documentación siempre disponible.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col gap-5 py-12 lg:px-12 lg:border-r border-white/10 border-b md:border-b-0">
                <Star className="w-8 h-8 text-[#0082c8] stroke-[1.5]" />
                <h4 className="text-xl font-bold text-white tracking-tight">Más de 15 años</h4>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">
                  Experiencia demostrada administrando comunidades.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col gap-5 py-12 lg:pl-12">
                <TrendingUp className="w-8 h-8 text-[#0082c8] stroke-[1.5]" />
                <h4 className="text-xl font-bold text-white tracking-tight">Optimización de costes</h4>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">
                  Negociamos contratos y proveedores para reducir gastos.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Numbers Band */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 border-y border-white/10 py-16">
              
              <div className="flex flex-col items-center justify-center text-center md:border-r border-white/10 px-4">
                <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-white mb-2 tracking-tighter">15+</div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Años</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center lg:border-r border-white/10 px-4">
                <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-white mb-2 tracking-tighter">1200+</div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Comunidades</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center md:border-r border-white/10 px-4">
                <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-white mb-2 tracking-tighter">98%</div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Clientes satisfechos</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-white mb-2 tracking-tighter">24h</div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Respuesta media</div>
              </div>

            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="pt-8">
              <a href="#contacto" className="inline-flex items-center justify-center px-10 py-5 bg-[#0082c8] text-white font-bold text-[13px] uppercase tracking-[0.15em] hover:bg-white hover:text-[#0082c8] transition-colors duration-300">
                Solicitar información
              </a>
            </div>
          </Reveal>

        </div>
      </section>`;

if (startNosotros !== -1 && endNosotros > startNosotros + 10) {
  let newHtml = current.substring(0, startNosotros) + newNosotros + current.substring(endNosotros);
  fs.writeFileSync('src/routes/index.tsx', newHtml);
  console.log('Nosotros section totally redesigned to premium editorial standard!');
} else {
  console.error('Could not find the nosotros section');
}
