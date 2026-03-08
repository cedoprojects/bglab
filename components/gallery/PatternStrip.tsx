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
    <div className="border-b border-white/[0.1] bg-neutral-900 shrink-0 shadow-lg shadow-black/30">
      <div className="flex items-stretch overflow-x-auto" style={{ scrollbarWidth: "none" }}>

        {/* Label */}
        <div className="shrink-0 px-4 border-r border-white/[0.08] flex items-center bg-neutral-900">
          <span className="text-[13px] tracking-widest text-white/65 whitespace-nowrap font-medium">PATTERNS</span>
        </div>

        {/* Pattern thumbnails */}
        {patterns.map((p: PatternMeta) => {
          const { component: PatternComponent } = p
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => router.push(`/patterns/${p.id}`)}
              title={p.name}
              className={`group relative shrink-0 overflow-hidden transition-all duration-200 border-r border-white/[0.08] ${
                isActive
                  ? "ring-2 ring-inset ring-white/50 brightness-110"
                  : "opacity-45 hover:opacity-100"
              }`}
              style={{ width: 130, height: 80 }}
            >
              <div className="absolute inset-0 bg-neutral-800">
                <PatternComponent {...p.defaultConfig} opacity={(p.defaultConfig.opacity ?? 0.15) * 1.8} />
              </div>
              <div className={`absolute inset-0 transition-all bg-gradient-to-t ${
                isActive ? "from-black/60 to-transparent" : "from-black/75 to-black/5 group-hover:from-black/50"
              }`} />
              <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2">
                <p className={`text-[13px] font-medium leading-tight ${
                  isActive ? "text-white" : "text-white/75 group-hover:text-white"
                }`}>
                  {p.name}
                </p>
              </div>
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-sm shadow-white/50" />
              )}
            </button>
          )
        })}

        {/* AI generate */}
        <button
          onClick={onGenerateClick}
          className="shrink-0 flex flex-col items-center justify-center gap-1.5 px-5 text-white/60 hover:text-white hover:bg-white/[0.06] transition-all border-r border-white/[0.08]"
          style={{ minWidth: 100, height: 80 }}
        >
          <Sparkles size={14} />
          <span className="text-[13px] tracking-wide whitespace-nowrap">AI Generate</span>
        </button>
      </div>
    </div>
  )
}
