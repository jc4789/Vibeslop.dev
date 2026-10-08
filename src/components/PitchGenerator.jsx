import { useState } from 'react'

const PITCHES = [
  {
    name: 'Paperweight',
    line: 'Compliance, generated after the incident.',
    problem: 'The auditor asked for the policy. The policy was never written. The incident was.',
    product: 'We read the incident channel and write the policy the channel implies you already had.',
    moat: 'The PDF has your logo on it. That has been enough.',
    traction: 'One design partner. They cannot be named, because of the incident.',
    ask: 'Raising a party round. Attendance is the diligence.',
  },
  {
    name: 'Lowdoor',
    line: 'The agent that sits in the standup so you do not have to.',
    problem: 'The standup takes fifteen minutes and produces a list.',
    product: 'We produce the list. The fifteen minutes are optional, and then they are gone.',
    moat: 'It has posted in the channel for three weeks. Removing it now reads as being against standups.',
    traction: 'Installed in 40 workspaces. 37 of those installs were an agent adding another agent.',
    ask: 'Raising $4M on a SAFE. The cap came out of the conversation because it was slowing the conversation down.',
  },
  {
    name: 'Secondset',
    line: 'A summary of the other AI tools you already pay for.',
    problem: 'Six subscriptions read your work. You read none of the summaries.',
    product: 'Each morning we summarize the summaries. This one also goes unread, but it arrives first.',
    moat: 'Cancelling us does not cancel the other six. After a month, most people cannot tell which one we were.',
    traction: '1,204 stars. The repository contains a license and a README.',
    ask: 'Raising $3M. The product is a cron job. The cron job is not the expensive part.',
  },
  {
    name: 'Halve',
    line: 'Stripe for the invoice you were going to send as a PDF.',
    problem: 'People still get paid by emailing a document and waiting.',
    product: 'We email the document, then ask a model whether anyone has paid it.',
    moat: 'The format is just different enough that nothing else imports it cleanly.',
    traction: 'Four customers. Three of them are pilots at the founder\u2019s last employer.',
    ask: 'Raising $1.8M. Use of funds: inference, and someone to redo the deck.',
  },
  {
    name: 'Deskless',
    line: 'A CRM for people you met once.',
    problem: 'You had their name in a note. The note is gone, and so is the reason you took it.',
    product: 'We draft the follow-up. You will not send it. The draft is the record that you meant to.',
    moat: 'We are the system of record for conversations that did not happen.',
    traction: 'MRR is $640. All of it is the founder\u2019s card, so the retention number is very good.',
    ask: 'Raising $2.5M to hire four more agents and one person who can explain the agents on a call.',
  },
  {
    name: 'Brine',
    line: 'Auth, moved one step to the left, still broken where it was.',
    problem: 'Login fails for customers and not for the demo account.',
    product: 'We put a provider in front of your handler. The provider calls your handler.',
    moat: 'We sit in the middle of the request. Removing us means the request has nowhere to finish.',
    traction: 'The demo passes. The demo user was inserted by hand the night before.',
    ask: 'Raising $1.2M. The runway assumes inference gets cheaper this year. It has not.',
  },
  {
    name: 'Northparcel',
    line: 'Deploys for teams that already deployed and are no longer sure which one.',
    problem: 'Something is in production. The commit is a guess, reconstructed from the bundle.',
    product: 'We deploy whatever is on main, and we keep a list, so the argument afterwards is shorter.',
    moat: 'Rollback is on the enterprise plan. Enterprise is a form that emails the founder.',
    traction: 'A partner at a firm you have heard of replied \u201cinteresting\u201d and has not written again.',
    ask: 'Raising $6M, so the next email can say that we are raising $6M.',
  },
  {
    name: 'Oddment',
    line: 'A marketplace for prompts people already pasted into a chat.',
    problem: 'The good prompt is trapped in a transcript nobody can search.',
    product: 'We sell the transcript back to the person who wrote it, with a heading.',
    moat: 'Supply is unlimited and identical. The deck calls this liquidity.',
    traction: 'GMV last month was $90. The take rate is 100%, because the seller is also us.',
    ask: 'Not raising. The site says we are in talks, and inbound has picked up.',
  },
  {
    name: 'Mergecraft',
    line: 'The merge queue for teams whose queue is a person named Kyle.',
    problem: 'Pull requests land out of order and the build breaks on the way down.',
    product: 'We land them in the order the model thinks you meant.',
    moat: 'Kyle has stopped being told when to merge. He reads it as trust.',
    traction: 'Nine teams. Two of them are the same team under two GitHub orgs.',
    ask: 'Raising $2M. The deck says enterprise. Enterprise says a form that emails Kyle.',
  },
  {
    name: 'Freshpaint',
    line: 'Your landing page, regenerated every time a visitor loads it.',
    problem: 'The copy stopped converting in March and nobody noticed until June.',
    product: 'The page now rewrites itself at request time. Nobody can pin down what it said.',
    moat: 'Once the page writes itself, there is no version anyone agreed to. Disagreement has no target.',
    traction: 'Conversion is up. The analytics were generated by the same model as the page.',
    ask: 'Raising $5M against a number the product made up. The diligence is the product.',
  },
  {
    name: 'Ledgerline',
    line: 'Bookkeeping where the entries are a guess and the guess is audited.',
    problem: 'The books close on vibes and the accountant charges by the surprise.',
    product: 'An agent reads the bank feed and writes what it assumes. The assumptions are timestamped.',
    moat: 'The corrections are indistinguishable from the entries. Removing us means removing December.',
    traction: '312 businesses. The renewal rate is high because switching requires reading the books.',
    ask: 'Raising $3.5M. Use of funds: an accountant, and a second one who reviews the first one.',
  },
  {
    name: 'Quietly',
    line: 'Incident response for incidents no one has confirmed happened.',
    problem: 'The pager goes off and the first hour is four people asking whether it is real.',
    product: 'An agent opens the incident, writes the timeline, and closes it. Mostly before anyone joins.',
    moat: 'The postmortem is the only document most people read, and we write it first.',
    traction: 'Sev1s resolved: 40. Sev1s that occurred: disputed, our number is in the system.',
    ask: 'Raising $1M. The round is small so the valuation looks like a mistake nobody argues about.',
  },
]

