"use client"

import { useState, useRef } from "react"
import { RotateCcw } from "lucide-react"
import { HeroContent, HeroLayout } from "./HeroPrototype"
import { PatternConfig } from "@/types"
import { CodePanel } from "./CodePanel"

interface Props {
  config: PatternConfig
  content: HeroContent
  patternId: string
  patternName: string
  tsx: string
  css: string
  defaultConfig: PatternConfig
  onConfigChange: (c: PatternConfig) => void
  onContentChange: (c: HeroContent) => void
}

type Tab = "pattern" | "background" | "export"

const LAYOUTS: { id: HeroLayout; label: string; desc: string }[] = [
  { id: "left",     label: "SaaS",     desc: "Linear · Vercel style" },
  { id: "centered", label: "Centered", desc: "Agency · portfolio" },
  { id: "split",    label: "Split",    desc: "Text + UI card" },
  { id: "minimal",  label: "Minimal",  desc: "Brutalist · awwwards" },
]

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

const PATTERN_COLORS = ["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f472b6"]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] tracking-widest text-white/30 uppercase mb-2">{children}</p>
}

function Divider() {
  return <div className="h-px bg-white/[0.06] my-4" />
}

function ColorSwatch({ color, active, label, onClick }: {
  color: string; active: boolean; label: string; onClick: () => void
}) {
  return (
    <button onClick={onClick} title={label} className="flex flex-col items-center gap-1 group">
      <div
        className={`w-7 h-7 rounded border-2 transition-all ${
          active ? "border-white/80 scale-110 shadow-lg" : "border-transparent hover:border-white/30"
        }`}
        style={{ background: color }}
      />
      <span className={`text-[9px] transition-colors ${active ? "text-white/60" : "text-white/20 group-hover:text-white/40"}`}>
        {label}
      </span>
    </button>
  )
}

