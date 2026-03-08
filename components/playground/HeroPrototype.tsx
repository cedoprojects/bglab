"use client"

import { PatternConfig } from "@/types"
import { PatternMeta } from "@/config/patterns"

export type HeroLayout = "centered" | "left" | "split" | "minimal"

export interface HeroContent {
  brand: string
  headline: string
  subheadline: string
  cta: string
  ctaSecondary: string
  overlayDarkness: number
  overlayTint: string
  bgColor: string
  bgImageUrl: string
  layout: HeroLayout
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  brand: "YOUR BRAND",
  headline: "Build something\npeople love.",
  subheadline: "Click any text to make it yours. Adjust the pattern, overlay, and layout — then copy the code.",
  cta: "Get Started",
  ctaSecondary: "See the Docs",
  overlayDarkness: 0.52,
  overlayTint: "#000000",
  bgColor: "#0a0a0a",
  bgImageUrl: "",
  layout: "left",
}

function EditableText({
  value,
  onChange,
  className,
  multiline = false,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  className: string
  multiline?: boolean
  placeholder?: string
}) {
  const baseClass = `bg-transparent outline-none border-b border-dashed border-white/0 hover:border-white/20 focus:border-white/40 transition-colors ${className}`

  if (multiline) {
    return (
      <textarea
        className={`${baseClass} w-full`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        style={{ resize: "none", lineHeight: "inherit" }}
      />
    )
  }
  return (
    <input
      type="text"
      className={`${baseClass} w-full`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function NavBar({ brand, onBrandChange }: { brand: string; onBrandChange: (v: string) => void }) {
  return (
    <div className="flex justify-between items-center w-full">
      <EditableText
        value={brand}
        onChange={onBrandChange}
        className="text-[14px] tracking-wider text-white/60 max-w-[160px]"
        placeholder="BRAND"
      />
      <div className="flex gap-5 text-[13px] text-white/30">
        <span>Product</span>
        <span>Docs</span>
        <span>Pricing</span>
        <span>Blog</span>
      </div>
    </div>
  )
}

function CTAButtons({
  cta, ctaSecondary,
  onCtaChange, onCtaSecondaryChange,
}: {
  cta: string; ctaSecondary: string
  onCtaChange: (v: string) => void; onCtaSecondaryChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="bg-white text-neutral-950 px-4 py-2 text-xs tracking-widest font-medium">
        <EditableText value={cta} onChange={onCtaChange} className="text-neutral-950 w-28" placeholder="Get Started" />
      </div>
      <div className="border border-white/20 px-4 py-2 text-xs tracking-widest text-white/60">
        <EditableText value={ctaSecondary} onChange={onCtaSecondaryChange} className="text-white/60 w-20" placeholder="View Docs" />
      </div>
    </div>
  )
}

// ─── LAYOUT: Left-aligned SaaS (Linear / Vercel style) ─────────────────────
function LayoutLeft({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col p-8 md:p-12 gap-0">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="flex-1 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-block text-[13px] tracking-widest text-white/55 border border-white/15 px-3 py-1 mb-6 rounded-full">
            NEW — Just shipped v2.0
          </div>
          <EditableText
            value={content.headline}
            onChange={(v) => onUpdate("headline", v)}
            className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-tight mb-5"
            multiline
            placeholder="Your headline"
          />
          <EditableText
            value={content.subheadline}
            onChange={(v) => onUpdate("subheadline", v)}
            className="text-base text-white/65 mb-9 block max-w-md leading-[1.65]"
            placeholder="Supporting copy"
          />
          <CTAButtons
            cta={content.cta} ctaSecondary={content.ctaSecondary}
            onCtaChange={(v) => onUpdate("cta", v)} onCtaSecondaryChange={(v) => onUpdate("ctaSecondary", v)}
          />
          <p className="text-[13px] text-white/35 mt-5">No credit card required · Free tier available</p>
        </div>
      </div>
    </div>
  )
}

// ─── LAYOUT: Centered (agency / portfolio style) ────────────────────────────
function LayoutCentered({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <EditableText
          value={content.headline}
          onChange={(v) => onUpdate("headline", v)}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white leading-tight mb-5 text-center"
          multiline
          placeholder="Your headline"
        />
        <EditableText
          value={content.subheadline}
          onChange={(v) => onUpdate("subheadline", v)}
          className="text-base text-white/65 mb-9 max-w-md text-center leading-[1.65]"
          placeholder="Supporting copy"
        />
        <CTAButtons
          cta={content.cta} ctaSecondary={content.ctaSecondary}
          onCtaChange={(v) => onUpdate("cta", v)} onCtaSecondaryChange={(v) => onUpdate("ctaSecondary", v)}
        />
      </div>
    </div>
  )
}

// ─── LAYOUT: Split (text left, UI card right) ───────────────────────────────
function LayoutSplit({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="flex-1 grid grid-cols-2 gap-10 items-center">
        <div>
          <EditableText
            value={content.headline}
            onChange={(v) => onUpdate("headline", v)}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-tight mb-5"
            multiline
            placeholder="Your headline"
          />
          <EditableText
            value={content.subheadline}
            onChange={(v) => onUpdate("subheadline", v)}
            className="text-base text-white/65 mb-7 block leading-[1.65]"
            placeholder="Supporting copy"
          />
          <CTAButtons
            cta={content.cta} ctaSecondary={content.ctaSecondary}
            onCtaChange={(v) => onUpdate("cta", v)} onCtaSecondaryChange={(v) => onUpdate("ctaSecondary", v)}
          />
        </div>
        {/* Mock UI card */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-4 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="h-1.5 bg-white/10 rounded flex-1" />
          </div>
          <div className="space-y-2">
            {[70, 90, 55, 80].map((w, i) => (
              <div key={i} className="h-1.5 bg-white/10 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-4 border border-white/10 p-2">
            <div className="h-12 bg-white/5 flex items-center justify-center">
              <div className="w-6 h-6 border border-white/20" />
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  )
}

// ─── LAYOUT: Minimal (brutalist / awwwards style) ───────────────────────────
function LayoutMinimal({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
      <div className="flex justify-between items-start">
        <EditableText
          value={content.brand}
          onChange={(v) => onUpdate("brand", v)}
          className="text-xs tracking-widest text-white/40 w-32"
          placeholder="BRAND"
        />
        <span className="text-xs tracking-widest text-white/20">©2026</span>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <EditableText
          value={content.headline}
          onChange={(v) => onUpdate("headline", v)}
          className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-white leading-tight mb-8"
          multiline
          placeholder="Big statement."
        />
        <div className="flex items-end justify-between">
          <EditableText
            value={content.subheadline}
            onChange={(v) => onUpdate("subheadline", v)}
            className="text-sm text-white/55 max-w-xs leading-[1.65]"
            placeholder="One line. Keep it short."
          />
          <div className="border border-white/20 px-5 py-2.5 text-xs tracking-widest text-white/50">
            <EditableText value={content.cta} onChange={(v) => onUpdate("cta", v)} className="text-white/50 w-24" placeholder="Enter →" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
interface Props {
  pattern: PatternMeta
  config: PatternConfig
  content: HeroContent
  onContentChange: (c: HeroContent) => void
  mobileView?: boolean
}

export function HeroPrototype({ pattern, config, content, onContentChange, mobileView = false }: Props) {
  const { component: PatternComponent } = pattern

  const update = (key: keyof HeroContent, val: string) =>
    onContentChange({ ...content, [key]: val })

  const overlayStyle = {
    background: `${content.overlayTint}${Math.round(content.overlayDarkness * 255).toString(16).padStart(2, "0")}`,
  }

  const layouts: Record<HeroLayout, React.ReactNode> = {
    left:     <LayoutLeft     content={content} onUpdate={update} />,
    centered: <LayoutCentered content={content} onUpdate={update} />,
    split:    <LayoutSplit    content={content} onUpdate={update} />,
    minimal:  <LayoutMinimal  content={content} onUpdate={update} />,
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: content.bgColor,
        width: mobileView ? "390px" : "100%",
        minHeight: "460px",
        height: "100%",
        margin: mobileView ? "0 auto" : undefined,
      }}
    >
      {/* Background image (if set) */}
      {content.bgImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={content.bgImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      {/* Animated pattern */}
      <PatternComponent {...config} />

      {/* Overlay with tint */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Layout */}
      {layouts[content.layout]}

      {/* Edit hint — bottom corner, unobtrusive */}
      <div className="absolute bottom-4 right-4 pointer-events-none select-none">
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-3.5 py-2">
          <div className="w-1 h-1 rounded-full bg-white/30 animate-pulse" />
          <span className="text-[11px] tracking-widest text-white/30">CLICK TEXT TO EDIT</span>
        </div>
      </div>
    </div>
  )
}
