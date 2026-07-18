const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startProp = current.indexOf('<section id="propiedades"');
const endProp = current.indexOf('</section>', startProp) + 10;

const newProp = `<section id="propiedades" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F7F9] text-onyx">
  <div className="max-w-[1320px] mx-auto relative z-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
      <div>
        <p className="text-[11px] font-bold text-[#0055c3] tracking-[0.2em] uppercase mb-4">
          INMOBILIARIA
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight mb-5 max-w-[700px]">
          Encuentra la <span className="text-[#0055c3]">propiedad</span> perfecta para ti.
        </h2>
        <p className="text-[16px] text-[#666666] leading-relaxed max-w-[500px]">
          Explora una cuidada seleccin de viviendas, locales y activos inmobiliarios en las mejores zonas de Barcelona.
        </p>
      </div>
      <a href="#contacto" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white border border-[#E9EDF2] text-[#111111] font-bold text-[12px] uppercase tracking-wider rounded-full hover:border-[#0055c3] hover:text-[#0055c3] transition-all duration-300 mt-8 md:mt-0 group shadow-sm hover:-translate-y-1 hover:shadow-md">
        Ver todas las propiedades <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>

    {/* Filtros premium tipo cǭpsula */}
    <div className="bg-white rounded-full py-2 px-3 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#E9EDF2] flex flex-col lg:flex-row lg:items-center w-full max-w-fit mx-auto relative z-10">
      <div className="flex overflow-x-auto hide-scrollbar gap-1 items-center pb-2 lg:pb-0 px-2 lg:px-0">
        <button 
          onClick={() => setSearchParams({ ...searchParams, tipo: 'Cualquier tipo' })} 
          className={\`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap \${searchParams.tipo === 'Cualquier tipo' || !searchParams.tipo ? 'bg-[#0055c3] text-white shadow-md' : 'text-[#666666] hover:bg-[#F6F7F9] hover:text-[#111111]'}\`}
        >
          Todos
        </button>
        {tipos.map(tipo => (
          <button 
            key={tipo} 
            onClick={() => setSearchParams({ ...searchParams, tipo })} 
            className={\`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap \${searchParams.tipo === tipo ? 'bg-[#0055c3] text-white shadow-md' : 'text-[#666666] hover:bg-[#F6F7F9] hover:text-[#111111]'}\`}
          >
            {tipo}
          </button>
        ))}
      </div>
      
      <div className="w-full h-px bg-[#E9EDF2] lg:hidden my-1"></div>
      <div className="w-px h-8 bg-[#E9EDF2] hidden lg:block mx-3"></div>
      
      <div className="flex overflow-x-auto hide-scrollbar gap-1 items-center pt-2 lg:pt-0 px-2 lg:px-0">
        <button 
          onClick={() => setSearchParams({ ...searchParams, zona: 'Cualquier zona' })} 
          className={\`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap \${searchParams.zona === 'Cualquier zona' || !searchParams.zona ? 'bg-[#111111] text-white shadow-md' : 'text-[#666666] hover:bg-[#F6F7F9] hover:text-[#111111]'}\`}
        >
          Todas las zonas
        </button>
        {zonas.map(zona => (
          <button 
            key={zona} 
            onClick={() => setSearchParams({ ...searchParams, zona })} 
            className={\`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap \${searchParams.zona === zona ? 'bg-[#111111] text-white shadow-md' : 'text-[#666666] hover:bg-[#F6F7F9] hover:text-[#111111]'}\`}
          >
            {zona}
          </button>
        ))}
      </div>
    </div>
    
    <p className="text-[13px] text-[#888888] font-medium text-center mb-16 relative z-10 tracking-wide">
      {filteredProperties.length} propiedades disponibles
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
      {filteredProperties.map((p, i) => {
        const isLarge = i % 4 === 0 || i % 4 === 3;
        const colSpanClass = isLarge ? 'lg:col-span-2 col-span-1' : 'col-span-1';
        
        return (
          <Reveal key={p.id} delay={i * 0.1} className={colSpanClass}>
            <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] group transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col h-full cursor-pointer relative">
              
              {/* Corazn AirBnb style */}
              <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform duration-250 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] group/heart">
                <svg className="w-5 h-5 text-[#111111] group-hover/heart:text-red-500 transition-colors duration-250" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>

              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F6F7F9]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              
              <div className="p-8 flex flex-col flex-1 bg-white">
                <div className="text-[28px] font-bold text-[#0055c3] tracking-tight mb-2 leading-none">{p.price}</div>
                <h3 className="font-serif text-[22px] text-[#111111] leading-[1.3] mb-6 line-clamp-2">
                  {p.title}
                </h3>
                
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 text-[#666666] text-[13px] font-medium border-t border-[#E9EDF2] pt-6 relative overflow-hidden bg-white">
                  <div className="flex items-center gap-2"><MapPin className="w-[15px] h-[15px] text-[#A0AABF] stroke-[1.5]" /> {p.location}</div>
                  <div className="flex items-center gap-2"><Building2 className="w-[15px] h-[15px] text-[#A0AABF] stroke-[1.5]" /> {p.sqft}</div>
                  <div className="flex items-center gap-2"><Home className="w-[15px] h-[15px] text-[#A0AABF] stroke-[1.5]" /> {p.beds} dorm.</div>
                  <div className="flex items-center gap-2"><Check className="w-[15px] h-[15px] text-[#A0AABF] stroke-[1.5]" /> {p.baths} baos</div>
                  
                  {/* Botn flotante al hover */}
                  <div className="absolute right-0 top-5 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-white pl-2">
                    <span className="inline-flex items-center gap-1.5 text-[#0055c3] font-bold text-[13px] bg-[#F6F7F9] px-4 py-2 rounded-full border border-[#E9EDF2]">
                      Ver propiedad <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  </div>
</section>`;

current = current.substring(0, startProp) + newProp + current.substring(endProp);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Premium Properties Grid applied!');