function pitchText(pitch) {
  return [
    `${pitch.name}. ${pitch.line}`,
    '',
    pitch.problem,
    pitch.product,
    '',
    `Moat: ${pitch.moat}`,
    `Traction: ${pitch.traction}`,
    pitch.ask,
  ].join('\n')
}

export default function PitchGenerator() {
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [sent, setSent] = useState(false)
  const pitch = PITCHES[index]

  async function copy() {
    try {
      await navigator.clipboard.writeText(pitchText(pitch))
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopied(false)
      setCopyFailed(true)
    }
    window.setTimeout(() => {
      setCopied(false)
      setCopyFailed(false)
    }, 2000)
  }

  function another() {
    setIndex((n) => (n + 1) % PITCHES.length)
    setSent(false)
    setCopied(false)
    setCopyFailed(false)
  }

  const rows = [
    ['Problem', pitch.problem],
    ['Product', pitch.product],
    ['Moat', pitch.moat],
    ['Traction', pitch.traction],
    ['Ask', pitch.ask],
  ]

  return (
    <section id="round" className="mx-auto mt-16 max-w-3xl border-t border-line px-5 pt-16">
      <p className="text-sm text-muted">The round</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-4xl">
        The same method, pointed at a fundraise.
      </h2>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted">
        Send it before anyone edits it. Editing is how these lose the thread.
      </p>

      <article className="mt-8 border border-line bg-white p-5 sm:p-6">
        <h3 className="font-serif text-3xl leading-none">{pitch.name}</h3>
        <p className="mt-3 text-lg leading-snug">{pitch.line}</p>
        <dl className="mt-6 divide-y divide-line border-t border-line">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-sm leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        {sent && (
          <p className="border-t border-line pt-4 text-sm leading-relaxed">
            Sent. They replied <span className="font-mono text-[13px]">lgtm</span>.
            They did not open the attachment.
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <button
            type="button"
            onClick={another}
            className="border border-ink px-4 py-2.5 text-sm hover:bg-paper"
          >
            Another
          </button>
          <button
            type="button"
            onClick={copy}
            className="text-sm underline underline-offset-4"
          >
            {copied ? 'Copied' : copyFailed ? 'Could not copy' : 'Copy for the thread'}
          </button>
          <button
            type="button"
            onClick={() => setSent(true)}
            disabled={sent}
            className="bg-ink px-4 py-2.5 text-sm text-paper hover:bg-black disabled:opacity-40"
          >
            {sent ? 'SAFE sent' : 'Send the SAFE'}
          </button>
        </div>
      </article>
    </section>
  )
}
