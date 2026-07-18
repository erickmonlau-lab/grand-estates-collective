const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '      {/* ── COVERAGE AREA ── */}';
const endMarker = '      {/* ── CTA ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* ── COVERAGE AREA (NEW MOCKUP) ── */}
      <section id="cobertura" className="py-24 md:py-32 px-6 md:px-12 bg-[#f8fafc] text-onyx overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <Reveal>
              <div className="mb-6">
                <span className="text-[11px] text-[#0082c8] font-bold tracking-[0.2em] uppercase">
                  Área de Cobertura
                </span>
              </div>
              <h2 className="text-5xl md:text-[4rem] font-bold leading-[1.1] tracking-tight text-onyx mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Trabajamos en<br/>toda la provincia<br/>de <span className="text-[#0082c8]">Barcelona</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-12">
                Equipo propio en toda el área metropolitana, Maresme, Vallès, Baix Llobregat y Costa Daurada.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 w-full max-w-2xl">
                
                {/* Stat 1 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,130,200,0.06)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#0082c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-onyx tracking-tighter leading-none mb-1">+300</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Comunidades<br/><span className="text-[#0082c8]">Atendidas</span></p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,130,200,0.06)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#0082c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-onyx tracking-tighter leading-none mb-1">25+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Años de<br/><span className="text-[#0082c8]">Experiencia</span></p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,130,200,0.06)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#0082c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-onyx tracking-tighter leading-none mb-1">100%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Personal propio<br/><span className="text-[#0082c8]">Y certificado</span></p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,130,200,0.06)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#0082c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-onyx tracking-tighter leading-none mb-1">24h</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Respuesta rápida<br/><span className="text-[#0082c8]">Garantizada</span></p>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* CTA Box */}
            <Reveal delay={0.2} className="w-full max-w-2xl">
              <div className="bg-[#005c99] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#004b7a] to-transparent opacity-50"></div>
                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-[#005c99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">¿Necesitas ayuda?</h4>
                    <p className="text-white/80 text-sm">Contacta con nosotros sin compromiso</p>
                  </div>
                </div>
                <a href="#contacto" className="w-full md:w-auto bg-white hover:bg-slate-50 text-[#005c99] font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0 relative z-10 group">
                  Contactar ahora
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT CONTENT (MAP) */}
          <div className="w-full lg:w-1/2 relative h-[600px] md:h-[750px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-4 border-white bg-[#e8f1f8]">
            <Reveal delay={0.3} className="w-full h-full">
              {/* Map Background iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d382903.62649033324!2d1.8845722301053158!3d41.392686866164395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49816718e30e5%3A0x44b0fb3d4f47660a!2sBarcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-multiply pointer-events-none"
              ></iframe>
              
              {/* Extra light blue tint overlay to match the mockup's soft map */}
              <div className="absolute inset-0 bg-[#0082c8]/5 mix-blend-color pointer-events-none"></div>

              {/* Center Map Marker Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
                {/* Ripples */}
                <div className="absolute w-48 h-48 bg-[#0082c8]/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-32 h-32 bg-[#0082c8]/20 rounded-full"></div>
                
                {/* Marker */}
                <div className="relative">
                  <svg className="w-16 h-16 text-[#005c99] drop-shadow-xl" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <div className="absolute top-[18px] left-[20px] w-6 h-6 bg-white rounded-full"></div>
                </div>
                <span className="mt-2 text-xl font-bold text-onyx drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Barcelona</span>
              </div>

              {/* Floating Card Top Left */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#0082c8]" />
                </div>
                <div className="pr-4 border-r border-slate-100">
                  <h4 className="font-bold text-onyx text-sm">Av. dels Banús, 49</h4>
                  <p className="text-slate-500 text-xs">08923 Santa Coloma<br/>de Gramenet, Barcelona</p>
                </div>
                <div className="flex gap-2 pl-2">
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0082c8] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0082c8] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </a>
                </div>
              </motion.div>

              {/* Floating Card Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 z-30 min-w-[240px]"
              >
                <div className="w-8 h-8 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-[#0082c8]" />
                </div>
                <div>
                  <h4 className="font-bold text-onyx text-base mb-1">Sede Central</h4>
                  <p className="text-slate-500 text-sm mb-3">Av. dels Banús, 49</p>
                  <a href="tel:+34934885858" className="inline-flex items-center gap-2 text-[#0082c8] font-bold hover:text-[#005c99] transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    934 885 858
                  </a>
                </div>
              </motion.div>

              {/* Scattered Map Pins to emulate "areas" */}
              <div className="absolute top-[20%] right-[10%] text-xs font-bold text-slate-600 drop-shadow-md">Granollers</div>
              <div className="absolute top-[35%] right-[5%] text-xs font-bold text-slate-600 drop-shadow-md">Mataró</div>
              <div className="absolute top-[32%] left-[10%] text-xs font-bold text-slate-600 drop-shadow-md">Terrassa</div>
              <div className="absolute top-[48%] right-[20%] text-xs font-bold text-slate-600 drop-shadow-md">Badalona</div>
              <div className="absolute bottom-[35%] left-[25%] text-xs font-bold text-slate-600 drop-shadow-md">Viladecans</div>
              <div className="absolute bottom-[20%] left-[15%] text-xs font-bold text-slate-600 drop-shadow-md">Castelldefels</div>
              
              {/* Route Lines / Highways (Subtle SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 40 Q 30 50 50 50 T 100 20" fill="none" stroke="#0082c8" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 20 100 Q 40 70 50 50 T 90 0" fill="none" stroke="#0082c8" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>

            </Reveal>
          </div>
        </div>
      </section>
`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the Coverage section');
