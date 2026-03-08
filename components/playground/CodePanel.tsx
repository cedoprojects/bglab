"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useCopy } from "@/hooks/useCopy"

interface Props {
  tsx: string
  css: string
}

type Tab = "tsx" | "css"

export function CodePanel({ tsx, css }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("tsx")
  const { copy, copied } = useCopy()

  const activeCode = activeTab === "tsx" ? tsx : css

  return (
    <div className="flex flex-col h-full border border-white/10 bg-neutral-900/50">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4">
        <div className="flex">
          {(["tsx", "css"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs tracking-widest transition-colors ${
                activeTab === tab
                  ? "text-white border-b border-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab === "tsx" ? "REACT" : "CSS"}
            </button>
          ))}
        </div>

        <button
          onClick={() => copy(activeCode)}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors py-2"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-xs leading-relaxed text-white/70 font-mono whitespace-pre-wrap break-all">
          <code>{activeCode}</code>
        </pre>
      </div>
    </div>
  )
}
