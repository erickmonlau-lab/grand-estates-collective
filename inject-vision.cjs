const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

const heroStart = '      {/* HERO — "Sistema Vivo" | Award-worthy concept */}';
const heroEnd = '\n      {/* PROPERTIES SECTION */}';

let i1 = code.indexOf(heroStart);
let i2 = code.indexOf(heroEnd);

if (i1 === -1 || i2 === -1) {
  console.log("Error finding bounds", i1, i2);
  process.exit(1);
}

const newHero = `      {/* HERO — "La Infraestructura Invisible" (Award-Level) */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', \`\${x}px\`);
          e.currentTarget.style.setProperty('--mouse-y', \`\${y}px\`);
        }}
        style={{
          '--mouse-x': '-1000px',
          '--mouse-y': '-1000px',
        } as React.CSSProperties}
      >
        {/* ── BACKGROUND MAGNETIC MESH ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <div className="w-[120vw] h-[120vh] relative opacity-0" style={{ animation: "fadeInMesh 2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}>
            <div className="mesh-grid" />
          </div>
        </div>
        
        {/* Glow tracking cursor */}
        <div className="mesh-glow" />

        {/* ── GRADIENT FADES (so the grid fades at the edges) ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-10 pointer-events-none">
          
          <div className="flex flex-col items-center text-center">

            {/* TELEMETRY BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-12 px-4 py-1.5 rounded-sm border border-onyx/[0.04] bg-white/50 backdrop-blur-sm pointer-events-auto"
            >
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-onyx/40">
                SYS.STATUS: OPTIMAL · SINCE 2009
              </span>
            </motion.div>

            {/* BRUTALIST TYPOGRAPHY REVEAL */}
            <h1 className="mb-16 flex flex-col items-center cursor-default select-none">
              {[
                language === "en" ? "The order" : language === "ca" ? "L'ordre" : "El orden",
                language === "en" ? "you don't see." : language === "ca" ? "que no es ve." : "que no se ve.",
                language === "en" ? "The peace" : language === "ca" ? "La pau" : "La tranquilidad",
                language === "en" ? "you feel." : language === "ca" ? "que sents." : "que se siente."
              ].map((line, lineIndex) => (
                <span key={lineIndex} className="block overflow-hidden pb-2" style={{ lineHeight: 0.92 }}>
                  <motion.span
                    className={\`block text-onyx \${lineIndex >= 2 ? 'font-serif italic opacity-70' : 'font-black tracking-[-0.04em]'}\`}
                    style={{ fontSize: "clamp(3.5rem, 9.5vw, 9rem)" }}
                    initial={{ y: "115%", filter: "blur(12px)", opacity: 0 }}
                    animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.2 + lineIndex * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* TRUST DATA TELEMETRY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.4 }}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16 font-mono text-[10px] uppercase tracking-[0.2em] text-onyx/30 pointer-events-auto"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-sans font-bold text-2xl text-onyx">350+</span>
                <span>{language === "en" ? "Communities" : language === "ca" ? "Comunitats" : "Comunidades"}</span>
              </div>
              <div className="w-[1px] h-10 bg-onyx/10" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-sans font-bold text-2xl text-onyx">1,200+</span>
                <span>{language === "en" ? "Clients" : language === "ca" ? "Clients" : "Clientes"}</span>
              </div>
              <div className="w-[1px] h-10 bg-onyx/10" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-sans font-black text-2xl text-primary-blue">98%</span>
                <span>{language === "en" ? "Efficiency" : language === "ca" ? "Eficiència" : "Eficiencia"}</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── COMMAND BAR (Search) ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 mt-auto px-4 pb-12 w-full max-w-[960px] mx-auto"
        >
          {/* Command Bar Container */}
          <div
            ref={dropdownRef}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-onyx/[0.08] p-2 flex flex-col md:flex-row items-stretch gap-2 transition-all hover:shadow-[0_30px_80px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,130,200,0.15)]"
          >
            {/* TABS */}
            <div className="flex bg-onyx/[0.03] rounded-xl p-1 gap-1 shrink-0">
              {(["comprar", "alquilar"] as const).map((type) => (
                <button key={type} type="button" onClick={() => setSearchType(type)}
                  className={\`flex-1 px-6 py-3 rounded-lg text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 focus:outline-none \${
                    searchType === type ? "bg-white text-onyx shadow-sm border border-onyx/[0.04]" : "text-onyx/40 hover:text-onyx/80"
                  }\`}>
                  {type === "comprar" ? t.hero.comprar : t.hero.alquilar}
                </button>
              ))}
            </div>

            {/* FIELDS - Ultra minimal */}
            <div className="flex-1 flex flex-col sm:flex-row gap-1">
              
              {/* ZONA */}
              <div className="relative flex-1">
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.03] transition-colors flex items-center gap-3 focus:outline-none group">
                  <MapPin className="w-4 h-4 text-onyx/30 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-onyx font-semibold truncate">
                      {searchParams.zona || t.hero.zona}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {activeDropdown === "zona" && (
                    <motion.div initial={{ opacity: 0, y: 4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.98 }} transition={{duration:0.2}}
                      className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-onyx/[0.08] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.15)] z-40 p-2 origin-bottom-left">
                      {["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga"].map(loc => (
                        <button key={loc} type="button" onClick={() => { setSearchParams(p => ({ ...p, zona: loc })); setActiveDropdown(null); }}
                          className={\`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between \${searchParams.zona === loc ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/5 text-onyx font-medium"}\`}>
                          <span>{loc}</span>
                          {searchParams.zona === loc && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-[1px] my-2 bg-onyx/[0.06] hidden sm:block" />

              {/* TIPO */}
              <div className="relative flex-1">
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.03] transition-colors flex items-center gap-3 focus:outline-none group">
                  <Home className="w-4 h-4 text-onyx/30 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-onyx font-semibold truncate">
                      {searchParams.tipo !== "Cualquiera" ? searchParams.tipo : t.hero.tipo}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {activeDropdown === "tipo" && (
                    <motion.div initial={{ opacity: 0, y: 4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.98 }} transition={{duration:0.2}}
                      className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-onyx/[0.08] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.15)] z-40 p-2 origin-bottom-left">
                      {["Piso", "Ático", "Local comercial", "Oficina", "Finca/Solar"].map(tp => (
                        <button key={tp} type="button" onClick={() => { setSearchParams(p => ({ ...p, tipo: tp })); setActiveDropdown(null); }}
                          className={\`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between \${searchParams.tipo === tp ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/5 text-onyx font-medium"}\`}>
                          <span>{tp}</span>
                          {searchParams.tipo === tp && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-[1px] my-2 bg-onyx/[0.06] hidden sm:block" />

              {/* PRECIO */}
              <div className="relative flex-1">
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === "precio" ? null : "precio")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.03] transition-colors flex items-center gap-3 focus:outline-none group">
                  <DollarSign className="w-4 h-4 text-onyx/30 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-onyx font-semibold truncate">
                      {searchParams.precio !== "Cualquiera" ? searchParams.precio : t.hero.precio}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {activeDropdown === "precio" && (
                    <motion.div initial={{ opacity: 0, y: 4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.98 }} transition={{duration:0.2}}
                      className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-onyx/[0.08] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.15)] z-40 p-2 origin-bottom-right">
                      {["Cualquiera", "200.000 €", "300.000 €", "500.000 €", "750.000 €", "+1.000.000 €"].map(pr => (
                        <button key={pr} type="button" onClick={() => { setSearchParams(p => ({ ...p, precio: pr })); setActiveDropdown(null); }}
                          className={\`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between \${searchParams.precio === pr ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/5 text-onyx font-medium"}\`}>
                          <span>{pr}</span>
                          {searchParams.precio === pr && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* SEARCH BUTTON (Minimalist) */}
            <button type="button"
              onClick={() => alert(\`Buscando...\`)}
              className="bg-onyx text-white w-14 h-14 rounded-xl hover:bg-primary-blue transition-all duration-300 flex items-center justify-center shrink-0 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 focus:outline-none">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Subtle separator before properties */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-onyx/10 to-transparent" />
      </section>
`;

code = code.slice(0, i1) + newHero + code.slice(i2 + 1);
fs.writeFileSync('src/routes/index.tsx', code);
console.log('Hero injected successfully.');
