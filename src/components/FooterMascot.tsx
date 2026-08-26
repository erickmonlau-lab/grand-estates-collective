export function FooterMascot({ className = "w-full max-h-[360px] lg:max-h-[420px] object-contain drop-shadow-2xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" className={className} fill="none">
      <defs>
        <style>{`
          /* Natural forearm waving from elbow pivot */
          @keyframes naturalWaveElbow {
            0%, 100% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(14deg);
            }
            40% {
              transform: rotate(-8deg);
            }
            60% {
              transform: rotate(15deg);
            }
            80% {
              transform: rotate(-4deg);
            }
          }

          /* Eye blinking */
          @keyframes livelyBlink {
            0%, 90%, 100% {
              transform: scaleY(1);
            }
            95% {
              transform: scaleY(0.1);
            }
          }

          /* Subtle lively breathing */
          @keyframes subtleBreath {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          .waving-forearm-group {
            animation: naturalWaveElbow 2s ease-in-out infinite;
            transform-origin: 395px 185px;
          }

          .lively-blink {
            animation: livelyBlink 4s ease-in-out infinite;
            transform-origin: 280px 82px;
          }

          .lively-body {
            animation: subtleBreath 3.5s ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}</style>
      </defs>

      {/* ── 1. BACKGROUND CIRCLE (Large, Centered at X=280) ── */}
      <circle cx="280" cy="180" r="142" fill="#131d33" stroke="#2563eb" strokeWidth="4" />
      <circle cx="280" cy="180" r="135" fill="#16233d" />

      {/* ── 2. GROUND SHADOW (Solid Grounded Base) ── */}
      <ellipse cx="280" cy="355" rx="125" ry="16" fill="#080d17" opacity="0.9" />

      {/* ── 3. CHARACTER (Big, Expressive, Fully Defined Arms) ── */}
      <g className="lively-body">
        {/* Legs firmly on ground */}
        <rect x="240" y="240" width="34" height="95" rx="6" fill="#0f172a" />
        <rect x="286" y="240" width="34" height="95" rx="6" fill="#0f172a" />

        {/* Shoes */}
        <rect x="230" y="328" width="46" height="22" rx="11" fill="#070c18" />
        <rect x="284" y="328" width="46" height="22" rx="11" fill="#070c18" />

        {/* ── FULLY VISIBLE LEFT ARM (Shoulder -> Elbow -> Forearm -> Hand) ── */}
        <g id="left-arm-complete">
          {/* Upper Arm from shoulder (220, 150) to elbow (165, 205) */}
          <path d="M 225 145 C 205 148 175 175 165 205 L 188 215 C 196 195 215 175 235 168 Z" fill="#1c2844" />
          
          {/* Forearm from elbow (165, 205) extending forward/holding house at (190, 240) */}
          <path d="M 165 205 C 160 220 170 238 190 242 L 202 225 C 190 220 185 212 188 215 Z" fill="#22345c" />
          <rect x="180" y="228" width="16" height="7" rx="3.5" fill="#162035" transform="rotate(30 180 228)" />

          {/* Left Hand with Fingers Supporting the House */}
          <circle cx="198" cy="242" r="14" fill="#f3b18c" />
          <ellipse cx="188" cy="246" rx="5" ry="3.5" fill="#f3b18c" />
        </g>

        {/* Suit Jacket Torso */}
        <path d="M 215 145 C 215 145, 345 145, 345 145 C 358 145, 366 158, 366 172 L 352 258 C 352 270, 338 280, 322 280 L 238 280 C 222 280, 208 270, 208 258 L 195 172 C 195 158, 202 145, 215 145 Z" fill="#22345c" />
        
        {/* Lapel details */}
        <path d="M 215 145 L 258 215 L 242 278" stroke="#182542" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 345 145 L 302 215 L 318 278" stroke="#182542" strokeWidth="3.5" strokeLinecap="round" />

        {/* Crisp White Shirt Collar */}
        <polygon points="258,145 280,182 302,145 280,145" fill="#ffffff" />

        {/* Vibrant Royal Blue Tie */}
        <polygon points="275,158 285,158 287,232 280,242 273,232" fill="#2563eb" />
        <polygon points="275,156 285,156 283,166 277,166" fill="#182542" opacity="0.35" />

        {/* Neck */}
        <rect x="270" y="120" width="20" height="28" rx="4" fill="#f3b18c" />

        {/* BIG CHEERFUL HEAD */}
        <circle cx="280" cy="85" r="44" fill="#f3b18c" />

        {/* Modern Warm Brown Haircut */}
        <path d="M 236 85 C 232 48 252 30 280 30 C 308 30 328 48 324 85 C 316 70 304 60 280 60 C 256 60 244 70 236 85 Z" fill="#3b271d" />

        {/* Eyes (Blinking with Catchlight) */}
        <g className="lively-blink">
          <circle cx="264" cy="82" r="4.5" fill="#3b271d" />
          <circle cx="266" cy="80" r="1.8" fill="#ffffff" />
          
          <circle cx="296" cy="82" r="4.5" fill="#3b271d" />
          <circle cx="298" cy="80" r="1.8" fill="#ffffff" />
        </g>

        {/* Big Friendly Smile with White Teeth */}
        <path d="M 262 98 Q 280 116 298 98 Z" fill="#ffffff" stroke="#3b271d" strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M 262 98 Q 280 116 298 98" stroke="#3b271d" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        {/* Rosy Blush Cheeks */}
        <circle cx="254" cy="95" r="5.5" fill="#ea7b64" opacity="0.35" />
        <circle cx="306" cy="95" r="5.5" fill="#ea7b64" opacity="0.35" />

        {/* ── 4. PROMINENT BIG WHITE MINIATURE HOUSE (Proudly held on left hand) ── */}
        <g id="big-house-prop">
          {/* Blue Gabled Roof */}
          <polygon points="105,185 147,145 189,185" fill="#2563eb" />
          <polygon points="147,145 158,155 158,148 152,148" fill="#1e293b" />
          <line x1="110" y1="184" x2="147" y2="148" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

          {/* Solid White House Facade */}
          <rect x="110" y="185" width="74" height="56" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="110" y="185" width="74" height="6" fill="#e2e8f0" />

          {/* Two Sky Blue Windows */}
          <rect x="118" y="196" width="18" height="18" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="127" y1="196" x2="127" y2="214" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="118" y1="205" x2="136" y2="205" stroke="#ffffff" strokeWidth="1.5" />

          <rect x="158" y="196" width="18" height="18" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="167" y1="196" x2="167" y2="214" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="158" y1="205" x2="176" y2="205" stroke="#ffffff" strokeWidth="1.5" />

          {/* Entrance Door with Brass Knob */}
          <rect x="139" y="206" width="16" height="35" rx="2" fill="#0f172a" />
          <circle cx="150" cy="224" r="1.8" fill="#fbbf24" />
        </g>

        {/* ── 5. RIGHT UPPER ARM (Static from Shoulder to Elbow) ── */}
        <g id="right-upper-arm">
          {/* Shoulder Cap */}
          <circle cx="345" cy="155" r="18" fill="#22345c" />
          {/* Upper Arm extending outwards-down to elbow at (395, 185) */}
          <path d="M 345 145 C 368 145 388 165 395 185 L 375 195 C 368 180 355 165 340 162 Z" fill="#22345c" />
          {/* Elbow Joint Pivot Circle */}
          <circle cx="395" cy="185" r="14" fill="#22345c" />
        </g>
      </g>

      {/* ── 6. RIGHT FOREARM & HAND (Natural Waving from Elbow Joint 395, 185) ── */}
      <g className="waving-forearm-group">
        {/* Forearm bent UP naturally towards (420, 100) */}
        <path d="M 386 182 L 418 102 C 422 92 434 96 430 106 L 404 190 Z" fill="#22345c" />
        {/* Forearm Sleeve Cuff */}
        <rect x="412" y="94" width="22" height="7" rx="3.5" fill="#182542" transform="rotate(-30 412 94)" />

        {/* Large Natural Open Hand with Greeting Fingers */}
        <g id="natural-waving-hand" transform="translate(420, 62)">
          {/* Palm */}
          <circle cx="15" cy="20" r="14" fill="#f3b18c" />
          {/* Thumb */}
          <ellipse cx="2" cy="24" rx="5" ry="8" fill="#f3b18c" transform="rotate(-30 2 24)" />
          {/* 4 Greeting Fingers */}
          <rect x="6" y="0" width="5" height="16" rx="2.5" fill="#f3b18c" />
          <rect x="13" y="-4" width="5" height="19" rx="2.5" fill="#f3b18c" />
          <rect x="20" y="-1" width="5" height="17" rx="2.5" fill="#f3b18c" />
          <rect x="27" y="3" width="4.5" height="14" rx="2.2" fill="#f3b18c" />
        </g>
      </g>

      {/* ── 7. PROMINENT BIG BADGES (High-Contrast, Bold, Zero Overlap) ── */}

      {/* Badge 1: Bottom Left (AICAT) - Big & Bold */}
      <g id="badge-aicat" transform="translate(8, 310)">
        <rect x="0" y="0" width="215" height="48" rx="24" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" filter="drop-shadow(0 6px 14px rgba(37,99,235,0.45))" />
        <circle cx="24" cy="24" r="15" fill="#ffffff" opacity="0.25" />
        <path d="M 17 24 L 22 29 L 31 19" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="30" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="900" letterSpacing="0.2">
          Registro AICAT Nº 5583
        </text>
      </g>

      {/* Badge 2: Top Right (+15 Años) - Big & Bold */}
      <g id="badge-exp" transform="translate(345, 18)">
        <rect x="0" y="0" width="205" height="48" rx="24" fill="#0b1322" stroke="#2563eb" strokeWidth="3" filter="drop-shadow(0 6px 16px rgba(0,0,0,0.6))" />
        <circle cx="24" cy="24" r="14" fill="#2563eb" />
        <polygon points="24,12 26.5,19 33,19 27.5,23.5 29.5,30 24,25.5 18.5,30 20.5,23.5 15,19 21.5,19" fill="#ffffff" transform="scale(0.8) translate(6, 6)" />
        <text x="46" y="30" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="900" letterSpacing="0.2">
          +15 años de experiencia
        </text>
      </g>
    </svg>
  );
}
