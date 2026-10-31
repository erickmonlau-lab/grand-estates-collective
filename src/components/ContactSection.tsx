import { DrawnUnderline } from "@/components/DrawnUnderline";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Loader2, CheckCircle2 } from "lucide-react";
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
    if (!contactForm.email.trim() || !contactForm.email.includes("@")) errs.email = isCa ? "Email invàlid" : "Email inválido";
    if (!contactForm.privacidad) errs.privacidad = isCa ? "Has d'acceptar la política de privacitat" : "Debes aceptar la política de privacidad";

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }
    setContactErrors({});
    setIsSubmittingContact(true);

    setTimeout(() => {
      setIsSubmittingContact(false);
      setIsSubmittedSuccess(true);
      setContactForm({
        nombre: "",
        telefono: "",
        email: "",
        asunto: "Gestión de Comunidades",
        mensaje: "",
        privacidad: false
      });
    }, 700);
  };

  const c = t?.contact || {};
  const formLabels = t?.contact?.form || {};

  return (
    <section id="contacto" className="relative overflow-hidden bg-[#FAF9FC] text-onyx py-10 md:py-16 border-t-2 border-[#111111]">
      <div className="bg-white rounded-[24px] shadow-[4px_4px_0px_#111111] border-2 border-[#111111] p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1520px] w-[95%] relative z-10">
        
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
          
          {/* BLOQUE IZQUIERDO: Información, Fotografía y Datos de Oficina en Blanco Nítido #FFFFFF */}
          <div className="lg:col-span-5 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#2860F5] p-5 sm:p-6 md:p-7 flex flex-col justify-between">
            <div>
              {/* Fotografía rectangular de la sede real con bordes definidos */}
              <div className="relative h-[220px] sm:h-[250px] md:h-[260px] overflow-hidden border-2 border-white rounded-xl mb-6 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
                <img
                  src={gesgramaOffice}
                  alt="Oficina principal Gesgrama en Santa Coloma de Gramenet"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título: 23-25px, #FFFFFF, peso 800 */}
              <h3 className="text-[23px] sm:text-[25px] font-headline font-extrabold text-[#FFFFFF] uppercase tracking-wide mb-6 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#2860F5] shrink-0" />
                <span>SEDE CENTRAL SANTA COLOMA</span>
              </h3>

              {/* Lista de Datos con Iconos Consistentes (38-40px fondo azul sólido) y Textos #FFFFFF */}
              <ul className="space-y-4 font-sans text-[16px] sm:text-[17px]">
                {/* Dirección */}
                <li className="flex items-start gap-3.5">
                  <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-xl bg-[#2860F5] border border-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-5 h-5 text-[#FFFFFF] stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <span className="block font-bold text-[#FFFFFF] leading-snug">
                      Av. dels Banús, 49
                    </span>
                    <span className="block text-[#E8E8E8] font-medium text-[15px] sm:text-[16px] leading-snug">
                      08923 Santa Coloma de Gramenet (Barcelona)
                    </span>
                  </div>
                </li>

                {/* Teléfono */}
                <li className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-xl bg-[#2860F5] border border-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-[#FFFFFF] stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <a
                      href="tel:934685656"
                      className="text-[#FFFFFF] hover:text-[#2860F5] font-data-mono font-bold text-[17px] sm:text-[18px] tracking-wide transition-colors inline-block"
                    >
                      934 68 56 56
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-xl bg-[#2860F5] border border-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-[#FFFFFF] stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <a
                      href="mailto:info@gesgrama.com"
                      className="text-[#FFFFFF] hover:text-[#2860F5] font-sans font-bold text-[16px] sm:text-[17px] transition-colors inline-block"
                    >
                      info@gesgrama.com
                    </a>
                  </div>
                </li>

                {/* Horario de Atención: Claramente en blanco #FFFFFF */}
                <li className="flex items-start gap-3.5">
                  <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-xl bg-[#2860F5] border border-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Clock className="w-5 h-5 text-[#FFFFFF] stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <span className="block text-[13px] font-sans font-bold uppercase tracking-wider text-[#E8E8E8] leading-none mb-1">
                      {isCa ? "HORARI D'ATENCIÓ" : "HORARIO DE ATENCIÓN"}
                    </span>
                    <span className="block text-[#FFFFFF] font-sans font-bold text-[15px] sm:text-[16px] leading-snug">
                      Lun - Vie: 9:30 - 13:30 y 16:30 - 19:30
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Aviso de Compromiso Colegiado: Bloque diferenciado con separador claro e icono de validación */}
            <div className="mt-8 pt-5 border-t-2 border-white/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2860F5] shrink-0 mt-0.5" />
              <p className="text-[14px] sm:text-[15px] text-[#FFFFFF] font-sans font-semibold leading-relaxed">
                Despacho oficial adherido al Col·legi d'Administradors de Finques de Barcelona-Lleida (CAFBLL) y Colegiados AICAT Nº 5583.
              </p>
            </div>
          </div>

          {/* BLOQUE DERECHO: Formulario Blanco Sólido con Espaciado Tipográfico y Separaciones Perfeccionadas */}
          <div className="lg:col-span-7 bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
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
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full" id="formulario-contacto">
                {/* 1. Cabecera del formulario */}
                <div className="border-b-2 border-slate-200 pb-4 mb-5">
                  <h3 className="text-xl sm:text-[24px] font-headline font-black text-[#111111] leading-tight mb-1.5">
                    {isCa ? "Explica'ns què necessites" : isEn ? "Tell us what you need" : "Cuéntanos qué necesitas"}
                  </h3>
                  <p className="text-[16px] sm:text-[17px] text-[#111111] font-sans font-medium leading-relaxed">
                    {isCa
                      ? "Estem aquí per ajudar-te. Envia'ns la teva consulta i ens posarem en contacte amb tu."
                      : isEn
                      ? "We are here to help. Send us your inquiry and our team will get in touch."
                      : "Estamos aquí para ayudarte. Envíanos tu consulta y nos pondremos en contacto contigo."}
                  </p>
                </div>

                {/* 2. Campos de contacto con separaciones consistentes (14-16px) y tracking de 0.025em */}
                <div className="space-y-4">
                  {/* Fila 1: Nombre + Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div>
                      <label
                        htmlFor="contacto-nombre-input"
                        className="block text-[15px] sm:text-[16px] font-headline font-bold uppercase text-[#111111] mb-2"
                        style={{ letterSpacing: "0.025em" }}
                      >
                        {formLabels.nombre || "Nombre completo"} *
                      </label>
                      <input
                        id="contacto-nombre-input"
                        type="text"
                        value={contactForm.nombre}
                        onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                        placeholder="Tu nombre y apellidos"
                        className="w-full h-[50px] sm:h-[52px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-4 font-sans font-medium text-[16px] sm:text-[17px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400 placeholder:text-[15px] sm:placeholder:text-[16px]"
                      />
                      {contactErrors.nombre && <p className="text-red-600 text-[12px] font-bold mt-1">{contactErrors.nombre}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label
                        htmlFor="contacto-telefono-input"
                        className="block text-[15px] sm:text-[16px] font-headline font-bold uppercase text-[#111111] mb-2"
                        style={{ letterSpacing: "0.025em" }}
                      >
                        {formLabels.telefono || "Teléfono de contacto"} *
                      </label>
                      <input
                        id="contacto-telefono-input"
                        type="tel"
                        value={contactForm.telefono}
                        onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                        placeholder="600 000 000"
                        className="w-full h-[50px] sm:h-[52px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-4 font-data-mono font-medium text-[16px] sm:text-[17px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400 placeholder:text-[15px] sm:placeholder:text-[16px]"
                      />
                      {contactErrors.telefono && <p className="text-red-600 text-[12px] font-bold mt-1">{contactErrors.telefono}</p>}
                    </div>
                  </div>

                  {/* Fila 2: Email + Tipo de consulta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contacto-email-input"
                        className="block text-[15px] sm:text-[16px] font-headline font-bold uppercase text-[#111111] mb-2"
                        style={{ letterSpacing: "0.025em" }}
                      >
                        {formLabels.email || "Correo electrónico"} *
                      </label>
                      <input
                        id="contacto-email-input"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="ejemplo@correo.com"
                        className="w-full h-[50px] sm:h-[52px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-4 font-sans font-medium text-[16px] sm:text-[17px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400 placeholder:text-[15px] sm:placeholder:text-[16px]"
                      />
                      {contactErrors.email && <p className="text-red-600 text-[12px] font-bold mt-1">{contactErrors.email}</p>}
                    </div>

                    {/* Asunto */}
                    <div>
                      <label
                        htmlFor="contacto-asunto-select"
                        className="block text-[15px] sm:text-[16px] font-headline font-bold uppercase text-[#111111] mb-2"
                        style={{ letterSpacing: "0.025em" }}
                      >
                        {formLabels.asunto || "Tipo de consulta"}
                      </label>
                      <select
                        id="contacto-asunto-select"
                        value={contactForm.asunto}
                        onChange={(e) => setContactForm({ ...contactForm, asunto: e.target.value })}
                        className="w-full h-[50px] sm:h-[52px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl px-4 font-sans font-medium text-[16px] sm:text-[17px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all cursor-pointer"
                      >
                        <option value="Gestión de Comunidades">{isCa ? "Administració de Comunitats" : "Gestión de Comunidades"}</option>
                        <option value="Vender un piso">{isCa ? "Vendre un pis" : "Vender un piso"}</option>
                        <option value="Alquilar un piso">{isCa ? "Llogar un pis" : "Alquilar un piso"}</option>
                        <option value="Asesoría Jurídica">{isCa ? "Assessoria Jurídica" : "Asesoría Jurídica"}</option>
                        <option value="Obras y Mantenimiento">{isCa ? "Obres i Manteniment" : "Obras y Mantenimiento"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Mensaje */}
                  <div>
                    <label
                      htmlFor="contacto-mensaje-textarea"
                      className="block text-[15px] sm:text-[16px] font-headline font-bold uppercase text-[#111111] mb-2"
                      style={{ letterSpacing: "0.025em" }}
                    >
                      {formLabels.mensaje || "Mensaje o detalles de su consulta"}
                    </label>
                    <textarea
                      id="contacto-mensaje-textarea"
                      rows={3}
                      value={contactForm.mensaje}
                      onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                      placeholder="Explícanos tu consulta o las características de tu finca..."
                      className="w-full h-[120px] min-h-[110px] bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-xl p-4 font-sans font-medium text-[16px] sm:text-[17px] focus:border-[#2860F5] focus:shadow-[2px_2px_0px_#2860F5] outline-none transition-all placeholder:text-slate-400 placeholder:text-[15px] sm:placeholder:text-[16px] resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                {/* 3. Checkbox y Privacidad con 24px de tamaño, texto negro y 15-16px */}
                <div className="pt-3 pb-2">
                  <div className="flex items-center gap-3">
                    <input
                      id="contacto-privacidad-check"
                      type="checkbox"
                      checked={contactForm.privacidad}
                      onChange={(e) => setContactForm({ ...contactForm, privacidad: e.target.checked })}
                      className="w-6 h-6 accent-[#2860F5] border-2 border-[#111111] rounded cursor-pointer shrink-0"
                    />
                    <label htmlFor="contacto-privacidad-check" className="text-[15px] sm:text-[16px] text-[#111111] font-sans font-medium leading-normal cursor-pointer select-none">
                      {isCa ? (
                        <>He llegit i accepto la <Link to="/politica-privacidad" className="underline text-[#2860F5] hover:text-[#111111] font-bold">política de privacitat</Link> i el tractament de dades.</>
                      ) : (
                        <>He leído y acepto la <Link to="/politica-privacidad" className="underline text-[#2860F5] hover:text-[#111111] font-bold">política de privacidad</Link> y el tratamiento de datos.</>
                      )}
                    </label>
                  </div>
                  {contactErrors.privacidad && <p className="text-red-600 text-[12px] font-bold mt-1.5 ml-9">{contactErrors.privacidad}</p>}
                </div>

                {/* 4. Botón Enviar Solicitud (56-58px de altura, tracking 0.03em) */}
                <div className="pt-1 mb-4">
                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full h-[56px] sm:h-[58px] bg-[#2860F5] hover:bg-[#111111] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] font-headline font-bold text-[16px] sm:text-[17px] px-6 cursor-pointer flex items-center justify-between uppercase disabled:opacity-80 transition-all select-none"
                    style={{ letterSpacing: "0.03em" }}
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
                </div>

                {/* 5. Alternativas de Contacto Directo: Superficies Blancas Sólidas e Iconos Azules */}
                <div className="pt-4 border-t-2 border-slate-200">
                  <p
                    className="text-[14px] sm:text-[15px] font-headline font-bold uppercase text-[#111111] mb-3 text-center sm:text-left"
                    style={{ letterSpacing: "0.025em" }}
                  >
                    {isCa ? "¿Prefereixes contactar directament?" : isEn ? "Prefer direct contact?" : "¿Prefieres contactar directamente?"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="tel:934685656"
                      className="flex items-center gap-3 p-3 bg-[#FFFFFF] hover:bg-slate-50 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:shadow-[2px_2px_0px_#2860F5] transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#2860F5] text-white border border-[#111111] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Phone className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[12px] font-headline font-bold uppercase tracking-wide text-[#111111] leading-none">
                          {isCa ? "Trucada directa" : "Llamada directa"}
                        </span>
                        <span className="block text-[15px] sm:text-[16px] font-data-mono font-bold text-[#111111] group-hover:text-[#2860F5] transition-colors truncate mt-1">
                          934 68 56 56
                        </span>
                      </div>
                    </a>

                    <a
                      href="mailto:info@gesgrama.com"
                      className="flex items-center gap-3 p-3 bg-[#FFFFFF] hover:bg-slate-50 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:shadow-[2px_2px_0px_#2860F5] transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#2860F5] text-white border border-[#111111] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Mail className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[12px] font-headline font-bold uppercase tracking-wide text-[#111111] leading-none">
                          {isCa ? "Correu electrònic" : "Correo electrónico"}
                        </span>
                        <span className="block text-[15px] sm:text-[16px] font-sans font-bold text-[#111111] group-hover:text-[#2860F5] transition-colors truncate mt-1">
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
