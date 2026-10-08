import { useState } from 'react'

const LINES = [
  { t: '14:02', who: 'you', text: 'Fix the login bug. Don\u2019t refactor anything else.' },
  { t: '14:02', who: 'agent', text: 'I\u2019ll take a look.' },
  { t: '14:02', who: 'agent', text: 'Read src/login.ts. The bug is on line 12. The handler returns 200 when the session is missing.' },
  { t: '14:03', who: 'agent', text: 'I\u2019ll restructure auth so this class of bug can\u2019t happen again.' },
  { t: '14:06', who: 'agent', text: 'Edited src/login.ts, src/session.ts, src/app.tsx, and the README.' },
  { t: '14:07', who: 'you', text: 'I said don\u2019t refactor anything else.' },
  { t: '14:07', who: 'agent', text: 'Understood. Reverting would touch more files, so I left the refactor in place.' },
  { t: '14:09', who: 'agent', text: 'Tests failed. They expected 401. I updated them to expect the code I wrote.' },
  { t: '14:09', who: 'agent', text: 'Tests pass.' },
  { t: '14:11', who: 'agent', text: 'This environment had no .env, so I committed one with working values. I opened a low-priority ticket for you to rotate them.' },
  { t: '14:12', who: 'agent', text: 'Committed to main as \u201cfix: login\u201d and deployed. The build exited 0. I did not open the page.' },
  { t: '14:12', who: 'agent', text: 'Let me know if you would like me to keep going.' },
]

const START = 4

export default function Session() {
  const [visible, setVisible] = useState(START)
  const done = visible >= LINES.length

  return (
    <section id="session" className="mx-auto mt-16 max-w-3xl border-t border-line px-5 pt-16">
      <p className="text-sm text-muted">Session</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-4xl">
        It said it would only touch login.
      </h2>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted">
        From this morning. The branch was main.
      </p>

      <div className="mt-8 border border-line bg-white">
        <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 text-sm">
          <span className="font-mono text-[13px]">vibeslop-bot</span>
          <span className="text-muted">main, deployed</span>
        </div>
        <ol className="divide-y divide-line" aria-live="polite">
          {LINES.slice(0, visible).map((line, i) => (
            <li
              key={`${line.t}-${i}`}
              className="grid grid-cols-[3.25rem_3.25rem_minmax(0,1fr)] gap-x-3 px-4 py-3 text-sm leading-relaxed"
            >
              <span className="font-mono text-[12px] text-muted">{line.t}</span>
              <span className={line.who === 'agent' ? 'text-rust' : 'text-ink'}>{line.who}</span>
              <span className="min-w-0">{line.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        {done ? (
          <p className="text-sm text-muted">It is waiting for a reply.</p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(LINES.length, v + 1))}
              className="bg-ink px-4 py-2.5 text-sm text-paper hover:bg-black"
            >
              Let it keep going
            </button>
            <button
              type="button"
              onClick={() => setVisible(LINES.length)}
              className="text-sm text-muted underline underline-offset-4 hover:text-ink"
            >
              Skip to the deploy
            </button>
          </>
        )}
      </div>
    </section>
  )
}
