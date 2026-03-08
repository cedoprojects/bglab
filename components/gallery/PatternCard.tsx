"use client"

import Link from "next/link"
import { PatternMeta } from "@/config/patterns"

interface Props {
  pattern: PatternMeta
  isActive?: boolean
}

export function PatternCard({ pattern, isActive }: Props) {
  const { component: PatternComponent, defaultConfig } = pattern

  return (
    <Link
      href={`/patterns/${pattern.id}`}
      className={`group relative aspect-[4/3] overflow-hidden border transition-all duration-300 block ${
        isActive
          ? "border-white/50"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      {/* Live animated pattern thumbnail */}
      <div className="absolute inset-0 bg-neutral-900">
        <PatternComponent {...defaultConfig} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className={`text-sm font-medium tracking-wide transition-colors ${
          isActive ? "text-white" : "text-white/60 group-hover:text-white"
        }`}>
          {pattern.name}
        </p>
        <p className="text-xs text-white/30 mt-0.5 group-hover:text-white/50 transition-colors line-clamp-1">
          {pattern.description}
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white" />
      )}

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs tracking-widest text-white/70 border border-white/20 px-3 py-1.5 bg-black/40 backdrop-blur-sm">
          CUSTOMIZE
        </span>
      </div>
    </Link>
  )
}
