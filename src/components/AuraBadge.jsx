import React, { useState } from 'react'
import { Award, Sparkles, Check, Copy, Flame, UserCheck, Shield } from 'lucide-react'
import confetti from 'canvas-confetti'
import { playSound } from '../utils/sound'

const TITLES = [
  'Certified 1000x Vibe Engineer',
  'Chief Hallucination Officer',
  'Grandmaster Prompt Whisperer',
  'Nixpacks VPS Overlord ($8 Tier)',
  'Lead Slop Architect & Synthesist',
  'Senior Copilot Tab-Key Depressor'
]

export default function AuraBadge({ soundEnabled }) {
  const [name, setName] = useState('jc4789')
  const [title, setTitle] = useState(TITLES[0])
  const [serial, setSerial] = useState('SLOP-420-777')
  const [copied, setCopied] = useState(false)

  const handleCopyBadge = () => {
    const text = `🎖️ OFFICIAL VIBESLOP CERTIFICATION 🎖️\nName: ${name}\nTitle: ${title}\nSerial: ${serial}\nAura Rating: +10,000\nIssued by: vibeslop.dev\n"Never read documentation. Never wrote a unit test. Strictly vibing."`
    navigator.clipboard.writeText(text)
    if (soundEnabled) playSound('cha-ching')
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="aura-badge" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Accreditation Board of Slop
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Claim Your Vibe Engineer Credential
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Add your name to receive your official certificate of zero-documentation proficiency. 100% verifiable on vibeslop.dev.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Form */}
        <div className="md:col-span-5 space-y-4 text-left p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Your Name / Handle
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Satoshi Promptamoto"
              maxLength={24}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Honorary Vibe Title
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
            >
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCopyBadge}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Credential Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Certificate Text</span>
              </>
            )}
          </button>
        </div>

        {/* Certificate Card Preview */}
        <div className="md:col-span-7">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
            {/* Holographic badge watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Award className="w-64 h-64 text-amber-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono uppercase tracking-widest mb-4">
              ✨ HIGH-AURA ACCREDITATION
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-1">
              Certificate of Vibe Proficiency
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              This unequivocally certifies that
            </p>

            <div className="py-2 px-4 rounded-xl bg-slate-950/80 border border-amber-500/30 inline-block mb-3 min-w-[200px]">
              <span className="text-2xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                {name || 'Anonymous Vibe Master'}
              </span>
            </div>

            <div className="text-sm font-bold text-fuchsia-400 mb-4">
              {title}
            </div>

            <p className="text-xs text-slate-400 italic max-w-sm mx-auto mb-6">
              "Has demonstrated complete disregard for compiler warnings, achieved +10,000 spiritual aura, and successfully deployed slop directly to production."
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="text-left">
                <span className="block text-slate-400 text-[10px]">ISSUING AUTHORITY</span>
                <span className="text-slate-300 font-bold">vibeslop.dev</span>
              </div>
              <div className="text-right">
                <span className="block text-slate-400 text-[10px]">VERIFICATION ID</span>
                <span className="text-amber-400 font-bold">{serial}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
