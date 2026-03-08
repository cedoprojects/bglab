"use client"

import { PatternConfig } from "@/types"
import { useEffect, useRef } from "react"

export function ConcreteNoise({ color = "#ffffff", opacity = 0.06, speed = 20 }: Partial<PatternConfig>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 256
    canvas.height = 256

    // Parse hex color to rgb
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)

    const imageData = ctx.createImageData(256, 256)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = Math.random()
      const alpha = noise * opacity * 255
      imageData.data[i] = r
      imageData.data[i + 1] = g
      imageData.data[i + 2] = b
      imageData.data[i + 3] = alpha
    }
    ctx.putImageData(imageData, 0, 0)
  }, [color, opacity])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes bglab-noise-shift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Formwork horizontal marks */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${color}08 0px, transparent 1px, transparent 32px, ${color}08 33px)`,
        }}
      />

      {/* Grain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          imageRendering: "pixelated",
          animation: `bglab-noise-shift ${speed}s ease-in-out infinite`,
        }}
      />
    </div>
  )
}
