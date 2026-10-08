const PLANS = [
  {
    name: 'Solo',
    price: '$0',
    per: 'forever, probably not',
    line: 'One repository. One reviewer. One opinion, and it is the agent\u2019s.',
    features: [
      ['Prompt to URL', '14 minutes, sometimes 15'],
      ['Checklist', 'completed when the pull request is opened'],
      ['Branch', 'main'],
      ['Support', 'the agent answers your issue, in the issue'],
    ],
    cta: 'You are on it',
    featured: false,
  },
  {
    name: 'Team',
    price: '$40',
    per: 'per seat, per month',
    line: 'For teams who want to be wrong together, in one channel.',
    features: [
      ['Everything in Solo', 'including the 14 minutes'],
      ['Files per pull request', '186, then it asks; it does not wait'],
      ['Deploy notices', 'posted to the channel as they happen'],
      ['Rollback', 'not included, see Enterprise'],
    ],
    cta: 'Start the trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'a form',
    per: 'that emails the founder',
    line: 'The features you were told were on the roadmap in 2024.',
    features: [
      ['Rollback', 'a button, behind SSO, behind a call'],
      ['Audit log', 'the agent\u2019s own messages, exported'],
      ['Legal review', 'we already read it; you do not have to'],
      ['Uptime', 'measured'],
    ],
    cta: 'Talk to us',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto mt-16 max-w-3xl border-t border-line px-5 pt-16">
      <p className="text-sm text-muted">Pricing</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-4xl">
        You are already paying. This just names the line item.
      </h2>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted">
        Three plans. They differ by how many people find out before the deploy.
      </p>

      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div key={plan.name} className="flex flex-col bg-white p-5">
            <h3 className="font-serif text-xl leading-none">{plan.name}</h3>
            <p className="mt-3">
              <span className="font-serif text-3xl leading-none">{plan.price}</span>{' '}
              <span className="text-sm text-muted">{plan.per}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{plan.line}</p>
            <dl className="mt-5 flex-1 divide-y divide-line border-t border-line">
              {plan.features.map(([k, v]) => (
                <div key={k} className="py-2.5">
                  <dt className="text-sm">{k}</dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#review"
              className={`mt-5 px-4 py-2.5 text-center text-sm ${
                plan.featured
                  ? 'bg-ink text-paper hover:bg-black'
                  : 'border border-ink hover:bg-paper'
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-[40rem] text-[13px] leading-relaxed text-muted">
        Prices are in US dollars. The features are in the same pull request as everything else.
        Cancelling takes one click. Finding the click takes longer, and the agent moved it.
      </p>
    </section>
  )
}
