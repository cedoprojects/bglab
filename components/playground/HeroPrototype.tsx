"use client"

import { PatternConfig } from "@/types"
import { PatternMeta } from "@/config/patterns"

export interface HeroContent {
  brand: string
  headline: string
  subheadline: string
  cta: string
  overlayDarkness: number
}

interface Props {
  pattern: PatternMeta
  config: PatternConfig
  content: HeroContent
  onContentChange: (c: HeroContent) => void
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  brand: "YOUR BRAND",
  headline: "Build something\nbeautiful.",
  subheadline: "The platform for modern teams.",
  cta: "Get Started",
  overlayDarkness: 0.5,
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
  const shared = {
    className: `bg-transparent outline-none border-b border-dashed border-white/0 hover:border-white/20 focus:border-white/40 transition-colors w-full ${className}`,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
  }

  if (multiline) {
    return (
      <textarea
        {...shared}
        rows={2}
        style={{ resize: "none", lineHeight: "inherit" }}
      />
    )
  }
  return <input type="text" {...shared} />
}

export function HeroPrototype({ pattern, config, content, onContentChange }: Props) {
  const { component: PatternComponent } = pattern
  const update = (key: keyof HeroContent, val: string | number) =>
    onContentChange({ ...content, [key]: val })

  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden bg-neutral-950 group">
      {/* Live pattern */}
      <PatternComponent {...config} />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${content.overlayDarkness})` }}
      />

      {/* Editable hero content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Nav row */}
        <div className="flex justify-between items-center">
          <EditableText
            value={content.brand}
            onChange={(v) => update("brand", v)}
            className="text-xs tracking-[0.3em] text-white/50 max-w-[160px]"
            placeholder="BRAND"
          />
          <div className="flex gap-6 text-xs text-white/30">
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Hero text */}
        <div className="max-w-xl">
          <EditableText
            value={content.headline}
            onChange={(v) => update("headline", v)}
            className="text-4xl md:text-5xl font-light leading-tight text-white mb-4"
            multiline
            placeholder="Your headline here"
          />
          <EditableText
            value={content.subheadline}
            onChange={(v) => update("subheadline", v)}
            className="text-sm text-white/50 mb-8 block"
            placeholder="Supporting copy"
          />
          <div className="inline-block border border-white/30 px-5 py-2.5">
            <EditableText
              value={content.cta}
              onChange={(v) => update("cta", v)}
              className="text-xs tracking-widest text-white"
              placeholder="CTA"
            />
          </div>
        </div>
      </div>

      {/* Edit hint — shown on first hover */}
      <div className="absolute top-3 right-3 text-[10px] tracking-wider text-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        CLICK TEXT TO EDIT
      </div>
    </div>
  )
}
