"use client"

import { useState, useRef, useMemo } from "react"
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

type PanelTab  = "style" | "layout" | "background"
type CopyFormat = "react" | "css"   | "section"

const PANEL_TABS: { id: PanelTab; label: string }[] = [
  { id: "style",      label: "Style"      },
  { id: "layout",     label: "Layout"     },
  { id: "background", label: "Background" },
]

const BG_PRESETS   = ["#0a0a0a", "#0d1117", "#0a0f1e", "#0a1628", "#0c1a0f", "#12070e"]
const TINT_PRESETS = ["#000000", "#0a0f1e", "#0c0a1e", "#0e0a1a", "#0a1a0f", "#1a0a0a"]
const QUICK_COLORS = ["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f472b6"]

// Layout wireframes — actual layout structure, no patterns
const LAYOUT_WIREFRAMES: Record<HeroLayout, React.ReactNode> = {
  left: (
    <svg viewBox="0 0 100 66" className="w-full h-full">
      <rect x="4" y="5" width="16" height="1.5" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="70" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="80" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="4" y="18" width="44" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="4" y="25" width="56" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="4" y="34" width="48" height="2" rx="0.5" fill="white" fillOpacity="0.3"/>
      <rect x="4" y="39" width="42" height="2" rx="0.5" fill="white" fillOpacity="0.3"/>
      <rect x="4" y="48" width="20" height="6" rx="1.5" fill="white" fillOpacity="0.85"/>
      <rect x="27" y="48" width="20" height="6" rx="1.5" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.35"/>
    </svg>
  ),
  centered: (
    <svg viewBox="0 0 100 66" className="w-full h-full">
      <rect x="4" y="5" width="16" height="1.5" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="70" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="80" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="18" y="18" width="64" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="10" y="25" width="80" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="22" y="34" width="56" height="2" rx="0.5" fill="white" fillOpacity="0.3"/>
      <rect x="28" y="48" width="20" height="6" rx="1.5" fill="white" fillOpacity="0.85"/>
      <rect x="51" y="48" width="20" height="6" rx="1.5" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.35"/>
    </svg>
  ),
  split: (
    <svg viewBox="0 0 100 66" className="w-full h-full">
      <rect x="4" y="5" width="16" height="1.5" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="70" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="80" y="5" width="7" height="1.5" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="4" y="18" width="40" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="4" y="25" width="44" height="3" rx="0.5" fill="white" fillOpacity="0.3"/>
      <rect x="4" y="31" width="38" height="3" rx="0.5" fill="white" fillOpacity="0.3"/>
      <rect x="4" y="42" width="18" height="5" rx="1.5" fill="white" fillOpacity="0.85"/>
      <rect x="54" y="15" width="42" height="42" rx="3" fill="white" fillOpacity="0.06" stroke="white" strokeWidth="0.5" strokeOpacity="0.25"/>
      <rect x="58" y="20" width="28" height="2" rx="0.5" fill="white" fillOpacity="0.25"/>
      <rect x="58" y="25" width="22" height="2" rx="0.5" fill="white" fillOpacity="0.2"/>
      <rect x="58" y="32" width="30" height="14" rx="2" fill="white" fillOpacity="0.05"/>
    </svg>
  ),
  minimal: (
    <svg viewBox="0 0 100 66" className="w-full h-full">
      <rect x="4" y="5" width="12" height="1.5" rx="0.5" fill="white" fillOpacity="0.35"/>
      <rect x="4" y="40" width="72" height="7" rx="1" fill="white" fillOpacity="0.75"/>
      <rect x="4" y="52" width="80" height="7" rx="1" fill="white" fillOpacity="0.75"/>
    </svg>
  ),
}

