import GithubIcon from './GithubIcon'

const REPO = 'https://github.com/jc4789/Vibeslop.dev'
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="font-serif text-2xl text-ink">
          vibeslop<span className="text-muted">.dev</span>
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          A deployment pipeline for descriptions. The description does not have to be finished.
          The deploy does not check.
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          Figures on this page were produced by the same process as the product.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            <GithubIcon className="h-4 w-4" />
            Source
          </a>
          <a href="#review" className="underline underline-offset-4">
            Approve something
          </a>
        </div>
        <p className="mt-10 text-xs text-muted">© {YEAR} vibeslop.dev</p>
      </div>
    </footer>
  )
}
