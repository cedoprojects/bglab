"use client"

import { patterns } from "@/config/patterns"
import { PatternCard } from "./PatternCard"

interface Props {
  activeId?: string
}

export function PatternGrid({ activeId }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {patterns.map((pattern) => (
        <PatternCard
          key={pattern.id}
          pattern={pattern}
          isActive={pattern.id === activeId}
        />
      ))}
    </div>
  )
}
