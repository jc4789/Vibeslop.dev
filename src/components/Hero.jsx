const STATS = [
  { n: '14 min', k: 'prompt to the URL' },
  { n: '4 sec', k: 'spent on the review' },
  { n: '186', k: 'files in the pull request' },
  { n: '0', k: 'rollbacks configured' },
]

function scrollTo(id) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  })
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-4 pt-14 sm:pt-20">
      <p className="text-sm text-muted">A deployment pipeline</p>
      <h1 className="mt-3 max-w-[18ch] font-serif text-[2.65rem] leading-[1.05] text-balance sm:text-6xl">
        Ship the version you have not read.
      </h1>
      <p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-ink">
        Describe the product. Vibeslop writes it, opens the pull request, and merges.
        You can read the diff later. The deploy will not wait.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => scrollTo('session')}
          className="bg-ink px-4 py-2.5 text-sm text-paper hover:bg-black"
        >
          Read the session
        </button>
        <button
          type="button"
          onClick={() => scrollTo('round')}
          className="text-sm underline underline-offset-4 hover:text-rust"
        >
          Raise a round
        </button>
      </div>

      <dl className="mt-14 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.k} className="border-b border-r border-line px-4 py-4">
            <dt className="font-serif text-3xl leading-none">{stat.n}</dt>
            <dd className="mt-2 text-sm leading-snug text-muted">{stat.k}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-10 max-w-[40rem] space-y-3 text-[15px] leading-relaxed">
        <li>A repository. The README lists more features than the tree contains.</li>
        <li>A pull request titled like a one-line fix.</li>
        <li>
          A URL. The path in the announcement works. The others work too, including
          the one that writes to the database.
        </li>
      </ul>
    </section>
  )
}
