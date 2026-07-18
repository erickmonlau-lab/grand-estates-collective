const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;

const newContact = `<section id="contacto" className="py-28 md:py-40 px-6 md:px-12 relative overflow-hidden bg-[#F5F7FA]">
          {/* Radial gradient background - very subtle */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 lg:gap-24 items-center relative z-10">
            
            {/* LADO IZQUIERDO: Contenido editorial limpio */}
            <div className="pr-0 lg:pr-8">
              <Reveal>
                <p className="text-[11px] font-bold text-[#0055c3] tracking-[0.2em] uppercase mb-6">
                  {language === 'es' ? 'Hablamos' : language === 'ca' ? 'Parlem' : 'Let\\'s Talk'}
                </p>
                <h2 className="text-5xl lg:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight mb-8">
                  {language === 'es' ? <>¿Hablamos sobre <br /><span className="text-[#0055c3]">tu comunidad?</span></> : 
                   language === 'ca' ? <>Parlem sobre <br /><span className="text-[#0055c3]">la teva comunitat?</span></> : 
                   <>Let's talk about <br /><span className="text-[#0055c3]">your community?</span></>}
                </h2>
                <p className="text-[17px] text-[#444444] leading-[1.6] mb-14 max-w-[480px]">
                  {language === 'es' ? "Más de 30 años gestionando comunidades, patrimonio inmobiliario y operaciones de compraventa en Barcelona. Nuestro equipo estará encantado de ayudarte." :
                   language === 'ca' ? "Més de 30 anys gestionant comunitats, patrimoni immobiliari i operacions de compravenda a Barcelona. El nostre equip estarà encantat d'ajudar-te." :
                   "More than 30 years managing communities, real estate assets, and sales operations in Barcelona. Our team will be happy to help you."}
                </p>

                <div className="flex flex-col gap-6 mb-16">
                  <div className="flex items-center gap-5 text-[#111111] font-medium text-[15px]">
                    <Phone className="w-[18px] h-[18px] text-[#0055c3] stroke-[1.5]" />
                    {language === 'es' ? "Atención personalizada" : language === 'ca' ? "Atenció personalitzada" : "Personalized attention"}
                  </div>
                  <div className="flex items-center gap-5 text-[#111111] font-medium text-[15px]">
                    <Mail className="w-[18px] h-[18px] text-[#0055c3] stroke-[1.5]" />
                    {language === 'es' ? "Respuesta en menos de 24 horas" : language === 'ca' ? "Resposta en menys de 24 hores" : "Response in under 24 hours"}
                  </div>
                  <div className="flex items-center gap-5 text-[#111111] font-medium text-[15px]">
                    <Check className="w-[18px] h-[18px] text-[#0055c3] stroke-[1.5]" />
                    {language === 'es' ? "Sin compromiso" : language === 'ca' ? "Sense compromís" : "No obligation"}
                  </div>
                </div>

                <a href="#formulario" className="inline-flex items-center justify-center px-9 py-4 bg-white border border-[#E8EDF3] text-[#111111] font-bold text-[12px] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#111111] hover:bg-[#fafafa]">
                  {language === 'es' ? "Solicitar información" : language === 'ca' ? "Sol·licitar informació" : "Request information"}
                </a>
              </Reveal>
            </div>

            {/* LADO DERECHO: Formulario premium */}
            <div className="relative w-full" id="formulario">
              {/* Detalle premium: Silueta Barcelona difuminada */}
              <div className="absolute inset-0 -right-20 -bottom-20 -top-20 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply blur-[3px]">
                <img src="https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Barcelona background silhouette" className="w-full h-full object-cover rounded-[40px] grayscale" />
              </div>

              <Reveal delay={0.2}>
                <div className="relative z-10 bg-white p-10 md:p-14 lg:p-16 rounded-[28px] shadow-[0_10px_60px_-15px_rgba(0,0,0,0.03)] border border-[#E8EDF3]">
                  <div className="mb-12">
                    <h3 className="text-3xl font-serif text-[#111111] mb-3 tracking-tight">
                      {language === 'es' ? 'Solicita información' : language === 'ca' ? 'Sol·licita informació' : 'Request information'}
                    </h3>
                    <p className="text-[15px] text-[#666666]">
                      {language === 'es' ? 'Te responderemos personalmente.' : language === 'ca' ? 'Et respondrem personalment.' : 'We will respond personally.'}
                    </p>
                  </div>

                  <form className="space-y-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div>
                        <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-[0.1em] mb-3">{t.contact.nameLabel}</label>
                        <input type="text" className="w-full bg-white border border-[#E8EDF3] rounded-[4px] px-5 py-4 text-[15px] text-[#111111] focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-all placeholder:text-[#A0AABF] hover:border-[#C0C9D6]" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-[0.1em] mb-3">{t.contact.phoneLabel}</label>
                        <input type="text" className="w-full bg-white border border-[#E8EDF3] rounded-[4px] px-5 py-4 text-[15px] text-[#111111] focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-all placeholder:text-[#A0AABF] hover:border-[#C0C9D6]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-[0.1em] mb-3">{t.contact.emailLabel}</label>
                      <input type="email" className="w-full bg-white border border-[#E8EDF3] rounded-[4px] px-5 py-4 text-[15px] text-[#111111] focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-all placeholder:text-[#A0AABF] hover:border-[#C0C9D6]" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-[0.1em] mb-3">{t.contact.serviceLabel}</label>
                      <div className="relative">
                        <select className="w-full bg-white border border-[#E8EDF3] rounded-[4px] pl-5 pr-12 py-4 text-[15px] text-[#111111] focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-all appearance-none cursor-pointer hover:border-[#C0C9D6]">
                          {t.contact.serviceOpts.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AABF] pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-[0.1em] mb-3">{t.contact.messageLabel}</label>
                      <textarea rows={3} className="w-full bg-white border border-[#E8EDF3] rounded-[4px] px-5 py-4 text-[15px] text-[#111111] focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-all placeholder:text-[#A0AABF] hover:border-[#C0C9D6] resize-none"></textarea>
                    </div>

                    <button type="button" className="w-full bg-[#0055c3] text-white py-5 rounded-[4px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#0042a5] transition-colors mt-6">
                      {t.contact.submit}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>`;

current = current.substring(0, startContact) + newContact + current.substring(endContact);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Premium Contact Section Applied!');
