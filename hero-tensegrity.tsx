      {/* ════════════════════════════════════════════════════════════
          HERO — "Tensión Resuelta" (La Escultura de Tensegridad)
          Concept: A monumental, floating brutalist block suspended 
          by a single blue wire. Represents absolute stability.
          ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#FAFAFA] text-onyx font-sans">
        
        {/* ── AMBIENT STUDIO LIGHTING (Invisible Light Sources) ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top-left soft spotlight */}
          <div className="absolute -top-64 -left-64 w-[1000px] h-[1000px] bg-white rounded-full opacity-60 blur-[100px]" />
          {/* Bottom-right ambient shadow */}
          <div className="absolute -bottom-64 -right-64 w-[800px] h-[800px] bg-slate-200/50 rounded-full opacity-80 blur-[120px]" />
          {/* Very faint structural grid on the floor/wall */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(15,23,42,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
          }} />
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-16 pt-24 pb-12 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ════════════════════════════════════════════════════════════
              LEFT: THE COUNTERWEIGHT (Massive Typography)
              Rigid, bottom-heavy, left-aligned.
              ════════════════════════════════════════════════════════════ */}
          <div className="flex-1 flex flex-col items-start w-full max-w-[800px] pt-10">
            
            {/* Minimalist System Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-10 h-px bg-onyx/20" />
              <span className="font-mono font-bold text-onyx/40 uppercase tracking-[0.25em] text-[9px]">
                GESGRAMA OPERATING SYSTEM · V 3.0
              </span>
            </motion.div>

            {/* Brutal Typography */}
            <h1 className="flex flex-col m-0 select-none">
              {[
                language === 'en' ? 'The weight of' : language === 'ca' ? 'El pes del' : 'El peso de',
                language === 'en' ? 'your assets.' : language === 'ca' ? 'teu patrimoni.' : 'tu patrimonio.',
                language === 'en' ? 'Held up' : language === 'ca' ? 'Sostingut' : 'Sostenido',
                language === 'en' ? 'effortlessly.' : language === 'ca' ? 'sense esforç.' : 'sin esfuerzo.'
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden" style={{ paddingBottom: '0.08em', marginTop: i === 2 ? '0.25em' : '0' }}>
                  <motion.span
                    className={`block leading-[0.85] ${i >= 2 ? 'text-primary-blue' : 'text-onyx'}`}
                    style={{
                      fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
                      letterSpacing: '-0.04em',
                      fontWeight: 900,
                      opacity: i >= 2 ? 0.9 : 1
                    }}
                    initial={{ y: '110%', filter: 'blur(8px)', opacity: 0 }}
                    animate={{ y: '0%', filter: 'blur(0px)', opacity: i >= 2 ? 0.9 : 1 }}
                    transition={{ duration: 1.4, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtle subtext */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 1.2 }}
              className="mt-10 max-w-[420px] text-onyx/50 font-medium leading-relaxed text-sm md:text-base"
            >
              {language === 'en' ? 'We manage the complexity of communities and real estate assets through a system designed for absolute stability.' 
               : language === 'ca' ? 'Gestionem la complexitat de comunitats i actius immobiliaris mitjançant un sistema dissenyat per a l\'estabilitat absoluta.' 
               : 'Gestionamos la complejidad de comunidades y activos inmobiliarios mediante un sistema diseñado para la estabilidad absoluta.'}
            </motion.p>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT: THE VISUAL ANCHOR (Tensegrity Sculpture)
              Floating block. Casts a shadow. Held by a tension wire.
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full flex justify-center lg:justify-end relative"
          >
            
            {/* The Tension Wire (Above) */}
            <motion.div 
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
              className="absolute left-1/2 lg:left-auto lg:right-[310px] bottom-[100%] w-px h-[50vh] bg-gradient-to-b from-transparent to-primary-blue/30 origin-bottom" 
            />

            {/* The Floating Monolith */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full max-w-[620px] z-20"
            >
              {/* Massive Drop Shadow cast on the wall behind */}
              <div className="absolute inset-0 bg-black/5 blur-[80px] translate-y-20 scale-95 pointer-events-none" />
              
              {/* The Physical Block */}
              <div 
                className="relative bg-[#FFFFFF] rounded-sm flex flex-col p-8 md:p-12"
                style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  boxShadow: `
                    0 40px 80px -20px rgba(15,23,42,0.12),
                    0 20px 40px -20px rgba(15,23,42,0.08),
                    inset 0 2px 0 0 rgba(255,255,255,1),
                    inset 1px 0 0 0 rgba(255,255,255,0.8),
                    inset -1px -1px 0 0 rgba(15,23,42,0.03)
                  `
                }}
              >
                {/* Embedded Stats in the Block */}
                <div className="flex justify-between items-start mb-12 border-b border-onyx/5 pb-8">
                  <div className="flex flex-col">
                    <span className="font-black text-onyx text-4xl tracking-tighter">350+</span>
                    <span className="font-mono font-bold text-onyx/40 text-[9px] tracking-[0.2em] mt-2 uppercase">{language === 'en' ? 'Communities' : 'Comunidades'}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-black text-primary-blue text-4xl tracking-tighter">98%</span>
                    <span className="font-mono font-bold text-onyx/40 text-[9px] tracking-[0.2em] mt-2 uppercase">{language === 'en' ? 'Efficiency' : 'Eficiencia'}</span>
                  </div>
                </div>

                {/* The Integrated Command Center (Search Bar carved into the block) */}
                <div className="bg-[#FAFAFA] p-3 rounded-xl border border-onyx/[0.04] shadow-inner">
                  
                  {/* TABS */}
                  <div className="flex bg-white rounded-lg p-1 shadow-sm border border-onyx/[0.03] mb-2">
                    {(["comprar", "alquilar"] as const).map((type) => (
                      <button key={type} type="button" onClick={() => setSearchType(type)}
                        className={`flex-1 py-3 rounded-md font-bold uppercase transition-all focus:outline-none text-[10px] tracking-[0.2em] ${
                          searchType === type ? 'bg-primary-blue text-white shadow-md' : 'text-onyx/40 hover:text-onyx/80'
                        }`}>
                        {type === "comprar" ? t.hero.comprar : t.hero.alquilar}
                      </button>
                    ))}
                  </div>

                  {/* FORM FIELDS (Stacked for monumental feel inside the block) */}
                  <div className="flex flex-col gap-2">
                    
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")} className="flex-1 bg-white hover:bg-slate-50 transition-colors border border-onyx/5 rounded-lg py-4 px-5 text-left flex justify-between items-center group relative">
                        <div>
                          <div className="font-mono font-bold text-onyx/30 text-[8px] tracking-[0.2em] uppercase">{t.hero.zona}</div>
                          <div className="font-semibold text-onyx text-sm mt-0.5">{searchParams.zona}</div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-onyx/20 group-hover:text-primary-blue transition-colors" />
                        
                        {/* Dropdown absolute */}
                        {activeDropdown === "zona" && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-onyx/5 p-2 z-50">
                            {["Cualquiera", "Madrid", "Barcelona", "Valencia"].map(loc => (
                              <div key={loc} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, zona: loc})); setActiveDropdown(null); }}
                                className={`px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer flex justify-between ${searchParams.zona === loc ? 'bg-primary-blue/5 text-primary-blue font-bold' : 'hover:bg-slate-50 text-onyx font-medium'}`}>
                                {loc} {searchParams.zona === loc && <span>✓</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>

                      <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")} className="flex-1 bg-white hover:bg-slate-50 transition-colors border border-onyx/5 rounded-lg py-4 px-5 text-left flex justify-between items-center group relative">
                        <div>
                          <div className="font-mono font-bold text-onyx/30 text-[8px] tracking-[0.2em] uppercase">{t.hero.tipo}</div>
                          <div className="font-semibold text-onyx text-sm mt-0.5 truncate max-w-[120px]">{searchParams.tipo}</div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-onyx/20 group-hover:text-primary-blue transition-colors shrink-0" />
                        {/* Dropdown absolute */}
                        {activeDropdown === "tipo" && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-onyx/5 p-2 z-50">
                            {["Cualquiera", "Piso", "Local"].map(tp => (
                              <div key={tp} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, tipo: tp})); setActiveDropdown(null); }}
                                className={`px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer flex justify-between ${searchParams.tipo === tp ? 'bg-primary-blue/5 text-primary-blue font-bold' : 'hover:bg-slate-50 text-onyx font-medium'}`}>
                                {tp} {searchParams.tipo === tp && <span>✓</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>
                    </div>

                    {/* SEARCH ACTION */}
                    <button type="button" 
                      onClick={() => alert('Search')}
                      className="w-full bg-onyx text-white rounded-lg py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary-blue transition-colors group">
                      {t.hero.search}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                  </div>

                </div>
              </div>
            </motion.div>

            {/* The Tension Wire (Below) - Holding the block to the floor */}
            <motion.div 
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
              className="absolute left-1/2 lg:left-auto lg:right-[310px] top-[100%] w-px h-[50vh] bg-gradient-to-t from-transparent to-primary-blue/60 origin-top" 
            />
            {/* The Floor Anchor Dot */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
              className="absolute left-1/2 lg:left-auto lg:right-[308px] top-[100%] translate-y-[20vh] w-[5px] h-[5px] rounded-full bg-primary-blue shadow-[0_0_10px_rgba(0,130,200,0.5)]"
            />
          </motion.div>

        </div>
      </section>
