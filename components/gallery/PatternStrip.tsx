"use client"

import { useRouter } from "next/navigation"
import { patterns, PatternMeta } from "@/config/patterns"

interface Props {
  activeId: string
}

export function PatternStrip({ activeId }: Props) {
  const router = useRouter()

  return (
    <div className="border-b border-white/5 bg-neutral-950 shrink-0">
      <div className="flex items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {/* Label */}
        <div className="shrink-0 px-4 border-r border-white/5 h-full flex items-center">
          <span className="text-[10px] tracking-widest text-white/20 whitespace-nowrap">ALL PATTERNS</span>
        </div>

        {/* Pattern thumbnails */}
        <div className="flex gap-px">
          {patterns.map((p: PatternMeta) => {
            const { component: PatternComponent } = p
            const isActive = p.id === activeId

            return (
              <button
                key={p.id}
                onClick={() => router.push(`/patterns/${p.id}`)}
                className={`group relative shrink-0 overflow-hidden transition-all duration-200 ${
                  isActive
                    ? "ring-1 ring-inset ring-white/40"
                    : "opacity-50 hover:opacity-90"
                }`}
                style={{ width: 128, height: 72 }}
              >
                {/* Live animated pattern */}
                <div className="absolute inset-0 bg-neutral-900">
                  <PatternComponent {...p.defaultConfig} />
                </div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all ${
                  isActive
                    ? "from-black/70 via-black/10 to-transparent"
                    : "from-black/80 via-black/20 to-transparent group-hover:from-black/60"
                }`} />

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2">
                  <p className={`text-[10px] font-medium leading-tight transition-colors ${
                    isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                  }`}>
                    {p.name}
                  </p>
                </div>

                {/* Active dot */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
