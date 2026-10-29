import { useRef, useState } from 'react'
import { LEARNING_STEPS, NOCTURNE_SHOTS, NOCTURNE_UPDATE, PROJECTS, SELF_PR, YUYAN_SHOTS } from '../lib/portfolio'
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
    <div className="sandbag-heading"><span>自己申告 翻訳装置</span><b>実装はそのまま、言い方だけ変更</b></div>
    <div className="sandbag-body">
      <div className="sandbag-reading"><strong>{current.reading}</strong><span>謙遜の翻訳モード<br />性能の測定ではない</span></div>
      <div className="sandbag-settings">
        <div className="sandbag-buttons" role="group" aria-label="自己紹介の声量">{SELF_PR.map((setting, i) => <button key={setting.label} className="retro-button" aria-pressed={level === i} onClick={() => onChange(i)}>{setting.label}</button>)}</div>
        <p>実装を削るスイッチではありません。そこまで謙遜すると壊れます。</p>
      </div>
    </div>
  </div>
}

function SmallUpdate() {
  const update = NOCTURNE_UPDATE
  const format = value => value.toLocaleString('ja-JP')
  return <section className="small-update" aria-labelledby="small-update-title" id="small-update">
    <div className="update-masthead"><span>制作日報 / 謙遜と差分の不一致</span><time dateTime={update.date}>{update.date.replaceAll('-', '.')}</time></div>
    <div className="update-heading"><div><p className="update-eyebrow">Nocturne OS · ささやかな進捗</p><h2 id="small-update-title">ブラウザーを<br /><em>開いただけです。</em></h2></div><span className="update-stamp">※ 内側にも<br />ブラウザー</span></div>
    <div className="update-layout">
      <div className="update-scene"><ScreenshotGallery shots={[NOCTURNE_SHOTS[0]]} name="Nocturne / Firefox WASM" className="update-gallery" /><div className="browser-nesting" aria-label="画面の入れ子構造"><span>Nocturne OS</span><b>→</b><span>独自ブラウザー</span><b>→</b><span>Firefox / Gecko WASM</span><b>→</b><span>Webページ</span></div></div>
      <aside className="diff-receipt" aria-label="コミットの明細">
        <p className="receipt-kicker">本日の「小変更」</p><p className="receipt-total">+{format(update.additions)}<small>行追加</small></p><p className="receipt-deletions">−{format(update.deletions)} 行削除 / {format(update.files)} ファイル</p>
        <div className="receipt-rule" /><h3>軽く頼んだ。<br />差分は軽くなかった。</h3><p>Claudeの共同著者表記つき。<br />WebGL / WebGL2、Mesaの統合。<br />ついでにFirefoxが中にいる。</p>
        <p className="receipt-context">Mesa等の取り込みを含む追加行数です。独自実装の行数でも、品質スコアでもありません。そこまで盛ると謙遜が成立しません。</p>
        <a href={update.commitUrl} target="_blank" rel="noopener noreferrer">差分を見る ↗ <code>{update.commit}</code></a>
      </aside>
    </div>
    <div className="update-notes"><p><b>WebGL、あります。</b><span>Mesaのソフトウェアラスタライザー経由。GPUのハードウェアアクセラレーション完成、という話にはすり替えません。</span></p><p><b>WASMも、あります。</b><span>PuterのFirefox / Gecko WASM版で本文を表示。全サイト互換とは別の話ですが、「壁紙だけ」では説明しにくくなりました。</span></p></div>
    <details className="update-proof"><summary>「さすがに話を盛ったのでは」<span>作者提供のコミット画面を開く ↓</span></summary><ScreenshotGallery shots={[update.receipt]} name="小変更の明細" className="receipt-gallery" /></details>
    <p className="update-provenance">作者提供の実画面・コミット記録を掲載。このサイトの更新時にOSを実行・再検証したものではありません。</p>
  </section>
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
    {shots.length > 1 && <div className="capture-tabs" role="group" aria-label={`${name}のスクリーンショット`}>{shots.map((shot, i) => <button key={shot.src} aria-pressed={i === index} onClick={() => setIndex(i)}>{String(i + 1).padStart(2, '0')} {shot.label}</button>)}</div>}
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
        <div className="understatement"><span>本人の説明 / {SELF_PR[level].label}</span><h4 aria-live="polite">{project.claims[level]}</h4>{level !== SELF_PR.length - 1 && <button onClick={onRelease}>謙遜を外して読む →</button>}</div>
        <p className="project-description">{project.description}</p>
        <dl className="project-features">{project.features.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
        <div className="project-tags" aria-label="使用技術">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {project.repository && <a className="project-source-link" href={project.repository} target="_blank" rel="noopener noreferrer">ソースは公開しています。言い訳も含めて。<span>GitHubでNocturne OSを見る ↗</span></a>}
        <details className="project-footnote"><summary>もう少し、制作の話</summary><p>{project.credit}</p><p>{project.note}</p></details>
      </div>
    </div>
    <div className="project-bottomline"><span>{project.id === 'nocturne' ? '「壁紙を作った」では説明が足りなくなりました。' : '「中国語を読みたい」の周囲に、道具を作っています。'}</span><a href={project.id === 'nocturne' ? '#yuyan' : '#about'}>{project.id === 'nocturne' ? 'もう一つの寄り道へ ↓' : '作っている人の話へ ↓'}</a></div>
  </article>
}

export default function Portfolio({ level, onRelease }) {
  return <section id="works" className="portfolio-area" aria-labelledby="works-title">
    <SmallUpdate />
    <div className="works-heading"><div><p className="tiny-label">SELECTED WORKS / とりあえず二つ</p><h2 id="works-title" className="section-title">看板より、中身。<span>「大したことない」の内訳はこちら。</span></h2></div><span className="works-count">全 02 作品<small>水増ししていません</small></span></div>
    {PROJECTS.map(project => <Project key={project.id} project={project} level={level} onRelease={onRelease} />)}
    <div className="portfolio-disclaimer"><b>誇大広告、逆方向。</b><p>ここにあるのは、個人で作っている二つのプロジェクトです。<br />機能は資料と実画面に基づきます。「大したことない」は本人の感想であり、仕様ではありません。</p><span>料金表は、もう生えてきません。依存関係は生えます。</span></div>
  </section>
}
