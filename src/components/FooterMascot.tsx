export function FooterMascot({ className = "w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 320" className={className} fill="none" role="img" aria-label="Mascota oficial de Gesgrama saludando">
      <defs>
        <style>{`
          @keyframes waveForearmGreeting {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(18deg);
            }
            50% {
              transform: rotate(-10deg);
            }
            75% {
              transform: rotate(20deg);
            }
          }

          @keyframes naturalBlink {
            0%, 90%, 100% {
              transform: scaleY(1);
            }
            95% {
              transform: scaleY(0.1);
            }
          }

          .forearm-waving {
            animation: waveForearmGreeting 2s ease-in-out infinite;
            transform-origin: 246px 172px;
          }

          .eyes-blinking {
            animation: naturalBlink 4s ease-in-out infinite;
            transform-origin: 180px 84px;
          }

          @media (prefers-reduced-motion: reduce) {
            .forearm-waving, .eyes-blinking {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* ── 1. SUELO (Solid Shadow Base) ── */}
      <ellipse cx="180" cy="298" rx="105" ry="11" fill="#111111" opacity="0.25" />
      <ellipse cx="180" cy="298" rx="85" ry="8" fill="#111111" opacity="0.4" />

      {/* ── 2. BACKGROUND CIRCLE ── */}
      <circle cx="180" cy="155" r="108" fill="#111111" stroke="#2860F5" strokeWidth="3" />
      <circle cx="180" cy="155" r="102" fill="#1A1A1A" />

      {/* ── 3. CHARACTER BODY ── */}
      <g id="character">
        {/* Legs */}
        <rect x="154" y="208" width="22" height="70" rx="4" fill="#111111" />
        <rect x="184" y="208" width="22" height="70" rx="4" fill="#111111" />

        {/* Shoes */}
        <rect x="146" y="272" width="32" height="15" rx="7.5" fill="#000000" />
        <rect x="182" y="272" width="32" height="15" rx="7.5" fill="#000000" />

        {/* Torso */}
        <path d="M 128 130 C 128 130, 232 130, 232 130 C 242 130, 248 138, 248 148 L 238 218 C 238 226, 228 234, 218 234 L 142 234 C 132 234, 122 226, 122 218 L 112 148 C 112 138, 118 130, 128 130 Z" fill="#2860F5" />
        
        {/* Symmetrical Shoulders */}
        <circle cx="124" cy="140" r="15" fill="#2860F5" />
        <circle cx="236" cy="140" r="15" fill="#2860F5" />

        {/* Lapels */}
        <path d="M 128 130 L 164 185 L 152 230" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 232 130 L 196 185 L 208 230" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

        {/* Crisp White Shirt Collar */}
        <polygon points="164,130 180,158 196,130 180,130" fill="#ffffff" />

        {/* Blue Tie */}
        <polygon points="176,138 184,138 186,195 180,202 174,195" fill="#111111" />

        {/* Neck */}
        <rect x="173" y="112" width="14" height="20" rx="3" fill="#f3b18c" />

        {/* Head */}
        <circle cx="180" cy="84" r="32" fill="#f3b18c" />

        {/* Hair */}
        <path d="M 148 84 C 144 55 160 42 180 42 C 200 42 216 55 212 84 C 206 72 196 62 180 62 C 164 62 154 72 148 84 Z" fill="#3b271d" />

        {/* Eyes (Blinking) */}
        <g className="eyes-blinking">
          <circle cx="168" cy="81" r="3.2" fill="#3b271d" />
          <circle cx="170" cy="79.5" r="1.2" fill="#ffffff" />
          
          <circle cx="192" cy="81" r="3.2" fill="#3b271d" />
          <circle cx="194" cy="79.5" r="1.2" fill="#ffffff" />
        </g>

        {/* Happy Smile */}
        <path d="M 167 92 Q 180 104 193 92 Z" fill="#ffffff" stroke="#3b271d" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 167 92 Q 180 104 193 92" stroke="#3b271d" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Rosy Cheeks */}
        <circle cx="161" cy="90" r="4" fill="#ea7b64" opacity="0.35" />
        <circle cx="199" cy="90" r="4" fill="#ea7b64" opacity="0.35" />

        {/* ── LEFT ARM (Holding House) ── */}
        <g id="left-arm">
          <path d="M 124 140 L 95 184 L 112 194 L 138 149 Z" fill="#2860F5" />
          <path d="M 95 184 L 78 194 L 84 208 L 112 194 Z" fill="#2860F5" />
          <rect x="73" y="190" width="13" height="5.5" rx="2.7" fill="#111111" transform="rotate(30 73 190)" />

          <ellipse cx="76" cy="202" rx="13" ry="6.5" fill="#f3b18c" />
          <ellipse cx="49" cy="192" rx="4" ry="6.5" fill="#f3b18c" transform="rotate(-15 49 192)" />
        </g>

        {/* ── SOLID WHITE MINIATURE HOUSE ── */}
        <g id="house" transform="translate(46, 142)">
          <polygon points="-3,28 26,2 55,28" fill="#2860F5" />
          <polygon points="26,2 33,8 33,4 29,4" fill="#111111" />
          <line x1="0" y1="26" x2="26" y2="4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

          <rect x="0" y="28" width="52" height="38" rx="3" fill="#ffffff" stroke="#111111" strokeWidth="2" />
          <rect x="0" y="28" width="52" height="4" fill="#2860F5" />

          <rect x="6" y="34" width="12" height="12" rx="2" fill="#2860F5" stroke="#111111" strokeWidth="1.5" />
          <line x1="12" y1="34" x2="12" y2="46" stroke="#ffffff" strokeWidth="1" />
          <line x1="6" y1="40" x2="18" y2="40" stroke="#ffffff" strokeWidth="1" />

          <rect x="34" y="34" width="12" height="12" rx="2" fill="#2860F5" stroke="#111111" strokeWidth="1.5" />
          <line x1="40" y1="34" x2="40" y2="46" stroke="#ffffff" strokeWidth="1" />
          <line x1="34" y1="40" x2="46" y2="40" stroke="#ffffff" strokeWidth="1" />

          <rect x="20" y="41" width="11" height="25" rx="1.5" fill="#111111" />
          <circle cx="28.5" cy="53" r="1" fill="#fbbf24" />
        </g>

        {/* ── RIGHT UPPER ARM ── */}
        <g id="right-upper-arm">
          <path d="M 236 140 L 254 168 L 238 178 L 222 148 Z" fill="#2860F5" />
          <circle cx="246" cy="172" r="10" fill="#2860F5" />
        </g>

        {/* ── RIGHT FOREARM & FRONT-FACING GREETING HAND ── */}
        <g className="forearm-waving">
          <path d="M 238 172 L 254 108 L 272 108 L 256 172 Z" fill="#2860F5" />
          <rect x="250" y="104" width="26" height="7" rx="3.5" fill="#111111" />
          <g id="upright-greeting-hand" transform="translate(263, 106)">
            <rect x="-8" y="-18" width="16" height="18" rx="6" fill="#f3b18c" />
            <rect x="-13" y="-12" width="6" height="10" rx="3" fill="#f3b18c" transform="rotate(-30 -10 -7)" />
            <rect x="-7.5" y="-29" width="3.2" height="16" rx="1.6" fill="#f3b18c" />
            <rect x="-3" y="-32" width="3.2" height="18" rx="1.6" fill="#f3b18c" />
            <rect x="1.5" y="-31" width="3.2" height="17" rx="1.6" fill="#f3b18c" />
            <rect x="4.8" y="-27" width="3.2" height="16" rx="1.6" fill="#f3b18c" />
          </g>
        </g>
      </g>
    </svg>
  );
}
