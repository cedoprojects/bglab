"use client"

import { useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { GeneratedPreview } from "./GeneratedPreview"

const EXAMPLE_PROMPTS = [
  "flowing aurora waves, deep blue and purple",
  "subtle rain drops falling slowly",
  "neural network nodes connecting and pulsing",
  "slow rotating hexagonal grid",
  "circuit board traces lighting up",
]

export function GeneratorForm() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [variations, setVariations] = useState<string[]>([])
  const [selected, setSelected] = useState(0)

  async function generate() {
    if (!description.trim() || loading) return
    setLoading(true)
    setError(null)
    setVariations([])

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.")
        return
      }

      setVariations(data.variations)
      setSelected(0)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Prompt input */}
      <div className="space-y-3">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs tracking-[0.3em] text-white/30 mb-3 uppercase">
              Describe your background
            </label>
            <div className="relative">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="subtle dot grid that slowly pulses..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white/30 pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/20">
                {description.length}/300
              </span>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={!description.trim() || loading}
            className="flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 text-xs tracking-widest font-medium hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                GENERATING...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                GENERATE
              </>
            )}
          </button>
        </div>

        {/* Example prompts */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setDescription(p)}
              className="text-xs text-white/30 border border-white/10 px-3 py-1.5 hover:text-white/60 hover:border-white/20 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-video bg-neutral-900 border border-white/5 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      )}

      {/* Results */}
      {variations.length > 0 && (
        <GeneratedPreview
          variations={variations}
          selected={selected}
          onSelect={setSelected}
        />
      )}
    </div>
  )
}
