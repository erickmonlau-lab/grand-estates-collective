      {/* ════════════════════════════════════════════════════════════
          HERO — "Dramatic Service"
          Concept: Dark, cinematic skyscraper background at sunset 
          representing actual building maintenance/management.
          White typography, centered white search block.
          ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center pt-24 pb-12">
        
        {/* ── BACKGROUND: Dramatic Skyscraper ── */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${darkImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark gradient overlay to ensure perfect white text legibility */}
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        </div>

        {/* ── CENTRAL TYPOGRAPHY (White for dark background) ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center pointer-events-none mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-blue" />
            </span>
            <span className="font-mono text-[10px] font-bold text-white/90 tracking-[0.2em] uppercase">
              15 Años de Experiencia · Nacional
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="text-white leading-[1.05] tracking-tight drop-shadow-2xl font-bold"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            }}
          >
            Especialistas en <span className="text-primary-blue">gestión integral</span><br />
            y administración de fincas.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-8 text-white/80 font-medium text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Mantenimiento de edificios, asesoramiento jurídico y control patrimonial para comunidades y grandes infraestructuras.
          </motion.p>

        </div>

        {/* ── THE PROTAGONIST: Solid, Centered White Search Block ── */}
        <motion.div 
          className="relative z-20 w-full max-w-[1000px] px-4 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Static White Block */}
          <div 
            className="w-full bg-white rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 border border-white/20 flex flex-col md:flex-row items-stretch gap-2 transition-transform duration-300 hover:shadow-2xl"
            style={{
              boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.3)',
            }}
          >
            
            {/* Operation Mode Tab (Comprar/Alquilar) */}
            <div className="flex bg-slate-50 rounded-[1.5rem] p-1 border border-slate-100 shrink-0">
              {(["comprar", "alquilar"] as const).map((type) => (
                <button key={type} onClick={() => setSearchType(type)}
                  className={`flex-1 md:flex-none px-6 py-4 md:py-0 rounded-[1.2rem] font-bold uppercase text-[11px] tracking-[0.2em] transition-all focus:outline-none flex items-center justify-center gap-2 ${
                    searchType === type 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                      : 'bg-transparent text-slate-400 hover:text-slate-600'
                  }`}>
                  {searchType === type && <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />}
                  {type}
                </button>
              ))}
            </div>

            {/* Selectors */}
            <div className="flex-1 flex flex-col md:flex-row bg-slate-50 md:bg-transparent rounded-[1.5rem] md:rounded-none overflow-hidden md:overflow-visible">
              
              <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")} className="flex-1 bg-white md:bg-transparent hover:bg-slate-50 transition-colors md:border-l md:border-r border-slate-100 p-5 md:px-8 flex flex-col justify-center relative group">
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">Zona</div>
                    <div className="font-semibold text-slate-900 text-base">{searchParams.zona}</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-primary-blue transition-colors" />
                </div>
                {activeDropdown === "zona" && (
                  <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-100 rounded-2xl p-2 z-50 shadow-xl">
                    {["Cualquiera", "Madrid", "Barcelona", "Valencia"].map(loc => (
                      <div key={loc} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, zona: loc})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">{loc}</div>
                    ))}
                  </div>
                )}
              </button>

              <div className="h-px w-full md:hidden bg-slate-100" /> {/* Mobile Divider */}

              <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")} className="flex-1 bg-white md:bg-transparent hover:bg-slate-50 transition-colors p-5 md:px-8 flex flex-col justify-center relative group">
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">Tipo de Activo</div>
                    <div className="font-semibold text-slate-900 text-base truncate">{searchParams.tipo}</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-primary-blue transition-colors" />
                </div>
                {activeDropdown === "tipo" && (
                  <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-100 rounded-2xl p-2 z-50 shadow-xl">
                    {["Cualquiera", "Piso", "Local"].map(tp => (
                      <div key={tp} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, tipo: tp})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">{tp}</div>
                    ))}
                  </div>
                )}
              </button>

            </div>

            {/* Execution / Submit */}
            <button type="button" onClick={() => alert('Ejecutando búsqueda...')}
              className="bg-primary-blue hover:bg-[#006bb3] text-white rounded-[1.5rem] md:rounded-[2.5rem] px-10 py-5 md:py-0 flex items-center justify-center gap-3 shrink-0 transition-all duration-300 group shadow-[0_10px_20px_rgba(0,130,200,0.2)] hover:shadow-[0_15px_30px_rgba(0,130,200,0.3)]">
              <span className="font-bold uppercase text-[11px] tracking-[0.2em]">Comenzar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

          </div>
        </motion.div>

        {/* ── INTEGRATED STATS (White text on dark bg) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 flex items-center gap-8 md:gap-20 relative z-10"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">4.500<span className="text-primary-blue">+</span></div>
            <div className="font-mono text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mt-2">Proyectos</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">98<span className="text-primary-blue">%</span></div>
            <div className="font-mono text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mt-2">Eficiencia</div>
          </div>
          <div className="w-px h-10 bg-white/20 hidden md:block" />
          <div className="text-center hidden md:block">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">15<span className="text-primary-blue">y</span></div>
            <div className="font-mono text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mt-2">Experiencia</div>
          </div>
        </motion.div>

      </section>
