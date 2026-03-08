"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Maximize2 } from "lucide-react"
import { PatternMeta } from "@/config/patterns"
import { PatternConfig } from "@/types"
import { Customizer } from "@/components/playground/Customizer"
import { CodePanel } from "@/components/playground/CodePanel"
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

function getCodeForPattern(id: string, name: string, config: PatternConfig) {
  switch (id) {
    case "blueprint-grid":
      return { tsx: generateBlueprintGridTSX(config), css: generateBlueprintGridCSS(config) }
    case "dot-matrix":
      return { tsx: generateDotMatrixTSX(config), css: generateDotMatrixCSS(config) }
    default:
      return {
        tsx: generateGenericTSX(id, name, config),
        css: generateGenericCSS(name, config),
      }
  }
}

function PlaygroundInner({ pattern }: Props) {
  const { component: PatternComponent } = pattern
  const [config, setConfig] = useState<PatternConfig>(pattern.defaultConfig)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { tsx, css } = getCodeForPattern(pattern.id, pattern.name, config)

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950 cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
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

      {/* Main layout */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-69px)]">

        {/* Left — preview + customizer */}
        <div className="flex flex-col border-r border-white/5">
          {/* Pattern preview */}
          <div className="relative flex-1 min-h-[400px] bg-neutral-900 overflow-hidden">
            <PatternComponent {...config} />

            {/* Context overlay: fake nav + headline to see pattern in real use */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 pointer-events-none">
              <div className="flex justify-between items-center">
                <span className="text-xs tracking-[0.2em] text-white/40">YOUR BRAND</span>
                <div className="flex gap-4 text-xs text-white/30">
                  <span>Work</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-light mb-2">{pattern.name}</h2>
                <p className="text-sm text-white/40 max-w-xs">{pattern.description}</p>
              </div>
            </div>

            {/* Fullscreen button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-20 p-2 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all bg-black/30 backdrop-blur-sm"
            >
              <Maximize2 size={14} />
            </button>
          </div>

          {/* Customizer */}
          <div className="p-6 border-t border-white/5">
            <Customizer
              color={config.color}
              opacity={config.opacity}
              speed={config.speed}
              onColorChange={(color) => setConfig((c) => ({ ...c, color }))}
              onOpacityChange={(opacity) => setConfig((c) => ({ ...c, opacity }))}
              onSpeedChange={(speed) => setConfig((c) => ({ ...c, speed }))}
            />
          </div>
        </div>

        {/* Right — code panel */}
        <div className="flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-white/5">
            <p className="text-xs tracking-[0.3em] text-white/30 mb-1 uppercase">Export Code</p>
            <p className="text-white/40 text-xs">
              Copy as React component or pure CSS. Zero dependencies.
            </p>
          </div>
          <div className="flex-1 p-6">
            <div className="h-full">
              <CodePanel tsx={tsx} css={css} />
            </div>
          </div>
        </div>
      </div>

      {/* More patterns */}
      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <p className="text-xs tracking-[0.3em] text-white/30 mb-8 uppercase">More Patterns</p>
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
