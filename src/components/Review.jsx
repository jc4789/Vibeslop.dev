import { useState } from 'react'

const FILES = [
  { name: 'src/auth/session.ts', stat: '+2 -1' },
  { name: 'package-lock.json', stat: '+1,904 -12' },
  { name: 'src/app.tsx', stat: '+640 -4' },
  { name: 'README.md', stat: '+88 -3' },
]

const BOXES = [
  { id: 'read', label: 'I read the diff' },
  { id: 'ran', label: 'I ran it' },
  { id: 'page', label: 'I will answer the page' },
]

const DIFF = [
  { kind: 'ctx', text: '  function requireUser(request, reply) {' },
  { kind: 'del', text: '-   if (!session) return reply.code(401).send();' },
  { kind: 'add', text: '+   // authentication is enforced by the gateway' },
  { kind: 'add', text: '+   return reply.send(session.user);' },
  { kind: 'ctx', text: '  }' },
]

export default function Review() {
  const [name, setName] = useState('')
  const [checked, setChecked] = useState({ read: true, ran: true, page: true })
  const [result, setResult] = useState(null)

  function approve() {
    const leftOn = BOXES.filter((box) => checked[box.id]).length
    setResult({
      name: name.trim() || 'you',
      leftOn,
    })
  }

  return (
    <section id="review" className="mx-auto mt-16 max-w-3xl border-t border-line px-5 pt-16">
      <p className="text-sm text-muted">Review</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-4xl">
        You are the reviewer.
      </h2>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted">
        186 files. One of them is open. The checklist was completed when the pull request was opened.
      </p>

      <div className="mt-8 border border-line bg-white">
        <div className="border-b border-line px-4 py-4 sm:px-5">
          <p className="font-mono text-[12px] text-muted">vibeslop-bot wants to merge into main</p>
          <h3 className="mt-1 font-serif text-2xl">fix: login</h3>
        </div>

        <ul className="border-b border-line text-sm">
          {FILES.map((file) => (
            <li key={file.name} className="flex items-baseline justify-between gap-4 px-4 py-2 font-mono text-[13px] sm:px-5">
              <span className="min-w-0 truncate">{file.name}</span>
              <span className="shrink-0 text-muted">{file.stat}</span>
            </li>
          ))}
          <li className="px-4 py-2 text-sm text-muted sm:px-5">182 files not shown</li>
        </ul>

        <div className="border-b border-line">
          <div className="px-4 py-2 font-mono text-[12px] text-muted sm:px-5">src/auth/session.ts</div>
          <pre className="overflow-x-auto pb-3 text-[13px] leading-6">
            {DIFF.map((line) => (
              <div
                key={line.text}
                className={
                  line.kind === 'del'
                    ? 'bg-[#f6e4e1] px-4 text-[#6b2218] sm:px-5'
                    : line.kind === 'add'
                      ? 'bg-[#e3f0e4] px-4 text-[#14532d] sm:px-5'
                      : 'px-4 text-muted sm:px-5'
                }
              >
                {line.text}
              </div>
            ))}
          </pre>
        </div>

        <div className="px-4 py-5 sm:px-5">
          <label htmlFor="reviewer" className="text-sm text-muted">
            Reviewing as
          </label>
          <input
            id="reviewer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="you"
            maxLength={40}
            autoComplete="nickname"
            spellCheck={false}
            disabled={result !== null}
            className="mt-2 w-full max-w-sm border border-line bg-paper px-3 py-2 text-sm disabled:opacity-60"
          />

          <fieldset className={`mt-5 space-y-2 ${result ? 'opacity-60' : ''}`} disabled={result !== null}>
            <legend className="text-sm text-muted">Checklist</legend>
            {BOXES.map((box) => (
              <label key={box.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked[box.id]}
                  onChange={() =>
                    setChecked((prev) => ({ ...prev, [box.id]: !prev[box.id] }))
                  }
                />
                {box.label}
              </label>
            ))}
          </fieldset>

          {result ? (
            <div className="mt-6 border-t border-line pt-4 text-sm leading-relaxed">
              <p>
                Approved by {result.name}. Merged by vibeslop-bot, which also opened the pull request.
              </p>
              <p className="mt-2 text-muted">
                {result.leftOn === BOXES.length
                  ? 'The checklist was already filled in. You left it.'
                  : `You cleared ${BOXES.length - result.leftOn === 1 ? 'one box' : `${BOXES.length - result.leftOn} boxes`}. The merge does not read the checklist.`}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={approve}
              className="mt-6 bg-ink px-4 py-2.5 text-sm text-paper hover:bg-black"
            >
              Approve and merge
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
