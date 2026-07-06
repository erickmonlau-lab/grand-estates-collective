1: import { createFileRoute } from "@tanstack/react-router";
2: import { motion, useScroll, useTransform, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
3: import { useEffect, useRef, useState } from "react";
4: import { ArrowRight, Search, MapPin, Home, Users, DollarSign, ChevronDown, Award, ShieldCheck, Globe } from "lucide-react";
5: import heroImg from "@/assets/minimal_editorial_villa.jpg";
6: import logoImg from "@/assets/logo.png";
7: import property1 from "@/assets/property-1.jpg";
8: import property2 from "@/assets/property-2.jpg";
9: import property3 from "@/assets/property-3.jpg";
10: import texture from "@/assets/texture.jpg";
11: import gallery1 from "@/assets/gallery-1.jpg";
12: import gallery2 from "@/assets/gallery-2.jpg";
13: import gallery3 from "@/assets/gallery-3.jpg";
14: 
15: export const Route = createFileRoute("/")({
16:   component: Index,
17: });
18: 
19: const easeOut = [0.16, 1, 0.3, 1] as const;
20: 
21: const translations = {
22:   es: {
23:     nav: {
24:       propiedades: "Propiedades",
25:       servicios: "Servicios",
26:       proceso: "Proceso",
27:       contacto: "Contacto",
28:       concierge: "Concierge"
29:     },
30:     hero: {
31:       tag: "Inmobiliaria moderna — desde 2009",
32:       title1: "Encuentra o vende tu propiedad",
33:       title2: "de la forma más rápida,",
34:       title3: "sencilla e intuitiva.",
35:       subtitle: "Encuentra o vende propiedades con total confianza.",
36:       comprar: "Comprar",
37:       alquilar: "Alquilar",
38:       zona: "Zona",
39:       tipo: "Tipo",
40:       hab: "Habitaciones",
41:       precio: "Precio",
42:       buscarBtn: "Buscar propiedades"
43:     },
44:     properties: {
45:       tag: "Colección 2026",
46:       title: "Piezas",
47:       titleItalic: "arquitectónicas.",
48:       offMarketTag: "Off-market",
49:       offMarketText: "Más del 40% de las propiedades que gestionamos nunca se publican.",
50:       offMarketBtn: "Solicitar acceso privado",
51:       beds: "hab.",
52:       baths: "baños"
53:     },
54:     philosophy: {
55:       tag: "La filosofía",
56:       quote: '"No vendemos metros cuadrados. Vendemos el lugar donde vivirás los mejores momentos de tu vida."'
57:     },
58:     services: {
59:       tag: "Servicios",
60:       title1: "Una casa.",
61:       title2: "Un legado.",
62:       title3: "Un mismo equipo.",
63:       list: [
64:         { title: "Comprar", desc: "Acceso a inventario off-market y asesoramiento personalizado." },
65:         { title: "Vender", desc: "Estrategia de marketing de alto impacto para activos singulares." },
66:         { title: "Valorar", desc: "Análisis riguroso de mercado y precio óptimo defendible." },
67:         { title: "Invertir", desc: "Gestión de carteras patrimoniales y análisis de rentabilidad." },
68:         { title: "Obra nueva", desc: "Preventa exclusiva de las promociones más deseadas." },
69:         { title: "Luxury", desc: "División especializada en propiedades a partir de 3M€." }
70:       ]
71:     },
72:     stats: {
73:       tag: "Quince años de excelencia",
74:       sold: "Propiedades vendidas",
75:       satisfied: "Clientes satisfechos",
76:       experience: "Años de experiencia",
77:       managed: "Volumen gestionado"
78:     },
79:     process: {
80:       tag: "Vender con Gesgrama",
81:       title1: "Siete pasos.",
82:       title2: "Un resultado",
83:       title3: "excepcional.",
84:       list: [
85:         { num: "01", title: "Valoración", desc: "Análisis profundo del mercado para determinar el precio óptimo." },
86:         { num: "02", title: "Estrategia", desc: "Plan de comercialización personalizado para su propiedad." },
87:         { num: "03", title: "Reportaje", desc: "Producción fotográfica y cinematográfica al nivel de un editorial." },
88:         { num: "04", title: "Marketing", desc: "Campaña omnicanal en portales premium y redes exclusivas." },
89:         { num: "05", title: "Visitas", desc: "Filtrado y acompañamiento de compradores cualificados." },
90:         { num: "06", title: "Negociación", desc: "Defensa del valor real con máxima discreción." },
91:         { num: "07", title: "Venta", desc: "Cierre jurídico impecable y traspaso sereno." }
92:       ]
93:     },
94:     gallery: {
95:       tag: "Un estilo de vida",
96:       title1: "Más allá de la",
97:       title2: "arquitectura.",
98:       desc: "Interiorismo, arquitectura, luz. Cada detalle contribuye a la sensación de estar en casa."
99:     },
100:     cta: {
101:       tag: "Un nuevo capítulo",
102:       title: "Tu próxima gran decisión empieza aquí.",
103:       findHome: "ENCONTRAR MI HOGAR",
104:       sellProp: "QUIERO VENDER MI PROPIEDAD"
105:     },
106:     contact: {
107:       tag: "Contacto",
108:       title1: "Hablemos de",
109:       title2: "su futuro.",
110:       phone: "Teléfono",
111:       whatsapp: "WhatsApp",
112:       email: "Email",
113:       offices: "Oficinas",
114:       officesVal: "Madrid — Marbella — Palma",
115:       nameLabel: "Nombre",
116:       namePlaceholder: "Su nombre",
117:       emailLabel: "Email",
118:       phoneLabel: "Teléfono",
119:       messageLabel: "Mensaje",
120:       messagePlaceholder: "Cuéntenos su proyecto",
121:       submit: "Enviar solicitud"
122:     },
123:     footer: {
124:       rights: "© 2026 Gesgrama Inmobiliaria — Todos los derechos reservados"
125:     }
126:   },
127:   en: {
128:     nav: {
129:       propiedades: "Properties",
130:       servicios: "Services",
131:       proceso: "Process",
132:       contacto: "Contact",
133:       concierge: "Concierge"
134:     },
135:     hero: {
136:       tag: "Modern Real Estate — since 2009",
137:       title1: "Find or sell your property",
138:       title2: "in the fastest, simplest",
139:       title3: "and most intuitive way.",
140:       subtitle: "Find or sell properties with total confidence.",
141:       comprar: "Buy",
142:       alquilar: "Rent",
143:       zona: "Location",
144:       tipo: "Type",
145:       hab: "Bedrooms",
146:       precio: "Price",
147:       buscarBtn: "Search properties"
148:     },
149:     properties: {
150:       tag: "2026 Collection",
151:       title: "Architectural",
152:       titleItalic: "masterpieces.",
153:       offMarketTag: "Off-market",
154:       offMarketText: "More than 40% of the properties we manage are never published.",
155:       offMarketBtn: "Request private access",
156:       beds: "beds",
157:       baths: "baths"
158:     },
159:     philosophy: {
160:       tag: "The philosophy",
161:       quote: '"We don\'t sell square meters. We sell the place where you will live the best moments of your life."'
162:     },
163:     services: {
164:       tag: "Services",
165:       title1: "A home.",
166:       title2: "A legacy.",
167:       title3: "One team.",
168:       list: [
169:         { title: "Buy", desc: "Access to off-market inventory and personalized advice." },
170:         { title: "Sell", desc: "High-impact marketing strategy for singular assets." },
171:         { title: "Value", desc: "Rigorous market analysis and optimal defensible price." },
172:         { title: "Invest", desc: "Portfolio management and profitability analysis." },
173:         { title: "New Build", desc: "Exclusive pre-sale of the most desired developments." },
174:         { title: "Luxury", desc: "Specialized division for properties starting at €3M." }
175:       ]
176:     },
177:     stats: {
178:       tag: "Fifteen years of excellence",
179:       sold: "Properties sold",
180:       satisfied: "Satisfied clients",
181:       experience: "Years of experience",
182:       managed: "Managed volume"
183:     },
184:     process: {
185:       tag: "Selling with Gesgrama",
186:       title1: "Seven steps.",
187:       title2: "An exceptional",
188:       title3: "result.",
189:       list: [
190:         { num: "01", title: "Valuation", desc: "Deep market analysis to determine the optimal price." },
191:         { num: "02", title: "Strategy", desc: "Personalized marketing plan for your property." },
192:         { num: "03", title: "Media Production", desc: "Photographic and cinematographic production at an editorial level." },
193:         { num: "04", title: "Marketing", desc: "Omnichannel campaign in premium portals and exclusive networks." },
194:         { num: "05", title: "Viewings", desc: "Filtering and accompaniment of qualified buyers." },
195:         { num: "06", title: "Negotiation", desc: "Defense of the real value with maximum discretion." },
196:         { num: "07", title: "Sale", desc: "Impeccable legal closing and smooth handover." }
197:       ]
198:     },
199:     gallery: {
200:       tag: "A lifestyle",
201:       title1: "Beyond the",
202:       title2: "architecture.",
203:       desc: "Interior design, architecture, light. Every detail contributes to the feeling of being at home."
204:     },
205:     cta: {
206:       tag: "A new chapter",
207:       title: "Your next major decision starts here.",
208:       findHome: "Find a home",
209:       sellProp: "Sell property"
210:     },
211:     contact: {
212:       tag: "Contact",
213:       title1: "Let's talk about",
214:       title2: "your future.",
215:       phone: "Phone",
216:       whatsapp: "WhatsApp",
217:       email: "Email",
218:       offices: "Offices",
219:       officesVal: "Madrid — Marbella — Palma",
220:       nameLabel: "Name",
221:       namePlaceholder: "Your name",
222:       emailLabel: "Email",
223:       phoneLabel: "Phone",
224:       messageLabel: "Message",
225:       messagePlaceholder: "Tell us about your project",
226:       submit: "Submit request"
227:     },
228:     footer: {
229:       rights: "© 2026 Gesgrama Real Estate — All rights reserved"
230:     }
231:   },
232:   ca: {
233:     nav: {
234:       propiedades: "Propietats",
235:       servicios: "Serveis",
236:       proceso: "Procés",
237:       contacto: "Contacte",
238:       concierge: "Concierge"
239:     },
240:     hero: {
241:       tag: "Immobiliària moderna — des de 2009",
242:       title1: "Troba o ven la teva propietat",
243:       title2: "de la forma més ràpida,",
244:       title3: "senzilla i intuïtiva.",
245:       subtitle: "Troba o ven propietats amb total confiança.",
246:       comprar: "Comprar",
247:       alquilar: "Llogar",
248:       zona: "Zona",
249:       tipo: "Tipus",
250:       hab: "Habitacions",
251:       precio: "Preu",
252:       buscarBtn: "Cercar propietats"
253:     },
254:     properties: {
255:       tag: "Col·lecció 2026",
256:       title: "Peces",
257:       titleItalic: "arquitectòniques.",
258:       offMarketTag: "Off-market",
259:       offMarketText: "Més del 40% de les propietats que gestionem mai es publiquen.",
260:       offMarketBtn: "Sol·licitar accés privat",
261:       beds: "hab.",
262:       baths: "banys"
263:     },
264:     philosophy: {
265:       tag: "La filosofia",
266:       quote: '"No venem metres quadrats. Venem el lloc on viuràs els millors moments de la teva vida."'
267:     },
268:     services: {
269:       tag: "Serveis",
270:       title1: "Una casa.",
271:       title2: "Un llegat.",
272:       title3: "Un mateix equip.",
273:       list: [
274:         { title: "Comprar", desc: "Accés a inventari off-market i assessorament personalitzat." },
275:         { title: "Vendre", desc: "Estratègia de màrqueting d'alt impacte per a actius singulars." },
276:         { title: "Valorar", desc: "Anàlisi rigorosa de mercat i preu òptim defensable." },
277:         { title: "Invertir", desc: "Gestió de carteres patrimonials i anàlisi de rentabilitat." },
278:         { title: "Obra nova", desc: "Prevenda exclusiva de les promocions más desitjades." },
279:         { title: "Luxury", desc: "Divisió especialitzada en propietats a partir de 3M€." }
280:       ]
281:     },
282:     stats: {
283:       tag: "Quinze anys d'excel·lència",
284:       sold: "Propietats venudes",
285:       satisfied: "Clients satisfets",
286:       experience: "Anys d'experiència",
287:       managed: "Volum gestionat"
288:     },
289:     process: {
290:       tag: "Vendre amb Gesgrama",
291:       title1: "Set passos.",
292:       title2: "Un resultat",
293:       title3: "excepcional.",
294:       list: [
295:         { num: "01", title: "Valoració", desc: "Anàlisi profunda del mercat per determinar el preu òptim." },
296:         { num: "02", title: "Estrategia", desc: "Pla de comercialització personalitzat per a la seva propietat." },
297:         { num: "03", title: "Reportatge", desc: "Producció fotogràfica i cinematogràfica al nivell d'un editorial." },
298:         { num: "04", title: "Màrqueting", desc: "Campanya omnicanal en portals premium i xarxes exclusives." },
299:         { num: "05", title: "Visites", desc: "Filtrat i acompanyament de compradors qualificats." },
300:         { num: "06", title: "Negociació", desc: "Defensa del valor real amb màxima discreció." },
301:         { num: "07", title: "Venda", desc: "Tancament jurídic impecable i traspàs serè." }
302:       ]
303:     },
304:     gallery: {
305:       tag: "Un estil de vida",
306:       title1: "Més enllà de la",
307:       title2: "arquitectura.",
308:       desc: "Interiorisme, arquitectura, llum. Cada detall contribueix a la sensació d'estar a casa."
309:     },
310:     cta: {
311:       tag: "Un nou capítol",
312:       title: "La teva pròxima gran decisió comença aquí.",
313:       findHome: "Trobar habitatge",
314:       sellProp: "Vendre propietat"
315:     },
316:     contact: {
317:       tag: "Contacte",
318:       title1: "Parlem del",
319:       title2: "seu futur.",
320:       phone: "Telèfon",
321:       whatsapp: "WhatsApp",
322:       email: "Email",
323:       offices: "Oficines",
324:       officesVal: "Madrid — Marbella — Palma",
325:       nameLabel: "Nom",
326:       namePlaceholder: "El seu nom",
327:       emailLabel: "Email",
328:       phoneLabel: "Telèfon",
329:       messageLabel: "Missatge",
330:       messagePlaceholder: "Expliqui'ns el seu projecte",