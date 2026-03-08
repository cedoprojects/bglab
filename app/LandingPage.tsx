"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Code2, Layers, MousePointer2 } from "lucide-react"
import { patterns, PatternMeta } from "@/config/patterns"
import { BlueprintGrid } from "@/components/patterns/BlueprintGrid"

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/[0.07] bg-[#0a0a0a]/85 backdrop-blur-lg">
        <span className="text-sm font-semibold tracking-[0.18em]">bglab</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-white/40 hover:text-white/80 transition-colors hidden sm:block"
          >
            GitHub
          </a>
          <Link
            href="/patterns/blueprint-grid"
            className="flex items-center gap-2 bg-white text-[#0a0a0a] px-5 py-2 text-[12px] font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Start Building <ArrowRight size={12} />
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">

        {/* Live pattern as hero bg — the product selling itself */}
        <div className="absolute inset-0" style={{ opacity: 0.22 }}>
          <BlueprintGrid color="#ffffff" opacity={0.5} speed={14} size={1} />
        </div>

        {/* Subtle center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 55% at 50% 60%, rgba(99,102,241,0.11), transparent 70%)" }}
        />

        {/* Bottom page transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 mb-12 text-[11px] text-white/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            8 patterns — free, no account needed
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(48px,8.5vw,112px)] font-extralight tracking-[-0.04em] leading-[0.9] mb-7 text-white">
            Stop guessing how<br />
            <span className="text-white/35">your hero will look.</span>
          </h1>

          {/* Sub */}
          <p className="text-[16px] md:text-[18px] text-white/45 mb-12 max-w-xl mx-auto leading-relaxed font-light">
            Pick an animated background, type your real headline and CTA to preview it
            live in a hero section, then copy the React code. Done.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/patterns/blueprint-grid"
              className="flex items-center gap-2.5 bg-white text-[#0a0a0a] px-8 py-3.5 text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/10"
            >
              Start Building <ArrowRight size={14} />
            </Link>
            <Link
              href="/patterns/blueprint-grid"
              className="flex items-center gap-2.5 border border-white/[0.15] text-white/50 px-8 py-3.5 text-[13px] rounded-lg hover:border-white/30 hover:text-white/80 transition-all"
            >
              <Sparkles size={13} /> AI Generate
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pattern showcase ─────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-white/25 uppercase mb-2">Patterns</p>
              <h2 className="text-3xl font-light tracking-tight">8 production-ready backgrounds</h2>
            </div>
            <Link
              href="/patterns/blueprint-grid"
              className="text-[12px] text-white/35 hover:text-white/70 transition-colors items-center gap-1.5 hidden sm:flex"
            >
              Open Studio <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {patterns.map((p: PatternMeta) => {
              const { component: PatternComponent } = p
              return (
                <button
                  key={p.id}
                  onClick={() => router.push(`/patterns/${p.id}`)}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 bg-neutral-900/60 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
                  style={{ height: 170 }}
                >
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <PatternComponent {...p.defaultConfig} opacity={(p.defaultConfig.opacity ?? 0.15) * 1.6} />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/85 via-black/10 to-transparent group-hover:from-black/65 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-[12px] font-medium text-white/70 group-hover:text-white transition-colors">{p.name}</p>
                    <p className="text-[10px] text-white/30 mt-0.5 leading-tight line-clamp-1">{p.description}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/10 rounded-full p-1.5 backdrop-blur-sm">
                      <ArrowRight size={10} className="text-white/80" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-white/25 uppercase mb-3">How it works</p>
          <h2 className="text-3xl font-light tracking-tight mb-16">From pattern to production in minutes</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Layers size={18} className="text-indigo-400" />,
                step: "01",
                title: "Pick a pattern",
                body: "Browse 8 animated backgrounds — dot grids, blueprint lines, isometric wireframes, geometric blocks. Each tuned for real hero sections.",
              },
              {
                icon: <MousePointer2 size={18} className="text-indigo-400" />,
                step: "02",
                title: "Type your real content",
                body: "Click any text in the live preview to edit it. Your actual headline, your brand name, your CTA. See exactly how your page will look before writing code.",
              },
              {
                icon: <Code2 size={18} className="text-indigo-400" />,
                step: "03",
                title: "Copy and ship",
                body: "Get a React component, raw CSS, or a complete hero section drop-in. One click. Zero config, zero npm packages, zero account required.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-8 flex flex-col gap-6 hover:border-white/15 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    {item.icon}
                  </div>
                  <span className="text-[12px] font-mono text-white/15">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-medium mb-2.5">{item.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live preview demo ────────────────────────────── */}
      <section className="px-6 md:px-14 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.25em] text-white/25 uppercase mb-3">The differentiator</p>
            <h2 className="text-3xl font-light tracking-tight mb-5 leading-tight">
              See it with your real content<br />
              <span className="text-white/35">before you write a line of code.</span>
            </h2>
            <p className="text-[14px] text-white/40 leading-relaxed mb-8">
              Most pattern libraries show you an isolated preview in a tiny box.
              bglab puts the pattern in a full hero section — with your actual
              headline, subheadline, brand, and CTAs. What you see is exactly what you ship.
            </p>
            <div className="space-y-3">
              {["Click any text in the hero to edit it", "4 hero layouts — SaaS, centered, split, minimal", "Adjust overlay, color, density, speed in real time"].map((t) => (
                <div key={t} className="flex items-center gap-3 text-[13px] text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Live hero card */}
          <div className="relative rounded-xl border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/60" style={{ height: 300 }}>
            <BlueprintGrid color="#ffffff" opacity={0.2} speed={10} size={1} />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />
            <div className="absolute inset-0 flex flex-col p-8">
              <div className="flex items-center justify-between mb-auto">
                <span className="text-[10px] tracking-[0.25em] text-white/30">YOUR BRAND</span>
                <div className="flex gap-4 text-[10px] text-white/20">
                  <span>Product</span><span>Docs</span><span>Pricing</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-white/25 mb-3 uppercase">New — Click to edit</p>
                <h3 className="text-4xl font-extralight text-white leading-tight mb-3">
                  Your real headline<br />goes right here.
                </h3>
                <p className="text-[13px] text-white/40 mb-5">Type your actual subheadline and see exactly how it looks.</p>
                <div className="flex gap-2.5">
                  <div className="bg-white text-[#0a0a0a] px-4 py-2 text-[11px] font-semibold rounded-md">Get Started</div>
                  <div className="border border-white/20 text-white/50 px-4 py-2 text-[11px] rounded-md">Learn More</div>
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-black/40 rounded-md px-2.5 py-1 backdrop-blur-sm">
              <span className="text-[9px] tracking-widest text-white/30">LIVE PREVIEW</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="px-6 md:px-14 py-32 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(40px,6vw,84px)] font-extralight tracking-[-0.04em] leading-[0.92] mb-6">
            Your hero section background,<br />
            <span className="text-white/30">in the next 5 minutes.</span>
          </h2>
          <p className="text-[15px] text-white/35 mb-12 font-light">No account. No npm install. Just pick, preview, and copy.</p>
          <Link
            href="/patterns/blueprint-grid"
            className="inline-flex items-center gap-2.5 bg-white text-[#0a0a0a] px-10 py-4 text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-all shadow-xl shadow-white/10"
          >
            Start Building <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="px-8 md:px-14 py-7 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[12px] tracking-[0.15em] text-white/25 font-medium">bglab</span>
        <p className="text-[11px] text-white/15">Animated CSS backgrounds for developers</p>
      </footer>

    </div>
  )
}
