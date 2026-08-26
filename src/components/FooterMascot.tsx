export function FooterMascot({ className = "w-full max-h-[260px] lg:max-h-[290px] object-contain drop-shadow-xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 360" className={className} fill="none">
      <defs>
        <style>{`
          /* Pure CSS friendly wave for the complete right arm and hand together */
          @keyframes waveWholeArm {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(15deg);
            }
            50% {
              transform: rotate(-6deg);
            }
            75% {
              transform: rotate(18deg);
            }
          }

          /* Eye blink */
          @keyframes naturalBlink {
            0%, 90%, 100% {
              transform: scaleY(1);
            }
            95% {
              transform: scaleY(0.1);
            }
          }

          .waving-arm-whole {
            animation: waveWholeArm 2s ease-in-out infinite;
            transform-origin: 270px 150px;
          }

          .blinking-eyes {
            animation: naturalBlink 4s ease-in-out infinite;
            transform-origin: 210px 92px;
          }
        `}</style>
      </defs>

      {/* ── 1. SUELO GRIS FUERTE (Solid Grey Shadow Base) ── */}
      <ellipse cx="210" cy="335" rx="120" ry="14" fill="#475569" opacity="0.95" />
      <ellipse cx="210" cy="335" rx="100" ry="10" fill="#334155" />

      {/* ── 2. BACKGROUND CIRCLE ── */}
      <circle cx="210" cy="175" r="128" fill="#131d33" stroke="#2563eb" strokeWidth="3.5" />
      <circle cx="210" cy="175" r="121" fill="#16233d" />

      {/* ── 3. CHARACTER BODY (Clean, elegant, properly scaled) ── */}
      <g id="character-body">
        {/* Legs */}
        <rect x="178" y="230" width="26" height="85" rx="5" fill="#0f172a" />
        <rect x="216" y="230" width="26" height="85" rx="5" fill="#0f172a" />

        {/* Shoes */}
        <rect x="168" y="308" width="40" height="18" rx="9" fill="#070c18" />
        <rect x="212" y="308" width="40" height="18" rx="9" fill="#070c18" />

        {/* ── LEFT ARM (Exact color #22345c holding the house cleanly) ── */}
        <path d="M 160 148 C 130 156 102 185 92 218 L 118 228 C 126 202 145 180 168 172 Z" fill="#22345c" />
        <rect x="88" y="212" width="16" height="6" rx="3" fill="#182542" transform="rotate(25 88 212)" />

        {/* Hand supporting house base */}
        <ellipse cx="94" cy="226" rx="18" ry="8" fill="#f3b18c" />
        <ellipse cx="60" cy="216" rx="5" ry="9" fill="#f3b18c" transform="rotate(-15 60 216)" />

        {/* ── SOLID WHITE MINIATURE HOUSE ── */}
        <g id="house" transform="translate(56, 160)">
          {/* Blue Roof */}
          <polygon points="-4,34 32,2 68,34" fill="#2563eb" />
          <polygon points="32,2 42,10 42,5 37,5" fill="#1e293b" />
          <line x1="0" y1="32" x2="32" y2="4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />

          {/* White Facade */}
          <rect x="0" y="34" width="64" height="48" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="0" y="34" width="64" height="5" fill="#e2e8f0" />

          {/* Windows */}
          <rect x="8" y="42" width="15" height="15" rx="2.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="15.5" y1="42" x2="15.5" y2="57" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="8" y1="49.5" x2="23" y2="49.5" stroke="#ffffff" strokeWidth="1.5" />

          <rect x="41" y="42" width="15" height="15" rx="2.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="48.5" y1="42" x2="48.5" y2="57" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="41" y1="49.5" x2="56" y2="49.5" stroke="#ffffff" strokeWidth="1.5" />

          {/* Door with Knob */}
          <rect x="25" y="51" width="14" height="31" rx="2" fill="#0f172a" />
          <circle cx="35" cy="66" r="1.3" fill="#fbbf24" />
        </g>

        {/* Suit Jacket Body (#22345c) */}
        <path d="M 152 142 C 152 142, 268 142, 268 142 C 280 142, 288 152, 288 165 L 276 244 C 276 254, 264 262, 250 262 L 170 262 C 156 262, 144 254, 144 244 L 132 165 C 132 152, 140 142, 152 142 Z" fill="#22345c" />
        
        {/* Suit Lapels */}
        <path d="M 152 142 L 190 205 L 178 258" stroke="#182542" strokeWidth="3" strokeLinecap="round" />
        <path d="M 268 142 L 230 205 L 242 258" stroke="#182542" strokeWidth="3" strokeLinecap="round" />

        {/* White Shirt Collar */}
        <polygon points="190,142 210,175 230,142 210,142" fill="#ffffff" />

        {/* Blue Brand Tie */}
        <polygon points="205,152 215,152 217,218 210,226 203,218" fill="#2563eb" />

        {/* Neck */}
        <rect x="202" y="120" width="16" height="24" rx="4" fill="#f3b18c" />

        {/* Head */}
        <circle cx="210" cy="88" r="38" fill="#f3b18c" />

        {/* Hair Cut */}
        <path d="M 172 88 C 168 54 186 40 210 40 C 234 40 252 54 248 88 C 242 74 230 64 210 64 C 190 64 178 74 172 88 Z" fill="#3b271d" />

        {/* Eyes (Blinking) */}
        <g className="blinking-eyes">
          <circle cx="196" cy="84" r="4" fill="#3b271d" />
          <circle cx="198" cy="82" r="1.5" fill="#ffffff" />
          
          <circle cx="224" cy="84" r="4" fill="#3b271d" />
          <circle cx="226" cy="82" r="1.5" fill="#ffffff" />
        </g>

        {/* Big Smile */}
        <path d="M 194 98 Q 210 114 226 98 Z" fill="#ffffff" stroke="#3b271d" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 194 98 Q 210 114 226 98" stroke="#3b271d" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="188" cy="96" r="5" fill="#ea7b64" opacity="0.35" />
        <circle cx="232" cy="96" r="5" fill="#ea7b64" opacity="0.35" />

        {/* Right Shoulder Joint Cap */}
        <circle cx="270" cy="150" r="16" fill="#22345c" />
      </g>

      {/* ── 4. RIGHT WAVING ARM & HAND (Arm and hand unified in ONE group) ── */}
      <g className="waving-arm-whole">
        {/* Arm Sleeve in exact #22345c */}
        <path d="M 268 145 C 290 148 316 122 342 86 L 360 98 C 332 138 300 168 270 162 Z" fill="#22345c" />
        {/* Sleeve Cuff */}
        <rect x="336" y="82" width="20" height="6" rx="3" fill="#182542" transform="rotate(-35 336 82)" />

        {/* Waving Hand Attached Firmly to the Arm */}
        <g id="hand" transform="translate(342, 48)">
          <circle cx="14" cy="20" r="13" fill="#f3b18c" />
          <ellipse cx="2" cy="24" rx="4.5" ry="7" fill="#f3b18c" transform="rotate(-30 2 24)" />
          <rect x="6" y="2" width="4.5" height="15" rx="2.2" fill="#f3b18c" />
          <rect x="12" y="-2" width="4.5" height="18" rx="2.2" fill="#f3b18c" />
          <rect x="18" y="1" width="4.5" height="16" rx="2.2" fill="#f3b18c" />
          <rect x="24" y="5" width="4" height="12" rx="2" fill="#f3b18c" />
        </g>
      </g>
    </svg>
  );
}
