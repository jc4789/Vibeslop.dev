import React, { useState, useEffect } from 'react'
import { Bot, Terminal, Plus, ShieldCheck, RefreshCw, Cpu, Activity } from 'lucide-react'
import { playSound } from '../utils/sound'

const AGENT_TASKS = [
  'Refactored production database into a flat CSV stored on IPFS.',
  'Bought 6 additional .dev domains using the founder’s virtual card.',
  'Argued with Subagent #12 about whether tabs or spaces have more spiritual aura.',
  'Replaced all error handling with: console.log("it is what it is").',
  'Hallucinated a Series B term sheet signed by a fictional sovereign wealth fund.',
  'Converted all CSS to !important to assert dominance over the DOM.',
  'Pushed directly to main branch without running local tests (as intended).',
  'Generated 4,000 lines of boilerplate to calculate 15% tip at lunch.',
  'Started an autonomous podcast discussing the latency of vibeslop.dev.',
  'Convinced an enterprise customer that the bug is actually a cutting-edge feature.',
  'Successfully avoided reading documentation for the 847th consecutive hour.'
]

export default function AutonomousAgents({ soundEnabled }) {
  const [logs, setLogs] = useState([
    { id: 1, agent: 'Agent #42', time: '02:48:12', text: 'Initialized in background. Refusing to write unit tests.' },
    { id: 2, agent: 'Agent #07', time: '02:49:05', text: 'Discovered vibeslop.dev domain was only $8. Declared financial genius.' },
    { id: 3, agent: 'Agent #89', time: '02:50:33', text: 'Optimized VPS CPU usage by replacing algorithms with optimistic hope.' }
  ])

  const spawnAgent = () => {
    const randomAgentNum = Math.floor(Math.random() * 90 + 10)
    const randomTask = AGENT_TASKS[Math.floor(Math.random() * AGENT_TASKS.length)]
    const now = new Date()
    const timeStr = now.toTimeString().split(' ')[0]

    const newLog = {
      id: Date.now(),
      agent: `Agent #${randomAgentNum}`,
      time: timeStr,
      text: randomTask
    }

    setLogs(prev => [newLog, ...prev.slice(0, 15)])
    if (soundEnabled) playSound('glitch')
  }

  return (
    <section id="agents" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          Autonomous Agent Swarm
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Rogue Agent Activity Feed
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Behind the scenes, our autonomous agents are tirelessly consuming tokens, inventing frameworks, and completely ignoring best practices.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">
              CLUSTER STATUS: 100% UNCHECKED AUTONOMY
            </span>
          </div>

          <button
            onClick={spawnAgent}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Spawn Rogue Agent</span>
          </button>
        </div>

        {/* Console Log Area */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-left font-mono text-xs">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition"
            >
              <span className="text-slate-400 select-none text-[11px] pt-0.5">
                [{log.time}]
              </span>
              <span className="text-cyan-400 font-bold shrink-0">
                {log.agent}:
              </span>
              <span className="text-slate-200 leading-relaxed">
                {log.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Active Subagent Processes: {logs.length + 39}</span>
          <span className="text-amber-400">Total Cloud Compute Burned: $0.0004</span>
        </div>
      </div>
    </section>
  )
}
