"use client"

import { PatternConfig } from "@/types"

export function GeometricBlocks({ color = "#ffffff", opacity = 0.08, speed = 15 }: Partial<PatternConfig>) {
  const blocks = [
    { x: "5%", y: "60%", w: 60, h: 120, delay: 0 },
    { x: "15%", y: "40%", w: 80, h: 160, delay: 1 },
    { x: "28%", y: "55%", w: 50, h: 90, delay: 2 },
    { x: "42%", y: "30%", w: 100, h: 200, delay: 0.5 },
    { x: "58%", y: "50%", w: 70, h: 130, delay: 1.5 },
    { x: "72%", y: "35%", w: 90, h: 170, delay: 3 },
    { x: "86%", y: "55%", w: 55, h: 110, delay: 2.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-rise {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {blocks.map((b, i) => (
          <g key={i} style={{
            animation: `bglab-rise ${speed + i * 2}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}>
            {/* Building body */}
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={color} strokeWidth="1" opacity={opacity * 5} />
            {/* Windows */}
            {[...Array(3)].map((_, row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={`calc(${b.x} + ${8 + col * 20}px)`}
                  y={`calc(${b.y} + ${10 + row * 25}px)`}
                  width="10"
                  height="14"
                  fill={color}
                  opacity={opacity * 3}
                />
              ))
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
