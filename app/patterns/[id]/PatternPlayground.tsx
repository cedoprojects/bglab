"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Maximize2 } from "lucide-react"
import { PatternMeta } from "@/config/patterns"
import { PatternConfig } from "@/types"
import { Customizer } from "@/components/playground/Customizer"
import { CodePanel } from "@/components/playground/CodePanel"
import { HeroPrototype, HeroContent, DEFAULT_HERO_CONTENT } from "@/components/playground/HeroPrototype"
import { PatternGrid } from "@/components/gallery/PatternGrid"
import {
  generateBlueprintGridTSX,
  generateBlueprintGridCSS,
  generateDotMatrixTSX,
  generateDotMatrixCSS,
  generateGenericTSX,
  generateGenericCSS,
} from "@/lib/codegen"

interface Props {
  pattern: PatternMeta
}

function getCode(id: string, name: string, config: PatternConfig) {
  switch (id) {
    case "blueprint-grid": return { tsx: generateBlueprintGridTSX(config), css: generateBlueprintGridCSS(config) }
    case "dot-matrix":     return { tsx: generateDotMatrixTSX(config),     css: generateDotMatrixCSS(config) }
    default:               return { tsx: generateGenericTSX(id, name, config), css: generateGenericCSS(name, config) }
  }
}

function PlaygroundInner({ pattern }: Props) {
  const { component: PatternComponent } = pattern
  const [config, setConfig]           = useState<PatternConfig>(pattern.defaultConfig)
  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { tsx, css } = getCode(pattern.id, pattern.name, config)

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-neutral-950 cursor-pointer" onClick={() => setIsFullscreen(false)}>
          <PatternComponent {...config} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest">
            CLICK TO EXIT
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-xs tracking-widest">
          <ArrowLeft size={14} />
          BGLAB
        </Link>
        <div className="flex items-center gap-2">
          {pattern.tags.map((tag) => (
            <span key={tag} className="text-[10px] tracking-wider text-white/20 border border-white/10 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </nav>

      {/* Pattern name */}
      <div className="px-6 md:px-12 pt-8 pb-4">
        <p className="text-xs tracking-[0.3em] text-white/30 mb-1 uppercase">Playground</p>
        <h1 className="text-2xl font-light">{pattern.name}</h1>
        <p className="text-white/30 text-sm mt-1">{pattern.description}</p>
      </div>

      {/* MAIN: Hero prototype + controls */}
      <div className="px-6 md:px-12 pb-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

          {/* LEFT — editable hero prototype (THE DRAW) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-widest text-white/30">
                HERO PREVIEW — <span className="text-white/50">click any text to edit it</span>
              </p>
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors"
              >
                <Maximize2 size={12} />
                Fullscreen
              </button>
            </div>

            <div className="border border-white/10 overflow-hidden" style={{ minHeight: "460px" }}>
              <HeroPrototype
                pattern={pattern}
                config={config}
                content={heroContent}
                onContentChange={setHeroContent}
              />
            </div>

            {/* Overlay darkness slider — lives below the hero */}
            <div className="flex items-center gap-4 px-1">
              <span className="text-xs text-white/30 whitespace-nowrap">Overlay</span>
              <input
                type="range" min="0" max="0.9" step="0.05"
                value={heroContent.overlayDarkness}
                onChange={(e) => setHeroContent(c => ({ ...c, overlayDarkness: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-xs text-white/30 w-8">{Math.round(heroContent.overlayDarkness * 100)}%</span>
            </div>
          </div>

          {/* RIGHT — pattern controls + code */}
          <div className="flex flex-col gap-6">
            {/* Customizer */}
            <div className="border border-white/10 p-5">
              <Customizer
                color={config.color}
                opacity={config.opacity}
                speed={config.speed}
                onColorChange={(color) => setConfig((c) => ({ ...c, color }))}
                onOpacityChange={(opacity) => setConfig((c) => ({ ...c, opacity }))}
                onSpeedChange={(speed) => setConfig((c) => ({ ...c, speed }))}
              />
            </div>

            {/* Code export */}
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-xs tracking-widest text-white/30">EXPORT</p>
              <div className="flex-1" style={{ minHeight: "320px" }}>
                <CodePanel tsx={tsx} css={css} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More patterns */}
      <section className="px-6 md:px-12 py-12 border-t border-white/5">
        <p className="text-xs tracking-[0.3em] text-white/30 mb-6 uppercase">More Patterns</p>
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
