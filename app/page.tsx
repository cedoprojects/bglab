import Link from "next/link"
import { PatternGrid } from "@/components/gallery/PatternGrid"
import { BlueprintGrid } from "@/components/patterns/BlueprintGrid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 bg-neutral-950/80 backdrop-blur-sm">
        <span className="text-sm font-medium tracking-widest text-white">BGLAB</span>
        <div className="flex items-center gap-6 text-xs tracking-widest text-white/40">
          <Link href="/generate" className="hover:text-white transition-colors">GENERATE</Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <BlueprintGrid color="#ffffff" opacity={0.12} speed={10} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-6 uppercase">
            Animated Background Patterns
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-none mb-6">
            Your hero deserves<br />
            <span className="text-white/40">a better background.</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
            8 curated animated patterns. Browse, customize, copy as React or CSS.
            Or generate something entirely new with AI.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#patterns"
              className="px-6 py-3 bg-white text-neutral-950 text-xs tracking-widest font-medium hover:bg-white/90 transition-colors"
            >
              BROWSE PATTERNS
            </a>
            <Link
              href="/generate"
              className="px-6 py-3 border border-white/20 text-xs tracking-widest text-white/70 hover:border-white/40 hover:text-white transition-all"
            >
              GENERATE WITH AI
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* Pattern Gallery */}
      <section id="patterns" className="px-6 md:px-12 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/30 mb-2 uppercase">Curated Collection</p>
            <h2 className="text-2xl md:text-3xl font-light">8 Patterns, All Free</h2>
          </div>
          <Link
            href="/generate"
            className="text-xs tracking-widest text-white/40 hover:text-white transition-colors hidden md:block"
          >
            WANT SOMETHING CUSTOM? GENERATE →
          </Link>
        </div>

        <PatternGrid />
      </section>

      {/* AI CTA banner */}
      <section className="mx-6 md:mx-12 mb-20 border border-white/10 p-10 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/50">
          <BlueprintGrid color="#ffffff" opacity={0.05} speed={15} />
        </div>
        <div className="relative z-10 max-w-xl">
          <p className="text-xs tracking-[0.3em] text-white/30 mb-3 uppercase">AI Generator</p>
          <h3 className="text-2xl md:text-4xl font-light mb-4">
            Don&apos;t see what you need?
          </h3>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Describe an animated background in plain English.
            Get working React and CSS code instantly.
          </p>
          <Link
            href="/generate"
            className="inline-block px-6 py-3 border border-white/20 text-xs tracking-widest text-white/70 hover:border-white/50 hover:text-white transition-all"
          >
            TRY THE GENERATOR →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/20 tracking-widest">BGLAB</span>
          <p className="text-xs text-white/20">
            Free forever · MIT License · No signup required
          </p>
        </div>
      </footer>

    </div>
  )
}
