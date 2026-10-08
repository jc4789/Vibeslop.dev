import { Sparkles, Terminal, Volume2, VolumeX, Zap } from 'lucide-react'
import GithubIcon from './GithubIcon'
import { playSound } from '../utils/sound'

export default function Navbar({ soundEnabled, setSoundEnabled }) {
  const toggleSound = () => {
    if (!soundEnabled) {
      playSound('pop')
    }
    setSoundEnabled(!soundEnabled)
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20 animate-float">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
                vibeslop.dev
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800 rounded-full">
                v1.0.0-slop
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Zero Architecture • Pure Vibe
            </p>
          </div>
        </div>

        {/* Center Live Ticker (desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-emerald-400 font-semibold">LATENT VIBE:</span>
          <span>99.9% HALLUCINATED</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-mono font-semibold">$8 VPS DEAL</span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable SFX' : 'Enable SFX'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-fuchsia-400" />
                <span className="hidden lg:inline">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="hidden lg:inline text-slate-500">SFX: OFF</span>
              </>
            )}
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/jc4789/Vibeslop.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
