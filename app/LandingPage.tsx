"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Code2, Layers, MousePointer2 } from "lucide-react"
import { patterns, PatternMeta } from "@/config/patterns"
import { BlueprintGrid } from "@/components/patterns/BlueprintGrid"
import { DotMatrix } from "@/components/patterns/DotMatrix"
import { PerspectiveGrid } from "@/components/patterns/PerspectiveGrid"
import { Crosshatch } from "@/components/patterns/Crosshatch"

// Typography system (Inter, dark bg #0a0a0a):
// Primary text:   text-white            headlines, active UI
// Secondary:      text-white/75         readable body copy
// Tertiary:       text-white/55         supporting, captions
// Decorative:     text-white/35         eyebrows, labels
// Dim:            text-white/20         borders text, barely visible

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── Nav ────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-lg">
        <span className="text-[15px] font-semibold tracking-tight">bglab</span>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-[13px] text-white/55 hover:text-white transition-colors hidden sm:block">
            GitHub
          </a>
          <Link href="/patterns/blueprint-grid"
            className="flex items-center gap-2 bg-white text-[#0a0a0a] px-5 py-2 text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Building <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-24 overflow-hidden">

        <div className="absolute inset-0" style={{ opacity: 0.2 }}>
          <BlueprintGrid color="#ffffff" opacity={0.5} speed={14} size={1} />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(99,102,241,0.12), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] bg-white/[0.05] px-4 py-1.5 mb-12 text-[12px] text-white/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            8 patterns — free, no account
          </div>

          <h1 className="text-[clamp(48px,8.5vw,108px)] font-extralight tracking-[-0.04em] leading-[0.9] mb-7 text-white">
            Stop guessing how<br />
            <span className="text-white/40">your hero will look.</span>
          </h1>

          <p className="text-[17px] md:text-[19px] text-white/70 mb-12 max-w-xl mx-auto leading-[1.65] font-light">
            Pick an animated background, type your real headline and CTA directly
            in the preview, then copy production React or CSS code.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/patterns/blueprint-grid"
              className="flex items-center gap-2 bg-white text-[#0a0a0a] px-8 py-3.5 text-[14px] font-semibold rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/10">
              Start Building <ArrowRight size={14} />
            </Link>
            <Link href="/patterns/blueprint-grid"
              className="flex items-center gap-2 border border-white/[0.18] text-white/65 px-8 py-3.5 text-[14px] rounded-lg hover:border-white/35 hover:text-white/85 transition-all">
              <Sparkles size={13} /> AI Generate
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pattern grid ───────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-2">Patterns</p>
              <h2 className="text-[28px] font-light tracking-tight text-white">8 production-ready backgrounds</h2>
            </div>
            <Link href="/patterns/blueprint-grid"
              className="text-[13px] text-white/45 hover:text-white/80 transition-colors items-center gap-1.5 hidden sm:flex">
              Browse all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {patterns.map((p: PatternMeta) => {
              const { component: PatternComponent } = p
              return (
                <button key={p.id}
                  onClick={() => router.push(`/patterns/${p.id}`)}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.09] hover:border-white/25 transition-all duration-300 bg-neutral-900 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-0.5"
                  style={{ height: 160 }}>
                  <div className="absolute inset-0">
                    <PatternComponent {...p.defaultConfig} opacity={(p.defaultConfig.opacity ?? 0.15) * 1.7} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent group-hover:from-black/70 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-[12px] font-semibold text-white/75 group-hover:text-white transition-colors">{p.name}</p>
                    <p className="text-[10px] text-white/40 mt-0.5 leading-snug line-clamp-1">{p.description}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/15 rounded-full p-1.5 backdrop-blur-sm">
                      <ArrowRight size={10} className="text-white" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Hero layout variants ────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-3">Layouts</p>
          <h2 className="text-[28px] font-light tracking-tight text-white mb-3">
            4 hero layouts built in
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.65] mb-12 max-w-lg">
            Switch between SaaS, centered, split, and minimal in one click. Each layout works with every pattern.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                label: "SaaS", desc: "Linear / Vercel style — left-aligned, badge + headline + CTA",
                Pattern: BlueprintGrid, patternId: "blueprint-grid",
              },
              {
                label: "Centered", desc: "Agency / portfolio — full-width headline, centered CTAs",
                Pattern: DotMatrix, patternId: "dot-matrix",
              },
              {
                label: "Split", desc: "Text left, product card right — show your UI alongside the pitch",
                Pattern: PerspectiveGrid, patternId: "perspective-grid",
              },
              {
                label: "Minimal", desc: "Brutalist / editorial — massive type, nothing else",
                Pattern: Crosshatch, patternId: "crosshatch",
              },
            ].map((item) => (
              <button key={item.label}
                onClick={() => router.push(`/patterns/${item.patternId}`)}
                className="group relative overflow-hidden rounded-xl border border-white/[0.09] hover:border-white/22 transition-all text-left hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
                style={{ height: 180 }}>
                <div className="absolute inset-0 bg-neutral-900">
                  <item.Pattern color="#ffffff" opacity={0.18} speed={12} size={1} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-center">
                  <div className="inline-block border border-white/20 rounded-md px-2.5 py-1 text-[10px] text-white/60 tracking-widest mb-3 w-fit">
                    {item.label.toUpperCase()}
                  </div>
                  <p className="text-[13px] text-white/65 leading-snug max-w-[200px]">{item.desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={14} className="text-white/50" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-3">How it works</p>
          <h2 className="text-[28px] font-light tracking-tight text-white mb-16">
            From pattern to production in minutes
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <Layers size={18} className="text-indigo-400" />,
                step: "01",
                title: "Pick a pattern",
                body: "Browse 8 animated backgrounds — dot grids, blueprint lines, node graphs, geometric blocks. Each tuned for real hero sections, not toy demos.",
              },
              {
                icon: <MousePointer2 size={18} className="text-indigo-400" />,
                step: "02",
                title: "Type your real content",
                body: "Click any text in the live preview to edit it. Your actual headline, brand, CTA. See exactly how it looks before writing a single line of code.",
              },
              {
                icon: <Code2 size={18} className="text-indigo-400" />,
                step: "03",
                title: "Copy and ship",
                body: "Get a React component, raw CSS, or a complete hero section. One click. No npm packages, no account, no config.",
              },
            ].map((item) => (
              <div key={item.step}
                className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-8 flex flex-col gap-6 hover:border-white/16 hover:bg-white/[0.035] transition-all">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    {item.icon}
                  </div>
                  <span className="text-[12px] font-mono text-white/20">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold mb-2.5 text-white">{item.title}</h3>
                  <p className="text-[14px] text-white/60 leading-[1.65]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The differentiator ─────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-3">Why bglab</p>
            <h2 className="text-[28px] font-light tracking-tight text-white mb-5 leading-tight">
              See it with your real content<br />
              <span className="text-white/45">before you write a line of code.</span>
            </h2>
            <p className="text-[15px] text-white/65 leading-[1.65] mb-8">
              Every other pattern library shows you an isolated preview in a tiny box.
              bglab puts the pattern in a full hero — with your actual headline, brand,
              and CTAs. What you see is what you ship.
            </p>
            <div className="space-y-3.5">
              {[
                "Click any text in the hero preview to edit it",
                "4 layouts — SaaS, centered, split, minimal",
                "Adjust overlay darkness, tint, density, speed live",
                "Upload a background image and blend it with the pattern",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 text-[14px] text-white/65">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Live hero card */}
          <div className="relative rounded-xl border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/60" style={{ height: 310 }}>
            <BlueprintGrid color="#ffffff" opacity={0.2} speed={10} size={1} />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
            <div className="absolute inset-0 flex flex-col p-8">
              <div className="flex items-center justify-between mb-auto">
                <span className="text-[10px] tracking-[0.22em] text-white/45">YOUR BRAND</span>
                <div className="flex gap-4 text-[11px] text-white/30">
                  <span>Product</span><span>Docs</span><span>Pricing</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-white/35 uppercase mb-3">Click to edit</p>
                <h3 className="text-4xl font-extralight text-white leading-[0.92] mb-3">
                  Your real headline<br />goes right here.
                </h3>
                <p className="text-[14px] text-white/60 mb-5 leading-[1.65]">Type your subheadline and see it live.</p>
                <div className="flex gap-2.5">
                  <div className="bg-white text-[#0a0a0a] px-4 py-2 text-[12px] font-semibold rounded-md">Get Started</div>
                  <div className="border border-white/25 text-white/65 px-4 py-2 text-[12px] rounded-md">Learn More</div>
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-black/40 rounded-md px-2.5 py-1 backdrop-blur-sm">
              <span className="text-[9px] tracking-widest text-white/40">LIVE PREVIEW</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="px-6 md:px-14 py-32 border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(38px,5.5vw,80px)] font-extralight tracking-[-0.04em] leading-[0.92] mb-6 text-white">
            Your hero background,<br />
            <span className="text-white/35">done in 5 minutes.</span>
          </h2>
          <p className="text-[16px] text-white/55 mb-12 leading-[1.65]">No account. No npm install. Just pick, preview, and copy.</p>
          <Link href="/patterns/blueprint-grid"
            className="inline-flex items-center gap-2.5 bg-white text-[#0a0a0a] px-10 py-4 text-[14px] font-semibold rounded-lg hover:bg-white/90 transition-all shadow-xl shadow-white/10">
            Start Building <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="px-8 md:px-14 py-7 border-t border-white/[0.07] flex items-center justify-between">
        <span className="text-[13px] font-semibold text-white/35">bglab</span>
        <p className="text-[12px] text-white/25">Animated CSS backgrounds for developers</p>
      </footer>
    </div>
  )
}
