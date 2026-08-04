import { createFileRoute, Link } from "@tanstack/react-router";
import { Cookie, ArrowLeft, Info, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/politica-cookies")({
  component: PoliticaCookiesComponent
});

function PoliticaCookiesComponent() {
  const language = typeof window !== "undefined" ? (localStorage.getItem("language") as "es" | "en" | "ca") || "es" : "es";
  const backText = language === "ca" ? "Tornar a la pàgina principal" : language === "en" ? "Return to main page" : "Volver a la página principal";
  const badgeText = language === "ca" ? "Transparència Digital" : language === "en" ? "Digital Transparency" : "Transparencia Digital";

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
            <Cookie className="w-7 h-7" />
          </div>
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full mb-1 border border-blue-800/50">
              {badgeText}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Política de Cookies
            </h1>
            <p className="text-sm text-slate-300 font-medium mt-1">
              Información clara sobre el uso de cookies en Gesgrama
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
          <section className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3 flex items-center gap-2.5">
              <Info className="w-6 h-6 text-[#2563eb] shrink-0" />
              1. ¿Qué es una cookie?
            </h2>
            <p className="text-slate-700">
              Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita nuestra página web. Su función es permitir al sitio recordar su navegación y preferencias para ofrecerle una experiencia óptima y segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-4">2. Tipos de cookies empleadas</h2>
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-[#0f172a] text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  Cookies Técnicas Necesarias
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                  Son indispensables para el funcionamiento correcto del sitio web, permitiendo el filtrado de inmuebles, la navegación fluida y la seguridad de las sesiones.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-[#0f172a] text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2563eb] shrink-0" />
                  Cookies de Análisis y Rendimiento
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                  Nos permiten medir de forma anónima el número de visitantes y analizar qué secciones o tipos de propiedad reciben mayor interés para mejorar nuestros servicios.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">3. Configuración o desactivación</h2>
            <p className="text-slate-700">
              Puede deshabilitar o borrar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador que utilice:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 font-medium mt-3">
              <li>Google Chrome / Microsoft Edge</li>
              <li>Mozilla Firefox</li>
              <li>Safari (iOS / macOS)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
