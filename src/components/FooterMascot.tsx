export function FooterMascot({ className = "w-full max-h-[300px] lg:max-h-[340px] object-contain drop-shadow-2xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" className={className} fill="none">
      <defs>
        <style>{`
          /* Natural wrist hand wave greeting without detaching the arm */
          @keyframes naturalWave {
            0%, 100% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(18deg);
            }
            40% {
              transform: rotate(-10deg);
            }
            60% {
              transform: rotate(18deg);
            }
            80% {
              transform: rotate(-6deg);
            }
          }

          /* Eye blinking */
          @keyframes blinkEyes {
            0%, 92%, 100% {
              transform: scaleY(1);
            }
            96% {
              transform: scaleY(0.1);
            }
          }

          .waving-hand-only {
            animation: naturalWave 2s ease-in-out infinite;
            transform-origin: 388px 128px;
          }

          .blinking-eyes {
            animation: blinkEyes 4.2s ease-in-out infinite;
            transform-origin: 320px 105px;
          }
        `}</style>
      </defs>

      {/* ── 1. BACKGROUND CIRCLE (Centered at X=320) ── */}
      <circle cx="320" cy="180" r="130" fill="#141f36" stroke="#22345c" strokeWidth="3" />

      {/* ── 2. GROUND SHADOW (Grounded Base) ── */}
      <ellipse cx="320" cy="340" rx="95" ry="12" fill="#090e18" opacity="0.9" />

      {/* ── 3. CHARACTER BODY (Centered, Grounded) ── */}
      <g id="character-main">
        {/* Legs firmly on the ground */}
        <rect x="286" y="240" width="28" height="85" rx="5" fill="#0f1729" />
        <rect x="326" y="240" width="28" height="85" rx="5" fill="#0f1729" />

        {/* Shoes on ground shadow */}
        <rect x="278" y="318" width="38" height="18" rx="9" fill="#070c18" />
        <rect x="324" y="318" width="38" height="18" rx="9" fill="#070c18" />

        {/* Left Arm holding the house */}
        <path d="M 275 160 L 235 205 C 230 212 233 220 241 220 L 252 216 L 288 175 Z" fill="#22345c" />
        <circle cx="240" cy="216" r="11" fill="#e5a882" />

        {/* Right Arm (Fixed to shoulder, raising naturally towards top right) */}
        <path d="M 360 160 C 375 155 385 140 388 128 L 372 120 C 368 132 360 144 345 152 Z" fill="#22345c" />
        {/* Forearm sleeve */}
        <path d="M 372 120 L 388 128 L 396 112 L 380 106 Z" fill="#22345c" />
        <rect x="382" y="106" width="16" height="5" rx="2.5" fill="#18233d" transform="rotate(-25 382 106)" />

        {/* Suit Jacket Torso */}
        <path d="M 265 155 C 265 155, 375 155, 375 155 C 386 155, 392 165, 392 178 L 382 254 C 382 264, 370 272, 356 272 L 284 272 C 270 272, 258 264, 258 254 L 248 178 C 248 165, 254 155, 265 155 Z" fill="#22345c" />
        <path d="M 262 210 C 270 240 280 260 290 268" stroke="#18233d" strokeWidth="3" strokeLinecap="round" />
        <path d="M 378 210 C 370 240 360 260 350 268" stroke="#18233d" strokeWidth="3" strokeLinecap="round" />

        {/* White Shirt Collar */}
        <polygon points="302,155 320,184 338,155 320,155" fill="#ffffff" />

        {/* Blue Brand Tie */}
        <polygon points="316,165 324,165 325,224 320,232 315,224" fill="#2f6bff" />
        <polygon points="316,163 324,163 322,172 318,172" fill="#18233d" opacity="0.3" />

        {/* Neck */}
        <rect x="311" y="136" width="18" height="24" rx="3" fill="#e5a882" />

        {/* Head */}
        <circle cx="320" cy="106" r="35" fill="#e5a882" />

        {/* Hair Cap */}
        <path d="M 285 106 C 282 78 298 64 320 64 C 342 64 358 78 355 106 C 348 94 340 86 320 86 C 300 86 292 94 285 106 Z" fill="#3d2c22" />

        {/* Eyes (Blinking Animation) */}
        <g className="blinking-eyes">
          <circle cx="308" cy="103" r="3.2" fill="#3d2c22" />
          <circle cx="332" cy="103" r="3.2" fill="#3d2c22" />
        </g>

        {/* Friendly Curved Smile */}
        <path d="M 306 116 Q 320 126 334 116" stroke="#3d2c22" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Soft Blush Cheeks */}
        <circle cx="301" cy="113" r="4" fill="#d97757" opacity="0.25" />
        <circle cx="339" cy="113" r="4" fill="#d97757" opacity="0.25" />

        {/* ── 4. HIGH-CONTRAST SOLID MINIATURE HOUSE (Bright & Clear) ── */}
        <g id="miniature-house">
          {/* Blue Roof with Chimney */}
          <polygon points="190,196 218,168 246,196" fill="#2563eb" />
          <polygon points="218,168 226,176 226,171 221,171" fill="#1e293b" />
          
          {/* Solid White House Base with Subtle Shadow */}
          <rect x="194" y="196" width="48" height="38" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          
          {/* Roof shadow on wall */}
          <path d="M 194 196 L 242 196 L 242 201 L 194 201 Z" fill="#e2e8f0" />

          {/* Sky Blue Windows */}
          <rect x="200" y="204" width="10" height="10" rx="1.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <line x1="205" y1="204" x2="205" y2="214" stroke="#ffffff" strokeWidth="1" />
          <line x1="200" y1="209" x2="210" y2="209" stroke="#ffffff" strokeWidth="1" />

          <rect x="226" y="204" width="10" height="10" rx="1.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <line x1="231" y1="204" x2="231" y2="214" stroke="#ffffff" strokeWidth="1" />
          <line x1="226" y1="209" x2="236" y2="209" stroke="#ffffff" strokeWidth="1" />

          {/* Dark Navy Door with Golden Knob */}
          <rect x="213" y="212" width="10" height="22" rx="1.5" fill="#0f172a" />
          <circle cx="220" cy="223" r="1" fill="#fbbf24" />
        </g>
      </g>

      {/* ── 5. WAVING HAND ONLY (Pivots naturally at wrist, stays 100% attached) ── */}
      <g className="waving-hand-only">
        {/* Palm */}
        <circle cx="394" cy="98" r="9" fill="#e5a882" />
        {/* Thumb */}
        <ellipse cx="386" cy="100" rx="3.5" ry="5" fill="#e5a882" transform="rotate(-30 386 100)" />
        {/* 4 Greeting Fingers */}
        <rect x="388" y="85" width="3.2" height="9" rx="1.6" fill="#e5a882" />
        <rect x="392.5" y="83" width="3.2" height="11" rx="1.6" fill="#e5a882" />
        <rect x="397" y="84" width="3.2" height="10" rx="1.6" fill="#e5a882" />
        <rect x="401.5" y="87" width="3" height="8" rx="1.5" fill="#e5a882" />
      </g>

      {/* ── 6. PILL BADGES (Positioned completely outside the character, zero overlap) ── */}

      {/* Badge 1: Bottom Left (Positioned at X=10, Y=285 - No overlap with feet) */}
      <g id="badge-aicat" transform="translate(10, 285)">
        <rect x="0" y="0" width="186" height="42" rx="21" fill="#2563eb" stroke="#3b82f6" strokeWidth="1.5" />
        <circle cx="21" cy="21" r="13" fill="#ffffff" opacity="0.25" />
        <path d="M 15 21 L 19 25 L 27 17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="38" y="26" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12.5" fontWeight="800" letterSpacing="0.3">
          Registro AICAT Nº 5583
        </text>
      </g>

      {/* Badge 2: Top Right (Positioned at X=440, Y=45 - No overlap with hand) */}
      <g id="badge-exp" transform="translate(440, 45)">
        <rect x="0" y="0" width="190" height="42" rx="21" fill="#0f1729" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="22" cy="21" r="12" fill="#2563eb" />
        <polygon points="22,12 24,18 30,18 25,22 27,28 22,24 17,28 19,22 14,18 20,18" fill="#ffffff" transform="scale(0.8) translate(5.5, 5.5)" />
        <text x="42" y="26" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="800" letterSpacing="0.2">
          +15 años de experiencia
        </text>
      </g>
    </svg>
  );
}
