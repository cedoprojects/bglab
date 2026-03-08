import { PatternConfig } from "@/types"

export function generateBlueprintGridTSX(config: PatternConfig): string {
  return `"use client"

// Drop this file into your /components folder.
// No dependencies — works with any React + Tailwind project.

interface Props {
  color?: string
  opacity?: number
  speed?: number
}

export function BlueprintGrid({
  color = "${config.color}",
  opacity = ${config.opacity},
  speed = ${config.speed},
}: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{\`
        @keyframes bglab-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      \`}</style>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: \`linear-gradient(to right, \${color} 1px, transparent 1px), linear-gradient(to bottom, \${color} 1px, transparent 1px)\`,
          backgroundSize: "60px 60px",
          opacity: opacity,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: \`linear-gradient(to right, \${color} 1px, transparent 1px), linear-gradient(to bottom, \${color} 1px, transparent 1px)\`,
          backgroundSize: "12px 12px",
          opacity: opacity * 0.5,
        }}
      />
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background: \`linear-gradient(to right, transparent, \${color}66, transparent)\`,
          animation: \`bglab-scan \${speed}s linear infinite\`,
        }}
      />
    </div>
  )
}`
}

export function generateBlueprintGridCSS(config: PatternConfig): string {
  return `/* Blueprint Grid — paste into any stylesheet */
/* Add class="blueprint-grid-bg" to your container */

.blueprint-grid-bg {
  position: relative;
  overflow: hidden;
}

.blueprint-grid-bg::before,
.blueprint-grid-bg::after {
  content: "";
  position: absolute;
  inset: 0;
}

.blueprint-grid-bg::before {
  background-image:
    linear-gradient(to right, ${config.color} 1px, transparent 1px),
    linear-gradient(to bottom, ${config.color} 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: ${config.opacity};
}

.blueprint-grid-bg::after {
  background-image:
    linear-gradient(to right, ${config.color} 1px, transparent 1px),
    linear-gradient(to bottom, ${config.color} 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: ${config.opacity * 0.5};
}

@keyframes bglab-scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.blueprint-scan-line {
  position: absolute;
  inset-inline: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, ${config.color}66, transparent);
  animation: bglab-scan ${config.speed}s linear infinite;
}`
}

export function generateDotMatrixTSX(config: PatternConfig): string {
  return `"use client"

interface Props {
  color?: string
  opacity?: number
  speed?: number
}

export function DotMatrix({
  color = "${config.color}",
  opacity = ${config.opacity},
  speed = ${config.speed},
}: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{\`
        @keyframes bglab-ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
      \`}</style>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: \`radial-gradient(circle, \${color} 1px, transparent 1px)\`,
          backgroundSize: "24px 24px",
          opacity: opacity,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: \`radial-gradient(circle, \${color} 2px, transparent 2px)\`,
          backgroundSize: "96px 96px",
          opacity: opacity * 0.7,
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: "300px",
            height: "300px",
            left: \`\${20 + i * 30}%\`,
            top: \`\${30 + i * 15}%\`,
            borderColor: \`\${color}22\`,
            animation: \`bglab-ripple \${speed + i}s ease-out infinite\`,
            animationDelay: \`\${i * 2}s\`,
          }}
        />
      ))}
    </div>
  )
}`
}

export function generateDotMatrixCSS(config: PatternConfig): string {
  return `/* Dot Matrix — paste into any stylesheet */

.dot-matrix-bg {
  position: relative;
  overflow: hidden;
}

.dot-matrix-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, ${config.color} 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: ${config.opacity};
}

.dot-matrix-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, ${config.color} 2px, transparent 2px);
  background-size: 96px 96px;
  opacity: ${config.opacity * 0.7};
}

@keyframes bglab-ripple {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}

.dot-matrix-ring {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid ${config.color}22;
  animation: bglab-ripple ${config.speed}s ease-out infinite;
  transform: translate(-50%, -50%);
}`
}

// Generic fallback for patterns without full codegen yet
export function generateGenericTSX(id: string, name: string, config: PatternConfig): string {
  return `// ${name} component — copy into your /components folder
// Generated by bglab.dev

"use client"

interface Props {
  color?: string
  opacity?: number
  speed?: number
}

export function ${name.replace(/\s/g, "")}({ color = "${config.color}", opacity = ${config.opacity}, speed = ${config.speed} }: Props) {
  // See the live preview at bglab.dev/patterns/${id}
  return <div className="absolute inset-0" />
}`
}

export function generateGenericCSS(name: string, config: PatternConfig): string {
  return `/* ${name} — generated by bglab.dev */
/* color: ${config.color} | opacity: ${config.opacity} | speed: ${config.speed}s */

.${name.toLowerCase().replace(/\s/g, "-")}-bg {
  position: relative;
  overflow: hidden;
}
`
}
