import { PatternConfig } from "@/types"
import { BlueprintGrid } from "@/components/patterns/BlueprintGrid"
import { DotMatrix } from "@/components/patterns/DotMatrix"
import { NodeGraph } from "@/components/patterns/NodeGraph"
import { StructuralBeams } from "@/components/patterns/StructuralBeams"
import { Crosshatch } from "@/components/patterns/Crosshatch"
import { GeometricBlocks } from "@/components/patterns/GeometricBlocks"
import { PerspectiveGrid } from "@/components/patterns/PerspectiveGrid"
import { ConcreteNoise } from "@/components/patterns/ConcreteNoise"

export interface PatternMeta {
  id: string
  name: string
  description: string
  tags: string[]
  defaultConfig: PatternConfig
  component: React.ComponentType<Partial<PatternConfig>>
}

export const patterns: PatternMeta[] = [
  {
    id: "blueprint-grid",
    name: "Blueprint Grid",
    description: "Technical drawing aesthetic with a slow horizontal scan line",
    tags: ["grid", "minimal", "technical"],
    defaultConfig: { color: "#ffffff", opacity: 0.15, speed: 8, size: 1 },
    component: BlueprintGrid,
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    description: "Precision dots with expanding ripple rings",
    tags: ["dots", "minimal", "animated"],
    defaultConfig: { color: "#ffffff", opacity: 0.15, speed: 6, size: 1 },
    component: DotMatrix,
  },
  {
    id: "isometric-lines",
    name: "Node Graph",
    description: "Network of nodes and connections with pulsing rings",
    tags: ["network", "technical", "nodes"],
    defaultConfig: { color: "#ffffff", opacity: 0.13, speed: 6, size: 1 },
    component: NodeGraph,
  },
  {
    id: "structural-beams",
    name: "Structural Beams",
    description: "Steel framework with pulsing connection nodes",
    tags: ["geometric", "technical", "nodes"],
    defaultConfig: { color: "#ffffff", opacity: 0.1, speed: 4, size: 1 },
    component: StructuralBeams,
  },
  {
    id: "crosshatch",
    name: "Crosshatch",
    description: "Architectural sketch hatching with slow drift",
    tags: ["texture", "sketch", "minimal"],
    defaultConfig: { color: "#ffffff", opacity: 0.1, speed: 10, size: 1 },
    component: Crosshatch,
  },
  {
    id: "geometric-blocks",
    name: "Geometric Blocks",
    description: "Silhouetted building shapes with breathing animation",
    tags: ["architectural", "blocks", "city"],
    defaultConfig: { color: "#ffffff", opacity: 0.08, speed: 15, size: 1 },
    component: GeometricBlocks,
  },
  {
    id: "perspective-grid",
    name: "Perspective Grid",
    description: "Vanishing point floor grid with rising edge elements",
    tags: ["grid", "3d", "perspective"],
    defaultConfig: { color: "#ffffff", opacity: 0.12, speed: 6, size: 1 },
    component: PerspectiveGrid,
  },
  {
    id: "concrete-noise",
    name: "Concrete Noise",
    description: "Raw concrete grain texture with formwork marks",
    tags: ["texture", "organic", "industrial"],
    defaultConfig: { color: "#ffffff", opacity: 0.06, speed: 20, size: 1 },
    component: ConcreteNoise,
  },
]

export function getPattern(id: string): PatternMeta | undefined {
  return patterns.find((p) => p.id === id)
}
