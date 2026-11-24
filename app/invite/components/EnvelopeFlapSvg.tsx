import React from "react";

export interface EnvelopeFlapSvgProps {
  stopColor0?: string;
  stopColor60?: string;
  stopColor100?: string;
  strokeColor?: string;
}

export default function EnvelopeFlapSvg({
  stopColor0 = "#F2E3DA",
  stopColor60 = "#E9D6CA",
  stopColor100 = "#DEC4B3",
  strokeColor = "#C59B48",
}: EnvelopeFlapSvgProps) {
  const gradId = React.useId();
  const flapGradId = `flapGrad-${gradId}`;
  const flapEmbossId = `flapEmboss-${gradId}`;

  return (
    <svg
      className="w-full h-full block"
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={flapGradId} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={stopColor0} />
          <stop offset="60%" stopColor={stopColor60} />
          <stop offset="100%" stopColor={stopColor100} />
        </linearGradient>
        <filter id={flapEmbossId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#2D1D14" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* Triangular Fold Path */}
      <path d="M0,0 L1000,0 L500,480 Z" fill={`url(#${flapGradId})`} filter={`url(#${flapEmbossId})`} />

      {/* Subtle Flap Decorative Gold Border Lines */}
      <path
        d="M40,15 L500,455 L960,15"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeOpacity="0.5"
        strokeDasharray="8 6"
      />
      <path
        d="M80,25 L500,430 L920,25"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.32"
      />
    </svg>
  );
}
