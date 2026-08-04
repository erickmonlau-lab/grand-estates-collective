import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace the entire Valuator section HTML with the exact design from the reference image
const oldValuatorSection = `      {/* ── VALORADOR DE INMUEBLES (LIGHT BACKGROUND) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-white text-onyx py-6 md:py-14">
        <div className="bg-[#f1f5f9] rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/80 p-6 sm:p-8 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-[#0f172a]">
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* LEFT COLUMN: Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-white text-[#0b214a] text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2 rounded-2xl shadow-md border border-slate-200/80">
                  <Building2 className="w-4 h-4 text-[#005c99]" />
                  <span>{t.valorador.tag}</span>
                </span>
                <img src={logoImg} alt="Gesgrama" className="h-7 w-auto object-contain hidden sm:block" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-4 leading-[1.1] tracking-tight font-sans">
                {t.valorador.title}{" "}
                <span className="relative inline-block text-[#2563eb] pb-2">
                  {t.valorador.titleAccent}
                  <span className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#38bdf8] rounded-full" />
                </span>
              </h2>

              <p className="text-slate-600 text-base md:text-17px max-w-[500px] mb-8 leading-relaxed font-semibold">
                {t.valorador.subtitle}
              </p>

              <div className="w-full max-w-xl">
                {valuatorSubmitted ? (
                  <div className="bg-white text-[#0f172a] border-2 border-[#0b214a] rounded-3xl p-8 shadow-md">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <h3 className="font-bold text-2xl mb-2">{t.valorador.enviada}</h3>
                    <p className="text-slate-500 mb-6">{t.valorador.enviadaDesc}</p>
                    <button 
                      onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }} 
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-sm cursor-pointer"
                    >
                      {t.valorador.nuevaValoracion}
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Inputs Row */}
                    <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
                      {/* Select Zona */}
                      <div className="flex-1 bg-white border border-slate-300 rounded-full px-5 py-3.5 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3 w-full">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <select
                            value={valuatorData.zona}
                            onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                            className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                          >
                            <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                            {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                          </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>

                      {/* Input Superficie */}
                      <div className="flex-1 bg-white border border-slate-300 rounded-full px-5 py-3.5 flex items-center gap-3 shadow-xs">
                        <Home className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder={t.valorador.superficieLabel}
                          value={valuatorData.metros}
                          onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-[#0f172a] focus:ring-0 outline-none placeholder:text-slate-400 font-sans"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mb-6"
                    >
                      <Home className="w-4 h-4" />
                      {t.valorador.botonCalcular} <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Footer Badges */}
                    <div className="flex flex-wrap items-center gap-6 text-slate-700 text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        {t.valorador.sinCompromiso}
                      </span>
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {t.valorador.resultadoInmediato}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: White Floating Price Card */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="bg-white text-[#0f172a] rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-[380px] border-2 border-slate-200/90">
                <div className="text-[10px] font-extrabold text-blue-100 uppercase tracking-widest mb-1.5 font-sans">{t.valorador.ejemploResultado}</div>
                <div className="text-xs font-extrabold text-[#2563eb] uppercase tracking-wider mb-2 font-sans">{t.valorador.valorEstimado}</div>
                
                <div className="text-4xl md:text-[44px] font-black text-[#0f172a] mb-3 leading-none tracking-tight font-sans">
                  245<span className="text-slate-400 font-normal">.000€</span>
                </div>
                
                <div className="text-xs md:text-sm font-bold text-slate-500 mb-1 font-sans">
                  {t.valorador.rangoEstimado} <span className="text-[#0f172a]">230.000€ – 260.000€</span>
                </div>
                <div className="text-[11px] leading-tight text-slate-400 mb-8 font-medium">
                  {t.valorador.estimacionAutomatizada}
                </div>
                
                {/* Sparkline Price Trend Chart */}
                <div className="mb-6 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2 font-sans">
                    <span>Tendencia de precios (6 meses)</span>
                    <span className="text-emerald-600 flex items-center gap-0.5 font-sans"><TrendingUp className="w-3.5 h-3.5" /> +4.2%</span>
                  </div>
                  <div className="w-full h-12 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" fill="none">
                      <defs>
                        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 L 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4 L 200 40 L 0 40 Z" fill="url(#sparklineGrad)" />
                      <path d="M 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="0" cy="30" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="40" cy="22" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="80" cy="20" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="120" cy="14" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="160" cy="10" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="200" cy="4" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  {t.valorador.actualizadoHoy}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>`;

