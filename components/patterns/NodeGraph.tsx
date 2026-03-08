"use client"

import { PatternConfig } from "@/types"

// Fixed node positions in a 800×500 viewBox — looks organic, actually grid-aligned
const NODES = [
  { x: 80,  y: 90  }, { x: 220, y: 55  }, { x: 370, y: 95  }, { x: 510, y: 50  },
  { x: 650, y: 85  }, { x: 760, y: 40  }, { x: 780, y: 180 },
  { x: 130, y: 210 }, { x: 270, y: 180 }, { x: 420, y: 220 }, { x: 560, y: 175 },
  { x: 700, y: 220 },
  { x: 50,  y: 340 }, { x: 190, y: 310 }, { x: 330, y: 360 }, { x: 480, y: 310 },
  { x: 620, y: 350 }, { x: 760, y: 320 },
  { x: 100, y: 460 }, { x: 280, y: 440 }, { x: 450, y: 460 }, { x: 620, y: 470 },
  { x: 760, y: 450 },
]

const EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  [0,7],[1,7],[1,8],[2,8],[2,9],[3,9],[3,10],[4,10],[4,11],[6,11],
  [7,8],[8,9],[9,10],[10,11],
  [7,12],[7,13],[8,13],[8,14],[9,14],[9,15],[10,15],[10,16],[11,16],[11,17],
  [12,13],[13,14],[14,15],[15,16],[16,17],
  [12,18],[13,18],[13,19],[14,19],[14,20],[15,20],[16,20],[16,21],[17,21],[17,22],
  [18,19],[19,20],[20,21],[21,22],
]

// Nodes that get a pulsing ring — spaced out for visual balance
const PULSE_NODES = new Set([1, 4, 9, 14, 17, 20])

export function NodeGraph({ color = "#ffffff", opacity = 0.12, speed = 8, size = 1 }: Partial<PatternConfig>) {
  const nodeR  = Math.max(1.5, 2 * size)
  const pulseR = Math.max(8,  14 * size)

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ color, "--pattern-speed": `${speed}s` } as React.CSSProperties}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="currentColor" strokeWidth={0.7} opacity={opacity * 0.65}
          />
        ))}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            {/* Pulse ring */}
            {PULSE_NODES.has(i) && (
              <circle
                cx={n.x} cy={n.y} r={pulseR}
                fill="none" stroke="currentColor" strokeWidth={0.6}
                opacity={opacity * 0.5}
                className="animate-ripple"
                style={{
                  animationDelay: `${(i * 1.3) % speed}s`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            )}
            {/* Node dot */}
            <circle
              cx={n.x} cy={n.y} r={nodeR}
              fill="currentColor"
              opacity={opacity * 1.8}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
