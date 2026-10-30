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
      className={`absolute -bottom-3 sm:-bottom-4 left-0 w-full h-3.5 sm:h-4 pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M2,8 C25,2 50,11 75,5 C95,1 110,8 118,6"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DrawnUnderline;
