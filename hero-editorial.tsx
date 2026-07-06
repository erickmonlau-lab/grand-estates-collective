      {/* ════════════════════════════════════════════════════════════
          HERO — "La Portada Arquitectónica" (Editorial Scene)
          Concept: A cinematic, magazine-cover style hero. Massive
          editorial typography integrated with a monumental architectural
          background, anchored by a dark "Command Console" search bar.
          ════════════════════════════════════════════════════════════ */}
      <section 
        className="relative min-h-[100svh] w-full overflow-hidden bg-onyx flex flex-col justify-between"
        onMouseMove={(e) => {
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
        
        {/* ── BACKGROUND: The Architectural Scene ── */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            x: useTransform(mouseX, [-1, 1], [20, -20]),
            y: useTransform(mouseY, [-1, 1], [20, -20]),
            scale: 1.05,
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle gradient to ensure typography legibility and ground the console */}
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-transparent to-onyx/80" />
        </motion.div>

        {/* ── HEADER / TYPOGRAPHY (The Magazine Title) ── */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pt-32 md:pt-48 flex flex-col md:flex-row justify-between items-start pointer-events-none">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
            style={{
              x: useTransform(mouseX, [-1, 1], [-15, 15]),
              y: useTransform(mouseY, [-1, 1], [-15, 15]),
            }}
          >
            <div className="font-mono text-[10px] font-bold text-white/50 tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-white/30"></span>
              Gestión Patrimonial Integral
            </div>
            
            <h1 
              className="text-white leading-[0.9] tracking-tight drop-shadow-2xl"
              style={{ 
                // Using a system serif font stack to simulate high-end editorial (like Enclave)
                fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                textShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              Control Absoluto.<br />
              <span className="text-white/80 italic font-light">Confianza Invisible.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="hidden md:flex flex-col items-end text-right mt-4"
          >
            <div className="text-white font-black text-5xl tracking-tighter">350<span className="text-primary-blue">+</span></div>
            <div className="font-mono text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mt-1">Comunidades Administradas</div>
            <div className="w-px h-16 bg-white/20 my-4"></div>
            <div className="text-white font-black text-5xl tracking-tighter">98<span className="text-primary-blue">%</span></div>
            <div className="font-mono text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mt-1">Nivel de Eficiencia</div>
          </motion.div>

        </div>

        {/* ── THE COMMAND CONSOLE (The Search Tool) ── */}
        <motion.div 
          className="relative z-20 w-full max-w-[1200px] mx-auto px-4 md:px-12 pb-12 mt-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            x: useTransform(mouseX, [-1, 1], [-30, 30]),
            y: useTransform(mouseY, [-1, 1], [-20, 20]),
          }}
        >
          {/* Console Body */}
          <div 
            className="w-full rounded-[2rem] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)', // Deep slate/onyx
              backdropFilter: 'blur(30px) saturate(150%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 50px 100px -20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Console Inner Display / UI */}
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              
              {/* Operation Mode (Comprar/Alquilar) */}
              <div className="flex flex-row md:flex-col bg-black/40 rounded-3xl p-1 border border-white/5 shrink-0">
                {(["comprar", "alquilar"] as const).map((type) => (
                  <button key={type} onClick={() => setSearchType(type)}
                    className={`flex-1 md:flex-none px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all focus:outline-none flex items-center justify-center gap-2 ${
                      searchType === type 
                        ? 'bg-[#1E293B] text-primary-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                        : 'bg-transparent text-white/40 hover:text-white/80'
                    }`}>
                    {searchType === type && <div className="w-1.5 h-1.5 rounded-full bg-primary-blue shadow-[0_0_8px_rgba(0,130,200,0.8)]" />}
                    {type}
                  </button>
                ))}
              </div>

              {/* Dials / Selectors */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-3xl p-6 flex flex-col justify-center relative group">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-1">Target Zone</div>
                      <div className="font-medium text-white text-lg">{searchParams.zona}</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-primary-blue transition-colors" />
                  </div>
                  {/* Dropdown Menu */}
                  {activeDropdown === "zona" && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-[#0F172A] border border-white/10 rounded-2xl p-2 z-50 shadow-2xl">
                      {["Cualquiera", "Madrid", "Barcelona", "Valencia"].map(loc => (
                        <div key={loc} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, zona: loc})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/5 rounded-xl cursor-pointer text-white/80 hover:text-white transition-colors text-sm">{loc}</div>
                      ))}
                    </div>
                  )}
                </button>

                <button type="button" onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-3xl p-6 flex flex-col justify-center relative group">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-1">Asset Type</div>
                      <div className="font-medium text-white text-lg truncate">{searchParams.tipo}</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-primary-blue transition-colors" />
                  </div>
                  {/* Dropdown Menu */}
                  {activeDropdown === "tipo" && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-[#0F172A] border border-white/10 rounded-2xl p-2 z-50 shadow-2xl">
                      {["Cualquiera", "Piso", "Local"].map(tp => (
                        <div key={tp} onClick={(e) => { e.stopPropagation(); setSearchParams(p => ({...p, tipo: tp})); setActiveDropdown(null); }} className="px-4 py-3 hover:bg-white/5 rounded-xl cursor-pointer text-white/80 hover:text-white transition-colors text-sm">{tp}</div>
                      ))}
                    </div>
                  )}
                </button>

              </div>

              {/* Execution / Submit (The Action Button) */}
              <button type="button" onClick={() => alert('Ejecutando búsqueda...')}
                className="bg-primary-blue hover:bg-[#006bb3] text-white rounded-3xl px-12 py-6 flex items-center justify-center gap-4 shrink-0 transition-all duration-300 group shadow-[0_10px_30px_rgba(0,130,200,0.3)] hover:shadow-[0_15px_40px_rgba(0,130,200,0.5)] border border-white/10">
                <span className="font-bold uppercase text-[11px] tracking-[0.2em]">Ejecutar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>

            </div>
          </div>
        </motion.div>

      </section>
