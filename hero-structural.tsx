      {/* ════════════════════════════════════════════════════════════
          HERO — "El Sistema Inquebrantable" (Estructuralismo)
          Concept: Absolute Order. No floating elements. Everything 
          is locked into a mathematically perfect 1px steel grid.
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-white min-h-[calc(100svh-5rem)] w-full flex flex-col p-4 md:p-8">
        
        {/* The Architectural Grid Container */}
        <div 
          className="flex-1 w-full max-w-[1600px] mx-auto bg-onyx/10 relative overflow-hidden"
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '1fr auto',
            gap: '1px',
            border: '1px solid rgba(15,23,42,0.1)',
          }}
        >
          
          {/* ── CELL 1: The Monolithic Headline (Spans 8 cols) ── */}
          <div className="bg-white col-span-12 lg:col-span-8 flex flex-col justify-end p-8 md:p-16 relative overflow-hidden group">
            {/* Subtle background texture noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-onyx font-black leading-[0.85] tracking-[-0.05em] uppercase m-0 z-10"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
            >
              <div className="overflow-hidden"><motion.div initial={{y:'100%'}} animate={{y:0}} transition={{duration:1, delay:0.1, ease:[0.16,1,0.3,1]}}>Orden.</motion.div></div>
              <div className="overflow-hidden"><motion.div initial={{y:'100%'}} animate={{y:0}} transition={{duration:1, delay:0.2, ease:[0.16,1,0.3,1]}} className="text-primary-blue">Absoluto.</motion.div></div>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 1 }}
              className="mt-12 text-onyx/50 font-medium max-w-md text-lg z-10"
            >
              Aislamos su patrimonio del ruido operativo. Un sistema de gestión diseñado para garantizar el control total y la tranquilidad milimétrica.
            </motion.p>
          </div>

          {/* ── CELL 2 & 3: The Telemetry Stack (Spans 4 cols) ── */}
          <div className="col-span-12 lg:col-span-4 bg-white flex flex-col relative" style={{ gap: '1px', backgroundColor: 'rgba(15,23,42,0.1)' }}>
            
            {/* Cell 2: System Status */}
            <div className="bg-white flex-1 p-8 flex flex-col justify-between group hover:bg-[#FAFAFA] transition-colors duration-500">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-onyx/40 uppercase">Sys.Status</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-onyx/30 mb-2">TELEMETRÍA DE RED</div>
                <div className="text-3xl font-black text-onyx tracking-tighter">OPERATIVO</div>
                <div className="text-sm font-medium text-onyx/50 mt-1">Desde 2009</div>
              </div>
            </div>

            {/* Cell 3: Trust Metrics */}
            <div className="bg-white flex-1 p-8 flex flex-col justify-between group hover:bg-[#FAFAFA] transition-colors duration-500">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-onyx/40 uppercase">Metric.01</span>
                <TrendingUp className="w-4 h-4 text-onyx/20" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-6xl font-black text-primary-blue tracking-tighter leading-none">98<span className="text-4xl">%</span></div>
                  <div className="font-mono text-xs font-bold text-onyx/40 mt-3 uppercase tracking-widest">Eficiencia Lograda</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-onyx tracking-tighter leading-none">350<span className="text-primary-blue">+</span></div>
                  <div className="font-mono text-[10px] font-bold text-onyx/30 mt-2 uppercase tracking-widest">Comunidades</div>
                </div>
              </div>
            </div>

          </div>

          {/* ── CELL 4: The Tool / Command Bar (Spans 12 cols, Bottom row) ── */}
          <div className="col-span-12 bg-white flex flex-col md:flex-row items-stretch" style={{ gap: '1px', backgroundColor: 'rgba(15,23,42,0.1)' }}>
            
            {/* The Label */}
            <div className="bg-white p-6 flex items-center justify-center shrink-0 w-full md:w-48 group hover:bg-primary-blue transition-colors duration-500">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-onyx/50 uppercase group-hover:text-white transition-colors">Inicializar</span>
            </div>

            {/* Action Tabs */}
            <div className="bg-white flex p-2 shrink-0 gap-1 w-full md:w-auto">
              {(["comprar", "alquilar"] as const).map((type) => (
                <button key={type} onClick={() => setSearchType(type)}
                  className={`px-8 py-4 font-bold uppercase text-[11px] tracking-[0.2em] transition-all focus:outline-none ${
                    searchType === type ? 'bg-onyx text-white' : 'bg-transparent text-onyx/40 hover:bg-onyx/5 hover:text-onyx'
                  }`}>
                  {type}
                </button>
              ))}
            </div>

            {/* The Selectors */}
            <div className="bg-white flex-1 grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', backgroundColor: 'rgba(15,23,42,0.1)' }}>
              
              <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")} className="bg-white p-6 flex items-center justify-between group hover:bg-[#FAFAFA] transition-colors relative">
                <div className="text-left">
                  <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-onyx/30 uppercase mb-1">Zona</div>
                  <div className="font-semibold text-onyx">{searchParams.zona}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-onyx/20 group-hover:text-primary-blue" />
                {activeDropdown === "zona" && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-onyx text-white p-2 z-50 shadow-2xl border border-white/10 flex flex-col gap-1">
                    {["Cualquiera", "Madrid", "Barcelona", "Valencia"].map(loc => (
                      <div key={loc} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, zona: loc})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/10 cursor-pointer font-medium text-sm transition-colors">{loc}</div>
                    ))}
                  </div>
                )}
              </button>

              <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")} className="bg-white p-6 flex items-center justify-between group hover:bg-[#FAFAFA] transition-colors relative">
                <div className="text-left">
                  <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-onyx/30 uppercase mb-1">Tipo de Activo</div>
                  <div className="font-semibold text-onyx truncate max-w-[150px]">{searchParams.tipo}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-onyx/20 group-hover:text-primary-blue" />
                {activeDropdown === "tipo" && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-onyx text-white p-2 z-50 shadow-2xl border border-white/10 flex flex-col gap-1">
                    {["Cualquiera", "Piso", "Local"].map(tp => (
                      <div key={tp} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, tipo: tp})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/10 cursor-pointer font-medium text-sm transition-colors">{tp}</div>
                    ))}
                  </div>
                )}
              </button>

            </div>

            {/* Execute Button */}
            <button type="button" onClick={() => alert('Ejecutar Acción')}
              className="bg-primary-blue text-white p-6 flex items-center justify-center gap-4 shrink-0 w-full md:w-64 hover:bg-onyx transition-colors duration-500 group">
              <span className="font-bold uppercase text-[12px] tracking-[0.2em]">Ejecutar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

          </div>
        </div>
      </section>
