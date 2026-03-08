"use client"

import { PatternConfig } from "@/types"

export function Crosshatch({ color = "#ffffff", opacity = 0.1, speed = 10 }: Partial<PatternConfig>) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-hatch-drift {
          0% { background-position: 0 0; }
          100% { background-position: 28px 28px; }
        }
      `}</style>

      {/* Crosshatch layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(-45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%)
          `,
          backgroundSize: "14px 14px",
          opacity: opacity,
          animation: `bglab-hatch-drift ${speed}s linear infinite`,
        }}
      />

      {/* Coarser overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(-45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%)
          `,
          backgroundSize: "42px 42px",
          opacity: opacity * 0.4,
        }}
      />
    </div>
  )
}
