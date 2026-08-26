export function FooterMascot({ className = "w-full max-h-[300px] lg:max-h-[340px] object-contain drop-shadow-2xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 380" className={className} fill="none">
      <defs>
        <style>{`
          /* Waving hand animation */
          @keyframes waveHand {
            0%, 100% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(18deg);
            }
            40% {
              transform: rotate(-8deg);
            }
            60% {
              transform: rotate(18deg);
            }
            80% {
              transform: rotate(-4deg);
            }
          }

          /* Eye blinking */
          @keyframes blink {
            0%, 90%, 100% {
              transform: scaleY(1);
            }
            95% {
              transform: scaleY(0.1);
            }
          }

          /* Subtle gentle breathing */
          @keyframes bodyBreath {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2px);
            }
          }

          .waving-arm-group {
            animation: waveHand 2.2s ease-in-out infinite;
            transform-origin: 340px 145px;
          }

          .blinking-eyes {
            animation: blink 4s ease-in-out infinite;
            transform-origin: 270px 105px;
          }

          .breathing-body {
            animation: bodyBreath 3.5s ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}</style>
      </defs>

      {/* ── 1. BACKGROUND CIRCLE ── */}
      <circle cx="270" cy="180" r="130" fill="#141f36" stroke="#22345c" strokeWidth="3" />

      {/* ── 2. GROUND SHADOW (Grounded Base) ── */}
      <ellipse cx="270" cy="340" rx="90" ry="12" fill="#0b1220" opacity="0.8" />

      {/* ── 3. CHARACTER (Grounded, not floating) ── */}
      <g className="breathing-body">
        {/* Legs firmly on the ground */}
        <rect x="236" y="240" width="28" height="85" rx="5" fill="#0f1729" />
        <rect x="276" y="240" width="28" height="85" rx="5" fill="#0f1729" />

        {/* Shoes */}
        <rect x="228" y="318" width="38" height="18" rx="9" fill="#070c18" />
        <rect x="274" y="318" width="38" height="18" rx="9" fill="#070c18" />

        {/* Left Arm (holding miniature house) */}
        <path d="M 225 160 L 190 205 C 185 212 188 220 196 220 L 206 216 L 238 175 Z" fill="#22345c" />
        <circle cx="195" cy="216" r="10" fill="#e5a882" />

        {/* Suit Jacket Body */}
        <path d="M 215 155 C 215 155, 325 155, 325 155 C 336 155, 342 165, 342 178 L 332 254 C 332 264, 320 272, 306 272 L 234 272 C 220 272, 208 264, 208 254 L 198 178 C 198 165, 204 155, 215 155 Z" fill="#22345c" />
        <path d="M 212 210 C 220 240 230 260 240 268" stroke="#18233d" strokeWidth="3" strokeLinecap="round" />
        <path d="M 328 210 C 320 240 310 260 300 268" stroke="#18233d" strokeWidth="3" strokeLinecap="round" />

        {/* White Shirt Collar */}
        <polygon points="252,155 270,184 288,155 270,155" fill="#ffffff" />

        {/* Blue Brand Tie */}
        <polygon points="266,165 274,165 275,224 270,232 265,224" fill="#2f6bff" />
        <polygon points="266,163 274,163 272,172 268,172" fill="#18233d" opacity="0.3" />

        {/* Neck */}
        <rect x="261" y="136" width="18" height="24" rx="3" fill="#e5a882" />

        {/* Head */}
        <circle cx="270" cy="106" r="35" fill="#e5a882" />

        {/* Hair Cap */}
        <path d="M 235 106 C 232 78 248 64 270 64 C 292 64 308 78 305 106 C 298 94 290 86 270 86 C 250 86 242 94 235 106 Z" fill="#3d2c22" />

        {/* Eyes with Blink Animation */}
        <g className="blinking-eyes">
          <circle cx="258" cy="103" r="3.2" fill="#3d2c22" />
          <circle cx="282" cy="103" r="3.2" fill="#3d2c22" />
        </g>

        {/* Friendly Curved Smile */}
        <path d="M 256 116 Q 270 126 284 116" stroke="#3d2c22" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Soft Blush Cheeks */}
        <circle cx="251" cy="113" r="4" fill="#d97757" opacity="0.25" />
        <circle cx="289" cy="113" r="4" fill="#d97757" opacity="0.25" />

        {/* ── HOUSE PROP (Held in hand) ── */}
        <g id="house-prop">
          <polygon points="152,204 178,178 204,204" fill="#2f6bff" />
          <polygon points="178,178 184,184 184,180 180,180" fill="#18233d" />
          <rect x="156" y="204" width="44" height="34" fill="#141f36" stroke="#2f6bff" strokeWidth="2.5" rx="2" />
          <rect x="172" y="217" width="13" height="21" rx="2" fill="#070c18" />
          <circle cx="181" cy="227" r="1.2" fill="#2f6bff" />
        </g>
      </g>

      {/* ── 4. RIGHT ARM & HAND (Animated Waving Hello!) ── */}
      <g className="waving-arm-group">
        {/* Upper Arm raised up */}
        <path d="M 318 165 C 335 158 350 140 360 118 L 344 110 C 336 128 326 142 310 148 Z" fill="#22345c" />
        
        {/* Forearm & Sleeve Cuff */}
        <path d="M 360 118 L 372 88 C 374 84 370 80 364 82 L 344 110 Z" fill="#22345c" />
        <rect x="358" y="86" width="16" height="5" rx="2.5" fill="#18233d" transform="rotate(-30 358 86)" />

        {/* Waving Hand with Fingers */}
        <g id="waving-hand" transform="translate(366, 68)">
          {/* Palm */}
          <circle cx="10" cy="12" r="9" fill="#e5a882" />
          {/* Thumb */}
          <ellipse cx="2" cy="14" rx="3.5" ry="5" fill="#e5a882" transform="rotate(-30 2 14)" />
          {/* 4 Greeting Fingers */}
          <rect x="4" y="-1" width="3.2" height="9" rx="1.6" fill="#e5a882" />
          <rect x="8.5" y="-3" width="3.2" height="11" rx="1.6" fill="#e5a882" />
          <rect x="13" y="-2" width="3.2" height="10" rx="1.6" fill="#e5a882" />
          <rect x="17.5" y="1" width="3" height="8" rx="1.5" fill="#e5a882" />
        </g>
      </g>

      {/* ── 5. PROPERLY STYLED BADGES (Clean Solid Pills) ── */}

      {/* Badge 1: Bottom Left (Registro AICAT Nº 5583) */}
      <g id="badge-aicat" transform="translate(25, 275)">
        <rect x="0" y="0" width="180" height="42" rx="21" fill="#2f6bff" />
        <circle cx="21" cy="21" r="13" fill="#ffffff" opacity="0.2" />
        <path d="M 15 21 L 19 25 L 27 17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="38" y="26" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="800" letterSpacing="0.3">
          Registro AICAT Nº 5583
        </text>
      </g>

      {/* Badge 2: Top Right (+15 años de experiencia) */}
      <g id="badge-exp" transform="translate(325, 45)">
        <rect x="0" y="0" width="190" height="42" rx="21" fill="#0f1729" stroke="#2f6bff" strokeWidth="2.5" />
        <circle cx="22" cy="21" r="12" fill="#2f6bff" />
        <polygon points="22,12 24,18 30,18 25,22 27,28 22,24 17,28 19,22 14,18 20,18" fill="#ffffff" transform="scale(0.8) translate(5, 5)" />
        <text x="42" y="26" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="800" letterSpacing="0.2">
          +15 años de experiencia
        </text>
      </g>
    </svg>
  );
}
