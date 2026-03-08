"use client"

import { PatternConfig } from "@/types"

export function ConcreteNoise({ color = "#ffffff", opacity = 0.04, speed = 10 }: Partial<PatternConfig>) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      {/* SVG fractal noise filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="concrete-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      {/* Noise overlay */}
      <div
        className="absolute inset-0"
        style={{ filter: "url(#concrete-noise)", opacity }}
      />
      {/* Formwork vertical marks */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 119px, currentColor 119px, currentColor 120px)`,
          opacity: opacity * 1.5,
        }}
      />
      {/* Light sweep */}
      <div
        className="absolute inset-0 animate-light-sweep"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  )
}
