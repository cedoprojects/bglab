"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useCopy } from "@/hooks/useCopy"
import { HeroContent } from "./HeroPrototype"
import { PatternConfig } from "@/types"
import { generateFullSection } from "@/lib/sectiongen"

interface Props {
  tsx: string
  css: string
  patternId: string
  patternName: string
  config: PatternConfig
  content: HeroContent
}

type Tab = "tsx" | "css" | "section"

export function CodePanel({ tsx, css, patternName, config, content }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("tsx")
  const { copy, copied } = useCopy()

  const code = {
    tsx,
    css,
    section: generateFullSection(patternName, config, content),
  }

  const activeCode = code[activeTab]

  const tabs: { id: Tab; label: string }[] = [
    { id: "tsx",     label: "REACT" },
    { id: "css",     label: "CSS" },
    { id: "section", label: "FULL SECTION" },
  ]

  return (
    <div className="flex flex-col h-full border border-white/10 bg-neutral-900/50">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 shrink-0">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-3 text-[10px] tracking-widest transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white border-b border-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => copy(activeCode)}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors py-2 shrink-0 ml-2"
        >
          {copied ? (
            <><Check size={11} className="text-green-400" /><span className="text-green-400 text-[10px]">Copied!</span></>
          ) : (
            <><Copy size={11} /><span className="text-[10px]">Copy</span></>
          )}
        </button>
      </div>

      {/* Tab description */}
      {activeTab === "section" && (
        <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] shrink-0">
          <p className="text-[10px] text-white/30">
            Complete hero section with your content — drop into any Next.js page
          </p>
        </div>
      )}

      {/* Code */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-xs leading-relaxed text-white/60 font-mono whitespace-pre-wrap break-all">
          <code>{activeCode}</code>
        </pre>
      </div>
    </div>
  )
}
