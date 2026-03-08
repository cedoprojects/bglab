"use client"

import { PatternConfig } from "@/types"

export function GeometricBlocks({ color = "#ffffff", opacity = 0.08, speed = 8, size = 1 }: Partial<PatternConfig>) {
  const s = size
  const blocks = [
    { w: Math.round(120*s), h: Math.round(200*s), x: 10, y: 20, delay: 0 },
    { w: Math.round(80*s),  h: Math.round(150*s), x: 25, y: 45, delay: 0.5 },
    { w: Math.round(100*s), h: Math.round(180*s), x: 45, y: 15, delay: 1 },
    { w: Math.round(60*s),  h: Math.round(120*s), x: 60, y: 55, delay: 1.5 },
    { w: Math.round(140*s), h: Math.round(220*s), x: 75, y: 25, delay: 2 },
    { w: Math.round(90*s),  h: Math.round(160*s), x: 88, y: 50, delay: 2.5 },
  ]

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.05,
        }}
      />
      {/* Building blocks */}
      {blocks.map((block, i) => (
        <div
          key={i}
          className="absolute border border-white/[0.08] animate-build"
          style={{
            width: `${block.w}px`,
            height: `${block.h}px`,
            left: `${block.x}%`,
            top: `${block.y}%`,
            animationDelay: `${block.delay}s`,
            opacity,
          }}
        >
          {/* Inner structure */}
          <div className="absolute inset-2 border-t border-l border-white/[0.05]" />
          <div className="absolute bottom-2 right-2 left-2 h-px bg-white/[0.05]" />
          {/* Windows */}
          <div className="absolute inset-4 grid grid-cols-2 gap-1 opacity-30">
            {[...Array(6)].map((_, j) => (
              <div
                key={j}
                className="bg-white/5 animate-flicker"
                style={{ animationDelay: `${j * 0.3 + block.delay}s` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
