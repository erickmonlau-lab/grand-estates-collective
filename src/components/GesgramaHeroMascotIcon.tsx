import React from "react";

export function GesgramaHeroMascotIcon({ className = "w-[34px] h-[34px] shrink-0" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 225 225"
      className={className}
      fill="none"
      role="img"
      aria-label="Gesgrama - Asesor, casa y gestión"
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="112.5" cy="112.5" r="102" />
        </clipPath>
      </defs>

      {/* ── 1. CÍRCULO BASE EMBLEMA GESGRAMA ── */}
      <circle cx="112.5" cy="112.5" r="108" fill="#111111" stroke="#2860F5" strokeWidth="4" />
      <circle cx="112.5" cy="112.5" r="102" fill="#18233d" />

      {/* Sombra base del personaje */}
      <ellipse cx="112.5" cy="202" rx="65" ry="8" fill="#0f172a" opacity="0.9" />

      {/* ── 2. CUERPO DEL PROFESIONAL / ASESOR (CENTRO-DERECHA) ── */}
      <g id="professional" clipPath="url(#circleClip)">
        {/* Traje / Chaqueta azul corporativa Gesgrama */}
        <path
          d="M 80 102 C 80 102, 146 102, 146 102 C 153 102, 157 107, 157 114 L 150 168 C 150 174, 143 180, 136 180 L 90 180 C 83 180, 77 174, 77 168 L 70 114 C 70 107, 74 102, 80 102 Z"
          fill="#2860F5"
        />

        {/* Hombros simétricos profesionales */}
        <circle cx="78" cy="108" r="10" fill="#2860F5" />
        <circle cx="148" cy="108" r="10" fill="#2860F5" />

        {/* Solapas de la chaqueta */}
        <path d="M 80 102 L 102 140 L 95 170" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <path d="M 146 102 L 124 140 L 131 170" stroke="#111111" strokeWidth="2" strokeLinecap="round" />

        {/* Cuello de camisa blanca impecable */}
        <polygon points="102,102 113,122 124,102 113,102" fill="#ffffff" />

        {/* Corbata azul oscuro corporativo / negra */}
        <polygon points="110,107 116,107 117,148 113,153 109,148" fill="#111111" />

        {/* Cuello y Cabeza */}
        <rect x="108" y="88" width="10" height="15" rx="2" fill="#f3b18c" />
        <circle cx="113" cy="68" r="23" fill="#f3b18c" />

        {/* Pelo profesional oscuro */}
        <path
          d="M 91 68 C 88 47 100 37 113 37 C 126 37 138 47 135 68 C 131 59 124 52 113 52 C 102 52 95 59 91 68 Z"
          fill="#2d1c14"
        />

        {/* Ojos expresivos y amables */}
        <circle cx="104" cy="65" r="2.5" fill="#2d1c14" />
        <circle cx="105.5" cy="64" r="0.9" fill="#ffffff" />
        <circle cx="122" cy="65" r="2.5" fill="#2d1c14" />
        <circle cx="123.5" cy="64" r="0.9" fill="#ffffff" />

        {/* Sonrisa de confianza */}
        <path d="M 104 74 Q 113 83 122 74" stroke="#2d1c14" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="99" cy="73" r="3" fill="#ea7b64" opacity="0.3" />
        <circle cx="127" cy="73" r="3" fill="#ea7b64" opacity="0.3" />

        {/* ── BRAZO DERECHO: SOSTENIENDO LA CARPETA DE GESTIÓN DE FINCAS ── */}
        <g id="arm-folder">
          <path d="M 148 108 L 160 128 L 150 135 L 138 115 Z" fill="#2860F5" />
          <ellipse cx="152" cy="144" rx="8" ry="4.5" fill="#f3b18c" transform="rotate(15 152 144)" />

          {/* Carpeta corporativa de fincas (Folder / Dossier) */}
          <g id="folder" transform="translate(142, 126) rotate(12)">
            {/* Pestaña de la carpeta */}
            <path d="M 2 4 L 14 4 L 18 8 L 36 8 L 36 34 L 2 34 Z" fill="#2860F5" stroke="#ffffff" strokeWidth="1.5" />
            {/* Documentos interiores blancos asomando */}
            <rect x="6" y="6" width="26" height="24" rx="1" fill="#ffffff" />
            <line x1="10" y1="12" x2="28" y2="12" stroke="#2860F5" strokeWidth="1.2" />
            <line x1="10" y1="17" x2="24" y2="17" stroke="#2860F5" strokeWidth="1.2" />
            {/* Cubierta frontal de la carpeta */}
            <rect x="2" y="8" width="34" height="26" rx="2" fill="#111111" stroke="#ffffff" strokeWidth="1.2" />
            {/* Sello / etiqueta dorada de la comunidad */}
            <circle cx="12" cy="21" r="3.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </g>

        {/* ── BRAZO IZQUIERDO: PRESENTANDO Y SOSTENIENDO LA CASA INMOBILIARIA ── */}
        <g id="arm-house">
          <path d="M 78 108 L 56 138 L 68 145 L 86 114 Z" fill="#2860F5" />
          <path d="M 56 138 L 45 145 L 49 154 L 68 145 Z" fill="#2860F5" />
          <ellipse cx="46" cy="151" rx="8" ry="4.5" fill="#f3b18c" />
        </g>
      </g>

      {/* ── 3. CASA MINIATURA ILUSTRADA (PROPIEDADES / HOGAR) ── */}
      <g id="mini-house" transform="translate(24, 108)">
        {/* Tejado azul corporativo con chimenea */}
        <polygon points="-2,22 20,2 42,22" fill="#2860F5" />
        <polygon points="20,2 25,6 25,3 22,3" fill="#111111" />
        <line x1="0" y1="20" x2="20" y2="3" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />

        {/* Fachada blanca sólida nítida con borde negro fino */}
        <rect x="0" y="22" width="40" height="30" rx="2" fill="#ffffff" stroke="#111111" strokeWidth="1.5" />
        <rect x="0" y="22" width="40" height="3" fill="#2860F5" />

        {/* Ventanas azules luminosas */}
        <rect x="5" y="27" width="9" height="9" rx="1.5" fill="#38bdf8" stroke="#111111" strokeWidth="1" />
        <line x1="9.5" y1="27" x2="9.5" y2="36" stroke="#ffffff" strokeWidth="0.8" />
        <line x1="5" y1="31.5" x2="14" y2="31.5" stroke="#ffffff" strokeWidth="0.8" />

        <rect x="26" y="27" width="9" height="9" rx="1.5" fill="#38bdf8" stroke="#111111" strokeWidth="1" />
        <line x1="30.5" y1="27" x2="30.5" y2="36" stroke="#ffffff" strokeWidth="0.8" />
        <line x1="26" y1="31.5" x2="35" y2="31.5" stroke="#ffffff" strokeWidth="0.8" />

        {/* Puerta principal sólida con pomo */}
        <rect x="15" y="32" width="9" height="20" rx="1" fill="#111111" />
        <circle cx="21.5" cy="42" r="0.8" fill="#fbbf24" />
      </g>

      {/* ── 4. DETALLES DE CORONA / CALIDAD ── */}
      {/* Destellos de profesionalidad (Sparkles) */}
      <circle cx="188" cy="48" r="2.5" fill="#fbbf24" />
      <path d="M 188 42 L 188 54 M 182 48 L 194 48" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />

      <circle cx="36" cy="72" r="2" fill="#ffffff" opacity="0.9" />
      <path d="M 36 67 L 36 77 M 31 72 L 41 72" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
