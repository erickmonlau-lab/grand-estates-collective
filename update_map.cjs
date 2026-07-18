const fs = require('fs');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startMarker = '{/* RIGHT CONTENT (MAP) */}';
const endMarker = '</div>\n        </div>\n      </section>';

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newSection = `{/* RIGHT CONTENT (MAP) */}
          <div className="w-full lg:w-1/2 relative h-[600px] md:h-[750px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-4 border-white bg-slate-100 group">
            <Reveal delay={0.3} className="w-full h-full">
              {/* Original Google Map iframe with subtle styling */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[110%] opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
              ></iframe>

              {/* Light blue overlay to match the mockup tint slightly, without hiding map details */}
              <div className="absolute inset-0 bg-[#0082c8]/[0.03] pointer-events-none mix-blend-color"></div>

              {/* Dotted Circle Overlay for Coverage Area */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-dashed border-[#0082c8]/40 bg-[#0082c8]/5 pointer-events-none z-10 flex items-center justify-center">
                 <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-[#0082c8]/10"></div>
              </div>

              {/* Floating Card Top Left */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 z-30 pointer-events-auto"
              >
                <div className="w-10 h-10 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#0082c8]" />
                </div>
                <div className="pr-4 border-r border-slate-100">
                  <h4 className="font-bold text-onyx text-sm">Av. dels Banús, 49</h4>
                  <p className="text-slate-500 text-xs">08923 Santa Coloma<br/>de Gramenet, Barcelona</p>
                </div>
                <div className="flex gap-2 pl-2">
                  <a href="https://maps.google.com/?q=Av.+dels+Banús,+49,+08923+Santa+Coloma+de+Gramenet,+Barcelona" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0082c8] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <a href="https://maps.google.com/dir//Av.+dels+Banús,+49,+08923+Santa+Coloma+de+Gramenet,+Barcelona" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0082c8] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </a>
                </div>
              </motion.div>

              {/* Floating Card Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-10 right-6 md:bottom-12 md:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 z-30 min-w-[240px] pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-[#0082c8]" />
                </div>
                <div>
                  <h4 className="font-bold text-onyx text-base mb-1">Sede Central</h4>
                  <p className="text-slate-500 text-sm mb-3">Av. dels Banús, 49</p>
                  <a href="tel:+34934885858" className="inline-flex items-center gap-2 text-[#0082c8] font-bold hover:text-[#005c99] transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    934 885 858
                  </a>
                </div>
              </motion.div>

            </Reveal>
          `;

current = current.substring(0, startIndex) + newSection + current.substring(endIndex);
fs.writeFileSync('src/routes/index.tsx', current);
console.log('Successfully updated the map section to use the original Google Maps layout');
