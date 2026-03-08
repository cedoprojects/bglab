import { notFound } from "next/navigation"
import { getPattern, patterns } from "@/config/patterns"
import { PatternPlayground } from "./PatternPlayground"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const pattern = getPattern(id)
  if (!pattern) return {}
  return {
    title: `${pattern.name} — bglab`,
    description: pattern.description,
  }
}

export function generateStaticParams() {
  return patterns.map((p) => ({ id: p.id }))
}

export default async function PatternPage({ params }: Props) {
  const { id } = await params
  const pattern = getPattern(id)
  if (!pattern) notFound()

  return <PatternPlayground pattern={pattern} />
}
