import React, { useState } from 'react'
import { Sparkles, DollarSign, Copy, Check, RefreshCw, Trophy, TrendingUp, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'
import { playSound } from '../utils/sound'

const PITCH_DATA = {
  prefixes: [
    'Autonomous', 'Decentralized', 'Hyper-personalized', 'Quantum-aligned', 
    'Agentic', 'Recursive', 'Zero-latency', 'Synthetic', 'Psychic'
  ],
  nouns: [
    'Toaster Swarms', 'Vibe Coding Copilots', 'B2B Emotional Pipelines', 
    'Hallucinated Microservices', 'Prompt-Engineered Spreadsheets',
    'LinkedIn Thought Leader Bots', 'Unsupervised Database Whispering',
    'Synthetic VC Pitch Machines', 'Neuro-divergent Cron Jobs'
  ],
  problems: [
    'Human developers spend an unbearable 12 seconds reading stack traces.',
    'Enterprises are tragically lacking unhinged synthetic content loops.',
    'Founders keep remembering that unit tests exist.',
    'Modern software has too much deterministic logic and not enough spiritual energy.',
    'Legacy systems require human understanding before deployment.'
  ],
  moats: [
    'We run 97 cascading agent prompts in an infinite feedback loop until the cloud bill maxes out.',
    'A proprietary vibe-loss function that penalizes common sense.',
    'We never read documentation; we only communicate with the model via intuition.',
    'An $8 domain name that intimidates legacy Fortune 500 competitors.'
  ],
  valuations: ['$18.5M', '$42.0M', '$69.4M', '$100M Seed', '$420M Post-Money'],
  tams: ['$34 Trillion by next Tuesday', 'The entire global GDP of the latent space', 'Every spreadsheet ever made', 'Infinite']
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateRandomPitch() {
  const prefix = getRandom(PITCH_DATA.prefixes)
  const noun = getRandom(PITCH_DATA.nouns)
  const problem = getRandom(PITCH_DATA.problems)
  const moat = getRandom(PITCH_DATA.moats)
  const valuation = getRandom(PITCH_DATA.valuations)
  const tam = getRandom(PITCH_DATA.tams)

  return {
    title: `${prefix} ${noun}`,
    tagline: `The World's First ${prefix.toLowerCase()} platform for ${noun.toLowerCase()}.`,
    problem,
    moat,
    valuation,
    tam,
    traction: `${Math.floor(Math.random() * 80 + 12)}k bots on X bookmarked our launch announcement.`
  }
}

export default function PitchGenerator({ soundEnabled, generatorRef }) {
  const [pitch, setPitch] = useState(() => generateRandomPitch())
  const [copied, setCopied] = useState(false)
  const [funded, setFunded] = useState(false)

  const handleGenerate = () => {
    if (soundEnabled) playSound('pop')
    setPitch(generateRandomPitch())
    setFunded(false)
  }

  const handleCopy = () => {
    const text = `🔥 ${pitch.title}\n${pitch.tagline}\n\n🚨 The Problem: ${pitch.problem}\n🛡️ The Moat: ${pitch.moat}\n💰 Asking Valuation: ${pitch.valuation} (TAM: ${pitch.tam})\n📈 Traction: ${pitch.traction}\n\nInvest now on vibeslop.dev!`
    navigator.clipboard.writeText(text)
    if (soundEnabled) playSound('vibe-shift')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAcceptFunding = () => {
    if (soundEnabled) playSound('cha-ching')
    setFunded(true)
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    })
  }

  return (
    <section ref={generatorRef} id="pitch-generator" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5" />
          Series A Slop Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          The Instant VC Pitch Deck Generator
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Need $15M in unearned seed capital? Click below to synthesize an unassailable tech startup pitch based entirely on hype terms.
        </p>
      </div>

      {/* Main Pitch Card */}
      <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden glow-fuchsia">
        {/* Decorative corner pill */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-800/80 text-purple-300">
            SEED STAGE
          </span>
        </div>

        {/* Startup Name */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-fuchsia-400 font-bold mb-1">
            Manifested Startup
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {pitch.title}
          </h3>
          <p className="text-slate-300 font-medium text-sm sm:text-base mt-1">
            "{pitch.tagline}"
          </p>
        </div>

        {/* Pitch Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🚨</span> The Critical Problem
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {pitch.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🛡️</span> Our Unfair Moat
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {pitch.moat}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Early Traction
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {pitch.traction}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> Proposed Valuation & TAM
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono font-bold">
              {pitch.valuation} <span className="text-slate-400 font-normal">| TAM: {pitch.tam}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleGenerate}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Reroll Startup Slop</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Pitch</span>
                </>
              )}
            </button>

            <button
              onClick={handleAcceptFunding}
              disabled={funded}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg ${
                funded
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {funded ? (
                <>
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>TERM SHEET SIGNED! 🚀</span>
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4" />
                  <span>Accept Term Sheet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
