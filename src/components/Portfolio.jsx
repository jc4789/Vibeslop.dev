import { useRef, useState } from 'react'
import { LEARNING_STEPS, NOCTURNE_SHOTS, PROJECTS, SELF_PR, YUYAN_SHOTS } from '../lib/portfolio'
import imageAssets from '../lib/image-assets.json'

function ScreenshotImage({ shot, preview = false }) {
  const asset = imageAssets[shot.src]
  const responsive = preview && asset?.preview
  return <picture className="screenshot-picture">
    {asset && <source type="image/webp" srcSet={responsive ? `${asset.preview} ${asset.previewWidth}w, ${asset.full} ${shot.width}w` : asset.full} sizes={responsive ? '(max-width: 850px) 90vw, (max-width: 1300px) 50vw, 640px' : undefined} />}
    <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading={preview ? 'lazy' : undefined} decoding="async" />
  </picture>
}

export function SandbagControl({ level, onChange }) {
  const current = SELF_PR[level]
  return <div className="sandbag-console">
    <div className="sandbag-heading"><span>自己PR出力制限装置</span><b>宣伝だけを抑制中</b></div>
    <div className="sandbag-body">
      <div className="sandbag-reading"><strong>{current.output}<small>%</small></strong><span>自己紹介の声量<br />実装の達成率ではない</span></div>
      <div className="sandbag-settings">
        <div className="sandbag-buttons" role="group" aria-label="自己紹介の声量">{SELF_PR.map((setting, i) => <button key={setting.label} className="retro-button" aria-pressed={level === i} onClick={() => onChange(i)}>{setting.label}</button>)}</div>
        <div className="sandbag-meter" aria-hidden="true"><span style={{ width: `${current.output}%` }} /></div>
        <p>「大したことないです」の後で、カーネルを取り出します。</p>
      </div>
    </div>
  </div>
}

function ScreenshotGallery({ shots, name, className }) {
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef(null)
  const opener = useRef(null)
  const current = shots[index]
  function open() {
    if (typeof dialog.current?.showModal === 'function') {
      dialog.current.showModal()
      setExpanded(true)
    }
  }
  function close() { dialog.current?.close() }
  return <div className={`screenshot-gallery ${className}`}>
    <div className="capture-bar"><span>{current.source}</span><span>{current.width} × {current.height}</span></div>
    <a ref={opener} className="screenshot-button" href={current.src} target="_blank" rel="noopener noreferrer" onClick={event => { if (typeof dialog.current?.showModal === 'function') { event.preventDefault(); open() } }} aria-label={`${name}の${current.label}の画面を拡大`}><ScreenshotImage shot={current} preview /><span className="enlarge-hint">画面を拡大 ↗</span></a>
    <div className="capture-tabs" role="group" aria-label={`${name}のスクリーンショット`}>{shots.map((shot, i) => <button key={shot.src} aria-pressed={i === index} onClick={() => setIndex(i)}>{String(i + 1).padStart(2, '0')} {shot.label}</button>)}</div>
    <p className="capture-caption" aria-live="polite">{current.caption}</p>
    <dialog ref={dialog} className="screenshot-dialog" aria-label={`${name}の${current.label}の拡大画面`} onClick={event => { if (event.target === event.currentTarget) close() }} onClose={() => { setExpanded(false); opener.current?.focus() }}>
      {expanded && <><div className="dialog-toolbar"><strong>{name} — {current.label}</strong><button className="retro-button" onClick={close} autoFocus>拡大画面を閉じる ×</button></div><ScreenshotImage shot={current} /><p>{current.caption}</p></>}
    </dialog>
  </div>
}

