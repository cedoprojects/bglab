import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GeneratorForm } from "@/components/generator/GeneratorForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Generator — bglab",
  description: "Describe an animated background pattern in plain English and get working React and CSS code instantly.",
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-xs tracking-widest">
          <ArrowLeft size={14} />
          BGLAB
        </Link>
        <span className="text-xs tracking-widest text-white/20">AI GENERATOR</span>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-16 pb-10 border-b border-white/5">
        <p className="text-xs tracking-[0.4em] text-white/30 mb-4 uppercase">AI Generator</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          Describe it.<br />
          <span className="text-white/40">Get the code.</span>
        </h1>
        <p className="text-white/30 text-sm max-w-lg leading-relaxed">
          Plain English → animated CSS background component.
          3 variations generated per prompt. Copy as React or CSS.
          Free — 10 generations per hour.
        </p>
      </div>

      {/* Generator */}
      <div className="px-6 md:px-12 py-12">
        <GeneratorForm />
      </div>

      {/* Footer note */}
      <div className="px-6 md:px-12 py-8 border-t border-white/5 mt-8">
        <p className="text-xs text-white/20">
          Powered by Claude · Rate limited to prevent abuse · No account required
        </p>
      </div>

    </div>
  )
}