const LAYOUTS: { id: HeroLayout; label: string; desc: string }[] = [
  { id: "left",     label: "SaaS",     desc: "Left-aligned" },
  { id: "centered", label: "Centered", desc: "Full-width" },
  { id: "split",    label: "Split",    desc: "Text + card" },
  { id: "minimal",  label: "Minimal",  desc: "Editorial" },
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
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-white/65">{label}</span>
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
          style={{ left: `calc(${pct}% - 1px)` }} />
      </div>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-widest text-white/35 mb-2">{children}</p>
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
        <button key={c} onClick={() => onSelect(c)}
          className={`w-6 h-6 rounded-full border-2 transition-all ${
            selected === c ? "border-white scale-110" : "border-white/15 hover:border-white/50"
          }`}
          style={{ background: c }} />
      ))}
      {allowCustom && (
        <label className="w-6 h-6 rounded-full border-2 border-dashed border-white/25 hover:border-white/55 cursor-pointer flex items-center justify-center transition-all">
          <span className="text-[9px] text-white/50 font-bold leading-none">+</span>
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
  const [panelTab,   setPanelTab]   = useState<PanelTab>("style")
  const [copyFormat, setCopyFormat] = useState<CopyFormat>("react")
  const { copy, copied } = useCopy()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setConfig  = (k: keyof PatternConfig, v: string | number) => onConfigChange({ ...config,  [k]: v })
  const setContent = (k: keyof HeroContent,   v: string | number) => onContentChange({ ...content, [k]: v })

  const code = useMemo(() => {
    if (copyFormat === "section") return generateFullSection(patternName, config, content)
    if (copyFormat === "css") {
      if (patternId === "blueprint-grid") return generateBlueprintGridCSS(config)
      if (patternId === "dot-matrix")     return generateDotMatrixCSS(config)
      return generateGenericCSS(patternName, config)
    }
    if (patternId === "blueprint-grid") return generateBlueprintGridTSX(config)
    if (patternId === "dot-matrix")     return generateDotMatrixTSX(config)
    return generateGenericTSX(patternId, patternName, config)
  }, [copyFormat, config, content, patternId, patternName])

  // Show a short preview of the code
  const codePreview = code.split("\n").slice(0, 6).join("\n")

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { const url = ev.target?.result as string; if (url) setContent("bgImageUrl", url) }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col h-full bg-neutral-950 border-l border-white/[0.09]">

      {/* ── Tabs ─────────────────────────────────────────── */}
      <div className="flex shrink-0 border-b border-white/[0.09]">
        {PANEL_TABS.map((t) => (
          <button key={t.id} onClick={() => setPanelTab(t.id)}
            className={`flex-1 py-3 text-[11px] tracking-widest font-medium transition-colors ${
              panelTab === t.id
                ? "text-white border-b-2 border-white -mb-px"
                : "text-white/40 hover:text-white/70"
            }`}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Tab content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-5 space-y-6">

        {/* STYLE — darkness + all pattern controls together */}
        {panelTab === "style" && (
          <>
            {/* Overlay darkness — first, most used */}
            <div>
              <FieldLabel>Overlay</FieldLabel>
              <div className="space-y-4">
                <Slider label="Darkness" value={content.overlayDarkness} defaultValue={0.5}
                  min={0} max={0.92} step={0.02}
                  format={(v) => `${Math.round(v * 100)}%`}
                  onChange={(v) => setContent("overlayDarkness", v)} />
                <div>
                  <p className="text-[12px] text-white/50 mb-2">Tint</p>
                  <ColorDots colors={TINT_PRESETS} selected={content.overlayTint}
                    onSelect={(c) => setContent("overlayTint", c)}
                    allowCustom customValue={content.overlayTint}
                    onCustomChange={(c) => setContent("overlayTint", c)} />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/[0.07]" />

            {/* Pattern controls */}
            <div>
              <FieldLabel>Pattern</FieldLabel>
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] text-white/50 mb-2">Color</p>
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
            </div>
          </>
        )}

        {/* LAYOUT — wireframe previews */}
        {panelTab === "layout" && (
          <div>
            <FieldLabel>Hero Layout</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {LAYOUTS.map((l) => (
                <button key={l.id} onClick={() => setContent("layout", l.id)}
                  className={`relative rounded-lg border overflow-hidden transition-all ${
                    content.layout === l.id
                      ? "border-white/50 bg-white/[0.06]"
                      : "border-white/[0.1] bg-white/[0.02] hover:border-white/25"
                  }`}
                  style={{ height: 90 }}>
                  <div className="absolute inset-0 p-1">
                    {LAYOUT_WIREFRAMES[l.id]}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-1.5 bg-gradient-to-t from-black/70 to-transparent">
                    <p className={`text-[11px] font-semibold leading-none ${content.layout === l.id ? "text-white" : "text-white/55"}`}>
                      {l.label}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">{l.desc}</p>
                  </div>
                  {content.layout === l.id && (
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BACKGROUND */}
        {panelTab === "background" && (
          <>
            <div>
              <FieldLabel>Background Color</FieldLabel>
              <ColorDots colors={BG_PRESETS} selected={content.bgColor}
                onSelect={(c) => setContent("bgColor", c)}
                allowCustom customValue={content.bgColor}
                onCustomChange={(c) => setContent("bgColor", c)} />
            </div>

            <div className="h-px bg-white/[0.07]" />

            <div>
              <FieldLabel>Background Image</FieldLabel>
              {content.bgImageUrl ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.bgImageUrl} alt="" className="w-full h-20 object-cover rounded-lg border border-white/10"
                    onError={(e) => { e.currentTarget.style.opacity = "0.3" }} />
                  <div className="flex gap-4">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="text-[13px] text-white/50 hover:text-white transition-colors">Change</button>
                    <button onClick={() => setContent("bgImageUrl", "")}
                      className="text-[13px] text-red-400/60 hover:text-red-400 transition-colors">Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-white/15 py-6 text-[13px] text-white/40 hover:border-white/30 hover:text-white/65 transition-all">
                  Click to upload
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <p className="text-[12px] text-white/35 mt-3 leading-relaxed">
                Image appears behind the pattern. Use overlay darkness to blend.
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Get Code — always visible ─────────────────────── */}
      <div className="shrink-0 border-t border-white/[0.09] bg-neutral-950">

        {/* Format selector */}
        <div className="flex border-b border-white/[0.09]">
          {([
            { id: "react",   label: "React",        hint: "TSX component" },
            { id: "css",     label: "CSS",           hint: "Pure stylesheet" },
            { id: "section", label: "Full section",  hint: "Complete hero" },
          ] as { id: CopyFormat; label: string; hint: string }[]).map((f) => (
            <button key={f.id} onClick={() => setCopyFormat(f.id)}
              className={`flex-1 py-2.5 transition-colors border-b-2 text-center ${
                copyFormat === f.id
                  ? "border-white text-white"
                  : "border-transparent text-white/35 hover:text-white/60"
              }`}>
              <p className="text-[11px] font-medium tracking-wide">{f.label}</p>
              <p className="text-[10px] text-white/30">{f.hint}</p>
            </button>
          ))}
        </div>

        {/* Code preview */}
        <div className="px-4 pt-3 pb-2">
          <pre className="text-[10px] font-mono text-white/40 leading-relaxed bg-white/[0.03] rounded-md p-3 overflow-hidden whitespace-pre-wrap break-all line-clamp-4">
            {codePreview}
          </pre>
        </div>

        {/* Copy button */}
        <div className="px-4 pb-4">
          <button onClick={() => copy(code)}
            className="w-full py-3 bg-white text-neutral-950 text-[14px] font-semibold rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            {copied
              ? <><Check size={15} className="text-green-600" /><span className="text-green-700">Copied!</span></>
              : <><Copy size={15} />Copy Code</>}
          </button>
        </div>
      </div>
    </div>
  )
}
