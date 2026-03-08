"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Maximize2, Smartphone, Monitor, Link2, Check } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PatternMeta } from "@/config/patterns"
import { PatternConfig } from "@/types"
import { ControlPanel } from "@/components/playground/ControlPanel"
import { HeroPrototype, HeroContent, DEFAULT_HERO_CONTENT } from "@/components/playground/HeroPrototype"
import { PatternStrip } from "@/components/gallery/PatternStrip"
import { AIPanel } from "@/components/generator/AIPanel"

interface Props { pattern: PatternMeta }

function encodeState(config: PatternConfig, content: HeroContent): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify({
      c: config.color.replace("#",""), o: config.opacity, sp: config.speed, sz: config.size,
      bg: content.bgColor.replace("#",""), ot: content.overlayTint.replace("#",""),
      od: content.overlayDarkness, l: content.layout,
      h: content.headline, sh: content.subheadline,
      br: content.brand, ct: content.cta, ct2: content.ctaSecondary,
      img: content.bgImageUrl.startsWith("data:") ? "" : content.bgImageUrl,
    })))
  } catch { return "" }
}

function decodeState(s: string): { config: PatternConfig; content: HeroContent } | null {
  try {
    const d = JSON.parse(decodeURIComponent(atob(s)))
    return {
      config: { color:`#${d.c}`, opacity:d.o, speed:d.sp, size:d.sz??1 },
      content: { ...DEFAULT_HERO_CONTENT,
        bgColor:`#${d.bg}`, overlayTint:`#${d.ot}`, overlayDarkness:d.od,
        layout:d.l, headline:d.h, subheadline:d.sh,
        brand:d.br, cta:d.ct, ctaSecondary:d.ct2, bgImageUrl:d.img??"" },
    }
  } catch { return null }
}

function PlaygroundInner({ pattern }: Props) {
  const router        = useRouter()
  const searchParams  = useSearchParams()
  const [config, setConfig]           = useState<PatternConfig>(pattern.defaultConfig)
  const [content, setContent]         = useState<HeroContent>(DEFAULT_HERO_CONTENT)
  const [mobileView, setMobileView]   = useState(false)
  const [fullscreen, setFullscreen]   = useState(false)
  const [linkCopied, setLinkCopied]   = useState(false)
  const [aiOpen, setAiOpen]           = useState(false)

  useEffect(() => {
    const encoded = searchParams.get("s")
    if (encoded) { const r = decodeState(encoded); if (r) { setConfig(r.config); setContent(r.content) } }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncUrl = useCallback((cfg: PatternConfig, cnt: HeroContent) => {
    const e = encodeState(cfg, cnt); if (e) router.replace(`?s=${e}`, { scroll: false })
  }, [router])

  const handleConfig  = (cfg: PatternConfig) => { setConfig(cfg);  syncUrl(cfg, content) }
  const handleContent = (cnt: HeroContent)   => { setContent(cnt); syncUrl(config, cnt) }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white overflow-hidden">

      {fullscreen && (
        <div className="fixed inset-0 z-50 cursor-pointer" onClick={() => setFullscreen(false)}>
          <HeroPrototype pattern={pattern} config={config} content={content} onContentChange={handleContent} />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/30 bg-black/50 px-4 py-2">
            CLICK TO EXIT
          </div>
        </div>
      )}

      {/* AI panel slide-over */}
      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] shrink-0">
        <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs tracking-widest">
          <ArrowLeft size={13} /> BGLAB
        </Link>
        <span className="text-xs text-white/40 font-light hidden md:block">{pattern.name}</span>
        <div className="flex items-center gap-1.5">
          <div className="flex border border-white/10 overflow-hidden">
            <button onClick={() => setMobileView(false)}
              className={`px-2.5 py-1.5 transition-colors ${!mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50"}`}>
              <Monitor size={12} />
            </button>
            <button onClick={() => setMobileView(true)}
              className={`px-2.5 py-1.5 transition-colors ${mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50"}`}>
              <Smartphone size={12} />
            </button>
          </div>
          <button onClick={() => setFullscreen(true)}
            className="px-2.5 py-1.5 border border-white/10 text-white/30 hover:text-white transition-colors">
            <Maximize2 size={12} />
          </button>
          <button onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-[10px] tracking-widest text-white/30 hover:text-white hover:border-white/30 transition-all">
            {linkCopied
              ? <><Check size={11} className="text-green-400" /><span className="text-green-400">Copied</span></>
              : <><Link2 size={11} /><span>Share</span></>}
          </button>
        </div>
      </nav>

      {/* ── Pattern strip ─────────────────────────────────── */}
      <PatternStrip activeId={pattern.id} onGenerateClick={() => setAiOpen(true)} />

      {/* ── Main ──────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className={`flex-1 flex flex-col overflow-hidden ${mobileView ? "bg-neutral-900/40" : ""}`}>
          <div className={`flex-1 overflow-hidden ${mobileView ? "flex items-center justify-center p-6" : ""}`}>
            <div className="h-full overflow-hidden"
              style={mobileView ? { width:390, maxHeight:700 } : { width:"100%" }}>
              <HeroPrototype pattern={pattern} config={config} content={content}
                onContentChange={handleContent} mobileView={mobileView} />
            </div>
          </div>

        </div>

        {/* Control panel */}
        <div className="w-72 shrink-0 overflow-hidden flex flex-col">
          <ControlPanel
            config={config} content={content}
            patternId={pattern.id} patternName={pattern.name}
            defaultConfig={pattern.defaultConfig}
            onConfigChange={handleConfig} onContentChange={handleContent}
          />
        </div>
      </div>
    </div>
  )
}

export function PatternPlayground({ pattern }: Props) {
  return <Suspense><PlaygroundInner pattern={pattern} /></Suspense>
}
