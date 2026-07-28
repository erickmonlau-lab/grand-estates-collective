import { createFileRoute, Link } from "@tanstack/react-router";
import { Cookie, ArrowLeft, Info, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/politica-cookies")({
  component: PoliticaCookiesComponent
});

function PoliticaCookiesComponent() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la página principal
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">Política de Cookies</h1>
            <p className="text-sm text-slate-400">Información transparente sobre el uso de cookies en Gesgrama</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              1. ¿Qué es una cookie?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita nuestra página web. Su función es permitir al sitio recordar su navegación y preferencias para ofrecerle una experiencia óptima y segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Tipos de cookies empleadas</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Cookies Técnicas Necesarias
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Son indispensables para el funcionamiento correcto del sitio web, permitiendo el filtrado de inmuebles, la navegación fluida y la seguridad de las sesiones.
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Cookies de Análisis y Rendimiento
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Nos permiten medir de forma anónima el número de visitantes y analizar qué secciones o tipos de propiedad reciben mayor interés para mejorar nuestros servicios.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Configuración o desactivación</h2>
            <p>
              Puede deshabilitar o borrar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador que utilice:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300 mt-2">
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
