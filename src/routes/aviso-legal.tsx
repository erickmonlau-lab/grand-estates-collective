import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, ArrowLeft, Mail, Phone, MapPin, Globe, Building } from "lucide-react";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegalComponent
});

function AvisoLegalComponent() {
  const language = typeof window !== "undefined" ? (localStorage.getItem("language") as "es" | "en" | "ca") || "es" : "es";
  const backText = language === "ca" ? "Tornar a la pàgina principal" : language === "en" ? "Return to main page" : "Volver a la página principal";
  const badgeText = language === "ca" ? "Marc Legal i Jurídic" : language === "en" ? "Legal & Regulatory Framework" : "Marco Legal y Jurídico";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] mb-8 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {backText}
        </Link>

        {/* Header Banner */}
        <div className="bg-[#0b172a] text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-10 flex items-center gap-4 border border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full mb-1 border border-blue-800/50">
              {badgeText}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Aviso Legal
            </h1>
            <p className="text-sm text-slate-300 font-medium mt-1">
              Gesgrama · Gestiones inmobiliarias y administración de fincas
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          <section className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-2.5">
              <Building className="w-6 h-6 text-[#2563eb] shrink-0" />
              1. Datos Identificativos de la Empresa
            </h2>
            <p className="text-slate-700">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos:
            </p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">Actividad principal:</strong>
                <p className="text-slate-600">Gestiones inmobiliarias · Asesoría jurídica · Administración de fincas y comunidades</p>
              </div>
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">Razón Comercial:</strong>
                <p className="text-slate-600 font-semibold">Gesgrama</p>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">Dirección:</strong>
                  <p className="text-slate-600">Av. dels Sants nº 49-51 local, 08923 Sta. Coloma de Gramenet (Barcelona)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">Teléfonos:</strong>
                  <p className="text-slate-600 font-medium">934 685 656 (Oficina) · 601 259 424 (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">Correo Electrónico:</strong>
                  <p className="text-slate-600">info@gesgrama.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">Sitio Web:</strong>
                  <p className="text-slate-600">www.gesgrama.com</p>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-4 italic">
              * Nota legal: Número de registro CIF/NIF disponible previa solicitud formal en nuestra oficina corporativa. Registro de Agentes Inmobiliarios de Catalunya (AICAT nº 5583).
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">2. Términos y Condiciones de Uso</h2>
            <p className="text-slate-700">
              El acceso y uso de este sitio web atribuyen la condición de usuario e implican la aceptación plena de las condiciones aquí expuestas. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de este sitio web conforme a la legislación vigente y a la buena fe.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">3. Propiedad Intelectual e Industrial</h2>
            <p className="text-slate-700">
              Todos los elementos que forman el sitio web (diseños, textos, imágenes, logotipos, código fuente) son propiedad exclusiva de Gesgrama o de sus legítimos licenciantes, estando protegidos por la normativa de propiedad intelectual e industrial.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">4. Limitación de Responsabilidad</h2>
            <p className="text-slate-700">
              Gesgrama no se hace responsable de los daños o perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos o desconexiones en el funcionamiento del sistema electrónico causados por motivos ajenos a la empresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">5. Acreditaciones Profesionales</h2>
            <p className="text-slate-700 mb-3">
              Gesgrama cuenta con la adscripción y cumplimiento de las regulaciones sectoriales de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 font-medium">
              <li>Registre d'Agents Immobiliaris de Catalunya (AICAT) — Inscripción nº 5583.</li>
              <li>Colegio de Agentes de la Propiedad Inmobiliaria (API).</li>
              <li>Asociación de Administradores Judiciales de Fincas.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
