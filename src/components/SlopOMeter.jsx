import React, { useState } from 'react'
import { Sliders, Flame, Code, Terminal, AlertTriangle, Cpu } from 'lucide-react'
import { playSound } from '../utils/sound'

const SLOP_TIERS = [
  {
    level: 0,
    name: 'Boring Legacy SWE',
    subtitle: 'Suffering from unit test addiction and reading documentation.',
    color: 'text-slate-400',
    borderColor: 'border-slate-700',
    code: `// Level 0: The Grim Reality of Deterministic Code
interface InvoiceParams {
  subtotal: number;
  taxRate: number;
}

export function calculateInvoice(params: InvoiceParams): number {
  if (params.subtotal < 0 || params.taxRate < 0) {
    throw new IllegalArgumentException("Subtotal and tax rate must be positive");
  }
  // 42 lines of boring boundary checks and rounding logic omitted...
  return Math.round(params.subtotal * (1 + params.taxRate) * 100) / 100;
}`
  },
  {
    level: 25,
    name: 'Casual Copilot Tab-Spammer',
    subtitle: 'Has not written a closing bracket manually since late 2023.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    code: `// Level 25: Tab-complete driven development
function calcTotal(price) {
  // Copilot suggested this, seems legit
  const tax = price * 0.0825; 
  console.log("calculated tax, hope California didn't change rates");
  return price + tax;
}`
  },
  {
    level: 50,
    name: 'Agentic Microservice Whisperer',
    subtitle: 'Delegates simple math to a multi-billion parameter model.',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    code: `// Level 50: Recursive AI pipeline for 2 + 2
async function calculateInvoiceWithLLM(cartTotal) {
  const agentResponse = await callClaudeOrGPT({
    prompt: "Calculate tax on $" + cartTotal + ". Do not return explanations, only json.",
    temperature: 0.7
  });
  
  // JSON.parse throws? Wrap in 7 try-catches.
  try {
    return JSON.parse(agentResponse).total;
  } catch (e) {
    return cartTotal * 1.1; // fallback vibe estimate
  }
}`
  },
  {
    level: 75,
    name: 'High-Velocity Vibe Architect',
    subtitle: 'Believes syntax error linters are a conspiracy to lower dopamine.',
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/40',
    code: `// Level 75: 100x Aura Engineer Flow State
// @vibe-check: PASS | @architecture: INSHALLAH
import { manifestReality } from '@vibeslop/core';

export async function processPaymentFlow(userVibe) {
  /* CRITICAL: DO NOT DELETE THIS COMMENT. 
     The model relies on this comment to maintain context memory. */
  const metaphysicalCart = await manifestReality({
    intent: "Take their money and give them good vibes",
    confidence: "Unshakable",
    bypassLinters: true
  });
  
  return metaphysicalCart.status === 'ok' ? 'SERIES A SECURED' : 'RE-PROMPT';
}`
  },
  {
    level: 100,
    name: 'TRANSCENDENT HYPER-SLOP VOID',
    subtitle: 'The machine writes itself. Humans are merely spectators in the terminal.',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/60',
    code: `// Level 100: TRANSCENDENCE ACHIEVED
// ⚡ COMPILED VIA PURE SPIRITUAL VIBRATIONS ON AN $8 VPS
/*
      ▲   
     ▲ ▲  <-- TRIFORCE OF UNCHECKED ASYNC PROMISES
*/
while (vibe.isImmaculate()) {
  await sleep(0);
  const sentience = await summonLatentSpaceSwarm({
    infiniteLoop: true,
    sanityCheck: false
  });
  // If the server crashes, Nixpacks will resurrect it.
  // We do not fear memory leaks; memory is an illusion.
}`
  }
]

export default function SlopOMeter({ soundEnabled }) {
  const [sliderVal, setSliderVal] = useState(75)

  // Find corresponding tier
  const tierIndex = Math.min(
    SLOP_TIERS.length - 1,
    Math.floor((sliderVal / 100) * (SLOP_TIERS.length - 1) + 0.49)
  )
  const currentTier = SLOP_TIERS[tierIndex]

  const handleSliderChange = (e) => {
    const val = Number(e.target.value)
    setSliderVal(val)
    if (soundEnabled && Math.abs(val - sliderVal) > 15) {
      playSound('vibe-shift')
    }
  }

  return (
    <section id="slop-o-meter" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-950/80 border border-fuchsia-800 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sliders className="w-3.5 h-3.5" />
          Vibe Calibration Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          The Slop-O-Meter™
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Drag the slider to adjust your vibe coding density. Watch the code evolve from depressing legacy enterprise logic to untamed synthetic ecstasy.
        </p>
      </div>

      <div className={`rounded-2xl bg-slate-900/90 border ${currentTier.borderColor} p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300`}>
        {/* Slider Controls */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Hallucination & Slop Density
            </span>
            <span className="text-lg font-mono font-black text-fuchsia-400">
              {sliderVal}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={handleSliderChange}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
            <span>0% Boring Docs</span>
            <span>50% Copilot</span>
            <span>100% Transcendence</span>
          </div>
        </div>

        {/* Current Tier Info */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div>
            <div className={`text-base sm:text-lg font-black tracking-tight ${currentTier.color}`}>
              {currentTier.name}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {currentTier.subtitle}
            </div>
          </div>
          <div className="text-xs font-mono px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
            TIER {tierIndex + 1}/5
          </div>
        </div>

        {/* Code Terminal View */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden text-left crt-scanlines">
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                generated_slop.ts
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Nixpacks Ready</span>
            </div>
          </div>

          <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
            <code>{currentTier.code}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
