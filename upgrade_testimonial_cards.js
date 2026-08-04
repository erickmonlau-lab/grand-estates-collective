import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace the testimonials cards mapping with the upgraded visually rich cards
const oldTestimonialsMap = `          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Llevan administrando nuestra comunidad en Santa Coloma desde hace años. La transparencia en las cuentas y la rapidez de respuesta son sencillamente excelentes.",
                author: "Comunidad Av. dels Sants",
                location: "Sta. Coloma de Gramenet"
              },
              {
                quote: "Alquilamos nuestro piso con el seguro de protección de pagos contratado a través de Gesgrama. Cobro puntual garantizado y máxima tranquilidad.",
                author: "Manuel R. G.",
                location: "Sta. Coloma de Gramenet"
              },
              {
                quote: "Excelente asesoría jurídica y venta rápida de nuestra propiedad en Singuerlín. Nos acompañaron en cada trámite con total claridad.",
                author: "Carmen & Francesc",
                location: "Singuerlín, Sta. Coloma"
              }
            ].map((item, i) => (
              <Reveal key={item.author} delay={i * 0.1}>
                <div className="bg-[#757989] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-white/20 border-t-4 border-t-[#38bdf8] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden">
                  <div>
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg leading-relaxed italic mb-6 font-semibold">"{item.quote}"</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex flex-col items-start gap-1">
                    <strong className="font-extrabold text-lg text-white">{item.author}</strong>
                    <span className="text-xs text-blue-100 font-extrabold uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>`;

const newTestimonialsMap = `          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Llevan administrando nuestra comunidad en Santa Coloma desde hace años. La transparencia en las cuentas y la rapidez de respuesta son sencillamente excelentes.",
                author: "Comunidad Av. dels Sants",
                location: "Sta. Coloma de Gramenet",
                initial: "C",
                avatarBg: "bg-[#0b214a]",
                topBorderColor: "border-t-[#005c99]", // Azul marino accent
                verifiedTag: "Cliente Verificado"
              },
              {
                quote: "Alquilamos nuestro piso con el seguro de protección de pagos contratado a través de Gesgrama. Cobro puntual garantizado y máxima tranquilidad.",
                author: "Manuel R. G.",
                location: "Sta. Coloma de Gramenet",
                initial: "M",
                avatarBg: "bg-[#2563eb]",
                topBorderColor: "border-t-[#0f172a]", // Gris carbón accent
                verifiedTag: "Reseña de Google ★ 5.0"
              },
              {
                quote: "Excelente asesoría jurídica y venta rápida de nuestra propiedad en Singuerlín. Nos acompañaron en cada trámite con total claridad.",
                author: "Carmen & Francesc",
                location: "Singuerlín, Sta. Coloma",
                initial: "C",
                avatarBg: "bg-[#0284c7]",
                topBorderColor: "border-t-[#005c99]", // Azul marino accent
                verifiedTag: "Cliente Verificado"
              }
            ].map((item, i) => (
              <Reveal key={item.author} delay={i * 0.1}>
                <div className={\`bg-[#757989] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-white/20 border-t-4 \${item.topBorderColor} shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden group\`}>
                  {/* Subtle Large Watermark Quotes Icon in Top-Right */}
                  <span className="absolute top-3 right-5 text-8xl font-black text-white/10 select-none pointer-events-none leading-none font-serif group-hover:text-white/15 transition-colors">
                    “
                  </span>

                  <div className="relative z-10">
                    {/* Top Row: Stars + Verified Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex gap-1.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Small Verified / Google Review Badge */}
                      <span className="inline-flex items-center gap-1 bg-white/15 border border-white/20 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                        <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                        <span>{item.verifiedTag}</span>
                      </span>
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-white text-base md:text-lg leading-relaxed italic mb-8 font-medium relative z-10">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom Row: Avatar Circle with Initial + Author Details */}
                  <div className="pt-5 border-t border-white/20 flex items-center gap-4 relative z-10">
                    <div className={\`w-11 h-11 rounded-full \${item.avatarBg} text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md border border-white/20\`}>
                      {item.initial}
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <strong className="font-extrabold text-base sm:text-lg text-white">{item.author}</strong>
                      <span className="text-xs text-blue-100 font-bold uppercase tracking-wider mt-0.5">{item.location}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>`;

c = c.replace(oldTestimonialsMap, newTestimonialsMap);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Upgraded testimonials cards with watermark quotes, avatars, verified badges and alternating top borders!');
