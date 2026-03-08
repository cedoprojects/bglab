"use client"

import { PatternConfig } from "@/types"

export function IsometricLines({ color = "#ffffff", opacity = 0.12, speed = 12 }: Partial<PatternConfig>) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-float {
          0%, 100% { transform: translateY(0px) rotate(0.5deg); opacity: 0.6; }
          50% { transform: translateY(-12px) rotate(-0.5deg); opacity: 1; }
        }
      `}</style>

      {/* Diagonal lines left */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(60deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 40px)`,
          opacity: opacity,
        }}
      />

      {/* Diagonal lines right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(120deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 40px)`,
          opacity: opacity,
        }}
      />

      {/* Floating isometric blocks */}
      {[
        { left: "15%", top: "20%", delay: 0 },
        { left: "60%", top: "40%", delay: 2 },
        { left: "80%", top: "15%", delay: 4 },
        { left: "35%", top: "65%", delay: 1.5 },
      ].map((block, i) => (
        <div
          key={i}
          className="absolute border"
          style={{
            width: "40px",
            height: "40px",
            left: block.left,
            top: block.top,
            borderColor: `${color}44`,
            transform: "rotate(45deg)",
            animation: `bglab-float ${speed}s ease-in-out infinite`,
            animationDelay: `${block.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
