export function FooterMascot({ className = "w-full max-h-[380px] lg:max-h-[440px] object-contain drop-shadow-2xl" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 440" className={className} fill="none">
      <defs>
        <style>{`
          /* Natural waving motion from elbow */
          @keyframes waveElbow {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(14deg);
            }
            50% {
              transform: rotate(-6deg);
            }
            75% {
              transform: rotate(15deg);
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

          /* Subtle body breath */
          @keyframes gentleBreath {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          .waving-forearm-smooth {
            animation: waveElbow 2.2s ease-in-out infinite;
            transform-origin: 515px 220px;
          }

          .lively-blink {
            animation: livelyBlink 4s ease-in-out infinite;
            transform-origin: 390px 105px;
          }

          .lively-body {
            animation: gentleBreath 3.5s ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}</style>
      </defs>

      {/* ── 1. BACKGROUND CIRCLE ── */}
      <circle cx="390" cy="210" r="160" fill="#131d33" stroke="#2563eb" strokeWidth="4.5" />
      <circle cx="390" cy="210" r="152" fill="#16233d" />

      {/* ── 2. GROUND SHADOW ── */}
      <ellipse cx="390" cy="390" rx="140" ry="16" fill="#080d17" opacity="0.9" />

      {/* ── 3. CHARACTER BODY ── */}
      <g className="lively-body">
        {/* Legs firmly on the ground */}
        <rect x="345" y="275" width="38" height="105" rx="7" fill="#0f172a" />
        <rect x="397" y="275" width="38" height="105" rx="7" fill="#0f172a" />

        {/* Shoes */}
        <rect x="335" y="365" width="52" height="24" rx="12" fill="#070c18" />
        <rect x="395" y="365" width="52" height="24" rx="12" fill="#070c18" />

        {/* Suit Torso Body */}
        <path d="M 315 170 C 315 170, 465 170, 465 170 C 480 170, 488 185, 488 200 L 472 295 C 472 308, 456 318, 438 318 L 342 318 C 324 318, 308 308, 308 295 L 292 200 C 292 185, 300 170, 315 170 Z" fill="#22345c" />
        
        {/* Lapel details */}
        <path d="M 315 170 L 365 245 L 348 316" stroke="#182542" strokeWidth="4" strokeLinecap="round" />
        <path d="M 465 170 L 415 245 L 432 316" stroke="#182542" strokeWidth="4" strokeLinecap="round" />

        {/* Crisp White Shirt Collar */}
        <polygon points="365,170 390,210 415,170 390,170" fill="#ffffff" />

        {/* Vibrant Royal Blue Tie */}
        <polygon points="384,182 396,182 398,262 390,274 382,262" fill="#2563eb" />
        <polygon points="384,180 396,180 394,192 386,192" fill="#182542" opacity="0.35" />

        {/* Neck */}
        <rect x="378" y="142" width="24" height="32" rx="5" fill="#f3b18c" />

        {/* Big Cheerful Head */}
        <circle cx="390" cy="105" r="48" fill="#f3b18c" />

        {/* Hair Cut */}
        <path d="M 342 105 C 338 64 360 44 390 44 C 420 44 442 64 438 105 C 430 88 416 76 390 76 C 364 76 350 88 342 105 Z" fill="#3b271d" />

        {/* Eyes (Blinking with Catchlight) */}
        <g className="lively-blink">
          <circle cx="372" cy="101" r="5" fill="#3b271d" />
          <circle cx="374" cy="99" r="2" fill="#ffffff" />
          
          <circle cx="408" cy="101" r="5" fill="#3b271d" />
          <circle cx="410" cy="99" r="2" fill="#ffffff" />
        </g>

        {/* Big Friendly Smile */}
        <path d="M 370 118 Q 390 138 410 118 Z" fill="#ffffff" stroke="#3b271d" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 370 118 Q 390 138 410 118" stroke="#3b271d" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Rosy Blush Cheeks */}
        <circle cx="362" cy="115" r="6.5" fill="#ea7b64" opacity="0.35" />
        <circle cx="418" cy="115" r="6.5" fill="#ea7b64" opacity="0.35" />

        {/* ── 4. LEFT ARM & HAND (Holding the house firmly) ── */}
        <g id="left-arm-holding-house">
          {/* Upper Arm flowing from shoulder (315, 175) to elbow (230, 245) */}
          <path d="M 320 170 C 275 185 240 215 225 255 L 255 272 C 265 240 295 210 332 198 Z" fill="#1c2844" />
          
          {/* Forearm bending forward under the house to (245, 295) */}
          <path d="M 225 255 C 220 275 235 295 260 300 L 270 275 C 255 270 248 260 255 272 Z" fill="#22345c" />
          <rect x="250" y="278" width="20" height="9" rx="4.5" fill="#162035" transform="rotate(25 250 278)" />

          {/* ── BIG DETAILED WHITE MINIATURE HOUSE ── */}
          <g id="house-model" transform="translate(170, 195)">
            {/* Vibrant Blue Gabled Roof */}
            <polygon points="-5,45 45,0 95,45" fill="#2563eb" />
            <polygon points="45,0 58,12 58,5 51,5" fill="#1e293b" />
            <line x1="0" y1="43" x2="45" y2="4" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />

            {/* Solid White House Base */}
            <rect x="0" y="45" width="90" height="68" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
            <rect x="0" y="45" width="90" height="7" fill="#e2e8f0" />

            {/* Two Sky Blue Windows */}
            <rect x="10" y="58" width="22" height="22" rx="3.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <line x1="21" y1="58" x2="21" y2="80" stroke="#ffffff" strokeWidth="2" />
            <line x1="10" y1="69" x2="32" y2="69" stroke="#ffffff" strokeWidth="2" />

            <rect x="58" y="58" width="22" height="22" rx="3.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <line x1="69" y1="58" x2="69" y2="80" stroke="#ffffff" strokeWidth="2" />
            <line x1="58" y1="69" x2="80" y2="69" stroke="#ffffff" strokeWidth="2" />

            {/* Dark Navy Door */}
            <rect x="35" y="70" width="20" height="43" rx="2.5" fill="#0f172a" />
            <circle cx="49" cy="92" r="2" fill="#fbbf24" />
          </g>

          {/* HAND GRASPING THE BASE AND SIDE OF THE HOUSE */}
          {/* Palm under the house */}
          <ellipse cx="230" cy="308" rx="22" ry="12" fill="#f3b18c" />
          {/* Thumb wrapping the left corner */}
          <ellipse cx="178" cy="285" rx="8" ry="14" fill="#f3b18c" transform="rotate(-20 178 285)" />
          {/* 4 Fingers supporting underneath */}
          <rect x="205" y="306" width="7" height="18" rx="3.5" fill="#f3b18c" />
          <rect x="216" y="308" width="7" height="20" rx="3.5" fill="#f3b18c" />
          <rect x="227" y="308" width="7" height="20" rx="3.5" fill="#f3b18c" />
          <rect x="238" y="305" width="7" height="17" rx="3.5" fill="#f3b18c" />
        </g>

        {/* ── 5. RIGHT UPPER ARM (Smooth Curve from Shoulder to Elbow) ── */}
        <g id="right-upper-arm">
          <circle cx="465" cy="180" r="22" fill="#22345c" />
          {/* Curved Upper Arm towards (515, 220) */}
          <path d="M 465 170 C 490 170 512 195 518 220 L 492 232 C 485 212 470 195 455 190 Z" fill="#22345c" />
          {/* Smooth Elbow Joint Pivot */}
          <circle cx="515" cy="220" r="17" fill="#22345c" />
        </g>
      </g>

      {/* ── 6. RIGHT FOREARM & HAND (Natural Elbow Waving Animation) ── */}
      <g className="waving-forearm-smooth">
        {/* Forearm bent upwards towards (550, 115) */}
        <path d="M 505 216 L 544 118 C 548 106 562 110 558 122 L 526 226 Z" fill="#22345c" />
        <rect x="536" y="108" width="26" height="8" rx="4" fill="#182542" transform="rotate(-30 536 108)" />

        {/* Big Natural Open Hand with Greeting Fingers */}
        <g id="open-greeting-hand" transform="translate(545, 68)">
          <circle cx="18" cy="24" r="16" fill="#f3b18c" />
          <ellipse cx="2" cy="28" rx="6" ry="10" fill="#f3b18c" transform="rotate(-30 2 28)" />
          <rect x="7" y="0" width="6" height="19" rx="3" fill="#f3b18c" />
          <rect x="15" y="-5" width="6" height="23" rx="3" fill="#f3b18c" />
          <rect x="23" y="-2" width="6" height="21" rx="3" fill="#f3b18c" />
          <rect x="31" y="3" width="5.5" height="17" rx="2.8" fill="#f3b18c" />
        </g>
      </g>

      {/* ── 7. EXTRA LARGE, ULTRA-READABLE BUTTON BADGES ── */}

      {/* Badge 1: Bottom Left (Registro AICAT Nº 5583) - Huge & Super Clear */}
      <g id="badge-aicat" transform="translate(15, 345)">
        <rect x="0" y="0" width="295" height="60" rx="30" fill="#2563eb" stroke="#60a5fa" strokeWidth="2.5" filter="drop-shadow(0 8px 18px rgba(37,99,235,0.5))" />
        <circle cx="30" cy="30" r="19" fill="#ffffff" opacity="0.25" />
        <path d="M 21 30 L 27 36 L 39 24" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="31" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18.5" fontWeight="900" dominantBaseline="central" letterSpacing="0.2">
          Registro AICAT Nº 5583
        </text>
      </g>

      {/* Badge 2: Top Right (+15 Años) - Huge & Super Clear */}
      <g id="badge-exp" transform="translate(470, 20)">
        <rect x="0" y="0" width="295" height="60" rx="30" fill="#0b1322" stroke="#2563eb" strokeWidth="3.5" filter="drop-shadow(0 8px 20px rgba(0,0,0,0.7))" />
        <circle cx="30" cy="30" r="18" fill="#2563eb" />
        <polygon points="30,15 33,24 43,24 35,30 38,39 30,33 22,39 25,30 17,24 27,24" fill="#ffffff" transform="scale(0.9) translate(3.5, 3.5)" />
        <text x="60" y="31" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18.5" fontWeight="900" dominantBaseline="central" letterSpacing="0.2">
          +15 años de experiencia
        </text>
      </g>
    </svg>
  );
}
