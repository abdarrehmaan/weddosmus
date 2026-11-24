import React from "react";

export interface ScallopedCartoucheSvgProps {
  parchmentStart?: string;
  parchmentMid?: string;
  parchmentEnd?: string;
  filigreeColor?: string;
  filigreeStart?: string;
  filigreeEnd?: string;
}

export default function ScallopedCartoucheSvg({
  parchmentStart = "#FCFAF6",
  parchmentMid = "#F8F2E8",
  parchmentEnd = "#EFE4D4",
  filigreeColor = "#C59B48",
  filigreeStart = "#D4A757",
  filigreeEnd = "#9E7528",
}: ScallopedCartoucheSvgProps) {
  const gradId = React.useId();
  const parchmentGradId = `parchment-${gradId}`;
  const filigreeGradId = `filigree-${gradId}`;
  const shadowId = `shadow-${gradId}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 600 880"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={parchmentGradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={parchmentStart} />
          <stop offset="50%" stopColor={parchmentMid} />
          <stop offset="100%" stopColor={parchmentEnd} />
        </linearGradient>

        <linearGradient id={filigreeGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={filigreeStart} />
          <stop offset="50%" stopColor={filigreeColor} />
          <stop offset="100%" stopColor={filigreeEnd} />
        </linearGradient>

        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#140D08" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Outer Scalloped Ogee Arch Body */}
      <path
        d="M 300.0 33.0 A 52.7 52.7 0 0 1 389.4 48.8 A 39.8 39.8 0 0 1 447.0 86.1 A 39.5 39.5 0 0 1 490.9 138.0 A 44.4 44.4 0 0 1 522.5 207.7 A 53.9 53.9 0 0 1 541.6 298.7 A 82.1 82.1 0 0 1 548.0 440.0 A 82.1 82.1 0 0 1 541.6 581.3 A 53.9 53.9 0 0 1 522.5 672.3 A 44.4 44.4 0 0 1 490.9 742.0 A 39.5 39.5 0 0 1 447.0 793.9 A 39.8 39.8 0 0 1 389.4 831.2 A 52.7 52.7 0 0 1 300.0 847.0 A 52.7 52.7 0 0 1 210.6 831.2 A 39.8 39.8 0 0 1 153.0 793.9 A 39.5 39.5 0 0 1 109.1 742.0 A 44.4 44.4 0 0 1 77.5 672.3 A 53.9 53.9 0 0 1 58.4 581.3 A 82.1 82.1 0 0 1 52.0 440.0 A 82.1 82.1 0 0 1 58.4 298.7 A 53.9 53.9 0 0 1 77.5 207.7 A 44.4 44.4 0 0 1 109.1 138.0 A 39.5 39.5 0 0 1 153.0 86.1 A 39.8 39.8 0 0 1 210.6 48.8 A 52.7 52.7 0 0 1 300.0 33.0 Z"
        fill={`url(#${parchmentGradId})`}
        stroke={`url(#${filigreeGradId})`}
        strokeWidth="2"
        filter={`url(#${shadowId})`}
      />

      {/* Inner Delicate Gold Line Following Scallops */}
      <path
        d="M 300.0 51.0 A 49.4 49.4 0 0 1 384.0 65.3 A 37.3 37.3 0 0 1 438.1 100.0 A 37.4 37.4 0 0 1 479.4 149.6 A 42.5 42.5 0 0 1 509.0 216.6 A 51.8 51.8 0 0 1 527.0 304.1 A 78.9 78.9 0 0 1 533.0 440.0 A 78.9 78.9 0 0 1 527.0 575.9 A 51.8 51.8 0 0 1 509.0 663.4 A 42.5 42.5 0 0 1 479.4 730.4 A 37.4 37.4 0 0 1 438.1 780.0 A 37.3 37.3 0 0 1 384.0 814.7 A 49.4 49.4 0 0 1 300.0 829.0 A 49.4 49.4 0 0 1 216.0 814.7 A 37.3 37.3 0 0 1 161.9 780.0 A 37.4 37.4 0 0 1 120.6 730.4 A 42.5 42.5 0 0 1 91.0 663.4 A 51.8 51.8 0 0 1 73.0 575.9 A 78.9 78.9 0 0 1 67.0 440.0 A 78.9 78.9 0 0 1 73.0 304.1 A 51.8 51.8 0 0 1 91.0 216.6 A 42.5 42.5 0 0 1 120.6 149.6 A 37.4 37.4 0 0 1 161.9 100.0 A 37.3 37.3 0 0 1 216.0 65.3 A 49.4 49.4 0 0 1 300.0 51.0 Z"
        fill="none"
        stroke={filigreeColor}
        strokeWidth="1.1"
        strokeOpacity="0.65"
      />

      {/* Intricate Golden Floral Vine Tracery */}
      <g stroke={filigreeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8">
        {/* Top Apex Compact Finial */}
        <path d="M 300 35 L 300 58" />
        <path d="M 300 48 Q 288 44 280 52 Q 288 56 295 52" />
        <path d="M 300 48 Q 312 44 320 52 Q 312 56 305 52" />
        <circle cx="300" cy="35" r="2.2" fill={filigreeStart} />
        <circle cx="280" cy="52" r="1.8" fill={filigreeStart} />
        <circle cx="320" cy="52" r="1.8" fill={filigreeStart} />

        {/* Bottom Apex Compact Finial */}
        <path d="M 300 845 L 300 822" strokeWidth="1.2" />
        <path d="M 300 832 Q 288 836 280 828 Q 288 824 295 828" />
        <path d="M 300 832 Q 312 836 320 828 Q 312 824 305 828" />
        <circle cx="300" cy="845" r="2.2" fill={filigreeStart} />
        <circle cx="280" cy="828" r="1.8" fill={filigreeStart} />
        <circle cx="320" cy="828" r="1.8" fill={filigreeStart} />

        {/* Right Side Sprigs */}
        <path d="M 479 150 Q 492 158 505 152 Q 499 165 487 162" />
        <path d="M 527 304 Q 538 315 534 327 Q 524 323 522 313" />
        <path d="M 533 440 Q 521 448 525 460 Q 531 458 533 448" />
        <path d="M 527 576 Q 538 586 532 598 Q 522 594 522 584" />
        <path d="M 479 730 Q 492 736 502 726 Q 497 741 485 739" />

        {/* Left Side Sprigs */}
        <path d="M 121 150 Q 108 158 95 152 Q 101 165 113 162" />
        <path d="M 73 304 Q 62 315 66 327 Q 76 323 78 313" />
        <path d="M 67 440 Q 79 448 75 460 Q 69 458 67 448" />
        <path d="M 73 576 Q 62 586 68 598 Q 78 594 78 584" />
        <path d="M 121 730 Q 108 736 98 726 Q 103 741 115 739" />
      </g>
    </svg>
  );
}
