"use client"

import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { patterns, PatternMeta } from "@/config/patterns"

interface Props {
  activeId: string
  onGenerateClick: () => void
}

export function PatternStrip({ activeId, onGenerateClick }: Props) {
  const router = useRouter()

  return (
    <div className="border-b border-white/[0.07] bg-neutral-950 shrink-0">
      <div className="flex items-stretch overflow-x-auto" style={{ scrollbarWidth: "none" }}>

        {/* Label */}
        <div className="shrink-0 px-4 border-r border-white/[0.07] flex items-center">
          <span className="text-[10px] tracking-widest text-white/20 whitespace-nowrap">PATTERNS</span>
        </div>

        {/* Curated patterns */}
        {patterns.map((p: PatternMeta) => {
          const { component: PatternComponent } = p
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => router.push(`/patterns/${p.id}`)}
              title={p.name}
              className={`group relative shrink-0 overflow-hidden transition-all duration-200 border-r border-white/[0.07] ${
                isActive ? "ring-1 ring-inset ring-white/30" : "opacity-50 hover:opacity-90"
              }`}
              style={{ width: 120, height: 68 }}
            >
              <div className="absolute inset-0 bg-neutral-900">
                <PatternComponent {...p.defaultConfig} />
              </div>
              <div className={`absolute inset-0 transition-all bg-gradient-to-t ${
                isActive ? "from-black/70 to-transparent" : "from-black/80 to-black/10 group-hover:from-black/60"
              }`} />
              <div className="absolute bottom-0 left-0 right-0 px-2 pb-1.5">
                <p className={`text-[10px] font-medium leading-tight ${
                  isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                }`}>
                  {p.name}
                </p>
              </div>
              {isActive && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          )
        })}

        {/* AI generate button */}
        <button
          onClick={onGenerateClick}
          className="shrink-0 flex flex-col items-center justify-center gap-1.5 px-5 text-white/30 hover:text-white hover:bg-white/[0.04] transition-all border-r border-white/[0.07]"
          style={{ minWidth: 100, height: 68 }}
        >
          <Sparkles size={14} />
          <span className="text-[10px] tracking-wide whitespace-nowrap">Generate</span>
        </button>
      </div>
    </div>
  )
}
