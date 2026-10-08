import GithubIcon from './GithubIcon'

const REPO = 'https://github.com/jc4789/Vibeslop.dev'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <a href="#top" className="font-serif text-[1.35rem] leading-none text-ink">
          vibeslop<span className="text-muted">.dev</span>
        </a>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          <a href="#session" className="hover:text-ink">Session</a>
          <a href="#meter" className="hover:text-ink">The file</a>
          <a href="#round" className="hover:text-ink">The round</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="#review" className="hover:text-ink">Review</a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink hover:underline"
          >
            <GithubIcon className="h-4 w-4" />
            <span>Source</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
