      {/* ════════════════════════════════════════════════════════════
          HERO — "El Arco Monolítico" (Escena 3D Parallax)
          Concept: An immersive 3D space. The background is a real 
          photograph. The UI is physical frosted glass floating in 
          front of it.
          ════════════════════════════════════════════════════════════ */}
      <section 
        className="relative min-h-[100svh] w-full overflow-hidden bg-onyx"
        onMouseMove={(e) => {
          // Normalize mouse coordinates from -1 to 1
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          mouseX.set(x * 2 - 1);
          mouseY.set(y * 2 - 1);
        }}
        onMouseLeave={() => {
          animate(mouseX, 0, { type: "spring", stiffness: 50, damping: 20 });
          animate(mouseY, 0, { type: "spring", stiffness: 50, damping: 20 });
        }}
      >
        
        {/* ── LAYER 0: The Absolute Background (Moves opposite to mouse) ── */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            x: useTransform(mouseX, [-1, 1], [30, -30]),
            y: useTransform(mouseY, [-1, 1], [30, -30]),
            scale: 1.1, // Scale up to prevent edges showing during parallax
            backgroundImage: `url(${archImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle overlay to guarantee text legibility if needed, though the image is bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* ── LAYER 1: The Atmosphere (Floating Particles/Dust) ── */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            x: useTransform(mouseX, [-1, 1], [60, -60]),
            y: useTransform(mouseY, [-1, 1], [60, -60]),
            opacity: 0.6,
          }}
        >
          {/* We create a full screen noise overlay to give air density */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </motion.div>

        {/* ── MAIN CONTENT CONTAINER ── */}
        <div className="relative z-20 w-full h-full min-h-[100svh] flex flex-col items-center justify-end px-4 md:px-12 pb-16 pt-32 max-w-[1600px] mx-auto perspective-[1000px]">

          {/* ── LAYER 2: The Typography (Floats mid-air, moves slightly with mouse) ── */}
          <motion.div 
            className="w-full flex flex-col items-center text-center mb-16 pointer-events-none"
            style={{
              x: useTransform(mouseX, [-1, 1], [-20, 20]),
              y: useTransform(mouseY, [-1, 1], [-20, 20]),
            }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-[0.9] tracking-tighter m-0 drop-shadow-2xl"
              style={{ 
                fontSize: 'clamp(4.5rem, 12vw, 13rem)',
                textShadow: '0 40px 100px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              ORDEN.
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-6 text-white/90 font-medium text-lg md:text-xl max-w-2xl drop-shadow-md"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {language === 'en' ? 'Absolute control for your real estate assets.' : 'Control absoluto para tu patrimonio inmobiliario.'}
            </motion.div>
          </motion.div>

          {/* ── LAYER 3: The UI / Physical Glass (Moves strongly with mouse) ── */}
          <motion.div 
            className="w-full max-w-[1200px]"
            style={{
              x: useTransform(mouseX, [-1, 1], [-50, 50]),
              y: useTransform(mouseY, [-1, 1], [-30, 30]),
              rotateX: useTransform(mouseY, [-1, 1], [2, -2]),
              rotateY: useTransform(mouseX, [-1, 1], [-2, 2]),
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The Glass Pane */}
            <div 
              className="rounded-3xl p-3 md:p-4 shadow-2xl relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(40px) saturate(200%)',
                WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.6)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              
              {/* Telemetry/Stats integrated into the glass */}
              <div className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-white/20 mb-4">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-white font-black text-2xl tracking-tighter leading-none">350+</div>
                    <div className="font-mono text-[8px] font-bold text-white/60 tracking-[0.2em] uppercase mt-1">Comunidades</div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <div className="text-white font-black text-2xl tracking-tighter leading-none">98%</div>
                    <div className="font-mono text-[8px] font-bold text-white/60 tracking-[0.2em] uppercase mt-1">Eficiencia</div>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="hidden sm:flex items-center gap-3 bg-black/20 rounded-full px-4 py-1.5 border border-white/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[9px] text-white/80 tracking-[0.2em] uppercase font-bold">Sys.Status: Óptimo</span>
                </div>
              </div>

              {/* The Command Interface */}
              <div className="flex flex-col md:flex-row gap-2">
                
                {/* Tab Switcher */}
                <div className="flex bg-black/20 rounded-2xl p-1 shrink-0 border border-white/10">
                  {(["comprar", "alquilar"] as const).map((type) => (
                    <button key={type} onClick={() => setSearchType(type)}
                      className={`px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all focus:outline-none ${
                        searchType === type ? 'bg-white text-onyx shadow-lg' : 'bg-transparent text-white/60 hover:text-white hover:bg-white/10'
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>

                {/* The Selectors */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                  
                  <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")} className="bg-black/10 hover:bg-black/20 transition-colors border border-white/10 rounded-2xl p-4 flex items-center justify-between group relative">
                    <div className="text-left">
                      <div className="font-mono text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">{t.hero.zona}</div>
                      <div className="font-semibold text-white">{searchParams.zona}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white" />
                    {/* Glass Dropdown */}
                    {activeDropdown === "zona" && (
                      <div className="absolute top-full left-0 right-0 mt-2 p-2 z-50 rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-1"
                        style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(30px) saturate(200%)' }}>
                        {["Cualquiera", "Madrid", "Barcelona", "Valencia"].map(loc => (
                          <div key={loc} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, zona: loc})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer font-medium text-sm text-white transition-colors">{loc}</div>
                        ))}
                      </div>
                    )}
                  </button>

                  <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")} className="bg-black/10 hover:bg-black/20 transition-colors border border-white/10 rounded-2xl p-4 flex items-center justify-between group relative">
                    <div className="text-left">
                      <div className="font-mono text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">{t.hero.tipo}</div>
                      <div className="font-semibold text-white truncate max-w-[120px]">{searchParams.tipo}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white" />
                    {/* Glass Dropdown */}
                    {activeDropdown === "tipo" && (
                      <div className="absolute top-full left-0 right-0 mt-2 p-2 z-50 rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-1"
                        style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(30px) saturate(200%)' }}>
                        {["Cualquiera", "Piso", "Local"].map(tp => (
                          <div key={tp} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, tipo: tp})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer font-medium text-sm text-white transition-colors">{tp}</div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>

                {/* Execution Button */}
                <button type="button" onClick={() => alert('Buscando...')}
                  className="bg-white text-onyx rounded-2xl px-10 py-4 flex items-center justify-center gap-3 shrink-0 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] transition-all duration-300 group">
                  <span className="font-bold uppercase text-[11px] tracking-[0.2em]">Ejecutar</span>
                  <ArrowRight className="w-4 h-4 text-primary-blue group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </motion.div>
        </div>

        {/* ── LAYER 4: The Camera Lens (Vignette) ── */}
        <div className="absolute inset-0 z-30 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

      </section>
