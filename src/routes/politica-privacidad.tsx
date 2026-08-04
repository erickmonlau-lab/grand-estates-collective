import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/politica-privacidad")({
  component: PoliticaPrivacidadComponent
});

function PoliticaPrivacidadComponent() {
  const language = typeof window !== "undefined" ? (localStorage.getItem("language") as "es" | "en" | "ca") || "es" : "es";
  const backText = language === "ca" ? "Tornar a la pàgina principal" : language === "en" ? "Return to main page" : "Volver a la página principal";
  const badgeText = language === "ca" ? "Privacitat i Seguretat" : language === "en" ? "Privacy & Security" : "Privacidad y Seguridad";

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
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full mb-1 border border-blue-800/50">
              {badgeText}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Política de Privacidad
            </h1>
            <p className="text-sm text-slate-300 font-medium mt-1">
              Protección de Datos conforme al RGPD y LOPDGDD
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          <section className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#2563eb] shrink-0" />
              1. Responsable del Tratamiento
            </h2>
            <p className="text-slate-700">
              El responsable del tratamiento de los datos personales recabados a través de esta web es:
            </p>
            <div className="mt-4 p-5 bg-white rounded-xl border border-slate-200 text-sm sm:text-base space-y-2 text-slate-800 shadow-sm">
              <p><strong className="text-slate-900 font-bold">Entidad:</strong> Gesgrama (Gestiones inmobiliarias · Asesoría jurídica · Administración de fincas)</p>
              <p><strong className="text-slate-900 font-bold">Dirección:</strong> Av. dels Sants nº 49-51 local, 08923 Sta. Coloma de Gramenet (Barcelona)</p>
              <p><strong className="text-slate-900 font-bold">Contacto Protección de Datos:</strong> info@gesgrama.com · Tel: 934 685 656</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">2. Finalidad del Tratamiento</h2>
            <p className="text-slate-700">Sus datos personales se recopilan y tratan para las siguientes finalidades específicas:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 font-medium mt-3">
              <li>Atender y gestionar las solicitudes de información sobre alquiler, compraventa o administración de fincas.</li>
              <li>Gestionar el envío de convocatorias de juntas de propietarios a los miembros acreditados.</li>
              <li>Envío de presupuestos de valoración de inmuebles o servicios de seguros de protección de pagos.</li>
              <li>Cumplimiento de las obligaciones legales aplicables en materia inmobiliaria y civil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">3. Legitimación del Tratamiento</h2>
            <p className="text-slate-700">
              La base legal para el tratamiento de sus datos es el consentimiento explícito prestado al completar nuestros formularios de contacto, así como la ejecución de contratos de gestión de fincas o el interés legítimo en responder a sus consultas.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">4. Derechos ARCO / RGPD</h2>
            <p className="text-slate-700">Tiene derecho a acceder, rectificar, suprimir, limitar u oponerse al tratamiento de sus datos personales. Para ejercitar estos derechos puede enviar una comunicación formal acompañada de copia de su documento de identidad a:</p>
            <div className="mt-4 flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800">
              <Mail className="w-6 h-6 text-[#2563eb] shrink-0" />
              <span className="text-sm sm:text-base">Email de protección de datos: <strong className="text-[#0f172a] font-bold">info@gesgrama.com</strong></span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
