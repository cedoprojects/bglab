export interface PatternConfig {
  color: string
  opacity: number
  speed: number
}

export interface Pattern {
  id: string
  name: string
  description: string
  tags: string[]
  defaultConfig: PatternConfig
  component: React.ComponentType<PatternConfig>
  generateTSX: (config: PatternConfig) => string
  generateCSS: (config: PatternConfig) => string
}

export interface GeneratedPattern {
  id: string
  prompt: string
  tsx: string
  css: string
  createdAt: Date
}
