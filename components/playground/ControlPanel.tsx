"use client"

import { useState, useRef } from "react"
import { Copy, Check, RotateCcw } from "lucide-react"
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

const BG_PRESETS   = ["#0a0a0a", "#0d1117", "#0a0f1e", "#0a1628", "#0c1a0f", "#12070e"]
const TINT_PRESETS = ["#000000", "#0a0f1e", "#0c0a1e", "#0e0a1a", "#0a1a0f", "#1a0a0a"]
const QUICK_COLORS = ["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f472b6"]

const LAYOUTS: { id: HeroLayout; label: string; desc: string }[] = [
  { id: "left",     label: "SaaS",     desc: "Linear / Vercel" },
  { id: "centered", label: "Centered", desc: "Agency / Portfolio" },
  { id: "split",    label: "Split",    desc: "Text + UI card" },
  { id: "minimal",  label: "Minimal",  desc: "Brutalist" },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] tracking-[0.22em] text-white/25 uppercase mb-3">{children}</p>
}

function Divider() {
  return <div className="h-px bg-white/[0.07] my-5" />
}

function Slider({
  label, value, defaultValue, min, max, step, format, onChange,
}: {
  label: string; value: number; defaultValue: number
  min: number; max: number; step: number
  format: (v: number) => string; onChange: (v: number) => void
}) {
  const isDefault = Math.abs(value - defaultValue) < step * 0.6
  const pct = ((defaultValue - min) / (max - min)) * 100
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-white/55">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/30 font-mono tabular-nums">{format(value)}</span>
          {!isDefault && (
            <button onClick={() => onChange(defaultValue)} title="Reset to default"
              className="text-white/20 hover:text-white/60 transition-colors">
              <RotateCcw size={10} />
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full" />
        <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/20 pointer-events-none rounded-full"
          style={{ left: `${pct}%` }} />
      </div>
    </div>
  )
}

function ColorDots({
  colors, selected, onSelect, allowCustom, customValue, onCustomChange,
}: {
  colors: string[]; selected: string; onSelect: (c: string) => void
  allowCustom?: boolean; customValue?: string; onCustomChange?: (c: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <button key={c} onClick={() => onSelect(c)} title={c}
          className={`w-6 h-6 rounded-full border-2 transition-all ${
            selected === c ? "border-white/80 scale-110" : "border-white/10 hover:border-white/40"
          }`}
          style={{ background: c }} />
      ))}
      {allowCustom && (
        <label title="Custom color"
          className="w-6 h-6 rounded-full border-2 border-dashed border-white/20 hover:border-white/50 cursor-pointer flex items-center justify-center transition-all">
          <span className="text-[9px] text-white/40 font-bold">+</span>
          <input type="color" value={customValue ?? "#ffffff"}
            onChange={(e) => onCustomChange?.(e.target.value)} className="sr-only" />
        </label>
      )}
    </div>
  )
}

