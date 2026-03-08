"use client"

import { PatternConfig } from "@/types"

export function DotMatrix({ color = "#ffffff", opacity = 0.15, speed = 6 }: Partial<PatternConfig>) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
      `}</style>

      {/* Fine dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: opacity,
        }}
      />

      {/* Accent dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 2px, transparent 2px)`,
          backgroundSize: "96px 96px",
          opacity: opacity * 0.7,
        }}
      />

      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: "300px",
            height: "300px",
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
            borderColor: `${color}22`,
            animation: `bglab-ripple ${speed + i}s ease-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
