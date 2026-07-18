const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '      {/* ── FOOTER ── */}';
const endMarker = '</footer>';

const startIndex = current.indexOf(startMarker);
if (startIndex === -1) {
  console.log('Footer marker not found!');
  process.exit(1);
}
const endIndex = current.indexOf(endMarker, startIndex) + endMarker.length;

if (!current.includes('FooterAnimationGSAP')) {
  current = current.replace(
    'import Reveal from \'@/components/Reveal\';',
    'import Reveal from \'@/components/Reveal\';\nimport { FooterAnimationGSAP } from \'@/components/FooterAnimationGSAP\';'
  );
}

const newFooter = `{/* ── FOOTER GSAP ── */}
      <footer className="bg-[#0b1221] text-slate-300 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-0 flex flex-col lg:flex-row gap-12 relative">
          
          {/* Text Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8">
            {/* Logo + tagline */}
            <div className="lg:col-span-1">
              <img src={logoImg} alt="Gesgrama" className="h-12 w-auto object-contain opacity-100 mb-4" />
              <p className="text-[13px] leading-relaxed text-slate-300 max-w-[200px]">
                Administración de Fincas, Inmobiliaria y Asesoría Jurídica en el área de Barcelona desde 2009.
              </p>
            </div>

            {/* Navegación rápida */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {[
                  { label: t.nav.propiedades, href: "#propiedades" },
                  { label: t.nav.servicios, href: "#servicios" },
                  { label: t.nav.nosotros, href: "#nosotros" },
                  { label: t.nav.contacto, href: "#contacto" },
                ].map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[14px] text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-blue group-hover:scale-150 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.contactInfo}</h4>
              <ul className="space-y-3 text-[14px] text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                  <span>Av. dels Banús, 49<br />08923 Santa Coloma de Gramenet</span>
                </li>
                <li>
                  <a href="tel:+34934685656" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-primary-blue shrink-0" />
                    934 685 656
                  </a>
                </li>
                <li>
                  <a href="mailto:info@gesgrama.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-primary-blue shrink-0" />
                    info@gesgrama.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.legal}</h4>
              <ul className="space-y-3">
                {[
                  { label: t.footer.legalNotice, href: "#" },
                  { label: t.footer.privacy, href: "#" },
                  { label: t.footer.cookies, href: "#" },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-blue group-hover:scale-150 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Animation Column (Right) */}
          <div className="w-full lg:w-[350px] flex items-end justify-center lg:justify-end pb-0">
             <div className="w-full max-w-[300px]">
                <FooterAnimationGSAP className="w-full h-auto block" />
             </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col justify-center items-center text-center gap-4">
            <p className="text-[12px] text-slate-400">{t.footer.rights}</p>
          </div>
        </div>
      </footer>`;

current = current.substring(0, startIndex) + newFooter + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Restored grey footer with original colored logo');
