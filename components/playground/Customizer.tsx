"use client"

interface Props {
  color: string
  opacity: number
  speed: number
  onColorChange: (v: string) => void
  onOpacityChange: (v: number) => void
  onSpeedChange: (v: number) => void
}

export function Customizer({ color, opacity, speed, onColorChange, onOpacityChange, onSpeedChange }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-xs tracking-[0.3em] text-white/30 uppercase">Customize</p>

      {/* Color */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/50">Color</label>
          <span className="text-xs text-white/30 font-mono">{color}</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border border-white/10"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => {
              const val = e.target.value
              if (/^#[0-9a-fA-F]{0,6}$/.test(val)) onColorChange(val)
            }}
            className="flex-1 bg-white/5 border border-white/10 text-white/70 text-xs font-mono px-3 py-2 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Opacity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/50">Opacity</label>
          <span className="text-xs text-white/30 font-mono">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.02"
          max="0.5"
          step="0.01"
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
        />
      </div>

      {/* Speed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/50">Animation Speed</label>
          <span className="text-xs text-white/30 font-mono">{speed}s</span>
        </div>
        <input
          type="range"
          min="2"
          max="30"
          step="0.5"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        />
        <div className="flex justify-between text-[10px] text-white/20">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    </div>
  )
}
