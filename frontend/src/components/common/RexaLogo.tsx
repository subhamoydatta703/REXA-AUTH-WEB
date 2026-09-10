import React from "react";

interface RexaLogoProps {
  size?: number;
  className?: string;
}

export function RexaLogo({ size = 24, className = "" }: RexaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="32"
        height="32"
        rx="7"
        fill="#0D0D0D"
        stroke="#262626"
        strokeWidth="1.5"
      />
      <path
        d="M9 11L15 16L9 21"
        stroke="#EDEDED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 21H23"
        stroke="#EDEDED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
