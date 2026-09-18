import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, ArrowRight, Check, Loader2, ChevronDown } from "lucide-react";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

interface ContactSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ContactSection({ language, t }: ContactSectionProps) {
  const [contactForm, setContactForm] = useState(() => {
    let initialAsunto = "Gestión de Comunidades";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryAsunto = params.get("asunto");
      if (queryAsunto) {
        initialAsunto = queryAsunto;
      }
    }
    return {
      nombre: "",
      telefono: "",
      email: "",
      asunto: initialAsunto,
      mensaje: "",
      privacidad: false
    };
  });

  useEffect(() => {
    const handleSetAsunto = (e: CustomEvent<string>) => {
      if (e.detail) {
        setContactForm(prev => ({ ...prev, asunto: e.detail }));
      }
    };
    window.addEventListener("set-contact-asunto" as any, handleSetAsunto as any);
    return () => window.removeEventListener("set-contact-asunto" as any, handleSetAsunto as any);
  }, []);

  const [contactErrors, setContactErrors] = useState<{
    nombre?: string;
    telefono?: string;
    email?: string;
    privacidad?: string;
  }>({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  return (
    <section id="contacto" className="py-5 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-onyx scroll-mt-28 md:scroll-mt-32">
      <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200/80 p-4 sm:p-7 md:p-9 mx-auto max-w-[1150px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Title & Image Overlay Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-full">
              <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                {t.contacto.badge}
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2.5 font-sans">
                {t.contacto.title1}<br />
                <span className="text-[#2563eb] italic font-serif">{t.contacto.title2}</span>
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-4 font-bold leading-snug font-sans">
                {t.contacto.subtitle}
              </p>

              {/* Storefront Image Card with Central Office Overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 aspect-[16/10] group">
                <img 
                  src={gesgramaOffice} 
                  alt="Gesgrama oficina principal en Santa Coloma" 
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Floating Office Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:left-3 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-100 max-w-[260px] z-20">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-black text-[10px] sm:text-xs text-[#0f172a] uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</div>
                      <div className="text-xs sm:text-sm text-[#0f172a] font-extrabold leading-snug mt-0.5 font-sans">
                        Av. dels Banús, 49
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-600 font-bold font-sans">
                        08923 Santa Coloma de Gramenet
                      </div>
                      <a href="tel:+34934685656" className="inline-flex items-center gap-1 text-[#2563eb] font-black text-xs sm:text-sm mt-1 font-sans">
                        <Phone className="w-3 h-3 text-[#2563eb]" /> 93 468 56 56
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form Card */}
          <div className="lg:col-span-7">
            <div id="formulario-contacto" className="bg-white border-2 border-[#757989] p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm scroll-mt-28 md:scroll-mt-32">
              <h3 className="font-black text-xl sm:text-2xl text-[#0f172a] mb-4 tracking-tight font-sans">{t.contacto.form.formTitle}</h3>
              
              <form 
                key={language} 
                onSubmit={(e) => {
                  e.preventDefault();
                  const errors: typeof contactErrors = {};
                  if (!contactForm.nombre.trim()) {
                    errors.nombre = language === "ca" ? "El nom és obligatori" : language === "en" ? "Name is required" : "El nombre es obligatorio";
                  }
                  if (!contactForm.telefono.trim()) {
                    errors.telefono = language === "ca" ? "El telèfon és obligatori" : language === "en" ? "Phone is required" : "El teléfono es obligatorio";
                  }
                  if (!contactForm.email.trim()) {
                    errors.email = language === "ca" ? "L'email és obligatori" : language === "en" ? "Email is required" : "El email es obligatorio";
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
                    errors.email = language === "ca" ? "Format d'email invàlid" : language === "en" ? "Invalid email format" : "Formato de correo no válido";
                  }
                  if (!contactForm.privacidad) {
                    errors.privacidad = language === "ca" ? "Has d'acceptar la política de privacitat" : language === "en" ? "You must accept privacy policy" : "Debes aceptar la política de privacidad";
                  }

                  setContactErrors(errors);
                  if (Object.keys(errors).length > 0) return;

                  setIsSubmittingContact(true);

                  const payload = {
                    _subject: `📋 Solicitud Web Gesgrama: ${contactForm.asunto || "Consulta General"} (${contactForm.nombre})`,
                    _template: "table",
                    _captcha: "false",
                    "Nombre y Apellidos": contactForm.nombre,
                    "Teléfono / WhatsApp": contactForm.telefono,
                    "Correo Electrónico": contactForm.email,
                    "Motivo de Contacto": contactForm.asunto,
                    "Mensaje": contactForm.mensaje || "Sin mensaje adicional",
                    "Página de Origen": typeof window !== "undefined" ? window.location.href : "https://www.gesgrama.es/",
                    "Fecha de Envío": new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
                  };

                  const web3Payload = {
                    access_key: "29166dd1-5523-42cd-b759-6875c7977d14",
                    subject: `📋 Solicitud Web Gesgrama: ${contactForm.asunto || "Consulta General"} (${contactForm.nombre})`,
                    from_name: "Web Gesgrama",
                    name: contactForm.nombre,
                    phone: contactForm.telefono,
                    email: contactForm.email,
                    asunto: contactForm.asunto,
                    mensaje: contactForm.mensaje || "Sin mensaje adicional",
                    pagina_origen: typeof window !== "undefined" ? window.location.href : "https://www.gesgrama.es/",
                    fecha_envio: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
                  };

                  const resetFormSuccess = () => {
                    setIsSubmittedSuccess(true);
                    setContactForm({
                      nombre: "",
                      telefono: "",
                      email: "",
                      asunto: "Gestión de Comunidades",
                      mensaje: "",
                      privacidad: false
                    });
                    setTimeout(() => {
                      setIsSubmittedSuccess(false);
                    }, 4000);
                  };

                  const triggerWhatsAppFallback = () => {
                    const fallbackMsg = `Hola Gesgrama, os contacto desde la web:\n- Nombre: ${contactForm.nombre}\n- Teléfono: ${contactForm.telefono}\n- Email: ${contactForm.email}\n- Motivo: ${contactForm.asunto}\n- Mensaje: ${contactForm.mensaje || "Consulta general"}`;
                    window.open(`https://wa.me/34688320490?text=${encodeURIComponent(fallbackMsg)}`, "_blank");
                  };

                  // 1er intento: Web3Forms (Alta disponibilidad Cloudflare/AWS)
                  fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify(web3Payload)
                  })
                    .then(async (res) => {
                      const data = await res.json().catch(() => ({}));
                      if (res.ok && (data.success === true || data.success === "true")) {
                        resetFormSuccess();
                      } else {
                        // 2do intento: FormSubmit si falla Web3Forms
                        fetch("https://formsubmit.co/ajax/info@gesgrama.com", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", "Accept": "application/json" },
                          body: JSON.stringify(payload)
                        })
                          .then(async (res2) => {
                            const data2 = await res2.json().catch(() => ({}));
                            if (res2.ok && (data2.success === true || data2.success === "true")) {
                              resetFormSuccess();
                            } else {
                              triggerWhatsAppFallback();
                            }
                          })
                          .catch(() => triggerWhatsAppFallback());
                      }
                    })
                    .catch(() => {
                      fetch("https://formsubmit.co/ajax/info@gesgrama.com", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify(payload)
                      })
                        .then(async (res2) => {
                          const data2 = await res2.json().catch(() => ({}));
                          if (res2.ok && (data2.success === true || data2.success === "true")) {
                            resetFormSuccess();
                          } else {
                            triggerWhatsAppFallback();
                          }
                        })
                        .catch(() => triggerWhatsAppFallback());
                    })
                    .finally(() => {
                      setIsSubmittingContact(false);
                    });
                }} 
                className="space-y-4"
              >
                {/* Row 1: Nombre & Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contacto-nombre-input" className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.nombre.toUpperCase()}</label>
                    <input 
                      id="contacto-nombre-input"
                      type="text" 
                      placeholder={t.contacto.form.nombrePlaceholder} 
                      value={contactForm.nombre}
                      onChange={e => {
                        setContactForm(f => ({ ...f, nombre: e.target.value }));
                        if (contactErrors.nombre) setContactErrors(err => ({ ...err, nombre: undefined }));
                      }}
                      className={`w-full bg-[#f8fafc] border-2 ${contactErrors.nombre ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                    />
                    <AnimatePresence>
                      {contactErrors.nombre && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-600 font-black mt-1 font-sans"
                        >
                          {contactErrors.nombre}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.telefono.toUpperCase()}</label>
                    <input 
                      type="text" 
                      placeholder={t.contacto.form.telefonoPlaceholder} 
                      value={contactForm.telefono}
                      onChange={e => {
                        setContactForm(f => ({ ...f, telefono: e.target.value }));
                        if (contactErrors.telefono) setContactErrors(err => ({ ...err, telefono: undefined }));
                      }}
                      className={`w-full bg-[#f8fafc] border-2 ${contactErrors.telefono ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                    />
                    <AnimatePresence>
                      {contactErrors.telefono && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-600 font-black mt-1 font-sans"
                        >
                          {contactErrors.telefono}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Row 2: Correo & Tipo de Consulta en 2 columnas horizontales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.email.toUpperCase()}</label>
                    <input 
                      type="email" 
                      placeholder={t.contacto.form.emailPlaceholder} 
                      value={contactForm.email}
                      onChange={e => {
                        setContactForm(f => ({ ...f, email: e.target.value }));
                        if (contactErrors.email) setContactErrors(err => ({ ...err, email: undefined }));
                      }}
                      className={`w-full bg-[#f8fafc] border-2 ${contactErrors.email ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                    />
                    <AnimatePresence>
                      {contactErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-600 font-black mt-1 font-sans"
                        >
                          {contactErrors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="contacto-asunto-select" className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.asunto.toUpperCase()}</label>
                    <div className="relative">
                      <select 
                        id="contacto-asunto-select" 
                        aria-label="Seleccionar motivo o tipo de consulta" 
                        value={contactForm.asunto}
                        onChange={e => setContactForm(f => ({ ...f, asunto: e.target.value }))}
                        className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out appearance-none pr-8 cursor-pointer truncate font-sans"
                      >
                        <option>{t.contacto.form.asuntoOpciones.comunidad}</option>
                        <option>{t.contacto.form.asuntoOpciones.venta}</option>
                        <option>{t.contacto.form.asuntoOpciones.juridico}</option>
                        <option>{t.contacto.form.asuntoOpciones.otro}</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Mensaje */}
                <div>
                  <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.mensaje.toUpperCase()}</label>
                  <textarea 
                    rows={2} 
                    placeholder={t.contacto.form.mensajePlaceholder} 
                    value={contactForm.mensaje}
                    onChange={e => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                    className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out resize-none font-sans placeholder:text-slate-400" 
                  />
                </div>

                {/* Checkbox Privacidad */}
                <div>
                  <div className="flex items-center gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      checked={contactForm.privacidad}
                      onChange={e => {
                        setContactForm(f => ({ ...f, privacidad: e.target.checked }));
                        if (contactErrors.privacidad) setContactErrors(err => ({ ...err, privacidad: undefined }));
                      }}
                      className="w-4.5 h-4.5 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer" 
                    />
                    <label htmlFor="privacy" className="text-sm sm:text-base text-[#0f172a] font-bold cursor-pointer font-sans select-none">{t.contacto.form.privacidad}</label>
                  </div>
                  <AnimatePresence>
                    {contactErrors.privacidad && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-red-600 font-black mt-1 font-sans"
                      >
                        {contactErrors.privacidad}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button with Loading & Success micro-animation */}
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className={`w-full text-white py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer font-sans disabled:opacity-80 ${
                    isSubmittedSuccess ? "bg-[#0b214a] hover:bg-[#0f172a]" : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                  }`}
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{language === "ca" ? "Enviant..." : language === "en" ? "Sending..." : "Enviando..."}</span>
                    </>
                  ) : isSubmittedSuccess ? (
                    <motion.div 
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: [0.7, 1.2, 1], opacity: 1 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5 stroke-[3] text-white" />
                      <span>{language === "ca" ? "Missatge enviat!" : language === "en" ? "Message sent!" : "¡Mensaje enviado!"}</span>
                    </motion.div>
                  ) : (
                    <>
                      <span>{t.contacto.form.botonEnviar}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
