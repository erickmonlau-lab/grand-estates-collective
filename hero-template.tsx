      {/* ════════════════════════════════════════════════════════════
          HERO — "La Maquinaria Perfecta"
          Concept: The invisible, perfect mechanism behind your peace.
          Technique: Full-screen marquee hero (all.inn-level)
          Level: Awwwards / FWA candidate
          ════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col overflow-hidden bg-white min-h-svh"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}
        style={{ '--mx': '-1000px', '--my': '-1000px' } as React.CSSProperties}
      >

        {/* ── AMBIENT BACKGROUND ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="dot-grid" />
          <div className="hero-cursor-glow" />
          {/* Vignettes to fade the grid at all edges */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent" />
          {/* Very subtle blue aura — top left */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,130,200,0.05) 0%, transparent 65%)' }} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1 — EDITORIAL HEADLINE (Left-heavy, bottom-anchored)
            ════════════════════════════════════════════════════════════ */}
        <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1360px] mx-auto w-full px-6 md:px-14 pt-24 pb-8">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">

            {/* LEFT — The brutal headline */}
            <div className="max-w-[820px]">

              {/* System status badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 mb-9"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span
                  className="font-mono font-bold uppercase text-onyx/35"
                  style={{ fontSize: '9px', letterSpacing: '0.3em' }}
                >
                  SYS.STATUS: ÓPTIMO · GESGRAMA · EST. 2009
                </span>
              </motion.div>

              {/* Headline — Brutalist scale, bottom-anchored reveal */}
              <h1 key={language} className="flex flex-col mb-0">
                {[
                  language === 'en' ? 'The invisible' : language === 'ca' ? "L'engranatge"    : 'El engranaje',
                  language === 'en' ? 'machinery.'   : language === 'ca' ? 'invisible.'       : 'invisible.',
                  language === 'en' ? 'That orders'  : language === 'ca' ? 'Que ho ordena'    : 'Que lo ordena',
                  language === 'en' ? 'everything.'  : language === 'ca' ? 'tot.'             : 'todo.',
                ].map((line, i) => (
                  <span
                    key={`${language}-${i}`}
                    className="block overflow-hidden select-none"
                    style={{ lineHeight: 0.9, paddingBottom: '0.06em' }}
                  >
                    <motion.span
                      className={`block text-onyx ${i >= 2 ? 'opacity-55' : 'font-black'}`}
                      style={{
                        fontSize: 'clamp(2.8rem, 8.5vw, 8.8rem)',
                        letterSpacing: '-0.04em',
                        fontFamily: i >= 2 ? "'Georgia', 'Times New Roman', serif" : "'Inter', system-ui, sans-serif",
                        fontStyle: i >= 2 ? 'italic' : 'normal',
                        fontWeight: i >= 2 ? 500 : 900,
                      }}
                      initial={{ y: '112%', filter: 'blur(10px)', opacity: 0 }}
                      animate={{ y: '0%', filter: 'blur(0px)', opacity: i >= 2 ? 0.55 : 1 }}
                      transition={{ duration: 1.2, delay: 0.12 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            {/* RIGHT — Vertical trust telemetry + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-8 pb-2 shrink-0 items-end"
            >
              {/* Stats column */}
              <div className="flex flex-col gap-4 items-end">
                {[
                  { n: '350+',   l: language === 'en' ? 'Communities' : language === 'ca' ? 'Comunitats' : 'Comunidades' },
                  { n: '98%',    l: language === 'en' ? 'Efficiency'   : language === 'ca' ? 'Eficiència'  : 'Eficiencia'  },
                  { n: '+1.200', l: language === 'en' ? 'Clients'       : language === 'ca' ? 'Clients'     : 'Clientes'    },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col items-end">
                    <span className="font-black text-onyx text-xl leading-none" style={{ letterSpacing: '-0.03em' }}>{s.n}</span>
                    <span className="font-mono font-bold uppercase text-onyx/30 mt-0.5" style={{ fontSize: '8px', letterSpacing: '0.2em' }}>{s.l}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2.5">
                <a href="#propiedades"
                  className="btn-primary-glow inline-flex items-center justify-center gap-2.5 bg-primary-blue text-white px-7 py-3.5 rounded-full font-bold uppercase transition-all duration-300 hover:bg-onyx hover:-translate-y-px"
                  style={{ fontSize: '10px', letterSpacing: '0.2em', boxShadow: '0 4px 20px rgba(0,130,200,0.28)' }}>
                  <Home className="w-3.5 h-3.5 shrink-0" />
                  {t.cta.findHome}
                </a>
                <a href="#contacto"
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-onyx border border-onyx/10 px-7 py-3.5 rounded-full font-bold uppercase transition-all duration-300 hover:border-primary-blue/40 hover:text-primary-blue hover:-translate-y-px"
                  style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  {t.cta.contact}
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 — THE MARQUEE STRIP ("La Maquinaria")
            Infinite horizontal scroll — the signature visual element.
            Each tile is an architectural data-sculpture.
            ════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full mb-5 overflow-hidden"
          style={{ height: 'clamp(210px, 26vw, 330px)' }}
        >
          {/* Left/Right fade masks so items vanish at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(255,255,255,1), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgba(255,255,255,1), transparent)' }} />

          {/* The scrolling track — items duplicated for seamless loop */}
          <div
            className="marquee-track h-full"
            style={{ paddingLeft: '14px' }}
          >
            {[0, 1].flatMap(setIdx => [

              /* ── TILE 1: Arch Navy ── */
              /* Tall arch shape. Deep navy. Stat: 350+ Comunidades */
              <div
                key={`${setIdx}-arch-navy`}
                className="shrink-0 relative flex flex-col items-center justify-end overflow-hidden"
                style={{
                  width: 'clamp(155px, 15vw, 195px)',
                  height: '90%',
                  background: 'linear-gradient(160deg, #081020 0%, #132244 100%)',
                  borderRadius: '9999px 9999px 18px 18px',
                  paddingBottom: '1.4rem',
                  flexShrink: 0,
                }}
              >
                {/* Concentric arc decorations at top */}
                <div className="absolute top-5 left-0 right-0 flex flex-col items-center gap-3">
                  {[72, 52, 34].map((s, i) => (
                    <div key={i} style={{
                      width: s, height: s / 2,
                      borderTop: `1px solid rgba(0,130,200,${0.15 + i * 0.08})`,
                      borderLeft: `1px solid rgba(0,130,200,${0.1 + i * 0.05})`,
                      borderRight: `1px solid rgba(0,130,200,${0.1 + i * 0.05})`,
                      borderRadius: `${s}px ${s}px 0 0`,
                    }} />
                  ))}
                </div>
                <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.04em' }}>350+</span>
                <span className="font-mono font-bold uppercase text-white/40 mt-1" style={{ fontSize: '8px', letterSpacing: '0.22em' }}>COMUNIDADES</span>
              </div>,

              /* ── TILE 2: Wide Pill Dark ── */
              /* Horizontal pill. Near-black. Stat: 98% Eficiencia + live dot */
              <div
                key={`${setIdx}-pill-dark`}
                className="shrink-0 flex items-center justify-between"
                style={{
                  width: 'clamp(290px, 28vw, 370px)',
                  height: 'clamp(82px, 9vw, 106px)',
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #111827 100%)',
                  borderRadius: 9999,
                  paddingLeft: '2rem',
                  paddingRight: '1.6rem',
                  flexShrink: 0,
                }}
              >
                <div>
                  <div className="font-black text-white leading-none" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', letterSpacing: '-0.04em' }}>98%</div>
                  <div className="font-mono font-bold uppercase text-white/30 mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.22em' }}>EFICIENCIA OPERATIVA</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono font-bold uppercase text-emerald-400/70" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>LIVE</span>
                </div>
              </div>,

              /* ── TILE 3: Architectural Grid Square ── */
              /* Light blue. Fine grid pattern. Structural / abstract. */
              <div
                key={`${setIdx}-grid-square`}
                className="shrink-0 relative overflow-hidden"
                style={{
                  width: 'clamp(140px, 14vw, 175px)',
                  height: 'clamp(140px, 14vw, 175px)',
                  borderRadius: 20,
                  flexShrink: 0,
                  backgroundImage: [
                    'linear-gradient(rgba(0,130,200,0.09) 1px, transparent 1px)',
                    'linear-gradient(90deg, rgba(0,130,200,0.09) 1px, transparent 1px)',
                  ].join(', '),
                  backgroundSize: '20px 20px',
                  backgroundColor: '#EEF4FF',
                }}
              >
                {/* Blue accent stripe bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #0082c8, #00b4e8)' }} />
                {/* Corner accent dot */}
                <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: '#0082c8', opacity: 0.55 }} />
                {/* Mini label bottom-left */}
                <div className="absolute bottom-5 left-4">
                  <span className="font-mono font-bold uppercase text-primary-blue/60" style={{ fontSize: '7px', letterSpacing: '0.2em' }}>ARQUITECTURA</span>
                </div>
              </div>,

              /* ── TILE 4: Tall Pill Blue ── */
              /* Vertical pill. Gesgrama blue gradient. Stat: +15 Años */
              <div
                key={`${setIdx}-tall-pill-blue`}
                className="shrink-0 flex flex-col items-center justify-center gap-2"
                style={{
                  width: 'clamp(95px, 10vw, 120px)',
                  height: '88%',
                  background: 'linear-gradient(180deg, #0082c8 0%, #0055b3 100%)',
                  borderRadius: 9999,
                  flexShrink: 0,
                }}
              >
                <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.04em' }}>+15</span>
                <span className="font-mono font-bold uppercase text-white/50" style={{ fontSize: '7.5px', letterSpacing: '0.22em' }}>AÑOS</span>
              </div>,

              /* ── TILE 5: Kinetic Circle "Desde 2009" ── */
              /* White circle with concentric ring swell. Center stat. */
              <div
                key={`${setIdx}-circle-2009`}
                className="shrink-0 relative flex items-center justify-center"
                style={{
                  width: 'clamp(150px, 15vw, 185px)',
                  height: 'clamp(150px, 15vw, 185px)',
                  borderRadius: '50%',
                  background: 'white',
                  border: '1px solid rgba(0,130,200,0.15)',
                  flexShrink: 0,
                  animation: 'slow-pulse-ring 4s ease-in-out infinite',
                }}
              >
                <div className="text-center">
                  <div className="font-mono font-bold uppercase text-onyx/35" style={{ fontSize: '8px', letterSpacing: '0.25em' }}>DESDE</div>
                  <div className="font-black text-onyx leading-none mt-1" style={{ fontSize: 'clamp(1.4rem,3vw,2.2rem)', letterSpacing: '-0.04em' }}>2009</div>
                </div>
              </div>,

              /* ── TILE 6: Status Banner (wide horizontal) ── */
              /* White card with border. System operational badge. */
              <div
                key={`${setIdx}-status-banner`}
                className="shrink-0 flex items-center gap-4"
                style={{
                  width: 'clamp(310px, 30vw, 400px)',
                  height: 'clamp(70px, 7.5vw, 90px)',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 16,
                  border: '1px solid rgba(0,130,200,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  paddingLeft: '1.6rem',
                  paddingRight: '1.6rem',
                  flexShrink: 0,
                }}
              >
                <div className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </div>
                <div>
                  <div className="font-mono font-bold uppercase text-onyx/70" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>SYS.STATUS: ÓPTIMO</div>
                  <div className="font-mono font-bold uppercase text-onyx/25 mt-0.5" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>GESGRAMA OPERATING SYSTEM · 2009–2024</div>
                </div>
              </div>,

              /* ── TILE 7: Arch Gesgrama Blue ── */
              /* Mirror of tile 1, in brand blue. Stat: 1.200+ Clientes */
              <div
                key={`${setIdx}-arch-blue`}
                className="shrink-0 relative flex flex-col items-center justify-end overflow-hidden"
                style={{
                  width: 'clamp(145px, 14vw, 180px)',
                  height: '84%',
                  background: 'linear-gradient(155deg, #0082c8 0%, #0055b3 100%)',
                  borderRadius: '9999px 9999px 18px 18px',
                  paddingBottom: '1.4rem',
                  flexShrink: 0,
                }}
              >
                {/* Concentric rings from top */}
                <div className="absolute top-4 left-0 right-0 flex flex-col items-center gap-3">
                  {[64, 44, 26].map((s, i) => (
                    <div key={i} style={{
                      width: s, height: s / 2,
                      borderTop: `1px solid rgba(255,255,255,${0.18 + i * 0.08})`,
                      borderLeft: `1px solid rgba(255,255,255,${0.12 + i * 0.05})`,
                      borderRight: `1px solid rgba(255,255,255,${0.12 + i * 0.05})`,
                      borderRadius: `${s}px ${s}px 0 0`,
                    }} />
                  ))}
                </div>
                <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.04em' }}>1.200+</span>
                <span className="font-mono font-bold uppercase text-white/45 mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.22em' }}>CLIENTES</span>
              </div>,

              /* ── TILE 8: Dark Diamond Accent ── */
              /* Pure decorative. Onyx dark. Rotated square with blue core. */
              <div
                key={`${setIdx}-dark-diamond`}
                className="shrink-0 relative flex items-center justify-center"
                style={{
                  width: 'clamp(118px, 11vw, 145px)',
                  height: 'clamp(118px, 11vw, 145px)',
                  background: '#0a0f1a',
                  borderRadius: 18,
                  flexShrink: 0,
                }}
              >
                {[52, 36, 20].map((s, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: s, height: s,
                    border: `1.5px solid rgba(0,130,200,${0.25 + i * 0.2})`,
                    borderRadius: 5,
                    transform: 'rotate(45deg)',
                  }} />
                ))}
                <div style={{
                  position: 'absolute', width: 10, height: 10,
                  background: '#0082c8', borderRadius: 2, opacity: 0.9,
                  transform: 'rotate(45deg)',
                }} />
              </div>,

              /* ── TILE 9: Wide Satisfaction Banner ── */
              /* Light blue bg, horizontal bar with satisfaction metric */
              <div
                key={`${setIdx}-satisfaction`}
                className="shrink-0 flex items-center gap-5"
                style={{
                  width: 'clamp(240px, 23vw, 300px)',
                  height: 'clamp(100px, 11vw, 130px)',
                  background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                  borderRadius: 20,
                  paddingLeft: '1.6rem',
                  paddingRight: '1.4rem',
                  flexShrink: 0,
                }}
              >
                <div>
                  <div className="font-black text-primary-blue leading-none" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.04em' }}>98%</div>
                  <div className="font-mono font-bold uppercase text-primary-blue/50 mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>SATISFACCIÓN</div>
                  {/* Progress bar */}
                  <div style={{ marginTop: 10, height: 3, width: 80, background: 'rgba(0,130,200,0.15)', borderRadius: 9999 }}>
                    <div style={{ width: '98%', height: '100%', background: '#0082c8', borderRadius: 9999 }} />
                  </div>
                </div>
                <Star className="w-8 h-8 text-primary-blue/30 shrink-0" />
              </div>,

            ])}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3 — COMMAND BAR (Search + Filtros)
            Glassmorphism bar. Minimal. Precise. Like a Spotlight search.
            ════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 px-4 pb-8 w-full max-w-[1060px] mx-auto"
        >
          <div
            ref={dropdownRef}
            className="flex flex-col md:flex-row items-stretch gap-2 p-2 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* TYPE TABS */}
            <div className="flex bg-onyx/[0.03] rounded-xl p-1 gap-1 shrink-0">
              {(["comprar", "alquilar"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSearchType(type)}
                  className={`flex-1 px-6 py-3 rounded-lg font-bold uppercase transition-all duration-300 focus:outline-none whitespace-nowrap ${
                    searchType === type
                      ? 'bg-white text-onyx shadow-sm border border-onyx/[0.05]'
                      : 'text-onyx/40 hover:text-onyx/70'
                  }`}
                  style={{ fontSize: '10px', letterSpacing: '0.22em' }}
                >
                  {type === "comprar" ? t.hero.comprar : t.hero.alquilar}
                </button>
              ))}
            </div>

            {/* FILTER FIELDS */}
            <div className="flex-1 flex flex-col sm:flex-row gap-1">

              {/* ZONA */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.025] transition-colors flex items-center gap-3 focus:outline-none group"
                >
                  <MapPin className="w-4 h-4 text-onyx/25 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono font-bold uppercase text-onyx/30" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>{t.hero.zona}</div>
                    <div className="text-onyx font-semibold truncate mt-0.5" style={{ fontSize: '13px' }}>
                      {searchParams.zona}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-onyx/20 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "zona" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-2xl z-50 p-2"
                      style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
                    >
                      {["Cualquiera", "Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga"].map(loc => (
                        <button key={loc} type="button"
                          onClick={() => { setSearchParams(p => ({ ...p, zona: loc })); setActiveDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between ${searchParams.zona === loc ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/[0.03] text-onyx font-medium"}`}>
                          {loc}
                          {searchParams.zona === loc && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px my-2 bg-onyx/[0.06] hidden sm:block shrink-0" />

              {/* TIPO */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.025] transition-colors flex items-center gap-3 focus:outline-none group"
                >
                  <Home className="w-4 h-4 text-onyx/25 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono font-bold uppercase text-onyx/30" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>{t.hero.tipo}</div>
                    <div className="text-onyx font-semibold truncate mt-0.5" style={{ fontSize: '13px' }}>
                      {searchParams.tipo}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-onyx/20 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "tipo" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-2xl z-50 p-2"
                      style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
                    >
                      {["Cualquiera", "Piso", "Ático", "Local comercial", "Oficina", "Finca/Solar"].map(tp => (
                        <button key={tp} type="button"
                          onClick={() => { setSearchParams(p => ({ ...p, tipo: tp })); setActiveDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between ${searchParams.tipo === tp ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/[0.03] text-onyx font-medium"}`}>
                          {tp}
                          {searchParams.tipo === tp && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px my-2 bg-onyx/[0.06] hidden sm:block shrink-0" />

              {/* HABITACIONES */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "hab" ? null : "hab")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.025] transition-colors flex items-center gap-3 focus:outline-none group"
                >
                  <Users className="w-4 h-4 text-onyx/25 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono font-bold uppercase text-onyx/30" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>{t.hero.hab}</div>
                    <div className="text-onyx font-semibold truncate mt-0.5" style={{ fontSize: '13px' }}>
                      {searchParams.hab}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-onyx/20 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "hab" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-2xl z-50 p-2"
                      style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
                    >
                      {["Cualquiera", "1+", "2+", "3+", "4+", "5+"].map(h => (
                        <button key={h} type="button"
                          onClick={() => { setSearchParams(p => ({ ...p, hab: h })); setActiveDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between ${searchParams.hab === h ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/[0.03] text-onyx font-medium"}`}>
                          {h}
                          {searchParams.hab === h && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px my-2 bg-onyx/[0.06] hidden sm:block shrink-0" />

              {/* PRECIO */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "precio" ? null : "precio")}
                  className="w-full text-left py-3.5 px-5 rounded-xl hover:bg-onyx/[0.025] transition-colors flex items-center gap-3 focus:outline-none group"
                >
                  <DollarSign className="w-4 h-4 text-onyx/25 group-hover:text-primary-blue transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono font-bold uppercase text-onyx/30" style={{ fontSize: '7.5px', letterSpacing: '0.2em' }}>{t.hero.precio}</div>
                    <div className="text-onyx font-semibold truncate mt-0.5" style={{ fontSize: '13px' }}>
                      {searchParams.precio}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-onyx/20 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "precio" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full right-0 mb-2 w-52 bg-white rounded-2xl z-50 p-2"
                      style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
                    >
                      {["Cualquiera", "100.000 €", "200.000 €", "300.000 €", "500.000 €", "750.000 €", "+1.000.000 €"].map(pr => (
                        <button key={pr} type="button"
                          onClick={() => { setSearchParams(p => ({ ...p, precio: pr })); setActiveDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors flex items-center justify-between ${searchParams.precio === pr ? "bg-primary-blue/5 text-primary-blue font-bold" : "hover:bg-onyx/[0.03] text-onyx font-medium"}`}>
                          {pr}
                          {searchParams.precio === pr && <span className="text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="button"
              onClick={() => alert(`Buscando: ${searchType} · ${searchParams.tipo} en ${searchParams.zona} · ${searchParams.hab} hab · hasta ${searchParams.precio}`)}
              className="bg-onyx text-white w-14 h-14 rounded-xl hover:bg-primary-blue transition-all duration-300 flex items-center justify-center shrink-0 hover:scale-[1.03] active:scale-95 focus:outline-none"
              style={{ boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile CTAs — only visible on small screens */}
          <div className="flex gap-3 mt-4 lg:hidden">
            <a href="#propiedades"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-blue text-white py-3.5 rounded-full font-bold uppercase transition-all hover:bg-onyx"
              style={{ fontSize: '10px', letterSpacing: '0.2em', boxShadow: '0 4px 20px rgba(0,130,200,0.28)' }}>
              <Home className="w-3.5 h-3.5" />
              {t.cta.findHome}
            </a>
            <a href="#contacto"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-onyx border border-onyx/10 py-3.5 rounded-full font-bold uppercase transition-all hover:border-primary-blue/40 hover:text-primary-blue"
              style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
              <MessageCircle className="w-3.5 h-3.5" />
              {t.cta.contact}
            </a>
          </div>
        </motion.div>

        {/* Section separator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(15,23,42,0.08), transparent)' }} />

      </section>

