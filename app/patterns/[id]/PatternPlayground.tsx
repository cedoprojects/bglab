"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Maximize2, Smartphone, Monitor, Link2, Check } from "lucide-react"
import { PatternMeta } from "@/config/patterns"
import { PatternConfig } from "@/types"
import { ControlPanel } from "@/components/playground/ControlPanel"
import { HeroPrototype, HeroContent, DEFAULT_HERO_CONTENT } from "@/components/playground/HeroPrototype"
import { PatternStrip } from "@/components/gallery/PatternStrip"
import {
  generateBlueprintGridTSX, generateBlueprintGridCSS,
  generateDotMatrixTSX,    generateDotMatrixCSS,
  generateGenericTSX,      generateGenericCSS,
} from "@/lib/codegen"

interface Props { pattern: PatternMeta }

function getCode(id: string, name: string, config: PatternConfig) {
  switch (id) {
    case "blueprint-grid": return { tsx: generateBlueprintGridTSX(config), css: generateBlueprintGridCSS(config) }
    case "dot-matrix":     return { tsx: generateDotMatrixTSX(config),     css: generateDotMatrixCSS(config) }
    default:               return { tsx: generateGenericTSX(id, name, config), css: generateGenericCSS(name, config) }
  }
}

function encodeState(config: PatternConfig, content: HeroContent): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify({
      c: config.color.replace("#", ""), o: config.opacity,
      sp: config.speed, sz: config.size,
      bg: content.bgColor.replace("#", ""),
      ot: content.overlayTint.replace("#", ""),
      od: content.overlayDarkness, l: content.layout,
      h: content.headline, sh: content.subheadline,
      br: content.brand, ct: content.cta,
      ct2: content.ctaSecondary, img: content.bgImageUrl,
    })))
  } catch { return "" }
}

function decodeState(encoded: string): { config: PatternConfig; content: HeroContent } | null {
  try {
    const s = JSON.parse(decodeURIComponent(atob(encoded)))
    return {
      config: { color: `#${s.c}`, opacity: s.o, speed: s.sp, size: s.sz ?? 1 },
      content: {
        ...DEFAULT_HERO_CONTENT,
        bgColor: `#${s.bg}`, overlayTint: `#${s.ot}`,
        overlayDarkness: s.od, layout: s.l,
        headline: s.h, subheadline: s.sh,
        brand: s.br, cta: s.ct, ctaSecondary: s.ct2,
        bgImageUrl: s.img ?? "",
      },
    }
  } catch { return null }
}

function PlaygroundInner({ pattern }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [config, setConfig]             = useState<PatternConfig>(pattern.defaultConfig)
  const [content, setContent]           = useState<HeroContent>(DEFAULT_HERO_CONTENT)
  const [mobileView, setMobileView]     = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [linkCopied, setLinkCopied]     = useState(false)

  useEffect(() => {
    const encoded = searchParams.get("s")
    if (encoded) {
      const restored = decodeState(encoded)
      if (restored) { setConfig(restored.config); setContent(restored.content) }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncUrl = useCallback((cfg: PatternConfig, cnt: HeroContent) => {
    const encoded = encodeState(cfg, cnt)
    if (encoded) router.replace(`?s=${encoded}`, { scroll: false })
  }, [router])

  const handleConfigChange = (cfg: PatternConfig) => { setConfig(cfg); syncUrl(cfg, content) }
  const handleContentChange = (cnt: HeroContent) => { setContent(cnt); syncUrl(config, cnt) }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const { tsx, css } = getCode(pattern.id, pattern.name, config)

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white overflow-hidden">

      {/* Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 cursor-pointer" onClick={() => setIsFullscreen(false)}>
          <HeroPrototype pattern={pattern} config={config} content={content} onContentChange={handleContentChange} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest bg-black/50 px-4 py-2">
            CLICK TO EXIT
          </div>
        </div>
      )}

      {/* ── Top nav ─────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 text-white/40 hover:text-white transition-colors text-xs tracking-widest">
          <ArrowLeft size={13} />
          BGLAB
        </Link>
        <div className="flex items-center gap-1 text-white font-light">
          <span className="text-sm">{pattern.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile / desktop toggle */}
          <div className="flex border border-white/10 overflow-hidden">
            <button onClick={() => setMobileView(false)}
              className={`px-2.5 py-1.5 transition-colors ${!mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
              <Monitor size={12} />
            </button>
            <button onClick={() => setMobileView(true)}
              className={`px-2.5 py-1.5 transition-colors ${mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
              <Smartphone size={12} />
            </button>
          </div>
          <button onClick={() => setIsFullscreen(true)}
            className="px-2.5 py-1.5 border border-white/10 text-white/30 hover:text-white transition-colors">
            <Maximize2 size={12} />
          </button>
          <button onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-[10px] tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all">
            {linkCopied
              ? <><Check size={11} className="text-green-400" /><span className="text-green-400">Copied!</span></>
              : <><Link2 size={11} /><span>Share</span></>}
          </button>
        </div>
      </nav>

      {/* ── Pattern strip (always visible) ──────────────── */}
      <PatternStrip activeId={pattern.id} />

      {/* ── Main area (fills remaining height) ──────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — hero preview + overlay slider */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Preview */}
          <div className={`flex-1 overflow-hidden ${mobileView ? "flex items-center justify-center bg-neutral-900/50 p-6" : ""}`}>
            <div
              className="h-full overflow-hidden"
              style={mobileView ? { width: 390, height: "100%", maxHeight: 700 } : { width: "100%", height: "100%" }}
            >
              <HeroPrototype
                pattern={pattern}
                config={config}
                content={content}
                onContentChange={handleContentChange}
                mobileView={mobileView}
              />
            </div>
          </div>

          {/* Overlay slider — glued right below the preview, always visible */}
          <div className="shrink-0 border-t border-white/5 bg-neutral-950/80 backdrop-blur-sm px-6 py-3">
            <div className="flex items-center gap-4 max-w-lg">
              <span className="text-[10px] tracking-widest text-white/30 whitespace-nowrap">OVERLAY</span>
              <input
                type="range" min={0} max={0.92} step={0.02}
                value={content.overlayDarkness}
                onChange={(e) => handleContentChange({ ...content, overlayDarkness: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-[10px] font-mono text-white/25 w-8 text-right">
                {Math.round(content.overlayDarkness * 100)}%
              </span>
              {/* Tint quick-switch */}
              <div className="flex gap-1.5">
                {[
                  { c: "#000000", t: "Black" },
                  { c: "#0a0f1e", t: "Navy" },
                  { c: "#0c0a1e", t: "Violet" },
                  { c: "#0a1a0f", t: "Forest" },
                ].map(({ c, t }) => (
                  <button
                    key={c}
                    title={t}
                    onClick={() => handleContentChange({ ...content, overlayTint: c })}
                    className={`w-4 h-4 rounded-full border transition-all ${content.overlayTint === c ? "border-white/70 scale-125" : "border-white/20 hover:border-white/50"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — tabbed control panel */}
        <div className="w-72 shrink-0 border-l border-white/5 overflow-hidden">
          <ControlPanel
            config={config}
            content={content}
            patternId={pattern.id}
            patternName={pattern.name}
            tsx={tsx}
            css={css}
            onConfigChange={handleConfigChange}
            onContentChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  )
}

export function PatternPlayground({ pattern }: Props) {
  return (
    <Suspense>
      <PlaygroundInner pattern={pattern} />
    </Suspense>
  )
}
