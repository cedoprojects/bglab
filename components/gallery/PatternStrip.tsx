"use client"

import { useRouter } from "next/navigation"
import { patterns, PatternMeta } from "@/config/patterns"

interface Props {
  activeId: string
}

export function PatternStrip({ activeId }: Props) {
  const router = useRouter()

  return (
    <div className="border-b border-white/5 bg-neutral-950/95 backdrop-blur-sm">
      <div className="px-6 md:px-10 py-3 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <span className="text-[10px] tracking-widest text-white/20 whitespace-nowrap mr-3 shrink-0">PATTERNS</span>
        {patterns.map((p: PatternMeta) => {
          const { component: PatternComponent } = p
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => router.push(`/patterns/${p.id}`)}
              title={p.name}
              className={`relative shrink-0 w-20 h-14 overflow-hidden border transition-all duration-200 ${
                isActive
                  ? "border-white/50 ring-1 ring-white/20"
                  : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="absolute inset-0 bg-neutral-900">
                <PatternComponent {...p.defaultConfig} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className={`absolute bottom-1 left-0 right-0 text-center text-[8px] tracking-wide truncate px-1 ${
                isActive ? "text-white" : "text-white/40"
              }`}>
                {p.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
