"use client"

import { PatternConfig } from "@/types"

export function Crosshatch({ color = "#ffffff", opacity = 0.15, speed = 12 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="crosshatch" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.6} />
          </pattern>
          <pattern id="crosshatch2" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.6} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crosshatch)" />
        <rect width="100%" height="100%" fill="url(#crosshatch2)" />
      </svg>
      {/* Animated diagonal sweep */}
      <div
        className="absolute inset-0 animate-sweep"
        style={{
          background: "linear-gradient(to right, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  )
}
