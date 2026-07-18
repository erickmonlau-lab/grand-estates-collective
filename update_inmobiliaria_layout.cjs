const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '{/* ── PROPERTIES SECTION ── */}';
const endMarker = '{/* ── SERVICES SECTION ── */}';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

// Ensure we have access to ArrowUpFromLine and Store from lucide-react if needed, but we can use inline SVGs to be safe.

const newSection = `{/* ── PROPERTIES SECTION (NEW DESIGN) ── */}
      <section id="propiedades" className="py-24 md:py-32 px-6 md:px-12 bg-[#fafcff] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-[11px] md:text-xs uppercase text-[#005c99] font-bold mb-4 tracking-widest">{t.properties.tag}</p>
                <h2 key={language} className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] text-onyx tracking-tight mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                  {t.properties.title} <br className="hidden md:block" />
                  <span className="text-[#005c99]">{t.properties.titleAccent}</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                  {t.properties.subtitle}
                </p>
              </div>
              
              {/* Stat Card */}
              <div className="flex items-center gap-5 bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-6 md:pr-10 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                  <Home className="w-8 h-8 text-[#0082c8]" />
                </div>
                <div>
                  <p className="text-4xl font-black text-[#005c99] mb-1">300+</p>
                  <p className="text-xs md:text-sm text-onyx font-bold leading-tight">Propiedades<br/>disponibles</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FILTERS */}
          <div className="flex flex-col gap-8 mt-12 mb-8">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Tipo de Inmueble</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Todos", value: "Cualquier tipo", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
                  { label: "Piso", value: "Piso", icon: <Building2 className="w-4 h-4" /> },
                  { label: "Ático", value: "Ático", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                  { label: "Local comercial", value: "Local comercial", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                  { label: "Chalet", value: "Chalet", icon: <Home className="w-4 h-4" /> }
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => setSearchParams(p => ({ ...p, tipo: item.value }))}
                    className={\`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-300 shadow-sm \${
                      searchParams.tipo === item.value 
                        ? "bg-[#005c99] text-white border-transparent" 
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }\`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Zona</span>
              <div className="flex flex-wrap gap-3">
                {[{ label: "Todas las zonas", value: "Cualquier zona", icon: <MapPin className="w-4 h-4" /> }, ...[...new Set(properties.map(p => p.location))].map(loc => ({ label: loc, value: loc, icon: null }))].map(item => (
                  <button
                    key={item.value}
                    onClick={() => setSearchParams(p => ({ ...p, zona: item.value }))}
                    className={\`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-300 shadow-sm \${
                      searchParams.zona === item.value 
                        ? "bg-[#005c99] text-white border-transparent" 
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }\`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count & Sort */}
          {(() => {
            const filteredProperties = properties
              .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
              .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
              .filter(p => p.operation === searchParams.mode)
              .filter(p => isPriceValid(searchParams.precio, p.price));

            let displayProperties = filteredProperties;
            let isFallback = false;

            if (filteredProperties.length === 0) {
              isFallback = true;
              let similarProperties = properties
                .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
                .filter(p => p.operation === searchParams.mode);

              if (similarProperties.length === 0) {
                similarProperties = properties
                  .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
                  .filter(p => p.operation === searchParams.mode);
              }

              if (similarProperties.length === 0) {
                similarProperties = properties.filter(p => p.operation === searchParams.mode);
              }
              displayProperties = similarProperties.slice(0, 3);
            }

            const renderPropertyCard = (property: any, idx: number) => (
              <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: easeOut }}
                  className="group bg-white rounded-2xl flex flex-col h-full border border-slate-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
                >
                  {/* Image Block */}
                  <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-slate-100">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-onyx hover:text-red-500 hover:scale-110 transition-all cursor-pointer shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[26px] font-black text-[#005c99] mb-1 tracking-tight">
                      {new Intl.NumberFormat('es-ES').format(property.price)}€
                    </div>
                    <h3 className="text-lg font-bold text-onyx mb-1">{property.type || "Piso"}</h3>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mb-6">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      {property.location}
                    </p>

                    {/* Features Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-onyx">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        {property.bedrooms > 0 ? property.bedrooms : "2"}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        {property.bathrooms > 0 ? property.bathrooms : "1"}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        {property.surface} m²
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );

            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60">
                  <p className="text-sm font-bold text-slate-500">
                    <strong className="text-[#005c99]">{filteredProperties.length}</strong> propiedades disponibles
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 font-bold">Ordenar por:</span>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-onyx hover:bg-slate-50 transition-colors shadow-sm">
                      Más recientes <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {isFallback && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-amber-800 text-sm font-medium">
                    No hemos encontrado inmuebles con esos filtros exactos. Aquí tienes algunas propiedades destacadas que podrían interesarte.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                  {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                </div>
              </>
            );
          })()}

          {/* CTA Footer */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center mt-12 pt-12 border-t border-slate-200/60">
              <a href="#contacto" className="bg-[#005c99] hover:bg-[#004b7a] text-white px-8 py-4 rounded-xl font-bold text-sm transition-transform shadow-xl shadow-[#005c99]/20 flex items-center justify-center gap-2 group w-full sm:w-auto hover:scale-105 mb-4">
                {t.properties.verTodas}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-slate-500 font-bold">O explora nuestro catálogo completo</p>
            </div>
          </Reveal>
        </div>
      </section>
`;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the Properties section to the new mockup layout');
