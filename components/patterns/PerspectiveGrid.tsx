"use client"

import { PatternConfig } from "@/types"

export function PerspectiveGrid({ color = "#ffffff", opacity = 0.15, speed = 4, size = 1 }: Partial<PatternConfig>) {
  const lineCount = Math.max(6, Math.round(20 / size))
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fade-up" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity={opacity} />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Converging vertical lines */}
        {[...Array(lineCount)].map((_, i) => {
          const half = lineCount / 2
          const startX = 50 + (i - half) * (100 / lineCount)
          const endX   = 50 + (i - half) * (300 / lineCount)
          return (
            <line
              key={`v-${i}`}
              x1={`${startX}%`} y1="30%"
              x2={`${endX}%`}   y2="100%"
              stroke="url(#fade-up)"
              strokeWidth="0.5"
            />
          )
        })}
        {/* Horizontal perspective lines */}
        {[...Array(8)].map((_, i) => {
          const y      = 35 + i * 10
          const shrink = (100 - y) / 100
          return (
            <line
              key={`h-${i}`}
              x1={`${50 - 50 * shrink * 1.5}%`} y1={`${y}%`}
              x2={`${50 + 50 * shrink * 1.5}%`} y2={`${y}%`}
              stroke="white"
              strokeOpacity={0.08 + i * 0.02}
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
      {/* Horizon glow */}
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      {/* Rising elements */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 bg-gradient-to-t from-white/10 to-transparent animate-rise"
          style={{
            width: "2px",
            height: "30%",
            left: `${35 + i * 15}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  )
}
