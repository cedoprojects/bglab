"use client"

import { PatternConfig } from "@/types"

export function BlueprintGrid({ color = "#ffffff", opacity = 0.15, speed = 8 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      {/* Major grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: opacity,
        }}
      />
      {/* Minor grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          opacity: opacity * 0.5,
        }}
      />
      {/* Scanning line */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan"
      />
    </div>
  )
}
