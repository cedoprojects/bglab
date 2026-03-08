"use client"

import { PatternConfig } from "@/types"

export function DotMatrix({ color = "#ffffff", opacity = 0.15, speed = 6 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      {/* Fine dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity,
        }}
      />
      {/* Accent dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 2px, transparent 2px)`,
          backgroundSize: "96px 96px",
          opacity: opacity * 0.7,
        }}
      />
      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/10 animate-ripple"
          style={{
            width: "300px",
            height: "300px",
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
