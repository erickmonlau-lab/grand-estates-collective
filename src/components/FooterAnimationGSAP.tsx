import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface Props {
  className?: string;
}

export const FooterAnimationGSAP: React.FC<Props> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;

    const tl = gsap.timeline({ 
      repeat: -1,
      delay: 1.0 
    });

    // --- RESET INICIAL ---
    gsap.set("#scene-master", { opacity: 1 });
    gsap.set("#family-x-mover", { x: -350 }); 
    gsap.set("#family-y-jumper", { y: 0 }); 
    gsap.set("#family-scale-wrapper", { scale: 1, opacity: 1 });
    gsap.set("#house-door", { rotationY: 0 });
    gsap.set("#house-window", { fillOpacity: 0.3 });
    gsap.set(".mouth-normal", { opacity: 1 });
    gsap.set(".mouth-happy", { opacity: 0 });

    gsap.set([".leg-left", ".leg-right", ".arm-left", ".arm-right"], { 
      transformOrigin: "0px 0px",
      rotation: 0 
    });

    // --- 0.0s - 4.0s (Caminata Espectacular) ---
    tl.to("#family-x-mover", { x: 0, duration: 4.0, ease: "power1.inOut" }, 0);

    tl.fromTo(".leg-left", { rotation: -35 }, { rotation: 35, duration: 0.25, repeat: 15, yoyo: true, ease: "sine.inOut" }, 0);
    tl.fromTo(".leg-right", { rotation: 35 }, { rotation: -35, duration: 0.25, repeat: 15, yoyo: true, ease: "sine.inOut" }, 0);
    tl.fromTo(".arm-left", { rotation: 35 }, { rotation: -35, duration: 0.25, repeat: 15, yoyo: true, ease: "sine.inOut" }, 0);
    tl.fromTo(".arm-right", { rotation: -35 }, { rotation: 35, duration: 0.25, repeat: 15, yoyo: true, ease: "sine.inOut" }, 0);

    tl.to([".leg-left", ".leg-right", ".arm-left", ".arm-right"], { rotation: 0, duration: 0.2, ease: "power2.out" }, 4.0);

    // --- 4.3s - 5.1s (SALTO DE ALEGRÍA ÉPICO Y CARA FELIZ) ---
    tl.to(".mouth-normal", { opacity: 0, duration: 0.1 }, 4.3);
    tl.to(".mouth-happy", { opacity: 1, duration: 0.1 }, 4.3);

    tl.to(".arm-left", { rotation: 130, duration: 0.4, ease: "back.out(2)" }, 4.3);
    tl.to(".arm-right", { rotation: -130, duration: 0.4, ease: "back.out(2)" }, 4.3);

    tl.to("#family-y-jumper", { y: -70, duration: 0.4, ease: "power2.out", yoyo: true, repeat: 1 }, 4.3);
    tl.to("#family-scale-wrapper", { scale: 1.08, duration: 0.4, ease: "power1.out", yoyo: true, repeat: 1 }, 4.3);

    tl.to([".arm-left", ".arm-right"], { rotation: 0, duration: 0.4, ease: "power2.in" }, 5.1);
    tl.to(".mouth-happy", { opacity: 0, duration: 0.1 }, 5.1);
    tl.to(".mouth-normal", { opacity: 1, duration: 0.1 }, 5.1);

    // --- 5.5s - 7.5s (Apertura y Entrada a la casa) ---
    tl.to("#house-door", { rotationY: -75, duration: 0.6, ease: "power2.out" }, 5.5);

    tl.to("#family-x-mover", { x: 130, duration: 2.0, ease: "power1.inOut" }, 5.5);

    tl.fromTo(".leg-left", { rotation: -30 }, { rotation: 30, duration: 0.25, repeat: 7, yoyo: true, ease: "sine.inOut" }, 5.5);
    tl.fromTo(".leg-right", { rotation: 30 }, { rotation: -30, duration: 0.25, repeat: 7, yoyo: true, ease: "sine.inOut" }, 5.5);
    tl.fromTo(".arm-left", { rotation: 30 }, { rotation: -30, duration: 0.25, repeat: 7, yoyo: true, ease: "sine.inOut" }, 5.5);
    tl.fromTo(".arm-right", { rotation: -30 }, { rotation: 30, duration: 0.25, repeat: 7, yoyo: true, ease: "sine.inOut" }, 5.5);

    tl.to("#family-scale-wrapper", { opacity: 0, duration: 0.6, ease: "power1.out" }, 6.5);

    // --- 7.5s - 8.3s (Cierre de Puerta) ---
    tl.to("#house-door", { rotationY: 0, duration: 0.8, ease: "power2.inOut" }, 7.5);

    // --- 8.3s - 9.8s (Luz de hogar) ---
    tl.to("#house-window", { fillOpacity: 1, duration: 1.5, ease: "power2.out" }, 8.3);

    // --- 9.8s - 10.8s (Reinicio suave) ---
    tl.to("#scene-master", { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 9.8);

    tl.set("#family-x-mover", { x: -350 }, 10.3);
    tl.set("#family-y-jumper", { y: 0 }, 10.3);
    tl.set("#family-scale-wrapper", { opacity: 1, scale: 1 }, 10.3);
    tl.set("#house-window", { fillOpacity: 0.3 }, 10.3);
    tl.set([".leg-left", ".leg-right", ".arm-left", ".arm-right"], { rotation: 0 }, 10.3);
    tl.set(".mouth-normal", { opacity: 1 }, 10.3);
    tl.set(".mouth-happy", { opacity: 0 }, 10.3);

    tl.to("#scene-master", { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 10.3);

  }, { scope: containerRef, dependencies: [mounted] });

  return (
    <div ref={containerRef} className={`${className} w-full mx-auto`} style={{ overflow: 'visible', transform: 'scale(1) translateY(0)', transformOrigin: 'bottom center' }}>
      {mounted && (
        <svg 
          viewBox="100 50 480 300" 
          width="100%" 
          height="100%" 
          style={{ overflow: 'visible' }} 
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <clipPath id="door-mask">
              <rect x="-200" y="-100" width="626" height="500" />
            </clipPath>
          </defs>

          <g id="scene-master">
            <g id="house-master" transform="translate(320, 100)">
              <rect x="150" y="-30" width="30" height="80" fill="#cbd5e1" stroke="#0f172a" strokeWidth="8" />
              <rect x="20" y="80" width="220" height="140" fill="#f8fafc" stroke="#0f172a" strokeWidth="10" strokeLinejoin="round" />
              <polygon points="130,-40 -10,80 250,80" fill="#0082c8" stroke="#0f172a" strokeWidth="10" strokeLinejoin="round" />
              
              <rect x="54" y="104" width="52" height="112" fill="#111827" />

              <g transform="translate(50, 100)" style={{ perspective: '800px' }}>
                <rect 
                  id="house-door" 
                  x="0" 
                  y="0" 
                  width="60" 
                  height="120" 
                  fill="#0f172a" 
                  stroke="#3FB6E8" 
                  strokeWidth="8" 
                  style={{ transformOrigin: '0px 60px' }} 
                />
                <circle cx="48" cy="60" r="5" fill="#3FB6E8" />
              </g>

              <g transform="translate(140, 120)">
                <rect 
                  id="house-window" 
                  x="0" 
                  y="0" 
                  width="60" 
                  height="60" 
                  fill="#eab308" 
                  stroke="#0f172a" 
                  strokeWidth="8" 
                  fillOpacity="0.3" 
                />
                <line x1="30" y1="0" x2="30" y2="60" stroke="#0f172a" strokeWidth="6" />
                <line x1="0" y1="30" x2="60" y2="30" stroke="#0f172a" strokeWidth="6" />
              </g>
            </g>

            <g id="family-master" transform="translate(230, 210)" clipPath="url(#door-mask)">
              <g id="family-x-mover">
                <g id="family-y-jumper"> 
                  <g id="family-scale-wrapper" style={{ transformOrigin: '60px 80px' }}>
                    
                    {/* Chico */}
                    <g id="figure-man" transform="translate(0, 0)">
                      <g transform="translate(15, 45)"><g className="arm-left"><line x1="0" y1="0" x2="-10" y2="45" stroke="#cc8e69" strokeWidth="10" strokeLinecap="round" /></g></g>
                      <g transform="translate(18, 75)"><g className="leg-left"><line x1="0" y1="0" x2="0" y2="65" stroke="#0f172a" strokeWidth="11" strokeLinecap="round" /></g></g>
                      <g transform="translate(36, 75)"><g className="leg-right"><line x1="0" y1="0" x2="0" y2="65" stroke="#0f172a" strokeWidth="11" strokeLinecap="round" /></g></g>
                      
                      <rect x="18" y="20" width="10" height="15" fill="#cc8e69" />
                      <rect x="7" y="30" width="35" height="55" rx="8" fill="#0082c8" />
                      <circle cx="23" cy="5" r="18" fill="#cc8e69" />
                      
                      <path d="M 3 5 A 20 20 0 0 1 43 5 Q 35 0 23 -2 Q 10 0 3 5 Z" fill="#332211" />
                      
                      <circle cx="16" cy="10" r="2.5" fill="#111" />
                      <circle cx="30" cy="10" r="2.5" fill="#111" />
                      
                      <g className="mouth-normal"><path d="M 19 16 Q 23 22 27 16" stroke="#111" strokeWidth="2" fill="none" /></g>
                      <g className="mouth-happy"><path d="M 19 15 Q 23 25 27 15 Z" fill="#111" /></g>
                      
                      <g transform="translate(35, 45)"><g className="arm-right"><line x1="0" y1="0" x2="10" y2="45" stroke="#cc8e69" strokeWidth="10" strokeLinecap="round" /></g></g>
                    </g>

                    {/* Chica */}
                    <g id="figure-woman" transform="translate(70, -5)">
                      <path d="M 6 10 Q -10 35 12 55 L 36 55 Q 50 35 34 10 Z" fill="#452710" />
                      <g transform="translate(10, 45)"><g className="arm-left"><line x1="0" y1="0" x2="-10" y2="45" stroke="#cc8e69" strokeWidth="9" strokeLinecap="round" /></g></g>
                      <g transform="translate(18, 75)"><g className="leg-left"><line x1="0" y1="0" x2="0" y2="65" stroke="#cc8e69" strokeWidth="10" strokeLinecap="round" /></g></g>
                      <g transform="translate(36, 75)"><g className="leg-right"><line x1="0" y1="0" x2="0" y2="65" stroke="#cc8e69" strokeWidth="10" strokeLinecap="round" /></g></g>
                      
                      <path d="M 27 30 L -2 80 H 52 Z" fill="#ec4899" />
                      <circle cx="23" cy="10" r="18" fill="#cc8e69" />
                      <path d="M 5 10 A 18 18 0 0 1 41 10 Q 32 5 23 4 Q 13 5 5 10 Z" fill="#452710" />
                      
                      <circle cx="16" cy="12" r="2.5" fill="#111" />
                      <circle cx="30" cy="12" r="2.5" fill="#111" />
                      
                      <g className="mouth-normal"><path d="M 19 18 Q 23 24 27 18" stroke="#111" strokeWidth="2" fill="none" /></g>
                      <g className="mouth-happy"><path d="M 19 17 Q 23 27 27 17 Z" fill="#111" /></g>

                      <g transform="translate(38, 45)"><g className="arm-right"><line x1="0" y1="0" x2="10" y2="45" stroke="#cc8e69" strokeWidth="9" strokeLinecap="round" /></g></g>
                    </g>

                  </g>
                </g>
              </g>
            </g>

            <g transform="translate(320, 100)">
              <rect x="106" y="100" width="4" height="120" fill="#3FB6E8" />
            </g>

          </g>
        </svg>
      )}
    </div>
  );
};