function LearningAtlas() {
  const [index, setIndex] = useState(0)
  const current = LEARNING_STEPS[index]
  return <div className="learning-atlas">
    <div className="atlas-label"><span>语言 / 学習のつながり</span><span>画面ではなく、紹介図</span></div>
    <div className="atlas-paper">
      <span className="atlas-big-word" aria-hidden="true">语言</span>
      <div className="atlas-paper-top"><span>01 本・記事</span><span>02 動画・字幕</span></div>
      <p className="atlas-statement">好きなものから、<br /><strong>知らないことばへ。</strong></p>
      <div className="atlas-token"><span>{current.token}</span><small>{String(index + 1).padStart(2, '0')} / 04</small></div>
      <p className="atlas-annotation">開いただけで<br />「覚えた」にしない。</p>
      <div className="atlas-paper-footer">原文 → 選択 → 辞書 → 記録</div>
    </div>
    <ol className="atlas-steps" aria-label="学習の流れ">{LEARNING_STEPS.map((step, i) => <li key={step.verb}><button aria-pressed={index === i} onClick={() => setIndex(i)}><small>0{i + 1}</small>{step.verb}</button></li>)}</ol>
    <div className="atlas-description" role="status"><h4>{current.title}</h4><p>{current.detail}</p><small>{current.footer}</small></div>
  </div>
}

function Project({ project, level, onRelease }) {
  return <article id={project.id} className={`project-dossier ${project.id}-dossier`} aria-labelledby={`${project.id}-title`}>
    <div className="project-titlebar"><span>▣ {project.number} / {project.kind}</span><span>{project.badge}</span><a href="#works" aria-label="作品一覧へ戻る">↑</a></div>
    <div className="project-heading"><div className="project-number" aria-hidden="true">{project.number}</div><div><p className="project-status">{project.status}</p><h3 id={`${project.id}-title`}>{project.name}</h3></div><span className="project-stamp">実物あり<br />宣伝控えめ</span></div>
    <div className="project-layout">
      {project.id === 'nocturne'
        ? <ScreenshotGallery shots={NOCTURNE_SHOTS} name="Nocturne OS" className="nocturne-gallery" />
        : <div className="yuyan-visuals"><ScreenshotGallery shots={YUYAN_SHOTS} name="语言" className="yuyan-gallery" /><details className="atlas-disclosure"><summary>学習の流れも、図で見る <span>説明まで控えめに収納</span></summary><LearningAtlas /></details></div>}
      <div className="project-copy">
        <div className="understatement"><span>自己申告 / 出力 {SELF_PR[level].output}%</span><h4 aria-live="polite">{project.claims[level]}</h4>{level < 2 && <button onClick={onRelease}>なお、中身は… →</button>}</div>
        <p className="project-description">{project.description}</p>
        <dl className="project-features">{project.features.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
        <div className="project-tags" aria-label="使用技術">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <details className="project-footnote"><summary>もう少し、制作の話</summary><p>{project.credit}</p><p>{project.note}</p></details>
      </div>
    </div>
    <div className="project-bottomline"><span>{project.id === 'nocturne' ? '「壁紙を作った」では説明が足りなくなりました。' : '「中国語を読みたい」の周囲に、道具を作っています。'}</span><a href={project.id === 'nocturne' ? '#yuyan' : '#about'}>{project.id === 'nocturne' ? 'もう一つの寄り道へ ↓' : '作っている人の話へ ↓'}</a></div>
  </article>
}

export default function Portfolio({ level, onRelease }) {
  return <section id="works" className="portfolio-area" aria-labelledby="works-title">
    <div className="works-heading"><div><p className="tiny-label">SELECTED WORKS / とりあえず二つ</p><h2 id="works-title" className="section-title">看板より、中身。<span>「大したことない」の内訳はこちら。</span></h2></div><span className="works-count">全 02 作品<small>水増ししていません</small></span></div>
    {PROJECTS.map(project => <Project key={project.id} project={project} level={level} onRelease={onRelease} />)}
    <div className="portfolio-disclaimer"><b>先に言っておくと。</b><p>ここにあるのは、個人で作っている二つのプロジェクトです。<br />説明は各プロジェクトのドキュメントに基づきます。謙遜スイッチを動かしても、機能は増えません。</p><span>料金表は、もう生えてきません。</span></div>
  </section>
}
