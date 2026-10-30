import { DrawnUnderline } from "@/components/DrawnUnderline";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
    if (!contactForm.nombre.trim()) errs.nombre = isCa ? "Nom obligatori" : "Nombre obligatorio";
    if (!contactForm.telefono.trim()) errs.telefono = isCa ? "Telèfon obligatori" : "Teléfono obligatorio";
    if (!contactForm.email.trim()) errs.email = isCa ? "Email obligatori" : "Email obligatorio";
    if (!contactForm.privacidad) errs.privacidad = isCa ? "Has d'acceptar la privacitat" : "Debes aceptar la privacidad";

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
    <section id="contacto" className="py-12 sm:py-16 bg-[#FAF9FC] text-[#111111] scroll-mt-24 border-b-2 border-[#111111]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 pb-6 border-b-2 border-[#111111]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[12px] sm:text-[13px] font-headline font-black tracking-widest uppercase px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#2860F5] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2860F5]" />
              <span>{c.badge || "CONTACTO"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-headline font-black text-[#111111] tracking-tight leading-tight">
              {c.title1 || "¿Hablamos de"}{" "}
              <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                {c.title2 || "tu comunidad?"}
                <DrawnUnderline color="#2860F5" />
              </span>
            </h2>
          </div>
          
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-[#111111] font-bold leading-relaxed bg-[#FFFFFF] p-3.5 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]">
              {c.subtitle || "Estamos aquí para ayudarte a gestionar tu patrimonio con transparencia y profesionalidad."}
            </p>
          </div>
        </div>

        {/* Dos Bloques Diferenciados Neo-Brutalist: Izquierda Información & Despacho, Derecha Formulario Sólido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
          
          {/* BLOQUE IZQUIERDO: Información, Fotografía y Datos de Oficina */}
          <div className="lg:col-span-5 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#2860F5] p-5 sm:p-6 md:p-7 flex flex-col justify-between">
            <div>
              {/* Fotografía rectangular del despacho con bordes redondeados (altura 250-265px) */}
              <div className="relative h-[220px] sm:h-[250px] md:h-[260px] overflow-hidden border-2 border-white rounded-xl mb-5 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
                <img
                  src={gesgramaOffice}
                  alt="Oficina principal Gesgrama en Santa Coloma de Gramenet"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-headline font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2860F5]" />
                <span>SEDE CENTRAL SANTA COLOMA</span>
              </h3>

              <ul className="space-y-3 font-headline text-[14px] sm:text-[15px]">
                <li className="flex items-start gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white mt-0.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>
                    <strong>Av. dels Banús, 49</strong><br />
                    08923 Santa Coloma de Gramenet (Barcelona)
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </span>
                  <a href="tel:934685656" className="text-white hover:text-[#2860F5] font-data-mono font-black text-[16px] transition-colors">
                    934 68 56 56
                  </a>
                </li>

                <li className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </span>
                  <a href="mailto:info@gesgrama.com" className="text-white hover:text-[#2860F5] font-bold transition-colors">
                    info@gesgrama.com
                  </a>
                </li>

                <li className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-[#E3E0E8]">
                    Lun - Vie: 9:30 - 13:30 y 16:30 - 19:30
                  </span>
                </li>
              </ul>
            </div>

            {/* Aviso de Compromiso Colegiado */}
            <div className="mt-6 pt-4 border-t-2 border-white/20">
              <p className="text-xs text-[#E3E0E8] font-bold leading-relaxed">
                ✓ Despacho oficial adherido al Col·legi d'Administradors de Finques de Barcelona-Lleida (CAFBL) y Colegiados AICAT Nº 5583.
              </p>
            </div>
          </div>

          {/* BLOQUE DERECHO: Formulario Blanco Sólido Compacto con Bordes Negros de 2px */}
          <div className="lg:col-span-7 bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] p-5 sm:p-6 md:p-7 flex flex-col justify-between">
            {isSubmittedSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-headline font-black mb-2">
                  ¡SOLICITUD RECIBIDA CON ÉXITO!
                </h3>
                <p className="text-[15px] font-bold text-slate-700 max-w-md mb-6">
                  Un asesor técnico o administrador colegiado de Gesgrama se pondrá en contacto contigo a la mayor brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  className="bg-[#111111] hover:bg-[#2860F5] text-white px-7 py-3 border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black uppercase text-xs sm:text-sm cursor-pointer transition-all"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-between h-full" id="formulario-contacto">
                {/* 1. Cabecera del formulario (compactada) */}
                <div className="border-b border-[#E3E0E8] pb-3">
                  <h3 className="text-xl sm:text-[24px] font-headline font-black text-[#111111] leading-tight mb-1">
                    {isCa ? "Explica'ns què necessites" : isEn ? "Tell us what you need" : "Cuéntanos qué necesitas"}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-slate-600 font-bold leading-normal">
                    {isCa
                      ? "Estem aquí per ajudar-te. Envia'ns la teva consulta i ens posarem en contacte amb tu."
                      : isEn
                      ? "We are here to help. Send us your inquiry and our team will get in touch."
                      : "Estamos aquí para ayudarte. Envíanos tu consulta y nos pondremos en contacto contigo."}
                  </p>
                </div>

                {/* 2. Campos de contacto */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="contacto-nombre-input" className="block text-[13px] sm:text-[14px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1">
                        {formLabels.nombre || "Nombre completo"} *
                      </label>
                      <input
                        id="contacto-nombre-input"
                        type="text"
                        value={contactForm.nombre}
                        onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                        placeholder="Tu nombre y apellidos"
                        className="w-full h-[48px] sm:h-[50px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-3.5 font-headline font-bold text-[15px] sm:text-[16px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400"
                      />
                      {contactErrors.nombre && <p className="text-red-600 text-[11px] font-bold mt-0.5">{contactErrors.nombre}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="contacto-telefono-input" className="block text-[13px] sm:text-[14px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1">
                        {formLabels.telefono || "Teléfono de contacto"} *
                      </label>
                      <input
                        id="contacto-telefono-input"
                        type="tel"
                        value={contactForm.telefono}
                        onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                        placeholder="600 000 000"
                        className="w-full h-[48px] sm:h-[50px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-3.5 font-data-mono font-bold text-[15px] sm:text-[16px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400"
                      />
                      {contactErrors.telefono && <p className="text-red-600 text-[11px] font-bold mt-0.5">{contactErrors.telefono}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Email */}
                    <div>
                      <label htmlFor="contacto-email-input" className="block text-[13px] sm:text-[14px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1">
                        {formLabels.email || "Correo electrónico"} *
                      </label>
                      <input
                        id="contacto-email-input"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="ejemplo@correo.com"
                        className="w-full h-[48px] sm:h-[50px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-3.5 font-headline font-bold text-[15px] sm:text-[16px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400"
                      />
                      {contactErrors.email && <p className="text-red-600 text-[11px] font-bold mt-0.5">{contactErrors.email}</p>}
                    </div>

                    {/* Asunto */}
                    <div>
                      <label htmlFor="contacto-asunto-select" className="block text-[13px] sm:text-[14px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1">
                        {formLabels.asunto || "Tipo de consulta"}
                      </label>
                      <select
                        id="contacto-asunto-select"
                        value={contactForm.asunto}
                        onChange={(e) => setContactForm({ ...contactForm, asunto: e.target.value })}
                        className="w-full h-[48px] sm:h-[50px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-3.5 font-headline font-bold text-[15px] sm:text-[16px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all cursor-pointer"
                      >
                        <option value="Gestión de Comunidades">{isCa ? "Administració de Comunitats" : "Gestión de Comunidades"}</option>
                        <option value="Vender un piso">{isCa ? "Vendre un pis" : "Vender un piso"}</option>
                        <option value="Alquilar un piso">{isCa ? "Llogar un pis" : "Alquilar un piso"}</option>
                        <option value="Asesoría Jurídica">{isCa ? "Assessoria Jurídica" : "Asesoría Jurídica"}</option>
                        <option value="Obras y Mantenimiento">{isCa ? "Obres i Manteniment" : "Obras y Mantenimiento"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensaje (110-120px) */}
                  <div>
                    <label htmlFor="contacto-mensaje-textarea" className="block text-[13px] sm:text-[14px] font-headline font-black uppercase tracking-wider text-[#111111] mb-1">
                      {formLabels.mensaje || "Mensaje o detalles de su consulta"}
                    </label>
                    <textarea
                      id="contacto-mensaje-textarea"
                      rows={3}
                      value={contactForm.mensaje}
                      onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                      placeholder="Explícanos tu consulta o las características de tu finca..."
                      className="w-full h-[115px] min-h-[110px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl p-3 font-headline font-bold text-[15px] sm:text-[16px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                {/* 3. Checkbox y Privacidad */}
                <div className="pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <input
                      id="contacto-privacidad-check"
                      type="checkbox"
                      checked={contactForm.privacidad}
                      onChange={(e) => setContactForm({ ...contactForm, privacidad: e.target.checked })}
                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 accent-[#2860F5] border-2 border-[#111111] rounded cursor-pointer shrink-0"
                    />
                    <label htmlFor="contacto-privacidad-check" className="text-[13px] sm:text-[14px] text-[#111111] font-bold leading-tight cursor-pointer select-none">
                      {isCa ? (
                        <>He llegit i accepto la <Link to="/politica-privacidad" className="underline text-[#2860F5] hover:text-[#111111]">política de privacitat</Link> i el tractament de dades.</>
                      ) : (
                        <>He leído y acepto la <Link to="/politica-privacidad" className="underline text-[#2860F5] hover:text-[#111111]">política de privacidad</Link> y el tratamiento de datos.</>
                      )}
                    </label>
                  </div>
                  {contactErrors.privacidad && <p className="text-red-600 text-[11px] font-bold mt-1 ml-7">{contactErrors.privacidad}</p>}
                </div>

                {/* 4. Botón Enviar Solicitud (56-58px de altura) */}
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full h-[56px] sm:h-[58px] bg-[#2860F5] hover:bg-[#111111] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] font-headline font-black text-[16px] sm:text-[17px] px-6 cursor-pointer flex items-center justify-between uppercase tracking-wider disabled:opacity-80 transition-all select-none"
                >
                  {isSubmittingContact ? (
                    <div className="w-full flex items-center justify-center gap-2.5">
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>{formLabels.enviando || "ENVIANDO..."}</span>
                    </div>
                  ) : (
                    <>
                      <span className="w-5" aria-hidden="true" />
                      <span className="flex-1 text-center">{formLabels.botonEnviar || "ENVIAR SOLICITUD"}</span>
                      <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5] text-white shrink-0" />
                    </>
                  )}
                </button>

                {/* 5. Alternativas de Contacto Directo Compactas */}
                <div className="pt-2 border-t border-[#E3E0E8]">
                  <p className="text-[12px] font-headline font-black uppercase tracking-wider text-slate-500 mb-2 text-center sm:text-left">
                    {isCa ? "¿Prefereixes contactar directament?" : isEn ? "Prefer direct contact?" : "¿Prefieres contactar directamente?"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href="tel:934685656"
                      className="flex items-center gap-2.5 p-2.5 bg-[#FAF9FC] hover:bg-[#FFFFFF] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:shadow-[2px_2px_0px_#2860F5] transition-all group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#2860F5] text-white border border-[#111111] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Phone className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-headline font-black uppercase tracking-wider text-slate-500 leading-none">
                          {isCa ? "Trucada directa" : "Llamada directa"}
                        </span>
                        <span className="block text-[14px] font-data-mono font-bold text-[#111111] group-hover:text-[#2860F5] transition-colors truncate mt-0.5">
                          934 68 56 56
                        </span>
                      </div>
                    </a>

                    <a
                      href="mailto:info@gesgrama.com"
                      className="flex items-center gap-2.5 p-2.5 bg-[#FAF9FC] hover:bg-[#FFFFFF] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:shadow-[2px_2px_0px_#2860F5] transition-all group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#2860F5] text-white border border-[#111111] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Mail className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-headline font-black uppercase tracking-wider text-slate-500 leading-none">
                          {isCa ? "Correu electrònic" : "Correo electrónico"}
                        </span>
                        <span className="block text-[14px] font-headline font-bold text-[#111111] group-hover:text-[#2860F5] transition-colors truncate mt-0.5">
                          info@gesgrama.com
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
