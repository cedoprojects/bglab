"use client"

import { PatternConfig } from "@/types"

export function PerspectiveGrid({ color = "#ffffff", opacity = 0.12, speed = 6 }: Partial<PatternConfig>) {
  const vLines = Array.from({ length: 13 }, (_, i) => i)
  const hLines = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-grid-rise {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bglab-pillar-grow {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(1.05); opacity: 1; }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {/* Perspective vanishing lines */}
        {vLines.map((i) => {
          const x = (i / 12) * 100
          return (
            <line
              key={`v${i}`}
              x1={x} y1="100"
              x2="50" y2="45"
              stroke={color}
              strokeWidth="0.2"
              opacity={opacity * 5}
              strokeDasharray="4"
              style={{
                animation: `bglab-grid-rise ${speed}s linear infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          )
        })}

        {/* Horizontal recession lines */}
        {hLines.map((i) => {
          const progress = i / 7
          const y = 45 + progress * 55
          const xOffset = progress * 50
          return (
            <line
              key={`h${i}`}
              x1={xOffset} y1={y}
              x2={100 - xOffset} y2={y}
              stroke={color}
              strokeWidth="0.15"
              opacity={opacity * 4 * progress}
            />
          )
        })}

        {/* Rising pillars at horizon */}
        {[20, 35, 50, 65, 80].map((x, i) => (
          <rect
            key={i}
            x={x - 1} y={35}
            width="2" height="10"
            fill={color}
            opacity={opacity * 3}
            style={{
              transformOrigin: `${x}% 45%`,
              animation: `bglab-pillar-grow ${speed + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
