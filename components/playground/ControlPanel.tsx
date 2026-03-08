"use client"

import { useState } from "react"
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
  onConfigChange: (c: PatternConfig) => void
  onContentChange: (c: HeroContent) => void
}

type Tab = "pattern" | "background" | "export"

const LAYOUTS: { id: HeroLayout; label: string; desc: string }[] = [
  { id: "left",     label: "SaaS",     desc: "Linear / Vercel style" },
  { id: "centered", label: "Centered", desc: "Agency / portfolio" },
  { id: "split",    label: "Split",    desc: "Text + UI card" },
  { id: "minimal",  label: "Minimal",  desc: "Brutalist / awwwards" },
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] tracking-widest text-white/30 uppercase mb-2.5">{children}</p>
}

function Divider() {
  return <div className="h-px bg-white/5 my-5" />
}

function Slider({
  label, value, min, max, step, display, onChange,
}: {
  label: string; value: number; min: number; max: number
  step: number; display: string; onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs text-white/25 font-mono">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  )
}

function ColorSwatch({ color, active, label, onClick }: { color: string; active: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group">
      <div
        className={`w-8 h-8 rounded border-2 transition-all ${active ? "border-white/70 scale-110" : "border-white/10 group-hover:border-white/40"}`}
        style={{ background: color }}
      />
      <span className="text-[9px] text-white/25 group-hover:text-white/50 transition-colors">{label}</span>
    </button>
  )
}

export function ControlPanel({
  config, content, patternId, patternName, tsx, css,
  onConfigChange, onContentChange,
}: Props) {
  const [tab, setTab] = useState<Tab>("pattern")

  const setConfig = (key: keyof PatternConfig, val: string | number) =>
    onConfigChange({ ...config, [key]: val })
  const setContent = (key: keyof HeroContent, val: string | number) =>
    onContentChange({ ...content, [key]: val })

  const tabs: { id: Tab; label: string }[] = [
    { id: "pattern",    label: "Pattern" },
    { id: "background", label: "Background" },
    { id: "export",     label: "Export" },
  ]

  return (
    <div className="flex flex-col h-full border border-white/10 bg-neutral-900/30">
      {/* Tab bar */}
      <div className="flex border-b border-white/10 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-[10px] tracking-widest transition-colors ${
              tab === t.id
                ? "text-white border-b border-white bg-white/[0.03]"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── PATTERN TAB ─────────────────────────────── */}
        {tab === "pattern" && (
          <div className="p-5 space-y-5">
            <div>
              <SectionLabel>Color</SectionLabel>
              <div className="flex items-center gap-3">
                <input type="color" value={config.color}
                  onChange={(e) => setConfig("color", e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer bg-transparent border border-white/10 shrink-0"
                />
                <input type="text" value={config.color}
                  onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setConfig("color", e.target.value) }}
                  className="flex-1 bg-white/5 border border-white/10 text-white/60 text-xs font-mono px-3 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
              {/* Quick color presets */}
              <div className="flex gap-2 mt-2.5">
                {["#ffffff", "#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#f87171"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setConfig("color", c)}
                    className={`w-5 h-5 rounded-full border transition-all ${config.color === c ? "border-white/80 scale-125" : "border-white/10 hover:border-white/40"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <Divider />

            <Slider
              label="Opacity" value={config.opacity} min={0.02} max={0.5} step={0.01}
              display={`${Math.round(config.opacity * 100)}%`}
              onChange={(v) => setConfig("opacity", v)}
            />

            <Slider
              label="Speed" value={config.speed} min={2} max={30} step={0.5}
              display={`${config.speed}s`}
              onChange={(v) => setConfig("speed", v)}
            />

            <Divider />

            <div>
              <SectionLabel>Density / Scale</SectionLabel>
              <Slider
                label="Grid size" value={config.size} min={0.4} max={3} step={0.1}
                display={config.size === 1 ? "Default" : config.size < 1 ? "Fine" : "Coarse"}
                onChange={(v) => setConfig("size", v)}
              />
              <p className="text-[10px] text-white/20 mt-1.5">Controls cell size for grid, dot, and hatch patterns</p>
            </div>
          </div>
        )}

        {/* ── BACKGROUND TAB ──────────────────────────── */}
        {tab === "background" && (
          <div className="p-5 space-y-5">

            {/* Layout */}
            <div>
              <SectionLabel>Hero Layout</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setContent("layout", l.id)}
                    className={`py-2 px-3 text-left border transition-all ${
                      content.layout === l.id
                        ? "border-white/40 bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className={`text-xs ${content.layout === l.id ? "text-white" : "text-white/50"}`}>{l.label}</p>
                    <p className="text-[9px] text-white/20 mt-0.5">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            {/* Background color */}
            <div>
              <SectionLabel>Background Color</SectionLabel>
              <div className="flex gap-3 flex-wrap mb-3">
                {BG_PRESETS.map((p) => (
                  <ColorSwatch key={p.color} color={p.color} label={p.label}
                    active={content.bgColor === p.color} onClick={() => setContent("bgColor", p.color)} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={content.bgColor}
                  onChange={(e) => setContent("bgColor", e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border border-white/10"
                />
                <span className="text-xs text-white/30 font-mono">{content.bgColor}</span>
              </div>
            </div>

            <Divider />

            {/* Overlay */}
            <div>
              <SectionLabel>Overlay Tint</SectionLabel>
              <div className="flex gap-3 flex-wrap mb-3">
                {TINT_PRESETS.map((p) => (
                  <ColorSwatch key={p.color} color={p.color} label={p.label}
                    active={content.overlayTint === p.color} onClick={() => setContent("overlayTint", p.color)} />
                ))}
              </div>
              <Slider
                label="Darkness" value={content.overlayDarkness} min={0} max={0.92} step={0.02}
                display={`${Math.round(content.overlayDarkness * 100)}%`}
                onChange={(v) => setContent("overlayDarkness", v)}
              />
            </div>

            <Divider />

            {/* Background image */}
            <div>
              <SectionLabel>Background Image</SectionLabel>
              <p className="text-[10px] text-white/30 mb-2">Pattern animates on top of your photo</p>

              {content.bgImageUrl ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.bgImageUrl} alt="" className="w-full h-20 object-cover border border-white/10"
                    onError={(e) => (e.currentTarget.style.opacity = "0.3")} />
                  <button onClick={() => setContent("bgImageUrl", "")}
                    className="text-xs text-red-400/60 hover:text-red-400 transition-colors">
                    Remove image
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={content.bgImageUrl}
                  onChange={(e) => setContent("bgImageUrl", e.target.value)}
                  placeholder="Paste image URL..."
                  className="w-full bg-white/5 border border-dashed border-white/20 text-white/60 text-xs px-3 py-3 focus:outline-none focus:border-white/40 placeholder-white/20"
                />
              )}
            </div>
          </div>
        )}

        {/* ── EXPORT TAB ──────────────────────────────── */}
        {tab === "export" && (
          <div className="p-3 h-full" style={{ minHeight: "400px" }}>
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
