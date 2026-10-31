import React from "react";

interface DrawnUnderlineProps {
  className?: string;
  color?: string;
}

export function DrawnUnderline({
  className = "text-[#2860F5]",
  color = "currentColor"
}: DrawnUnderlineProps) {
  return (
    <svg
      className={`absolute bottom-[2px] sm:bottom-[3px] left-0 w-full h-2.5 sm:h-3 pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M2,8 C25,3 50,11 75,5 C95,2 110,8 118,6"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DrawnUnderline;
