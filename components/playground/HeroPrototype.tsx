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
  headline: "Build something\nbeautiful.",
  subheadline: "The platform for modern teams.",
  cta: "Get Started",
  ctaSecondary: "View Docs",
  overlayDarkness: 0.5,
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
        className="text-xs tracking-[0.25em] text-white/60 max-w-[160px]"
        placeholder="BRAND"
      />
      <div className="flex gap-5 text-xs text-white/30">
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
    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="max-w-lg">
        <div className="inline-block text-[10px] tracking-widest text-white/40 border border-white/10 px-3 py-1 mb-5">
          NEW — Just shipped v2.0
        </div>
        <EditableText
          value={content.headline}
          onChange={(v) => onUpdate("headline", v)}
          className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-4"
          multiline
          placeholder="Your headline"
        />
        <EditableText
          value={content.subheadline}
          onChange={(v) => onUpdate("subheadline", v)}
          className="text-sm text-white/50 mb-8 block max-w-sm"
          placeholder="Supporting copy"
        />
        <CTAButtons
          cta={content.cta} ctaSecondary={content.ctaSecondary}
          onCtaChange={(v) => onUpdate("cta", v)} onCtaSecondaryChange={(v) => onUpdate("ctaSecondary", v)}
        />
        <p className="text-xs text-white/20 mt-4">No credit card required · Free tier available</p>
      </div>
    </div>
  )
}

// ─── LAYOUT: Centered (agency / portfolio style) ────────────────────────────
function LayoutCentered({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.4em] text-white/30 mb-5 uppercase">
          <EditableText value={content.brand} onChange={(v) => onUpdate("brand", v)} className="tracking-[0.4em] text-white/30 text-center w-32" />
        </p>
        <EditableText
          value={content.headline}
          onChange={(v) => onUpdate("headline", v)}
          className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight mb-4 text-center"
          multiline
          placeholder="Your headline"
        />
        <EditableText
          value={content.subheadline}
          onChange={(v) => onUpdate("subheadline", v)}
          className="text-sm text-white/50 mb-8 max-w-sm text-center"
          placeholder="Supporting copy"
        />
        <CTAButtons
          cta={content.cta} ctaSecondary={content.ctaSecondary}
          onCtaChange={(v) => onUpdate("cta", v)} onCtaSecondaryChange={(v) => onUpdate("ctaSecondary", v)}
        />
      </div>
      <div />
    </div>
  )
}

// ─── LAYOUT: Split (text left, UI card right) ───────────────────────────────
function LayoutSplit({ content, onUpdate }: { content: HeroContent; onUpdate: (k: keyof HeroContent, v: string) => void }) {
  return (
    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
      <NavBar brand={content.brand} onBrandChange={(v) => onUpdate("brand", v)} />
      <div className="grid grid-cols-2 gap-8 items-center">
        <div>
          <EditableText
            value={content.headline}
            onChange={(v) => onUpdate("headline", v)}
            className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight mb-4"
            multiline
            placeholder="Your headline"
          />
          <EditableText
            value={content.subheadline}
            onChange={(v) => onUpdate("subheadline", v)}
            className="text-xs text-white/50 mb-6 block"
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
    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
      <div className="flex justify-between items-start">
        <EditableText
          value={content.brand}
          onChange={(v) => onUpdate("brand", v)}
          className="text-xs tracking-widest text-white/40 w-32"
          placeholder="BRAND"
        />
        <span className="text-xs tracking-widest text-white/20">©2026</span>
      </div>
      <div>
        <EditableText
          value={content.headline}
          onChange={(v) => onUpdate("headline", v)}
          className="text-5xl md:text-7xl font-light tracking-tighter text-white leading-none mb-6"
          multiline
          placeholder="Big statement."
        />
        <div className="flex items-end justify-between">
          <EditableText
            value={content.subheadline}
            onChange={(v) => onUpdate("subheadline", v)}
            className="text-xs text-white/30 max-w-xs"
            placeholder="One line. Keep it short."
          />
          <div className="border border-white/20 px-4 py-2 text-xs tracking-widest text-white/50">
            <EditableText value={content.cta} onChange={(v) => onUpdate("cta", v)} className="text-white/50 w-20" placeholder="Enter" />
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

      {/* Hint */}
      <div className="absolute top-3 right-3 text-[9px] tracking-wider text-white/15 pointer-events-none select-none">
        CLICK TEXT TO EDIT
      </div>
    </div>
  )
}
