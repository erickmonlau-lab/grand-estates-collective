const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '      {/* ── NAVIGATION ── */}';
const endMarker = '      {/* ── HERO ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── NAVIGATION (DARK PILL MOCKUP) ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50 flex items-center justify-between py-3 md:py-4 px-6 md:px-8 rounded-full bg-[#0b1221]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <a href="#" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2 -my-4 md:-my-6">
          <img src={logoImg} alt="Gesgrama" className="h-16 md:h-20 lg:h-[5.5rem] w-auto object-contain" />
        </a>

        <div className="hidden lg:flex items-center gap-10 text-[13px] md:text-[14px] font-bold text-white tracking-widest uppercase">
          <a href="#propiedades" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="#servicios" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="#nosotros" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.nosotros}</a>
          <a href="#contacto" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-3 lg:gap-6 shrink-0 pr-1">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 md:p-1.5 text-[10px] md:text-[12px] font-bold">
            {(["ES", "CA", "EN"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => setLanguage(lang)}
                  className={\`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-200 \${language === lang ? 'bg-white text-onyx shadow-sm' : 'text-slate-400 hover:text-white'}\`}
                >
                  {lang}
                </button>
                {idx < 2 && <div className="w-px h-3 bg-white/20 mx-1"></div>}
              </div>
            ))}
          </div>
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-2 bg-[#005c99] text-white hover:bg-[#004b7a] px-6 md:px-8 py-3.5 md:py-3.5 rounded-full text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            {t.nav.portal}
          </a>
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 bg-[#151f32] rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col gap-4 z-50 lg:hidden"
            >
              <a href="#propiedades" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.propiedades}</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.servicios}</a>
              <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.nosotros}</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.contacto}</a>
              <a href="#contacto" className="mt-4 text-center bg-[#005c99] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {t.nav.portal}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the Navbar section to the new dark floating pill design');
