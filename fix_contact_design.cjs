const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;

const newContact = `<section id="contacto" className="py-28 md:py-36 px-6 md:px-12 bg-[#f4f7f9] relative overflow-hidden text-slate-800">
        {/* Subtle background decoration */}
        <div className="absolute -left-[10%] bottom-0 opacity-[0.02] text-[#0055c3] pointer-events-none">
          <Home className="w-[800px] h-[800px]" />
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 items-center">
          
          {/* Left Column */}
          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#0055c3] font-bold mb-4">{t.contact.tag}</p>
              <h2 key={language} className="text-5xl md:text-6xl font-serif text-[#0042a5] leading-[1.1] mb-6">
                {t.contact.title1} <br/> <span className="font-bold">{t.contact.titleAccent}</span>
              </h2>
              <p className="text-slate-500 text-[15px] mb-10 max-w-[400px]">
                {language === 'es' 
                  ? "Estamos aquí para ayudarte. Elige tu canal preferido o escríbenos y te responderemos lo antes posible."
                  : language === 'ca'
                  ? "Som aquí per ajudar-te. Tria el teu canal preferit o escriu-nos i et respondrem el més aviat possible."
                  : "We are here to help you. Choose your preferred channel or write to us and we will respond as soon as possible."}
              </p>

              <div className="space-y-4 mb-10">
                {/* Teléfono */}
                {/* TODO: sustituir por el teléfono real del cliente */}
                <a href="tel:+34934685656" className="flex items-center p-5 bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0055c3] flex items-center justify-center shrink-0 mr-5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.phone}</div>
                    <div className="font-bold text-lg text-slate-800 group-hover:text-[#0055c3] transition-colors">934 685 656</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0055c3] transition-colors" />
                </a>

                {/* WhatsApp */}
                {/* TODO: sustituir por el WhatsApp real del cliente */}
                <a href="https://wa.me/34600000000" className="flex items-center p-5 bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0055c3] flex items-center justify-center shrink-0 mr-5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.whatsapp}</div>
                    <div className="font-bold text-lg text-slate-800 group-hover:text-[#0055c3] transition-colors">+34 600 000 000</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0055c3] transition-colors" />
                </a>

                {/* Email */}
                {/* TODO: sustituir por el email real del cliente */}
                <a href="mailto:info@gesgrama.com" className="flex items-center p-5 bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0055c3] flex items-center justify-center shrink-0 mr-5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.email}</div>
                    <div className="font-bold text-lg text-slate-800 group-hover:text-[#0055c3] transition-colors">info@gesgrama.com</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0055c3] transition-colors" />
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-[13px]">
                <div className="w-6 h-6 rounded-full bg-slate-200/50 flex items-center justify-center shrink-0">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                </div>
                {language === 'es' ? "Horario de atención: Lunes a Viernes de 9:00 a 18:00" :
                 language === 'ca' ? "Horari d'atenció: Dilluns a Divendres de 9:00 a 18:00" :
                 "Business hours: Monday to Friday from 9:00 to 18:00"}
              </div>
            </Reveal>
          </div>

          {/* Right Column (Form) */}
          <div>
            <Reveal delay={0.2}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 bg-blue-50 text-[#0055c3] rounded-2xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-slate-800 mb-1 leading-tight">
                      {language === 'es' ? <>Solicite información <span className="text-[#0055c3]">sin compromiso</span></> :
                       language === 'ca' ? <>Sol·liciti informació <span className="text-[#0055c3]">sense compromís</span></> :
                       <>Request information <span className="text-[#0055c3]">without obligation</span></>}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      {language === 'es' ? "Cuéntanos qué necesitas y nuestro equipo se pondrá en contacto contigo." :
                       language === 'ca' ? "Explica'ns què necessites i el nostre equip es posarà en contacte amb tu." :
                       "Tell us what you need and our team will get in touch with you."}
                    </p>
                  </div>
                </div>

                <form key={language} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">{t.contact.nameLabel}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder={t.contact.namePlaceholder} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[13px] text-slate-800 focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-colors placeholder:text-slate-400" />
                      </div>
                    </div>
                    {/* Teléfono */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">{t.contact.phoneLabel}</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder={language === 'es' ? "Ej: 600 000 000" : "+34"} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[13px] text-slate-800 focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-colors placeholder:text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">{t.contact.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" placeholder={language === 'es' ? "tu-correo@ejemplo.com" : "email@example.com"} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[13px] text-slate-800 focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-colors placeholder:text-slate-400" />
                    </div>
                  </div>

                  {/* Servicio */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">{t.contact.serviceLabel}</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-[13px] text-slate-800 focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-colors appearance-none cursor-pointer">
                        {t.contact.serviceOpts.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">{t.contact.messageLabel}</label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea rows={3} placeholder={t.contact.messagePlaceholder} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[13px] text-slate-800 focus:border-[#0055c3] focus:ring-1 focus:ring-[#0055c3] outline-none transition-colors placeholder:text-slate-400 resize-none"></textarea>
                    </div>
                  </div>

                  {/* Button */}
                  <button type="button" className="w-full bg-[#0055c3] text-white py-4 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#0047a5] hover:shadow-lg hover:shadow-[#0055c3]/30 flex items-center justify-center gap-2 mt-2">
                    <Send className="w-4 h-4" />
                    {t.contact.submit}
                  </button>

                  {/* Footer lock */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-[11px]">
                    <Lock className="w-3 h-3" />
                    {language === 'es' ? "Tus datos están protegidos. No compartimos tu información." :
                     language === 'ca' ? "Les teves dades estan protegides. No compartim la teva informació." :
                     "Your data is protected. We do not share your information."}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>`;

current = current.substring(0, startContact) + newContact + current.substring(endContact);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Form updated!');
