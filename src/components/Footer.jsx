import React from 'react'
import { Sparkles, Terminal, Heart, Server, ExternalLink } from 'lucide-react'
import GithubIcon from './GithubIcon'

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 py-12 px-4 sm:px-6 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-base text-white">vibeslop.dev</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                $8 DOMAIN
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The premier satirical web home for vibe coding, unprompted hallucinations, and autonomous microservices that nobody asked for.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              ありがとう(&gt;᎑&lt;`๑)♡
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Stack & Deployment
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> Vite + React 19 + Tailwind CSS
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📦</span> Built with Nixpacks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">🖥️</span> Deployed on a Linux VPS
              </li>
              <li className="flex items-center gap-2">
                <span className="text-fuchsia-400">🔮</span> 0% Unit Tests, 100% Aura
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Disclaimer
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              All valuations, rogue agents, and metaphysical frameworks are pure satire. 
              No compilers were harmed in the making of this slop.
            </p>
            <div className="mt-3">
              <a
                href="https://github.com/jc4789/Vibeslop.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                View Source on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} vibeslop.dev • Crafted with pure vibe
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-fuchsia-400 font-mono font-bold">Nixpacks</span>
            <span>&amp;</span>
            <span className="text-cyan-400 font-mono font-bold">Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
