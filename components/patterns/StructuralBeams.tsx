"use client"

import { PatternConfig } from "@/types"

export function StructuralBeams({ color = "#ffffff", opacity = 0.1, speed = 4 }: Partial<PatternConfig>) {
  const beams = [
    { x1: "0%", y1: "20%", x2: "100%", y2: "80%", delay: 0 },
    { x1: "20%", y1: "0%", x2: "80%", y2: "100%", delay: 1 },
    { x1: "0%", y1: "60%", x2: "100%", y2: "30%", delay: 2 },
    { x1: "50%", y1: "0%", x2: "50%", y2: "100%", delay: 0.5 },
    { x1: "0%", y1: "0%", x2: "100%", y2: "50%", delay: 1.5 },
  ]

  const nodes = [
    { cx: "20%", cy: "30%", delay: 0 },
    { cx: "50%", cy: "50%", delay: 1 },
    { cx: "75%", cy: "25%", delay: 2 },
    { cx: "30%", cy: "70%", delay: 0.5 },
    { cx: "85%", cy: "65%", delay: 1.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-pulse-node {
          0%, 100% { r: 3; opacity: 0.4; }
          50% { r: 6; opacity: 1; }
        }
        @keyframes bglab-beam-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {beams.map((b, i) => (
          <line
            key={i}
            x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
            stroke={color}
            strokeWidth="1"
            style={{
              opacity: opacity * 2,
              animation: `bglab-beam-glow ${speed + i}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy}
            r="3"
            fill={color}
            style={{
              opacity: opacity * 4,
              animation: `bglab-pulse-node ${speed}s ease-in-out infinite`,
              animationDelay: `${n.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
