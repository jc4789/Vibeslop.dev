import React, { useState } from 'react'
import { Terminal, Copy, Check, Server, Laptop, ChevronDown, ChevronUp, ExternalLink, HelpCircle } from 'lucide-react'
import { playSound } from '../utils/sound'

export default function DeploymentGuide({ soundEnabled }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const steps = [
    {
      title: '1. Local Testing on your PC (Right now)',
      desc: 'Run the Vite development server on your machine to test changes live in your browser:',
      cmd: 'npm run dev',
      note: 'Then open http://localhost:5173 in Chrome/Edge. Whenever you edit code, it updates instantly without refreshing!'
    },
    {
      title: '2. Push Changes to GitHub',
      desc: 'Save your code into git and push it up to your repository:',
      cmd: `git add .\ngit commit -m "feat: release initial vibeslop site"\ngit push -u origin main`,
      note: 'This sends your fresh site code to https://github.com/jc4789/Vibeslop.dev'
    },
    {
      title: '3. Pull & Deploy on your VPS with Nixpacks',
      desc: 'SSH into your VPS, pull the code, and let Nixpacks build and containerize it:',
      cmd: `# Pull the repo on your VPS\ngit pull origin main\n\n# Build & run container with Nixpacks\nnixpacks build . --name vibeslop-app\ndocker run -d --name vibeslop-prod -p 3000:3000 --restart always vibeslop-app`,
      note: 'Nixpacks automatically detects Node.js, compiles Vite with npm run build, and serves the dist files via high-speed Caddy!'
    },
    {
      title: '4. Point vibeslop.dev to your VPS',
      desc: 'In your DNS registrar (Namecheap, Cloudflare, Porkbun, etc.):',
      cmd: `Type: A Record | Host: @ | Value: <YOUR_VPS_IP>\nType: A Record | Host: www | Value: <YOUR_VPS_IP>`,
      note: 'Your VPS web server (Caddy or Nginx) will route vibeslop.dev to port 3000 with automatic free SSL!'
    }
  ]

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text)
    if (soundEnabled) playSound('pop')
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 sm:p-6 text-left">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            if (soundEnabled) playSound('pop')
          }}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Beginner Guide: Local Testing & VPS Deployment
              </h3>
              <p className="text-xs text-slate-400">
                Click to {isOpen ? 'hide' : 'expand'} step-by-step commands for testing locally & launching on your VPS
              </p>
            </div>
          </div>
          <div className="p-1 rounded-lg bg-slate-800 text-slate-300">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {isOpen && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-6">
            {steps.map((s, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200">
                    {s.title}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(s.cmd, idx)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer bg-slate-950 px-2 py-1 rounded border border-slate-800"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre">
                  <code>{s.cmd}</code>
                </pre>
                {s.note && (
                  <p className="text-[11px] text-slate-400 italic">
                    💡 {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