export function ControlPanel({
  config, content, patternId, patternName, defaultConfig,
  onConfigChange, onContentChange,
}: Props) {
  const [copyFormat, setCopyFormat] = useState<CopyFormat>("react")
  const { copy, copied } = useCopy()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setConfig  = (k: keyof PatternConfig, v: string | number) => onConfigChange({ ...config,  [k]: v })
  const setContent = (k: keyof HeroContent,   v: string | number) => onContentChange({ ...content, [k]: v })

  function getCode(): string {
    if (copyFormat === "section") return generateFullSection(patternName, config, content)
    if (copyFormat === "css") {
      if (patternId === "blueprint-grid") return generateBlueprintGridCSS(config)
      if (patternId === "dot-matrix")     return generateDotMatrixCSS(config)
      return generateGenericCSS(patternName, config)
    }
    if (patternId === "blueprint-grid") return generateBlueprintGridTSX(config)
    if (patternId === "dot-matrix")     return generateDotMatrixTSX(config)
    return generateGenericTSX(patternId, patternName, config)
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

      {/* ── All controls — scrollable ────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 min-h-0">

        {/* PATTERN */}
        <SectionLabel>Pattern</SectionLabel>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] text-white/40 mb-2">Color</p>
            <ColorDots colors={QUICK_COLORS} selected={config.color}
              onSelect={(c) => setConfig("color", c)}
              allowCustom customValue={config.color}
              onCustomChange={(c) => setConfig("color", c)} />
          </div>
          <Slider label="Opacity" value={config.opacity} defaultValue={defaultConfig.opacity}
            min={0.02} max={0.5} step={0.01}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(v) => setConfig("opacity", v)} />
          <Slider label="Speed" value={config.speed} defaultValue={defaultConfig.speed}
            min={2} max={30} step={0.5}
            format={(v) => `${v}s`}
            onChange={(v) => setConfig("speed", v)} />
          <Slider label="Density" value={config.size} defaultValue={1}
            min={0.4} max={3} step={0.1}
            format={(v) => v < 0.7 ? "Fine" : v < 1.4 ? "Default" : v < 2.1 ? "Coarse" : "Bold"}
            onChange={(v) => setConfig("size", v)} />
        </div>

        <Divider />

        {/* OVERLAY */}
        <SectionLabel>Overlay</SectionLabel>
        <div className="space-y-4">
          <Slider label="Darkness" value={content.overlayDarkness} defaultValue={0.5}
            min={0} max={0.92} step={0.02}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(v) => setContent("overlayDarkness", v)} />
          <div>
            <p className="text-[11px] text-white/40 mb-2">Tint</p>
            <ColorDots colors={TINT_PRESETS} selected={content.overlayTint}
              onSelect={(c) => setContent("overlayTint", c)}
              allowCustom customValue={content.overlayTint}
              onCustomChange={(c) => setContent("overlayTint", c)} />
          </div>
        </div>

        <Divider />

        {/* LAYOUT */}
        <SectionLabel>Hero Layout</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {LAYOUTS.map((l) => (
            <button key={l.id} onClick={() => setContent("layout", l.id)}
              className={`py-2.5 px-3 text-left rounded-lg border transition-all ${
                content.layout === l.id
                  ? "border-white/35 bg-white/[0.07] text-white"
                  : "border-white/[0.08] text-white/40 hover:border-white/18 hover:text-white/60"
              }`}>
              <p className="text-[11px] font-medium leading-none mb-0.5">{l.label}</p>
              <p className="text-[9px] text-white/22">{l.desc}</p>
            </button>
          ))}
        </div>

        <Divider />

        {/* BACKGROUND */}
        <SectionLabel>Background</SectionLabel>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] text-white/40 mb-2">Color</p>
            <ColorDots colors={BG_PRESETS} selected={content.bgColor}
              onSelect={(c) => setContent("bgColor", c)}
              allowCustom customValue={content.bgColor}
              onCustomChange={(c) => setContent("bgColor", c)} />
          </div>
          <div>
            <p className="text-[11px] text-white/40 mb-2">Image</p>
            {content.bgImageUrl ? (
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={content.bgImageUrl} alt="" className="w-full h-16 object-cover rounded-lg border border-white/10"
                  onError={(e) => { e.currentTarget.style.opacity = "0.3" }} />
                <div className="flex gap-3">
                  <button onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-white/35 hover:text-white transition-colors">Change</button>
                  <button onClick={() => setContent("bgImageUrl", "")}
                    className="text-[11px] text-red-400/50 hover:text-red-400 transition-colors">Remove</button>
                </div>
              </div>
            ) : (
              <button onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-lg border border-dashed border-white/12 py-3 text-[11px] text-white/30 hover:border-white/25 hover:text-white/55 transition-all">
                Upload image
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>

      </div>

      {/* ── Get Code — pinned to bottom ──────────────────── */}
      <div className="shrink-0 border-t border-white/[0.09] p-5 space-y-3">
        <div className="flex rounded-lg overflow-hidden border border-white/[0.08] text-[10px] tracking-widest">
          {(["react", "css", "section"] as CopyFormat[]).map((f) => (
            <button key={f} onClick={() => setCopyFormat(f)}
              className={`flex-1 py-2 transition-colors ${
                copyFormat === f ? "bg-white/10 text-white" : "text-white/25 hover:text-white/50"
              }`}>
              {f === "react" ? "REACT" : f === "css" ? "CSS" : "FULL"}
            </button>
          ))}
        </div>

        <button onClick={() => copy(getCode())}
          className="w-full py-3.5 bg-white text-neutral-950 text-[13px] font-semibold rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          {copied
            ? <><Check size={14} className="text-green-600" /><span className="text-green-700">Copied!</span></>
            : <><Copy size={14} />Copy Code</>}
        </button>

        <p className="text-[10px] text-white/20 text-center">
          {copyFormat === "react"   && "React component → drop into /components"}
          {copyFormat === "css"     && "Pure CSS → works in any framework"}
          {copyFormat === "section" && "Full hero section with your content"}
        </p>
      </div>
    </div>
  )
}
