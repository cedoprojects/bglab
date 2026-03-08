"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PatternConfig } from "@/types"

export function usePatternConfig(defaults: PatternConfig): PatternConfig & {
  setColor: (v: string) => void
  setOpacity: (v: number) => void
  setSpeed: (v: number) => void
} {
  const router = useRouter()
  const params = useSearchParams()

  const color = params.get("color") ? `#${params.get("color")}` : defaults.color
  const opacity = params.get("opacity") ? parseFloat(params.get("opacity")!) : defaults.opacity
  const speed = params.get("speed") ? parseFloat(params.get("speed")!) : defaults.speed

  const update = useCallback((key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    next.set(key, value)
    router.replace(`?${next.toString()}`, { scroll: false })
  }, [params, router])

  const setColor = (v: string) => update("color", v.replace("#", ""))
  const setOpacity = (v: number) => update("opacity", String(v))
  const setSpeed = (v: number) => update("speed", String(v))

  return { color, opacity, speed, setColor, setOpacity, setSpeed }
}
