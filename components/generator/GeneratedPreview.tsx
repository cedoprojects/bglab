"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react"
import { atomDark } from "@codesandbox/sandpack-themes"
import { useCopy } from "@/hooks/useCopy"

interface Props {
  variations: string[]
  selected: number
  onSelect: (i: number) => void
}

function buildSandpackCode(componentCode: string): string {
  return `${componentCode}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <GeneratedPattern />
    </div>
  )
}`
}

export function GeneratedPreview({ variations, selected, onSelect }: Props) {
  const [codeTab, setCodeTab] = useState<"tsx" | "css">("tsx")
  const { copy, copied } = useCopy()

  const activeCode = variations[selected]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.3em] text-white/30 mb-4 uppercase">
          {variations.length} Variation{variations.length > 1 ? "s" : ""} Generated — Pick One
        </p>

        {/* Variation thumbnails */}
        <div className="grid md:grid-cols-3 gap-4">
          {variations.map((code, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`relative aspect-video overflow-hidden border transition-all ${
                selected === i ? "border-white/50" : "border-white/10 hover:border-white/25"
              }`}
            >
              <SandpackProvider
                template="react"
                theme={atomDark}
                files={{
                  "/App.js": buildSandpackCode(code),
                }}
                options={{ autorun: true }}
              >
                <SandpackPreview
                  showNavigator={false}
                  showOpenInCodeSandbox={false}
                  style={{ height: "100%", width: "100%" }}
                />
              </SandpackProvider>

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs text-white/50">Variation {i + 1}</span>
              </div>

              {selected === i && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Code export for selected */}
      <div className="border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-4">
          <div className="flex">
            {(["tsx", "css"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCodeTab(tab)}
                className={`px-4 py-3 text-xs tracking-widest transition-colors ${
                  codeTab === tab ? "text-white border-b border-white" : "text-white/30 hover:text-white/60"
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
              <><Check size={12} className="text-green-400" /><span className="text-green-400">Copied!</span></>
            ) : (
              <><Copy size={12} /><span>Copy</span></>
            )}
          </button>
        </div>
        <div className="p-4 max-h-64 overflow-auto">
          <pre className="text-xs leading-relaxed text-white/60 font-mono whitespace-pre-wrap break-all">
            <code>{codeTab === "tsx" ? activeCode : `/* Paste this in your stylesheet */\n\n/* See React version for the full animation — CSS version coming soon */\n${activeCode}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
