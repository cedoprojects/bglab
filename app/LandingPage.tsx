"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Code2, Layers, Wand2 } from "lucide-react"
import { patterns, PatternMeta } from "@/config/patterns"
import { BlueprintGrid } from "@/components/patterns/BlueprintGrid"

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* ── Nav ────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-[0.2em]">BGLAB</span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-white/35 hover:text-white transition-colors tracking-widest hidden sm:block"
          >
            GITHUB
          </a>
          <Link
            href="/patterns/blueprint-grid"
            className="flex items-center gap-2 bg-white text-[#080808] px-5 py-2 text-[11px] font-semibold tracking-widest hover:bg-white/90 transition-colors"
          >
            OPEN PLAYGROUND <ArrowRight size={11} />
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">

        {/* Live pattern background — dogfooding */}
        <div className="absolute inset-0" style={{ opacity: 0.25 }}>
          <BlueprintGrid color="#ffffff" opacity={0.4} speed={12} size={1} />
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(99,102,241,0.13), transparent 70%)",
          }}
        />

        {/* Bottom fade into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 border border-white/[0.1] px-4 py-2 mb-14 text-[10px] tracking-[0.25em] text-white/35 bg-white/[0.03]">
            <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
            8 PATTERNS · LIVE HERO PROTOTYPE · FREE
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(52px,9vw,108px)] font-thin tracking-[-0.04em] leading-[0.92] mb-8 text-white">
            Animated backgrounds<br />
            <span className="text-white/35">for serious UIs.</span>
          </h1>

          {/* Sub */}
          <p className="text-[15px] text-white/40 mb-14 max-w-lg mx-auto leading-relaxed font-light">
            Production-ready animated CSS patterns. Preview them inside a live hero
            with your real content before writing a single line of code.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/patterns/blueprint-grid"
              className="flex items-center gap-2 bg-white text-[#080808] px-8 py-4 text-[11px] font-bold tracking-widest hover:bg-white/90 transition-all"
            >
              OPEN PLAYGROUND <ArrowRight size={12} />
            </Link>
            <Link
              href="/patterns/blueprint-grid"
              className="flex items-center gap-2 border border-white/[0.12] text-white/45 px-8 py-4 text-[11px] tracking-widest hover:border-white/25 hover:text-white/70 transition-all"
            >
              <Sparkles size={11} /> AI GENERATE
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* ── Pattern grid ───────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 border-t border-white/[0.06]">

        <div className="flex items-end justify-between mb-10 max-w-7xl mx-auto">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/25 mb-3">PATTERNS</p>
            <h2 className="text-2xl font-light text-white tracking-tight">8 production-ready patterns</h2>
          </div>
          <Link
            href="/patterns/blueprint-grid"
            className="text-[11px] tracking-widest text-white/30 hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
          >
            BROWSE ALL <ArrowRight size={11} />
          </Link>
        </div>

        {/* Pattern cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
          {patterns.map((p: PatternMeta) => {
            const { component: PatternComponent } = p
            return (
              <button
                key={p.id}
                onClick={() => router.push(`/patterns/${p.id}`)}
                className="group relative overflow-hidden border border-white/[0.07] hover:border-white/20 transition-all duration-300 bg-neutral-900/60"
                style={{ height: 160 }}
              >
                {/* Live pattern */}
                <div className="absolute inset-0">
                  <PatternComponent {...p.defaultConfig} opacity={(p.defaultConfig.opacity ?? 0.15) * 1.8} />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/60 transition-all duration-300" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[11px] font-medium text-white/60 group-hover:text-white transition-colors tracking-wide">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5 leading-tight hidden group-hover:block">
                    {p.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={11} className="text-white/40" />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-white/25 mb-3">HOW IT WORKS</p>
          <h2 className="text-2xl font-light text-white tracking-tight mb-16">
            From pattern to production in minutes
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              {
                icon: <Layers size={16} className="text-white/50" />,
                step: "01",
                title: "Pick a pattern",
                body: "Browse 8 animated patterns. Dot grids, blueprint lines, isometric wireframes, structural beams. Each one built for real hero sections, not demos.",
              },
              {
                icon: <Wand2 size={16} className="text-white/50" />,
                step: "02",
                title: "Edit your real hero",
                body: "Type your actual headline, brand name, and CTA. Change overlay, color, and density. See exactly what your site will look like before touching code.",
              },
              {
                icon: <Code2 size={16} className="text-white/50" />,
                step: "03",
                title: "Copy production code",
                body: "Get a React component, raw CSS, or a complete page section drop-in. One click. No npm install, no account, no bullshit.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#080808] p-10 flex flex-col gap-6 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 border border-white/[0.08] bg-white/[0.03]">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-white/15">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For who ────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/25 mb-3">BUILT FOR</p>
              <h2 className="text-3xl font-light tracking-tight text-white mb-6 leading-tight">
                Developers who ship<br />
                <span className="text-white/35">landing pages fast.</span>
              </h2>
              <p className="text-[13px] text-white/35 leading-relaxed mb-8">
                You know how to code. You don't want to spend 3 hours tweaking CSS animation
                timing functions. Pick a pattern, paste your content, copy the code. Ship it.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "SaaS landing pages",
                  "Portfolio hero sections",
                  "Startup pitch sites",
                  "Freelance client projects",
                ].map((tag) => (
                  <div key={tag} className="flex items-center gap-3 text-[12px] text-white/40">
                    <div className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Live preview card */}
            <div className="relative border border-white/[0.08] overflow-hidden" style={{ height: 280 }}>
              <BlueprintGrid color="#ffffff" opacity={0.2} speed={10} size={1} />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.55)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-10">
                <p className="text-[9px] tracking-[0.25em] text-white/25 mb-4">YOUR BRAND</p>
                <h3 className="text-3xl font-light text-white leading-tight mb-3">
                  Build something<br />people actually use.
                </h3>
                <p className="text-xs text-white/35 mb-6 max-w-xs leading-relaxed">
                  Your real subheadline goes here. Click to edit any text in the playground.
                </p>
                <div className="flex gap-2">
                  <div className="bg-white text-[#080808] px-4 py-2 text-[10px] font-bold tracking-widest">GET STARTED</div>
                  <div className="border border-white/20 text-white/40 px-4 py-2 text-[10px] tracking-widest">LEARN MORE</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-[9px] tracking-[0.2em] text-white/15">LIVE PREVIEW</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[clamp(36px,6vw,80px)] font-thin tracking-[-0.03em] text-white leading-[0.95] mb-8">
            Your hero section,<br />
            <span className="text-white/30">done in 5 minutes.</span>
          </h2>
          <p className="text-sm text-white/30 mb-12">No account. No npm install. Just copy and ship.</p>
          <Link
            href="/patterns/blueprint-grid"
            className="inline-flex items-center gap-2.5 bg-white text-[#080808] px-10 py-4 text-[11px] font-bold tracking-widest hover:bg-white/90 transition-all"
          >
            OPEN PLAYGROUND <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-8 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] tracking-[0.2em] text-white/20 font-medium">BGLAB</span>
        <p className="text-[11px] text-white/15 tracking-wide">
          Animated CSS backgrounds for developers
        </p>
      </footer>

    </div>
  )
}
