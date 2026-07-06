const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

if (!code.includes('import { properties } from "../data/properties";')) {
    code = code.replace(
        'import HeroCarousel from "../hero-carousel";',
        'import HeroCarousel from "../hero-carousel";\nimport { properties } from "../data/properties";\nimport { Link } from "@tanstack/react-router";'
    );
}

const propGridStart = '          {/* Grid de propiedades */}';
let i1 = code.indexOf(propGridStart);
let i2 = code.indexOf('          {/* Botón Ver Todas */}');

if (i1 !== -1 && i2 !== -1) {
    const dynamicGrid = \          {/* Grid de propiedades dinámico */}
          <div className=\"\grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20\"\>
            {properties.slice(0, 3).map((property, idx) => (
              <Link to={\/inmobiliaria/\\} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: \"\-50px\"\ }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: easeOut }}
                  className=\"\group relative bg-white border border-onyx/[0.05] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full hover:-translate-y-1\"\
                >
                  <div className=\"\elative h-[280px] overflow-hidden\"\>
                    <img src={property.image} alt={property.title} className=\"\w-full h-full object-cover transition-transform duration-700 group-hover:scale-105\"\ />
                    <div className=\"\bsolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm text-onyx\"\>
                      {property.status === 'venta' ? 'En Venta' : 'Alquiler'}
                    </div>
                  </div>
                  <div className=\"\p-6 md:p-8 flex flex-col flex-1\"\>
                    <div className=\"\lex justify-between items-start mb-4\"\>
                      <div>
                        <h3 className=\"\	ext-xl font-bold text-onyx mb-1 group-hover:text-primary-blue transition-colors\"\>{property.title}</h3>
                        <p className=\"\	ext-sm text-onyx/60\"\>{property.location}</p>
                      </div>
                      <div className=\"\	ext-xl font-light text-onyx bg-onyx/5 px-3 py-1 rounded-full\"\>{new Intl.NumberFormat('es-ES').format(property.price)} €</div>
                    </div>
                    <div className=\"\lex items-center gap-4 text-xs font-semibold text-onyx/50 uppercase tracking-widest mt-auto pt-6 border-t border-onyx/[0.05]\"\>
                      <span>{property.features.beds} hab.</span>
                      <span>{property.features.baths} baños</span>
                      <span>{property.features.area} m²</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

\;
    let part1 = code.substring(0, i1);
    let part2 = code.substring(i2);
    fs.writeFileSync('src/routes/index.tsx', part1 + dynamicGrid.replace(/\/g, '') + part2);
    console.log('Dynamic properties injected!');
} else {
    console.log('Could not find properties grid', i1, i2);
}

