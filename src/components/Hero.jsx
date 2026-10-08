import React, { useState } from 'react'
import { Sparkles, Flame, Terminal, ArrowRight, DollarSign, Bot, ShieldAlert } from 'lucide-react'
import confetti from 'canvas-confetti'
import { playSound } from '../utils/sound'

export default function Hero({ soundEnabled, onQuickPitch }) {
  const [aura, setAura] = useState(9999)
  const [clickedAura, setClickedAura] = useState(false)

  const handleBoostAura = () => {
    setAura(prev => prev + 420)
    setClickedAura(true)
    if (soundEnabled) playSound('powerup')
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.4 }
    })
    setTimeout(() => setClickedAura(false), 300)
  }

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-fuchsia-600/20 via-purple-600/20 to-cyan-500/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs text-purple-300 mb-6 shadow-lg shadow-purple-950/40">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold text-slate-200">Official Home of High-Octane Vibe Coding</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300 font-mono">Bought for $8</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6">
          Why Write Real Code <br className="hidden sm:inline" />
          When You Can Just{' '}
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent underline decoration-wavy decoration-fuchsia-500/40">
            Vibe?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 mb-8 leading-relaxed">
          Zero syntax checks. Zero architectural planning. 100% artisanal, free-range AI slop. 
          Prompted straight from the subconscious into production on a cheap VPS.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onQuickPitch}
            className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-fuchsia-600/25 hover:shadow-fuchsia-600/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform" />
            <span>Generate Series A Slop</span>
            <ArrowRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleBoostAura}
            className={`px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 text-slate-200 font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer ${
              clickedAura ? 'scale-105 border-fuchsia-400 text-fuchsia-300' : ''
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Aura Boost: <span className="font-mono text-cyan-400 font-extrabold">+{aura.toLocaleString()}</span></span>
          </button>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-fuchsia-400 font-mono mb-0.5">0</div>
            <div className="text-xs text-slate-400 font-medium">Unit Tests Written</div>
            <div className="text-[10px] text-slate-400 mt-1">"Tests ruin the vibe"</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mb-0.5">$42.8M</div>
            <div className="text-xs text-slate-400 font-medium">Pre-Revenue Valuation</div>
            <div className="text-[10px] text-slate-400 mt-1">Based on pure vibes</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mb-0.5">100%</div>
            <div className="text-xs text-slate-400 font-medium">Nixpacks Synergy</div>
            <div className="text-[10px] text-slate-400 mt-1">Zero dockerfiles touched</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mb-0.5">$8.00</div>
            <div className="text-xs text-slate-400 font-medium">Domain Investment</div>
            <div className="text-[10px] text-slate-400 mt-1">Best deal on Earth</div>
          </div>
        </div>

        {/* Satire Badge Ticker */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="px-3 py-1 rounded-md bg-slate-900/50 border border-slate-800 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            SOC-2 Completely Disregarded
          </span>
          <span className="px-3 py-1 rounded-md bg-slate-900/50 border border-slate-800 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            Powered by 42 Autonomous Agents
          </span>
          <span className="px-3 py-1 rounded-md bg-slate-900/50 border border-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            100x Prompt Engineer Approved
          </span>
        </div>
      </div>
    </section>
  )
}
