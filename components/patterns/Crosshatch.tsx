"use client"

import { PatternConfig } from "@/types"

export function Crosshatch({ color = "#ffffff", opacity = 0.15, speed = 12, size = 1 }: Partial<PatternConfig>) {
  const cellSize = Math.round(40 * size)
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="crosshatch" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2={cellSize} stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1={cellSize / 2} y1="0" x2={cellSize / 2} y2={cellSize} stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.6} />
          </pattern>
          <pattern id="crosshatch2" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2={cellSize} stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1={cellSize / 2} y1="0" x2={cellSize / 2} y2={cellSize} stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.6} />
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
