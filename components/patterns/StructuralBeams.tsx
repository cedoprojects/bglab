"use client"

import { PatternConfig } from "@/types"

export function StructuralBeams({ color = "#ffffff", opacity = 0.15, speed = 4 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      {/* Vertical beams */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
          style={{ left: `${12.5 * (i + 1)}%`, opacity }}
        />
      ))}
      {/* Horizontal beams */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px overflow-hidden"
          style={{ top: `${20 * (i + 1)}%` }}
        >
          <div
            className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-beam"
            style={{ animationDelay: `${i * 0.5}s`, opacity }}
          />
        </div>
      ))}
      {/* Connection nodes */}
      {[...Array(8)].map((_, i) =>
        [...Array(5)].map((_, j) => (
          <div
            key={`node-${i}-${j}`}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-pulse"
            style={{
              left: `${12.5 * (i + 1)}%`,
              top: `${20 * (j + 1)}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${(i + j) * 0.2}s`,
              opacity,
            }}
          />
        ))
      )}
    </div>
  )
}
