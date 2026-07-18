const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '{/* ── VALORADOR DE INMUEBLES (LEAD CAPTURE) ── */}';
const endMarker = '{/* ── PROPERTIES SECTION ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── VALORADOR DE INMUEBLES (PREMIUM) ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0b1221] text-white relative overflow-hidden">
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative z-10">
          
          {/* Left Column (Text & Form) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 border border-[#0082c8]/30 bg-[#0082c8]/10 rounded-full px-4 py-1.5 mb-8">
                <svg className="w-4 h-4 text-[#0082c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-[10px] text-[#0082c8] font-bold tracking-[0.2em] uppercase">
                  Valoración 100% gratuita y sin compromiso
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white mb-6 leading-[1.05] tracking-tight" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                ¿Cuánto vale<br/>tu <span className="text-[#0082c8]">piso</span>?
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-slate-400 text-lg md:text-xl max-w-md mb-12 font-light">
                Obtén una valoración profesional y precisa de tu vivienda en menos de 1 minuto.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="w-full">
              {valuatorSubmitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#151f32] border border-slate-700/50 rounded-2xl p-8 max-w-lg">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-2">{t.valuator.successTitle}</h3>
                  <p className="text-slate-400 mb-8">{t.valuator.successMsg}</p>
                  <button onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }} className="text-[#0082c8] font-bold text-sm hover:text-white transition-colors uppercase tracking-wider">
                    Nueva valoración
                  </button>
                </motion.div>
              ) : (
                <div className="w-full max-w-lg">
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {/* Select Zona */}
                    <div className="flex-1 bg-[#151f32] border border-slate-700/80 rounded-xl p-4 flex items-center justify-between relative hover:border-[#0082c8]/50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4 w-full">
                        <MapPin className="w-5 h-5 text-slate-500 group-hover:text-[#0082c8] transition-colors shrink-0" />
                        <div className="flex flex-col flex-1">
                          <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Zona</span>
                          <select
                            value={valuatorData.zona}
                            onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                            className="w-full bg-transparent border-0 p-0 text-[15px] font-semibold text-white focus:ring-0 appearance-none cursor-pointer outline-none"
                          >
                            <option value="" disabled hidden>Selecciona tu zona</option>
                            {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                          </select>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    </div>

                    {/* Input Superficie */}
                    <div className="flex-1 bg-[#151f32] border border-slate-700/80 rounded-xl p-4 flex items-center gap-4 hover:border-[#0082c8]/50 transition-colors group">
                      <div className="w-6 h-6 rounded border border-slate-500 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-slate-500 group-hover:text-[#0082c8] transition-colors">m²</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Superficie</span>
                        <input
                          type="text"
                          placeholder="Ej: 80 m²"
                          value={valuatorData.metros}
                          onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-[15px] font-semibold text-white focus:ring-0 outline-none placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                    className="w-full bg-[#0082c8] hover:bg-[#0070ab] text-white font-bold text-[13px] tracking-[0.15em] uppercase py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(0,130,200,0.3)] hover:shadow-[0_0_40px_rgba(0,130,200,0.5)] flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    Solicitar valoración gratuita
                  </button>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <span className="text-xs font-medium">Sin compromiso</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4 opacity-70" />
                      <span className="text-xs font-medium">Resultado rápido</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      <span className="text-xs font-medium">Datos 100% seguros</span>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>

          {/* Right Column (House Visual) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-16 lg:mt-0">
            <Reveal delay={0.4} className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-square">
              
              {/* The Glowing Border SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M 50 2 L 98 30 L 98 98 L 2 98 L 2 30 Z" 
                  fill="none" 
                  stroke="#0082c8" 
                  strokeWidth="0.8" 
                  filter="url(#neon-glow)" 
                  className="opacity-80"
                />
              </svg>

              {/* The Clipped Image */}
              <div 
                className="absolute inset-[3px] bg-slate-800 z-10 overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 29%, 100% 100%, 0% 100%, 0% 29%)' }}
              >
                <img 
                  src={gallery1} 
                  alt="Modern interior" 
                  className="w-full h-full object-cover object-center opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 cursor-pointer scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute left-[-20px] md:left-[-40px] top-[35%] z-20 bg-[#111827]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl w-[260px]"
              >
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mb-1">Valor estimado</p>
                <p className="text-3xl font-bold text-[#0082c8] text-center mb-4 tracking-tight">245.000 €</p>
                
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center mb-1">Rango estimado</p>
                <p className="text-sm font-semibold text-white text-center mb-6">230.000 € - 260.000 €</p>
                
                {/* Mini Line Chart SVG */}
                <div className="w-full h-[40px] relative mb-4">
                  <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0082c8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0082c8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0 50 L 30 30 L 70 40 L 110 20 L 150 25 L 200 10 L 200 60 L 0 60 Z" fill="url(#chart-grad)" />
                    <path d="M 0 50 L 30 30 L 70 40 L 110 20 L 150 25 L 200 10" fill="none" stroke="#0082c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="30" cy="30" r="3" fill="#0b1221" stroke="#0082c8" strokeWidth="2" />
                    <circle cx="70" cy="40" r="3" fill="#0b1221" stroke="#0082c8" strokeWidth="2" />
                    <circle cx="110" cy="20" r="3" fill="#0b1221" stroke="#0082c8" strokeWidth="2" />
                    <circle cx="150" cy="25" r="3" fill="#0b1221" stroke="#0082c8" strokeWidth="2" />
                    <circle cx="200" cy="10" r="3" fill="#0082c8" />
                  </svg>
                  {/* Subtle horizontal line */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-slate-700/50" />
                </div>

                <p className="text-[10px] text-slate-500 text-center">Actualizado: Hoy</p>
              </motion.div>

            </Reveal>
          </div>
        </div>

        {/* Bottom Users Pill */}
        <div className="w-full mt-16 md:mt-24 flex justify-center relative z-10">
          <Reveal delay={0.5}>
            <div className="bg-[#151f32]/80 backdrop-blur border border-slate-700/50 rounded-full px-6 py-3 flex items-center gap-4 mx-auto w-fit">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-[#151f32] object-cover" src="https://i.pravatar.cc/100?img=11" alt="Usuario" />
                <img className="w-8 h-8 rounded-full border-2 border-[#151f32] object-cover" src="https://i.pravatar.cc/100?img=12" alt="Usuario" />
                <img className="w-8 h-8 rounded-full border-2 border-[#151f32] object-cover" src="https://i.pravatar.cc/100?img=33" alt="Usuario" />
                <img className="w-8 h-8 rounded-full border-2 border-[#151f32] object-cover" src="https://i.pravatar.cc/100?img=44" alt="Usuario" />
              </div>
              <p className="text-xs md:text-sm font-medium text-slate-300">
                Más de <strong className="text-white">4.500</strong> propietarios ya conocen el valor de su vivienda
              </p>
            </div>
          </Reveal>
        </div>

      </section>
`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully injected the premium valorador');