// Slider with default indicator and reset button
function SmartSlider({
  label, value, defaultValue, min, max, step,
  formatDisplay, onChange, hint,
}: {
  label: string
  value: number
  defaultValue: number
  min: number
  max: number
  step: number
  formatDisplay: (v: number) => string
  onChange: (v: number) => void
  hint?: string
}) {
  const isDefault = Math.abs(value - defaultValue) < step * 0.5
  const defaultPct = ((defaultValue - min) / (max - min)) * 100

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/50">{label}</span>
          {isDefault && (
            <span className="text-[9px] tracking-wide text-white/20 border border-white/10 px-1.5 py-px rounded-sm">
              default
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30 font-mono">{formatDisplay(value)}</span>
          {!isDefault && (
            <button
              onClick={() => onChange(defaultValue)}
              title="Reset to default"
              className="text-white/20 hover:text-white/60 transition-colors"
            >
              <RotateCcw size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Slider with default tick */}
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
        {/* Default position tick */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/20 pointer-events-none"
          style={{ left: `${defaultPct}%` }}
        />
      </div>

      {hint && <p className="text-[10px] text-white/15">{hint}</p>}
    </div>
  )
}

export function ControlPanel({
  config, content, patternId, patternName, tsx, css,
  defaultConfig, onConfigChange, onContentChange,
}: Props) {
  const [tab, setTab] = useState<Tab>("pattern")
  const fileInputRef  = useRef<HTMLInputElement>(null)

  const setConfig  = (key: keyof PatternConfig, val: string | number) =>
    onConfigChange({ ...config, [key]: val })
  const setContent = (key: keyof HeroContent, val: string | number) =>
    onContentChange({ ...content, [key]: val })

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      if (dataUrl) setContent("bgImageUrl", dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "pattern",    label: "Pattern" },
    { id: "background", label: "Background" },
    { id: "export",     label: "Export" },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-white/10 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-[10px] tracking-widest transition-colors ${
              tab === t.id
                ? "text-white border-b-2 border-white bg-white/[0.04]"
                : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ─── PATTERN TAB ──────────────────────────────────── */}
        {tab === "pattern" && (
          <div className="p-4 space-y-4">

            {/* Color */}
            <div>
              <SectionLabel>Pattern Color</SectionLabel>
              <div className="flex items-center gap-2 mb-2.5">
                <input
                  type="color" value={config.color}
                  onChange={(e) => setConfig("color", e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-white/10 bg-transparent shrink-0"
                />
                <input
                  type="text" value={config.color}
                  onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setConfig("color", e.target.value) }}
                  className="flex-1 bg-white/5 border border-white/10 text-white/60 text-xs font-mono px-3 py-2 focus:outline-none focus:border-white/30 min-w-0"
                />
              </div>
              <div className="flex gap-2">
                {PATTERN_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setConfig("color", c)}
                    title={c}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      config.color === c ? "border-white/80 scale-125" : "border-white/10 hover:border-white/50"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <Divider />

            <SmartSlider
              label="Opacity" value={config.opacity} defaultValue={defaultConfig.opacity}
              min={0.02} max={0.5} step={0.01}
              formatDisplay={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => setConfig("opacity", v)}
              hint="How visible the pattern is against the background"
            />

            <SmartSlider
              label="Animation Speed" value={config.speed} defaultValue={defaultConfig.speed}
              min={2} max={30} step={0.5}
              formatDisplay={(v) => `${v}s`}
              onChange={(v) => setConfig("speed", v)}
              hint="Lower = faster animation cycle"
            />

            <Divider />

            <SmartSlider
              label="Density / Scale" value={config.size} defaultValue={1}
              min={0.4} max={3} step={0.1}
              formatDisplay={(v) =>
                v < 0.7 ? "Fine" : v < 1.3 ? "Default" : v < 2 ? "Coarse" : "Bold"
              }
              onChange={(v) => setConfig("size", v)}
              hint="Controls grid cell size, dot spacing, or beam count"
            />
          </div>
        )}

        {/* ─── BACKGROUND TAB ───────────────────────────────── */}
        {tab === "background" && (
          <div className="p-4 space-y-4">

            {/* Layout picker */}
            <div>
              <SectionLabel>Hero Layout</SectionLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setContent("layout", l.id)}
                    className={`py-2 px-3 text-left border transition-all ${
                      content.layout === l.id
                        ? "border-white/50 bg-white/[0.06] text-white"
                        : "border-white/10 hover:border-white/25 text-white/50"
                    }`}
                  >
                    <p className="text-xs font-medium">{l.label}</p>
                    <p className="text-[9px] text-white/30 mt-0.5">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            {/* Background color */}
            <div>
              <SectionLabel>Background Color</SectionLabel>
              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-2.5">
                {BG_PRESETS.map((p) => (
                  <ColorSwatch key={p.color} {...p} active={content.bgColor === p.color}
                    onClick={() => setContent("bgColor", p.color)} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={content.bgColor}
                  onChange={(e) => setContent("bgColor", e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
                />
                <span className="text-xs text-white/30 font-mono">{content.bgColor}</span>
                <span className="text-[10px] text-white/15 ml-auto">Custom</span>
              </div>
            </div>

            <Divider />

            {/* Overlay tint */}
            <div>
              <SectionLabel>Overlay Tint</SectionLabel>
              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-2.5">
                {TINT_PRESETS.map((p) => (
                  <ColorSwatch key={p.color} {...p} active={content.overlayTint === p.color}
                    onClick={() => setContent("overlayTint", p.color)} />
                ))}
              </div>
              <SmartSlider
                label="Darkness" value={content.overlayDarkness} defaultValue={0.5}
                min={0} max={0.92} step={0.02}
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={(v) => setContent("overlayDarkness", v)}
              />
            </div>

            <Divider />

            {/* Background image */}
            <div>
              <SectionLabel>Background Image</SectionLabel>
              <p className="text-[10px] text-white/25 mb-3 leading-relaxed">
                Pattern animates on top of your image. Great for photo backgrounds.
              </p>

              {content.bgImageUrl ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.bgImageUrl}
                    alt="Background preview"
                    className="w-full h-24 object-cover border border-white/10 rounded-sm"
                    onError={(e) => { e.currentTarget.style.opacity = "0.3" }}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-white/40 hover:text-white transition-colors"
                    >
                      Change image
                    </button>
                    <button
                      onClick={() => setContent("bgImageUrl", "")}
                      className="text-xs text-red-400/50 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Upload button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border border-dashed border-white/20 py-4 text-xs text-white/40 hover:border-white/40 hover:text-white/70 hover:bg-white/[0.02] transition-all text-center"
                  >
                    Click to upload from your device
                  </button>

                  {/* URL fallback */}
                  <div className="flex items-center gap-2">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-[10px] text-white/20">or paste URL</span>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>
                  <input
                    type="text"
                    value={content.bgImageUrl}
                    onChange={(e) => setContent("bgImageUrl", e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 text-white/50 text-xs px-3 py-2 focus:outline-none focus:border-white/30 placeholder-white/15"
                  />
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        {/* ─── EXPORT TAB ───────────────────────────────────── */}
        {tab === "export" && (
          <div className="p-3" style={{ height: "calc(100% - 44px)" }}>
            <CodePanel
              tsx={tsx} css={css}
              patternId={patternId} patternName={patternName}
              config={config} content={content}
            />
          </div>
        )}
      </div>
    </div>
  )
}
