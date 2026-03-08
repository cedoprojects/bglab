"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Copy, Check, RotateCcw } from "lucide-react"
import { HeroContent, HeroLayout } from "./HeroPrototype"
import { PatternConfig } from "@/types"
import { useCopy } from "@/hooks/useCopy"
import {
  generateBlueprintGridTSX, generateBlueprintGridCSS,
  generateDotMatrixTSX,    generateDotMatrixCSS,
  generateGenericTSX,      generateGenericCSS,
} from "@/lib/codegen"
import { generateFullSection } from "@/lib/sectiongen"

interface Props {
  config: PatternConfig
  content: HeroContent
  patternId: string
  patternName: string
  defaultConfig: PatternConfig
  onConfigChange: (c: PatternConfig) => void
  onContentChange: (c: HeroContent) => void
}

type CopyFormat = "react" | "css" | "section"

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

const LAYOUTS: { id: HeroLayout; label: string }[] = [
  { id: "left",     label: "SaaS" },
  { id: "centered", label: "Centered" },
  { id: "split",    label: "Split" },
  { id: "minimal",  label: "Minimal" },
]

const QUICK_COLORS = ["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f472b6"]

function Slider({ label, value, defaultValue, min, max, step, format, onChange }: {
  label: string; value: number; defaultValue: number
  min: number; max: number; step: number
  format: (v: number) => string; onChange: (v: number) => void
}) {
  const isDefault = Math.abs(value - defaultValue) < step * 0.5
  const pct = ((defaultValue - min) / (max - min)) * 100
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/25 font-mono">{format(value)}</span>
          {!isDefault && (
            <button onClick={() => onChange(defaultValue)} className="text-white/20 hover:text-white/60 transition-colors" title="Reset">
              <RotateCcw size={10} />
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full" />
        <div className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/25 pointer-events-none"
          style={{ left: `${pct}%` }} />
      </div>
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-[10px] tracking-widest text-white/20 uppercase whitespace-nowrap">{label}</span>
      <div className="h-px bg-white/[0.07] flex-1" />
    </div>
  )
}

export function ControlPanel({
  config, content, patternId, patternName, defaultConfig,
  onConfigChange, onContentChange,
}: Props) {
  const [advanced, setAdvanced] = useState(false)
  const [copyFormat, setCopyFormat] = useState<CopyFormat>("react")
  const { copy, copied } = useCopy()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setConfig  = (k: keyof PatternConfig, v: string | number) => onConfigChange({ ...config, [k]: v })
  const setContent = (k: keyof HeroContent,   v: string | number) => onContentChange({ ...content, [k]: v })

  function getCode(): string {
    if (copyFormat === "section") return generateFullSection(patternName, config, content)
    if (copyFormat === "css") {
      switch (patternId) {
        case "blueprint-grid": return generateBlueprintGridCSS(config)
        case "dot-matrix":     return generateDotMatrixCSS(config)
        default:               return generateGenericCSS(patternName, config)
      }
    }
    switch (patternId) {
      case "blueprint-grid": return generateBlueprintGridTSX(config)
      case "dot-matrix":     return generateDotMatrixTSX(config)
      default:               return generateGenericTSX(patternId, patternName, config)
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      if (url) setContent("bgImageUrl", url)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col h-full bg-neutral-950 border-l border-white/[0.07]">

      {/* ── SIMPLE CONTROLS ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Overlay — most important control */}
        <div>
          <SectionDivider label="Overlay" />
          <div className="mt-3 space-y-3">
            <Slider label="Darkness" value={content.overlayDarkness} defaultValue={0.5}
              min={0} max={0.92} step={0.02} format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => setContent("overlayDarkness", v)} />
            {/* Tint quick-switches */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">Tint</span>
              <div className="flex gap-1.5">
                {TINT_PRESETS.map(({ color, label }) => (
                  <button key={color} title={label} onClick={() => setContent("overlayTint", color)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      content.overlayTint === color ? "border-white/80 scale-125" : "border-white/10 hover:border-white/40"
                    }`}
                    style={{ background: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pattern */}
        <div>
          <SectionDivider label="Pattern" />
          <div className="mt-3 space-y-3">
            {/* Quick color dots */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">Color</span>
              <div className="flex gap-1.5">
                {QUICK_COLORS.map((c) => (
                  <button key={c} onClick={() => setConfig("color", c)} title={c}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      config.color === c ? "border-white/80 scale-125" : "border-white/10 hover:border-white/40"
                    }`}
                    style={{ background: c }} />
                ))}
                {/* Custom color picker dot */}
                <label title="Custom color" className="w-5 h-5 rounded-full border-2 border-dashed border-white/20 hover:border-white/50 cursor-pointer flex items-center justify-center transition-all">
                  <span className="text-[8px] text-white/30">+</span>
                  <input type="color" value={config.color} onChange={(e) => setConfig("color", e.target.value)} className="sr-only" />
                </label>
              </div>
            </div>

            <Slider label="Opacity" value={config.opacity} defaultValue={defaultConfig.opacity}
              min={0.02} max={0.5} step={0.01} format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => setConfig("opacity", v)} />

            <Slider label="Speed" value={config.speed} defaultValue={defaultConfig.speed}
              min={2} max={30} step={0.5} format={(v) => `${v}s`}
              onChange={(v) => setConfig("speed", v)} />
          </div>
        </div>

        {/* Advanced toggle */}
        <button
          onClick={() => setAdvanced(!advanced)}
          className="w-full flex items-center justify-between text-[10px] tracking-widest text-white/25 hover:text-white/50 transition-colors py-1"
        >
          <span>ADVANCED</span>
          {advanced ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {/* ── ADVANCED CONTROLS ─────────────────────────── */}
        {advanced && (
          <div className="space-y-4 border-t border-white/[0.06] pt-4">

            {/* Hex input */}
            <div>
              <SectionDivider label="Exact Color" />
              <input type="text" value={config.color} className="w-full mt-2 bg-white/5 border border-white/10 text-white/60 text-xs font-mono px-3 py-2 focus:outline-none focus:border-white/30"
                onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setConfig("color", e.target.value) }} />
            </div>

            {/* Density */}
            <Slider label="Density / Scale" value={config.size} defaultValue={1}
              min={0.4} max={3} step={0.1}
              format={(v) => v < 0.7 ? "Fine" : v < 1.3 ? "Default" : v < 2 ? "Coarse" : "Bold"}
              onChange={(v) => setConfig("size", v)} />

            {/* Layout */}
            <div>
              <SectionDivider label="Hero Layout" />
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {LAYOUTS.map((l) => (
                  <button key={l.id} onClick={() => setContent("layout", l.id)}
                    className={`py-1.5 text-xs border transition-all ${
                      content.layout === l.id
                        ? "border-white/40 bg-white/5 text-white"
                        : "border-white/10 text-white/40 hover:border-white/20"
                    }`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background color */}
            <div>
              <SectionDivider label="Background" />
              <div className="flex flex-wrap gap-2 mt-2">
                {BG_PRESETS.map(({ color, label }) => (
                  <button key={color} title={label} onClick={() => setContent("bgColor", color)}
                    className={`w-7 h-7 rounded border-2 transition-all ${
                      content.bgColor === color ? "border-white/70 scale-110" : "border-transparent hover:border-white/30"
                    }`}
                    style={{ background: color }} />
                ))}
                <label className="w-7 h-7 rounded border-2 border-dashed border-white/20 hover:border-white/50 cursor-pointer flex items-center justify-center transition-all">
                  <span className="text-[9px] text-white/30">+</span>
                  <input type="color" value={content.bgColor} onChange={(e) => setContent("bgColor", e.target.value)} className="sr-only" />
                </label>
              </div>
            </div>

            {/* Background image */}
            <div>
              <SectionDivider label="Background Image" />
              <div className="mt-2">
                {content.bgImageUrl ? (
                  <div className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={content.bgImageUrl} alt="" className="w-full h-16 object-cover border border-white/10"
                      onError={(e) => { e.currentTarget.style.opacity = "0.3" }} />
                    <div className="flex gap-3">
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs text-white/30 hover:text-white transition-colors">Change</button>
                      <button onClick={() => setContent("bgImageUrl", "")} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-full border border-dashed border-white/15 py-3 text-xs text-white/30 hover:border-white/30 hover:text-white/60 transition-all text-center">
                    Upload image
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── COPY SECTION — always visible at bottom ──────── */}
      <div className="shrink-0 border-t border-white/10 p-4 space-y-3 bg-neutral-950">
        {/* Format tabs */}
        <div className="flex border border-white/10 overflow-hidden text-[10px] tracking-widest">
          {(["react", "css", "section"] as CopyFormat[]).map((f) => (
            <button key={f} onClick={() => setCopyFormat(f)}
              className={`flex-1 py-2 transition-colors ${
                copyFormat === f ? "bg-white/10 text-white" : "text-white/25 hover:text-white/50"
              }`}>
              {f === "react" ? "REACT" : f === "css" ? "CSS" : "SECTION"}
            </button>
          ))}
        </div>

        {/* Big copy button */}
        <button
          onClick={() => copy(getCode())}
          className="w-full py-3.5 bg-white text-neutral-950 text-sm font-semibold tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {copied ? (
            <><Check size={15} className="text-green-600" /><span className="text-green-700">Copied to clipboard!</span></>
          ) : (
            <><Copy size={15} />Copy Code</>
          )}
        </button>

        <p className="text-[10px] text-white/15 text-center">
          {copyFormat === "react" && "Drop into /components → import → done"}
          {copyFormat === "css"   && "Paste into any stylesheet, any framework"}
          {copyFormat === "section" && "Complete hero section with your content"}
        </p>
      </div>
    </div>
  )
}
