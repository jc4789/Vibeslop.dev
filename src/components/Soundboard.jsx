import React from 'react'
import { Music, DollarSign, Sparkles, AlertOctagon, Radio, Disc } from 'lucide-react'
import confetti from 'canvas-confetti'
import { playSound } from '../utils/sound'

const SOUNDS = [
  { id: 'cha-ching', label: 'VC Wire Transfer', icon: DollarSign, color: 'hover:border-emerald-500 text-emerald-400' },
  { id: 'powerup', label: 'Series A Confetti', icon: Sparkles, color: 'hover:border-amber-500 text-amber-400', confetti: true },
  { id: 'glitch', label: 'Rogue Hallucination', icon: AlertOctagon, color: 'hover:border-rose-500 text-rose-400' },
  { id: 'vibe-shift', label: 'Cosmic Vibe Shift', icon: Radio, color: 'hover:border-cyan-500 text-cyan-400' },
  { id: 'pop', label: 'Artisanal Slop Pop', icon: Disc, color: 'hover:border-fuchsia-500 text-fuchsia-400' },
]

export default function Soundboard({ soundEnabled, setSoundEnabled }) {
  const handlePlay = (item) => {
    if (!soundEnabled) {
      setSoundEnabled(true)
    }
    playSound(item.id)
    if (item.confetti) {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.85 }
      })
    }
  }

  return (
    <section id="soundboard" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Music className="w-3.5 h-3.5 text-purple-400" />
          Synthesized Web Audio
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
          The Vibe Soundboard
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Pure oscillator waveforms synthesized directly in your browser. Zero external audio downloads.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SOUNDS.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handlePlay(item)}
              className={`p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 ${item.color} transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-lg`}
            >
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-200 text-center">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                [play]
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
