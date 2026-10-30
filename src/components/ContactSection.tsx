import { DrawnUnderline } from "@/components/DrawnUnderline";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Loader2 } from "lucide-react";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

interface ContactSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function ContactSection({ language, t }: ContactSectionProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof contactErrors = {};
    if (!contactForm.nombre.trim()) errs.nombre = "Nombre obligatorio";
    if (!contactForm.telefono.trim()) errs.telefono = "Teléfono obligatorio";
    if (!contactForm.email.trim()) errs.email = "Email obligatorio";
    if (!contactForm.privacidad) errs.privacidad = "Debes aceptar la privacidad";

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    setContactErrors({});
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setIsSubmittedSuccess(true);
    }, 600);
  };

  const c = t?.contacto || {};
  const formLabels = c?.form || {};

  return (
    <section id="contacto" className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] scroll-mt-24 border-b-2 border-[#111111]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-[#111111]">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#2860F5] mb-4">
              <span className="w-2 h-2 bg-[#2860F5]" />
              <span>{c.badge || "CONTACTO"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight">
              {c.title1 || "¿Hablamos de"}{" "}
              <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">{c.title2 || "tu comunidad?"}</span>
            </h2>
          </div>
          
          <div className="lg:max-w-md">
            <p className="text-[17px] text-[#111111] font-bold leading-relaxed bg-[#FFFFFF] p-4 border-2 border-[#111111] rounded-2xl shadow-[2px_2px_0px_#111111]">
              {c.subtitle || "Estamos aquí para ayudarte a gestionar tu patrimonio con transparencia y profesionalidad."}
            </p>
          </div>
        </div>

        {/* Dos Bloques Diferenciados Neo-Brutalist: Izquierda Información & Despacho, Derecha Formulario Sólido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* BLOQUE IZQUIERDO: Información, Fotografía y Datos de Oficina */}
          <div className="lg:col-span-5 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#2860F5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Fotografía rectangular del despacho */}
              <div className="relative aspect-[16/10] overflow-hidden border-2 border-white rounded-xl mb-6">
                <img
                  src={gesgramaOffice}
                  alt="Oficina principal Gesgrama en Santa Coloma de Gramenet"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-headline font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="w-3 h-3 bg-[#2860F5]" />
                <span>SEDE CENTRAL SANTA COLOMA</span>
              </h3>

              <ul className="space-y-4 font-headline text-[15px] sm:text-[16px]">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white mt-0.5">
                    <MapPin className="w-4 h-4 text-white" />
                  </span>
                  <span>
                    <strong>Av. dels Banús, 49</strong><br />
                    08923 Santa Coloma de Gramenet (Barcelona)
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                    <Phone className="w-4 h-4 text-white" />
                  </span>
                  <a href="tel:934685656" className="text-white hover:text-[#2860F5] font-data-mono font-black text-[17px] transition-colors">
                    93 468 56 56
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                    <Mail className="w-4 h-4 text-white" />
                  </span>
                  <a href="mailto:info@gesgrama.com" className="text-white hover:text-[#2860F5] font-bold transition-colors">
                    info@gesgrama.com
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                    <Clock className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-slate-200">
                    Lun - Vie: 9:00 - 14:00 y 16:00 - 19:30
                  </span>
                </li>
              </ul>
            </div>

            {/* Aviso de Compromiso Colegiado */}
            <div className="mt-8 pt-6 border-t-2 border-white/20">
              <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
                ✓ Despacho oficial adherido al Col·legi d'Administradors de Finques de Barcelona-Lleida (CAFBL) y Colegiados AICAT Nº 5583.
              </p>
            </div>
          </div>

          {/* BLOQUE DERECHO: Formulario Blanco Sólido con Bordes Negros de 2px */}
          <div className="lg:col-span-7 bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] p-6 sm:p-8 md:p-10">
            {isSubmittedSuccess ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#2860F5] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-headline font-black mb-2">
                  ¡SOLICITUD RECIBIDA CON ÉXITO!
                </h3>
                <p className="text-[17px] font-bold text-slate-700 max-w-md mb-6">
                  Un asesor técnico o administrador colegiado de Gesgrama se pondrá en contacto contigo a la mayor brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  className="bg-[#111111] hover:bg-[#2860F5] text-white px-6 py-3 border-2 border-[#111111] font-headline font-black uppercase text-sm"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="formulario-contacto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="contacto-nombre-input" className="block text-[15px] sm:text-[16px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1.5">
                      {formLabels.nombre || "Nombre completo"} *
                    </label>
                    <input
                      id="contacto-nombre-input"
                      type="text"
                      value={contactForm.nombre}
                      onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                      placeholder="Tu nombre y apellidos"
                      className="w-full h-[52px] sm:h-[56px] bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] px-4 font-headline font-bold text-[16px] focus:bg-white focus:border-[#2860F5] outline-none transition-colors"
                    />
                    {contactErrors.nombre && <p className="text-red-600 text-xs font-bold mt-1">{contactErrors.nombre}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="contacto-telefono-input" className="block text-[15px] sm:text-[16px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1.5">
                      {formLabels.telefono || "Teléfono de contacto"} *
                    </label>
                    <input
                      id="contacto-telefono-input"
                      type="tel"
                      value={contactForm.telefono}
                      onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                      placeholder="600 000 000"
                      className="w-full h-[52px] sm:h-[56px] bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] px-4 font-data-mono font-bold text-[16px] focus:bg-white focus:border-[#2860F5] outline-none transition-colors"
                    />
                    {contactErrors.telefono && <p className="text-red-600 text-xs font-bold mt-1">{contactErrors.telefono}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="contacto-email-input" className="block text-[15px] sm:text-[16px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1.5">
                      {formLabels.email || "Correo electrónico"} *
                    </label>
                    <input
                      id="contacto-email-input"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      className="w-full h-[52px] sm:h-[56px] bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] px-4 font-headline font-bold text-[16px] focus:bg-white focus:border-[#2860F5] outline-none transition-colors"
                    />
                    {contactErrors.email && <p className="text-red-600 text-xs font-bold mt-1">{contactErrors.email}</p>}
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="contacto-asunto-select" className="block text-[15px] sm:text-[16px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1.5">
                      {formLabels.asunto || "Tipo de consulta"}
                    </label>
                    <select
                      id="contacto-asunto-select"
                      value={contactForm.asunto}
                      onChange={(e) => setContactForm({ ...contactForm, asunto: e.target.value })}
                      className="w-full h-[52px] sm:h-[56px] bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] px-4 font-headline font-bold text-[16px] focus:bg-white focus:border-[#2860F5] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Gestión de Comunidades">{isCa ? "Administració de Comunitats" : "Gestión de Comunidades"}</option>
                      <option value="Vender un piso">{isCa ? "Vendre un pis" : "Vender un piso"}</option>
                      <option value="Alquilar un piso">{isCa ? "Llogar un pis" : "Alquilar un piso"}</option>
                      <option value="Asesoría Jurídica">{isCa ? "Assessoria Jurídica" : "Asesoría Jurídica"}</option>
                      <option value="Obras y Mantenimiento">{isCa ? "Obres i Manteniment" : "Obras y Mantenimiento"}</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="contacto-mensaje-textarea" className="block text-[15px] sm:text-[16px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1.5">
                    {formLabels.mensaje || "Mensaje o detalles de su consulta"}
                  </label>
                  <textarea
                    id="contacto-mensaje-textarea"
                    rows={4}
                    value={contactForm.mensaje}
                    onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                    placeholder="Explícanos tu consulta o las características de tu finca..."
                    className="w-full bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] p-4 font-headline font-bold text-[16px] focus:bg-white focus:border-[#2860F5] outline-none transition-colors"
                  ></textarea>
                </div>

                {/* Checkbox Privacidad */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="contacto-privacidad-check"
                    type="checkbox"
                    checked={contactForm.privacidad}
                    onChange={(e) => setContactForm({ ...contactForm, privacidad: e.target.checked })}
                    className="w-5 h-5 mt-0.5 accent-[#2860F5] border-2 border-[#111111] rounded-none cursor-pointer"
                  />
                  <label htmlFor="contacto-privacidad-check" className="text-xs sm:text-sm text-slate-700 font-bold leading-tight cursor-pointer">
                    {formLabels.privacidad || "He leído y acepto la política de privacidad y autorizo el tratamiento de mis datos de contacto para responder a esta solicitud."}
                  </label>
                </div>
                {contactErrors.privacidad && <p className="text-red-600 text-xs font-bold">{contactErrors.privacidad}</p>}

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full h-[60px] sm:h-[64px] neo-btn-primary font-headline font-black text-[18px] px-8 cursor-pointer flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-80"
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{formLabels.enviando || "ENVIANDO CONSULTA..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{formLabels.botonEnviar || "ENVIAR SOLICITUD"}</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
