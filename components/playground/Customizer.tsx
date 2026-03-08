"use client"

import { HeroContent, HeroLayout } from "./HeroPrototype"
import { PatternConfig } from "@/types"

interface Props {
  config: PatternConfig
  content: HeroContent
  onConfigChange: (c: PatternConfig) => void
  onContentChange: (c: HeroContent) => void
}

const LAYOUTS: { id: HeroLayout; label: string }[] = [
  { id: "left",     label: "SaaS Left" },
  { id: "centered", label: "Centered" },
  { id: "split",    label: "Split" },
  { id: "minimal",  label: "Minimal" },
]

// Trending 2026 dark palette presets
const BG_PRESETS = [
  { color: "#0a0a0a", label: "Noir" },
  { color: "#0d1117", label: "GitHub" },
  { color: "#0a0f1e", label: "Navy" },
  { color: "#0a1628", label: "Slate" },
  { color: "#0c1a0f", label: "Forest" },
  { color: "#12070e", label: "Plum" },
]

const TINT_PRESETS = [
  { color: "#000000", label: "Black" },
  { color: "#0a0f1e", label: "Navy" },
  { color: "#0c0a1e", label: "Indigo" },
  { color: "#0e0a1a", label: "Violet" },
  { color: "#0a1a0f", label: "Forest" },
  { color: "#1a0a0a", label: "Ember" },
]

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">{children}</p>
}

function SliderRow({
  label, value, min, max, step, display, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number
  display: string; onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-xs text-white/40">{label}</span>
        <span className="text-xs text-white/25 font-mono">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  )
}

function ColorSwatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-sm border-2 transition-all ${active ? "border-white/60 scale-110" : "border-transparent hover:border-white/30"}`}
      style={{ background: color }}
    />
  )
}

export function Customizer({ config, content, onConfigChange, onContentChange }: Props) {
  const setConfig = (key: keyof PatternConfig, val: string | number) =>
    onConfigChange({ ...config, [key]: val })
  const setContent = (key: keyof HeroContent, val: string | number) =>
    onContentChange({ ...content, [key]: val })

  return (
    <div className="space-y-6 overflow-y-auto">

      {/* Layout */}
      <div>
        <Label>Layout</Label>
        <div className="grid grid-cols-2 gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => setContent("layout", l.id)}
              className={`py-2 text-xs tracking-wider border transition-all ${
                content.layout === l.id
                  ? "border-white/40 text-white bg-white/5"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern */}
      <div>
        <Label>Pattern</Label>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-white/40">Color</span>
              <span className="text-xs text-white/25 font-mono">{config.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="color" value={config.color}
                onChange={(e) => setConfig("color", e.target.value)}
                className="w-7 h-7 rounded-sm cursor-pointer bg-transparent border border-white/10"
              />
              <input type="text" value={config.color}
                onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setConfig("color", e.target.value) }}
                className="flex-1 bg-white/5 border border-white/10 text-white/60 text-xs font-mono px-3 py-1.5 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <SliderRow label="Opacity" value={config.opacity} min={0.02} max={0.5} step={0.01}
            display={`${Math.round(config.opacity * 100)}%`} onChange={(v) => setConfig("opacity", v)} />
          <SliderRow label="Speed" value={config.speed} min={2} max={30} step={0.5}
            display={`${config.speed}s`} onChange={(v) => setConfig("speed", v)} />
        </div>
      </div>

      {/* Background */}
      <div>
        <Label>Background Color</Label>
        <div className="flex gap-2 flex-wrap mb-2">
          {BG_PRESETS.map((p) => (
            <div key={p.color} className="flex flex-col items-center gap-1">
              <ColorSwatch color={p.color} active={content.bgColor === p.color} onClick={() => setContent("bgColor", p.color)} />
              <span className="text-[9px] text-white/20">{p.label}</span>
            </div>
          ))}
        </div>
        <input type="color" value={content.bgColor}
          onChange={(e) => setContent("bgColor", e.target.value)}
          className="w-7 h-7 rounded-sm cursor-pointer bg-transparent border border-white/10" />
      </div>

      {/* Overlay */}
      <div>
        <Label>Overlay</Label>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {TINT_PRESETS.map((p) => (
              <div key={p.color} className="flex flex-col items-center gap-1">
                <ColorSwatch color={p.color} active={content.overlayTint === p.color} onClick={() => setContent("overlayTint", p.color)} />
                <span className="text-[9px] text-white/20">{p.label}</span>
              </div>
            ))}
          </div>
          <SliderRow label="Darkness" value={content.overlayDarkness} min={0} max={0.92} step={0.02}
            display={`${Math.round(content.overlayDarkness * 100)}%`} onChange={(v) => setContent("overlayDarkness", v)} />
        </div>
      </div>

      {/* Background image */}
      <div>
        <Label>Background Image</Label>
        <input
          type="text"
          value={content.bgImageUrl}
          onChange={(e) => setContent("bgImageUrl", e.target.value)}
          placeholder="Paste image URL..."
          className="w-full bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-2 focus:outline-none focus:border-white/30 placeholder-white/20"
        />
        {content.bgImageUrl && (
          <button onClick={() => setContent("bgImageUrl", "")}
            className="text-xs text-white/20 hover:text-white/50 mt-1 transition-colors">
            Remove image
          </button>
        )}
        <p className="text-[10px] text-white/20 mt-1">Pattern animates on top of your image</p>
      </div>

    </div>
  )
}