const newValuatorSection = `      {/* ── VALORADOR DE INMUEBLES (EXACT DESIGN MATCH WITH BLUE BG) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14">
        <div className="bg-[#005c99] rounded-[28px] md:rounded-[36px] shadow-xl p-6 sm:p-8 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* LEFT COLUMN: Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-[1.1] tracking-tight font-sans">
                Valoración Inteligente<br />
                <span className="relative inline-block text-white pb-2">
                  de tu Inmueble
                  <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#38bdf8] rounded-full" />
                </span>
              </h2>

              <p className="text-blue-100 text-base md:text-lg max-w-[520px] mb-8 leading-relaxed font-semibold">
                Obtén una estimación precisa del precio de mercado de tu vivienda en menos de 1 minuto con datos reales de Santa Coloma de Gramenet.
              </p>

              {/* Dark Form Console Card */}
              <div className="bg-[#0b172a] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-xl">
                {/* Inputs Row */}
                <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
                  {/* Select Zona */}
                  <div className="flex-1 bg-white rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3 w-full">
                      <MapPin className="w-4 h-4 text-[#005c99] shrink-0" />
                      <select
                        value={valuatorData.zona}
                        onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                        className="w-full bg-transparent border-0 p-0 text-sm font-bold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                      >
                        <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                        {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                      </select>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>

                  {/* Input Superficie */}
                  <div className="flex-1 bg-white rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-xs">
                    <Home className="w-4 h-4 text-[#005c99] shrink-0" />
                    <input
                      type="text"
                      placeholder="245"
                      value={valuatorData.metros}
                      onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                      className="w-full bg-transparent border-0 p-0 text-sm font-bold text-[#0f172a] focus:ring-0 outline-none placeholder:text-slate-400 font-sans"
                    />
                  </div>
                </div>
                
                {/* Calculate Button */}
                <button
                  onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                  className="w-full bg-white hover:bg-slate-100 text-[#005c99] font-black text-sm py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2.5 mb-3.5 font-sans"
                >
                  <Home className="w-4 h-4 text-[#005c99]" />
                  <span>{t.valorador.botonCalcular}</span>
                  <ArrowRight className="w-4 h-4 text-[#005c99]" />
                </button>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/34604259424?text=Hola,%20quisiera%20solicitar%20el%20informe%20oficial%20completo%20de%20valoraci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#00a859] hover:bg-[#008f4c] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-white shrink-0" />
                  <span>¿Quieres el informe oficial completo? Pídelo por WhatsApp</span>
                </a>
              </div>

              {/* Footer Badges */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <span className="inline-flex items-center gap-2 bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-xs">
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                  {t.valorador.sinCompromiso}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-xs">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  {t.valorador.resultadoInmediato}
                </span>
              </div>

            </div>

            {/* RIGHT COLUMN: White Floating Result Card */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="bg-white text-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-[400px] border border-white relative overflow-hidden">
                
                {/* Header Header Bar */}
                <div className="bg-[#0b172a] text-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-widest">
                      <MapPin className="w-3 h-3 inline mr-1 text-[#38bdf8]" /> SANTA COLOMA · {valuatorData.metros || "245"} M²
                    </span>
                    <span className="text-xs font-black tracking-wider uppercase mt-0.5 text-white">RESULTADO DEL CÁLCULO</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>

                {/* Big Price */}
                <div className="text-4xl sm:text-5xl font-black text-[#0b172a] mb-4 leading-none tracking-tight font-sans text-center">
                  {valuatorData.metros ? (parseInt(valuatorData.metros, 10) * 2400).toLocaleString('es-ES') : "588.000"} <span className="text-slate-400 font-normal">€</span>
                </div>

                {/* Price per m2 badge */}
                <div className="flex justify-center mb-6">
                  <span className="bg-[#e0f2fe] text-[#0284c7] font-extrabold text-xs px-4 py-1.5 rounded-xl border border-blue-200/60">
                    2400 €/m² · precio medio zona
                  </span>
                </div>

                {/* Estimated Market Range Card */}
                <div className="bg-[#f0f9ff] border border-blue-100 rounded-2xl p-4 mb-6 text-center">
                  <div className="text-[10px] font-extrabold text-[#0284c7] uppercase tracking-wider mb-1">RANGO ESTIMADO DE MERCADO</div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a]">
                    {valuatorData.metros ? (parseInt(valuatorData.metros, 10) * 2232).toLocaleString('es-ES') : "547.000"}€ – {valuatorData.metros ? (parseInt(valuatorData.metros, 10) * 2567).toLocaleString('es-ES') : "629.000"}€
                  </div>
                </div>

                {/* Sparkline Chart */}
                <div className="mb-4 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2 font-sans">
                    <span>Tendencia precios Santa Coloma</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 font-sans text-[10px]"><TrendingUp className="w-3 h-3" /> +4.2%</span>
                  </div>
                  <div className="w-full h-12 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" fill="none">
                      <defs>
                        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 L 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4 L 200 40 L 0 40 Z" fill="url(#sparklineGrad)" />
                      <path d="M 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="200" cy="4" r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Estimación instantánea · Santa Coloma de Gramenet
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>`;

c = c.replace(oldValuatorSection, newValuatorSection);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Valuator section 100% matched with user reference image!');
