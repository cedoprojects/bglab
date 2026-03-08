"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Maximize2, Smartphone, Monitor, Link2, Check } from "lucide-react"
import { PatternMeta } from "@/config/patterns"
import { PatternConfig } from "@/types"
import { Customizer } from "@/components/playground/Customizer"
import { CodePanel } from "@/components/playground/CodePanel"
import { HeroPrototype, HeroContent, DEFAULT_HERO_CONTENT } from "@/components/playground/HeroPrototype"
import { PatternGrid } from "@/components/gallery/PatternGrid"
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

// Encode/decode state to URL so configs are shareable
function encodeState(config: PatternConfig, content: HeroContent): string {
  const s = {
    c: config.color.replace("#", ""),
    o: config.opacity,
    sp: config.speed,
    bg: content.bgColor.replace("#", ""),
    ot: content.overlayTint.replace("#", ""),
    od: content.overlayDarkness,
    l: content.layout,
    h: content.headline,
    sh: content.subheadline,
    br: content.brand,
    ct: content.cta,
    ct2: content.ctaSecondary,
    img: content.bgImageUrl,
  }
  return btoa(encodeURIComponent(JSON.stringify(s)))
}

function decodeState(encoded: string): { config: PatternConfig; content: HeroContent } | null {
  try {
    const s = JSON.parse(decodeURIComponent(atob(encoded)))
    return {
      config: {
        color: `#${s.c}`,
        opacity: s.o,
        speed: s.sp,
      },
      content: {
        ...DEFAULT_HERO_CONTENT,
        bgColor: `#${s.bg}`,
        overlayTint: `#${s.ot}`,
        overlayDarkness: s.od,
        layout: s.l,
        headline: s.h,
        subheadline: s.sh,
        brand: s.br,
        cta: s.ct,
        ctaSecondary: s.ct2,
        bgImageUrl: s.img ?? "",
      },
    }
  } catch {
    return null
  }
}

function PlaygroundInner({ pattern }: Props) {
  const router        = useRouter()
  const searchParams  = useSearchParams()

  const [config, setConfig]             = useState<PatternConfig>(pattern.defaultConfig)
  const [content, setContent]           = useState<HeroContent>(DEFAULT_HERO_CONTENT)
  const [mobileView, setMobileView]     = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [linkCopied, setLinkCopied]     = useState(false)

  // Restore from URL on mount
  useEffect(() => {
    const encoded = searchParams.get("s")
    if (encoded) {
      const restored = decodeState(encoded)
      if (restored) {
        setConfig(restored.config)
        setContent(restored.content)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync URL when state changes
  const syncUrl = useCallback((cfg: PatternConfig, cnt: HeroContent) => {
    const encoded = encodeState(cfg, cnt)
    router.replace(`?s=${encoded}`, { scroll: false })
  }, [router])

  const handleConfigChange = (cfg: PatternConfig) => {
    setConfig(cfg)
    syncUrl(cfg, content)
  }

  const handleContentChange = (cnt: HeroContent) => {
    setContent(cnt)
    syncUrl(config, cnt)
  }

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const { tsx, css } = getCode(pattern.id, pattern.name, config)

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 cursor-pointer" onClick={() => setIsFullscreen(false)}>
          <HeroPrototype pattern={pattern} config={config} content={content} onContentChange={handleContentChange} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest bg-black/40 px-4 py-2">
            CLICK TO EXIT
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-xs tracking-widest">
          <ArrowLeft size={14} />
          BGLAB
        </Link>
        <div className="flex items-center gap-4">
          {/* Mobile / desktop toggle */}
          <div className="flex items-center border border-white/10 overflow-hidden">
            <button
              onClick={() => setMobileView(false)}
              className={`p-2 transition-colors ${!mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
            >
              <Monitor size={13} />
            </button>
            <button
              onClick={() => setMobileView(true)}
              className={`p-2 transition-colors ${mobileView ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
            >
              <Smartphone size={13} />
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 border border-white/10 text-white/30 hover:text-white transition-colors"
          >
            <Maximize2 size={13} />
          </button>

          {/* Share link */}
          <button
            onClick={copyShareLink}
            className="flex items-center gap-2 px-3 py-2 border border-white/10 text-xs tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all"
          >
            {linkCopied ? (
              <><Check size={12} className="text-green-400" /><span className="text-green-400">Copied!</span></>
            ) : (
              <><Link2 size={12} /><span>Share</span></>
            )}
          </button>
        </div>
      </nav>

      {/* Pattern name + tags */}
      <div className="px-6 md:px-10 pt-6 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-white/25 mb-1 uppercase">Playground</p>
          <h1 className="text-xl font-light">{pattern.name}</h1>
        </div>
        <div className="flex gap-2">
          {pattern.tags.map((tag) => (
            <span key={tag} className="text-[10px] tracking-wider text-white/20 border border-white/10 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="px-6 md:px-10 pb-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* LEFT — hero prototype */}
          <div className="flex flex-col gap-2">
            <div
              className="border border-white/10 overflow-hidden transition-all duration-300"
              style={{
                minHeight: "460px",
                background: mobileView ? "#1a1a1a" : undefined,
                padding: mobileView ? "20px" : undefined,
              }}
            >
              <HeroPrototype
                pattern={pattern}
                config={config}
                content={content}
                onContentChange={handleContentChange}
                mobileView={mobileView}
              />
            </div>
            {mobileView && (
              <p className="text-[10px] text-white/20 text-center tracking-widest">390px — iPhone preview</p>
            )}
          </div>

          {/* RIGHT — controls + code */}
          <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-180px)]">
            <Customizer
              config={config}
              content={content}
              onConfigChange={handleConfigChange}
              onContentChange={handleContentChange}
            />

            <div style={{ minHeight: "360px" }}>
              <p className="text-xs tracking-widest text-white/25 mb-2">EXPORT CODE</p>
              <div style={{ height: "360px" }}>
                <CodePanel
                  tsx={tsx}
                  css={css}
                  patternId={pattern.id}
                  patternName={pattern.name}
                  config={config}
                  content={content}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More patterns */}
      <section className="px-6 md:px-10 py-12 border-t border-white/5">
        <p className="text-xs tracking-[0.3em] text-white/25 mb-6 uppercase">More Patterns</p>
        <PatternGrid activeId={pattern.id} />
      </section>
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
