"use client"

import { PatternConfig } from "@/types"

export function BlueprintGrid({ color = "#ffffff", opacity = 0.15, speed = 8 }: Partial<PatternConfig>) {
  const animDuration = `${speed}s`

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Major grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: opacity,
        }}
      />

      {/* Minor grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          opacity: opacity * 0.5,
        }}
      />

      {/* Scanning line */}
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}66, transparent)`,
          animation: `bglab-scan ${animDuration} linear infinite`,
        }}
      />
    </div>
  )
}
