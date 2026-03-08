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

type PanelTab  = "pattern" | "overlay" | "layout" | "background"
type CopyFormat = "react"  | "css"     | "section"

const PANEL_TABS: { id: PanelTab; label: string }[] = [
  { id: "pattern",    label: "Pattern" },
  { id: "overlay",    label: "Overlay" },
  { id: "layout",     label: "Layout" },
  { id: "background", label: "BG" },
]

const BG_PRESETS   = ["#0a0a0a", "#0d1117", "#0a0f1e", "#0a1628", "#0c1a0f", "#12070e"]
const TINT_PRESETS = ["#000000", "#0a0f1e", "#0c0a1e", "#0e0a1a", "#0a1a0f", "#1a0a0a"]
const QUICK_COLORS = ["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f472b6"]

const LAYOUTS: { id: HeroLayout; label: string; desc: string }[] = [
  { id: "left",     label: "SaaS",     desc: "Linear / Vercel style" },
  { id: "centered", label: "Centered", desc: "Agency / portfolio" },
  { id: "split",    label: "Split",    desc: "Text left, card right" },
  { id: "minimal",  label: "Minimal",  desc: "Brutalist / editorial" },
]

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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-white/70">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] text-white/45 font-mono tabular-nums">{format(value)}</span>
          {!isDefault && (
            <button onClick={() => onChange(defaultValue)} title="Reset"
              className="text-white/30 hover:text-white/70 transition-colors">
              <RotateCcw size={10} />
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full" />
        <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/25 pointer-events-none rounded-full"
          style={{ left: `${pct}%` }} />
      </div>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-white/45 mb-2">{children}</p>
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
            selected === c ? "border-white/80 scale-110" : "border-white/15 hover:border-white/45"
          }`}
          style={{ background: c }} />
      ))}
      {allowCustom && (
        <label title="Custom"
          className="w-6 h-6 rounded-full border-2 border-dashed border-white/25 hover:border-white/55 cursor-pointer flex items-center justify-center transition-all">
          <span className="text-[9px] text-white/45 font-bold">+</span>
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
  const [panelTab,    setPanelTab]    = useState<PanelTab>("pattern")
  const [copyFormat,  setCopyFormat]  = useState<CopyFormat>("react")
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
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { const url = ev.target?.result as string; if (url) setContent("bgImageUrl", url) }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col h-full bg-neutral-950 border-l border-white/[0.08]">

      {/* ── Tab bar ──────────────────────────────────────── */}
      <div className="flex shrink-0 border-b border-white/[0.08]">
        {PANEL_TABS.map((t) => (
          <button key={t.id} onClick={() => setPanelTab(t.id)}
            className={`flex-1 py-3 text-[10px] tracking-widest transition-colors ${
              panelTab === t.id
                ? "text-white border-b-2 border-white -mb-px"
                : "text-white/35 hover:text-white/65"
            }`}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Tab content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 min-h-0">

        {/* PATTERN tab */}
        {panelTab === "pattern" && (
          <>
            <div>
              <FieldLabel>Color</FieldLabel>
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
          </>
        )}

        {/* OVERLAY tab */}
        {panelTab === "overlay" && (
          <>
            <Slider label="Darkness" value={content.overlayDarkness} defaultValue={0.5}
              min={0} max={0.92} step={0.02}
              format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => setContent("overlayDarkness", v)} />
            <div>
              <FieldLabel>Tint color</FieldLabel>
              <ColorDots colors={TINT_PRESETS} selected={content.overlayTint}
                onSelect={(c) => setContent("overlayTint", c)}
                allowCustom customValue={content.overlayTint}
                onCustomChange={(c) => setContent("overlayTint", c)} />
            </div>
            <p className="text-[11px] text-white/35 leading-relaxed pt-1">
              Overlay sits between the pattern and your content. Increase darkness to make text pop. Tint adds a color wash.
            </p>
          </>
        )}

        {/* LAYOUT tab */}
        {panelTab === "layout" && (
          <>
            <div className="grid grid-cols-1 gap-2">
              {LAYOUTS.map((l) => (
                <button key={l.id} onClick={() => setContent("layout", l.id)}
                  className={`py-3 px-4 text-left rounded-lg border transition-all ${
                    content.layout === l.id
                      ? "border-white/40 bg-white/[0.07]"
                      : "border-white/[0.09] hover:border-white/20"
                  }`}>
                  <p className={`text-[13px] font-medium leading-none mb-1 ${content.layout === l.id ? "text-white" : "text-white/55"}`}>
                    {l.label}
                  </p>
                  <p className="text-[11px] text-white/30">{l.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* BACKGROUND tab */}
        {panelTab === "background" && (
          <>
            <div>
              <FieldLabel>Background color</FieldLabel>
              <ColorDots colors={BG_PRESETS} selected={content.bgColor}
                onSelect={(c) => setContent("bgColor", c)}
                allowCustom customValue={content.bgColor}
                onCustomChange={(c) => setContent("bgColor", c)} />
            </div>
            <div>
              <FieldLabel>Background image</FieldLabel>
              {content.bgImageUrl ? (
                <div className="space-y-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.bgImageUrl} alt="" className="w-full h-20 object-cover rounded-lg border border-white/10"
                    onError={(e) => { e.currentTarget.style.opacity = "0.3" }} />
                  <div className="flex gap-4">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="text-[12px] text-white/50 hover:text-white transition-colors">Change</button>
                    <button onClick={() => setContent("bgImageUrl", "")}
                      className="text-[12px] text-red-400/60 hover:text-red-400 transition-colors">Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-white/15 py-5 text-[12px] text-white/40 hover:border-white/30 hover:text-white/65 transition-all">
                  Click to upload image
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <p className="text-[11px] text-white/30 mt-3 leading-relaxed">
                Image sits behind the pattern. Use the overlay to blend them together.
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Get code — pinned bottom ─────────────────────── */}
      <div className="shrink-0 border-t border-white/[0.08] p-4 space-y-3">
        <div className="flex rounded-lg overflow-hidden border border-white/[0.09] text-[10px] tracking-widest">
          {(["react", "css", "section"] as CopyFormat[]).map((f) => (
            <button key={f} onClick={() => setCopyFormat(f)}
              className={`flex-1 py-2.5 transition-colors ${
                copyFormat === f ? "bg-white/10 text-white" : "text-white/35 hover:text-white/60"
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
        <p className="text-[10px] text-white/30 text-center">
          {copyFormat === "react"   && "Drop into /components and import"}
          {copyFormat === "css"     && "Paste in any stylesheet"}
          {copyFormat === "section" && "Full hero section with your content"}
        </p>
      </div>
    </div>
  )
}
