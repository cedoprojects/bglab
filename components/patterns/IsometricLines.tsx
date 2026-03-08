"use client"

import { PatternConfig } from "@/types"

export function IsometricLines({ color = "#ffffff", opacity = 0.15, speed = 6 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="iso-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="100" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1="0" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1="0" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
            <line x1="0" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-pattern)" />
      </svg>
      {/* Floating building blocks */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute border border-white/10 animate-float"
          style={{
            width: `${60 + i * 20}px`,
            height: `${80 + i * 30}px`,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}
