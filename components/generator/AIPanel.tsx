"use client"

import { useState, useRef, useEffect } from "react"
import { X, Sparkles, Loader2, Copy, Check } from "lucide-react"
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react"
import { useCopy } from "@/hooks/useCopy"

interface Props {
  open: boolean
  onClose: () => void
}

const EXAMPLES = [
  "slow flowing aurora waves",
  "circuit board traces lighting up",
  "topographic map contour lines",
  "rain drops on glass",
  "rotating hex grid",
]

function buildSandpackCode(code: string): string {
  return `${code}

export default function App() {
  return (
    <div style={{ width:"100vw", height:"100vh", background:"#0a0a0a", position:"relative", overflow:"hidden" }}>
      <GeneratedPattern />
    </div>
  )
}`
}

function VariationCard({ code, selected, onSelect }: {
  code: string; selected: boolean; onSelect: () => void
}) {
  const { copy, copied } = useCopy()
  return (
    <div
      className={`relative border cursor-pointer transition-all ${
        selected ? "border-white/50 ring-1 ring-white/20" : "border-white/10 hover:border-white/25"
      }`}
      onClick={onSelect}
    >
      <div className="aspect-video overflow-hidden bg-neutral-900">
        <SandpackProvider template="react" files={{ "/App.js": buildSandpackCode(code) }}
          options={{ autorun: true }}>
          <SandpackPreview showNavigator={false} showOpenInCodeSandbox={false}
            style={{ height: "100%", width: "100%" }} />
        </SandpackProvider>
      </div>
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-neutral-950/80 backdrop-blur-sm">
        {selected && <span className="text-[10px] tracking-widest text-white/50">SELECTED</span>}
        {!selected && <span className="text-[10px] text-white/20">Click to select</span>}
        <button
          onClick={(e) => { e.stopPropagation(); copy(code) }}
          className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white transition-colors"
        >
          {copied ? <><Check size={10} className="text-green-400" /><span className="text-green-400">Copied</span></> : <><Copy size={10} />Copy</>}
        </button>
      </div>
      {selected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />}
    </div>
  )
}

export function AIPanel({ open, onClose }: Props) {
  const [prompt, setPrompt]         = useState("")
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [variations, setVariations] = useState<string[]>([])
  const [selected, setSelected]     = useState(0)
  const inputRef                    = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  async function generate() {
    if (!prompt.trim() || loading) return
    setLoading(true); setError(null); setVariations([])
    try {
      const res  = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: prompt }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return }
      setVariations(data.variations); setSelected(0)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl bg-neutral-950 border-l border-white/10 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-sm font-medium text-white tracking-wide">Generate a Pattern</h2>
            <p className="text-xs text-white/30 mt-0.5">10 generations / hour · Free · No signup</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Prompt */}
          <div>
            <p className="text-xs text-white/40 mb-2">Describe your ideal background</p>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, 300))}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="slow flowing aurora waves..."
                className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 placeholder-white/20"
              />
              <button
                onClick={generate}
                disabled={!prompt.trim() || loading}
                className="px-5 py-3 bg-white text-neutral-950 text-xs tracking-widest font-semibold hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {loading ? "..." : "GO"}
              </button>
            </div>
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((e) => (
              <button key={e} onClick={() => setPrompt(e)}
                className="text-xs text-white/30 border border-white/10 px-3 py-1.5 hover:text-white/60 hover:border-white/20 transition-colors">
                {e}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">{error}</div>
          )}

          {/* Loading placeholders */}
          {loading && (
            <div className="grid grid-cols-1 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-video bg-neutral-900 border border-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}

          {/* Results */}
          {variations.length > 0 && (
            <div>
              <p className="text-xs text-white/30 mb-3">
                {variations.length} variation{variations.length > 1 ? "s" : ""} — pick one, copy the code
              </p>
              <div className="space-y-3">
                {variations.map((code, i) => (
                  <VariationCard key={i} code={code} selected={selected === i} onSelect={() => setSelected(i)} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 border-t border-white/5 shrink-0">
          <p className="text-[10px] text-white/15">
            Powered by Claude · Rate limited to prevent abuse · Your generated code is yours
          </p>
        </div>
      </div>
    </>
  )
}
