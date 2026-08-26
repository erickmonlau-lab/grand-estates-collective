export function FooterMascot({ className = "w-full max-h-[330px] lg:max-h-[370px] object-contain drop-shadow-2xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 390" className={className} fill="none">
      <defs>
        <style>{`
          /* Natural fluid forearm waving animation from elbow */
          @keyframes waveForearm {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(18deg);
            }
            50% {
              transform: rotate(-6deg);
            }
            75% {
              transform: rotate(20deg);
            }
          }

          /* Natural expressive eye blink */
          @keyframes naturalBlink {
            0%, 90%, 100% {
              transform: scaleY(1);
            }
            95% {
              transform: scaleY(0.1);
            }
          }

          /* Gentle body breathing */
          @keyframes gentleBreath {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2.5px);
            }
          }

          .waving-arm-forearm {
            animation: waveForearm 2.2s ease-in-out infinite;
            transform-origin: 345px 208px;
          }

          .blinking-eyes {
            animation: naturalBlink 4s ease-in-out infinite;
            transform-origin: 230px 105px;
          }

          .lively-body {
            animation: gentleBreath 3.5s ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}</style>
      </defs>

      {/* ── 1. SUELO GRIS FUERTE (Solid Dark Slate Grey Shadow Base) ── */}
      <ellipse cx="230" cy="358" rx="145" ry="17" fill="#475569" opacity="0.95" />
      <ellipse cx="230" cy="358" rx="125" ry="13" fill="#334155" />

      {/* ── 2. BACKGROUND CIRCLE ── */}
      <circle cx="230" cy="190" r="142" fill="#131d33" stroke="#2563eb" strokeWidth="4" />
      <circle cx="230" cy="190" r="134" fill="#16233d" />

      {/* ── 3. CHARACTER BODY (Slightly reduced in size for perfect balance) ── */}
      <g className="lively-body">
        {/* Legs firmly on the grey ground */}
        <rect x="194" y="250" width="30" height="92" rx="5" fill="#0f172a" />
        <rect x="236" y="250" width="30" height="92" rx="5" fill="#0f172a" />

        {/* Shoes on dark grey floor */}
        <rect x="184" y="334" width="44" height="20" rx="10" fill="#070c18" />
        <rect x="232" y="334" width="44" height="20" rx="10" fill="#070c18" />

        {/* ── LEFT ARM (Natural sleeve extending to open palm holding the house) ── */}
        <path d="M 175 168 C 145 178 118 205 105 238 L 132 250 C 142 228 160 205 188 195 Z" fill="#1c2844" />
        <rect x="100" y="234" width="18" height="7" rx="3.5" fill="#162035" transform="rotate(25 100 234)" />

        {/* Clean Open Palm supporting the house base */}
        <ellipse cx="106" cy="250" rx="20" ry="9" fill="#f3b18c" />
        <ellipse cx="68" cy="240" rx="6" ry="10" fill="#f3b18c" transform="rotate(-15 68 240)" />

        {/* ── SOLID WHITE MINIATURE HOUSE ── */}
        <g id="house" transform="translate(64, 175)">
          {/* Blue Gabled Roof */}
          <polygon points="-5,38 36,2 77,38" fill="#2563eb" />
          <polygon points="36,2 47,12 47,6 42,6" fill="#1e293b" />
          <line x1="0" y1="36" x2="36" y2="4" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

          {/* White House Facade */}
          <rect x="0" y="38" width="72" height="54" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="0" y="38" width="72" height="6" fill="#e2e8f0" />

          {/* Windows */}
          <rect x="9" y="47" width="17" height="17" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="17.5" y1="47" x2="17.5" y2="64" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="9" y1="55.5" x2="26" y2="55.5" stroke="#ffffff" strokeWidth="1.5" />

          <rect x="46" y="47" width="17" height="17" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="54.5" y1="47" x2="54.5" y2="64" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="46" y1="55.5" x2="63" y2="55.5" stroke="#ffffff" strokeWidth="1.5" />

          {/* Door with Knob */}
          <rect x="28" y="57" width="16" height="35" rx="2" fill="#0f172a" />
          <circle cx="39" cy="74" r="1.5" fill="#fbbf24" />
        </g>

        {/* Suit Jacket Body */}
        <path d="M 165 160 C 165 160, 295 160, 295 160 C 308 160, 315 172, 315 185 L 302 265 C 302 276, 288 285, 274 285 L 186 285 C 172 285, 158 276, 158 265 L 145 185 C 145 172, 152 160, 165 160 Z" fill="#22345c" />
        
        {/* Lapels */}
        <path d="M 165 160 L 208 228 L 194 280" stroke="#182542" strokeWidth="3" strokeLinecap="round" />
        <path d="M 295 160 L 252 228 L 266 280" stroke="#182542" strokeWidth="3" strokeLinecap="round" />

        {/* White Shirt Collar */}
        <polygon points="208,160 230,195 252,160 230,160" fill="#ffffff" />

        {/* Blue Brand Tie */}
        <polygon points="225,170 235,170 237,238 230,246 223,238" fill="#2563eb" />

        {/* Neck */}
        <rect x="221" y="135" width="18" height="26" rx="4" fill="#f3b18c" />

        {/* Head */}
        <circle cx="230" cy="102" r="42" fill="#f3b18c" />

        {/* Hair Cut */}
        <path d="M 188 102 C 184 66 204 50 230 50 C 256 50 276 66 272 102 C 264 88 252 78 230 78 C 208 78 196 88 188 102 Z" fill="#3b271d" />

        {/* Eyes (Blinking) */}
        <g className="blinking-eyes">
          <circle cx="216" cy="98" r="4.5" fill="#3b271d" />
          <circle cx="218" cy="96" r="1.8" fill="#ffffff" />
          
          <circle cx="244" cy="98" r="4.5" fill="#3b271d" />
          <circle cx="246" cy="96" r="1.8" fill="#ffffff" />
        </g>

        {/* Friendly Smile */}
        <path d="M 214 112 Q 230 130 246 112 Z" fill="#ffffff" stroke="#3b271d" strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M 214 112 Q 230 130 246 112" stroke="#3b271d" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        {/* Rosy Blush Cheeks */}
        <circle cx="206" cy="110" r="5.5" fill="#ea7b64" opacity="0.35" />
        <circle cx="254" cy="110" r="5.5" fill="#ea7b64" opacity="0.35" />

        {/* ── RIGHT UPPER ARM ── */}
        <g id="right-upper-arm">
          <circle cx="295" cy="170" r="18" fill="#22345c" />
          <path d="M 295 160 C 316 160 334 182 340 205 L 320 216 C 314 198 302 182 288 178 Z" fill="#22345c" />
          <circle cx="338" cy="208" r="15" fill="#22345c" />
        </g>
      </g>

      {/* ── 4. RIGHT FOREARM & HAND (Waving naturally) ── */}
      <g className="waving-forearm-forearm">
        <path d="M 330 204 L 366 118 C 370 108 382 112 378 122 L 350 214 Z" fill="#22345c" />
        <rect x="360" y="110" width="22" height="7" rx="3.5" fill="#182542" transform="rotate(-25 360 110)" />

        {/* Hand */}
        <g id="hand-wave" transform="translate(364, 76)">
          <circle cx="15" cy="20" r="14" fill="#f3b18c" />
          <ellipse cx="2" cy="24" rx="5" ry="8" fill="#f3b18c" transform="rotate(-30 2 24)" />
          <rect x="6" y="0" width="5" height="16" rx="2.5" fill="#f3b18c" />
          <rect x="13" y="-4" width="5" height="19" rx="2.5" fill="#f3b18c" />
          <rect x="20" y="-1" width="5" height="17" rx="2.5" fill="#f3b18c" />
          <rect x="27" y="3" width="4.5" height="14" rx="2.2" fill="#f3b18c" />
        </g>
      </g>
    </svg>
  );
}
