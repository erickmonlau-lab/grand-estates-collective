const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startBlog = current.indexOf('<section id="blog"');
const endBlog = current.indexOf('</section>', startBlog) + 10;

const newBlog = `<section id="blog" className="py-36 md:py-40 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAFBFC 0%, #F4F6F8 100%)' }}>
          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Encabezado Editorial */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 relative">
              
              {/* Iluminación radial sutil (4-6% opacidad) */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#0055c3] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10">
                <Reveal>
                  <p className="text-[10px] font-bold text-[#0055c3] tracking-[0.2em] uppercase mb-6 bg-[#0055c3]/5 inline-block px-3 py-1.5 rounded-full border border-[#0055c3]/10">
                    Blog Inmobiliario
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.15] tracking-tight mb-6 max-w-[800px]">
                    Consejos y actualidad <br />
                    <span className="text-[#0055c3]">del sector inmobiliario.</span>
                  </h2>
                  <p className="text-[16px] text-[#666666] leading-relaxed max-w-[620px]">
                    Descubre artículos escritos por nuestros expertos sobre compra, venta, alquiler, administración de fincas e inversión inmobiliaria.
                  </p>
                </Reveal>
              </div>
              
              <Reveal delay={0.2}>
                <a href="#" className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[#E7EAF0] text-[#111111] font-bold text-[12px] uppercase tracking-wider rounded-full hover:border-[#0055c3] hover:text-[#0055c3] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0055c3]/10 transition-all duration-300 mt-10 lg:mt-0 relative z-10 group">
                  Ver todos los artículos <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>
              </Reveal>
            </div>
  
            {/* Tarjetas Editoriales */}
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-8 pb-12 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {[
                {
                  date: "marzo 9, 2025", category: "Inmobiliaria",
                  title: "¿Qué es un asesor inmobiliario y por qué podrías necesitarlo?",
                  desc: "El mercado inmobiliario puede ser complejo y desafiante, ya sea para comprar, vender o alquilar una vivienda...",
                  img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  date: "febrero 20, 2025", category: "Inmobiliaria",
                  title: "¿Qué es un contrato de exclusividad inmobiliaria?",
                  desc: "El contrato de exclusividad inmobiliaria es un acuerdo entre un propietario y una agencia inmobiliaria que garantiza...",
                  img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  date: "febrero 6, 2025", category: "Inmobiliaria",
                  title: "¿Qué es un perito judicial inmobiliario?",
                  desc: "Un perito judicial inmobiliario es un profesional especializado en la valoración y análisis técnico de bienes...",
                  img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  date: "enero 23, 2025", category: "Inmobiliaria",
                  title: "Descubre todo sobre una vivienda de obra nueva",
                  desc: "Una obra nueva es un tema crucial para aquellos interesados en el mercado inmobiliario, ya sea para residir o...",
                  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                }
              ].map((post, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#E7EAF0] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#0055c3]/20 transition-all duration-[350ms] group flex flex-col h-full min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-center cursor-pointer">
                    
                    <div className="relative h-[220px] md:h-[240px] overflow-hidden rounded-t-[28px] bg-slate-100">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1 bg-white">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-[#666666] uppercase tracking-[0.15em] mb-5">
                        <span>{post.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0055c3]"></span>
                        <span className="text-[#0055c3]">{post.category}</span>
                      </div>
                      
                      <h3 className="font-bold text-[#111111] text-xl leading-[1.3] mb-4 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-[14px] text-[#666666] leading-[1.6] line-clamp-3 mb-8 flex-1">
                        {post.desc}
                      </p>
                      
                      <div className="mt-auto pt-2 border-t border-[#E7EAF0]/50">
                        <a href="#" className="inline-flex items-center gap-2 text-[#0055c3] font-bold text-[13px] uppercase tracking-wider group-hover:gap-3 transition-all mt-4">
                          Leer artículo <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>`;

current = current.substring(0, startBlog) + newBlog + current.substring(endBlog);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Blog section redesigned!');
