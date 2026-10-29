import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useSlop } from './lib/store'
import Window from './components/Window'
import MiniApp from './components/MiniApp'
import AudioPlayer from './components/AudioPlayer'
import { DogReview, Guestbook, News, Oracle, Poll } from './components/Toys'
import Portfolio, { SandbagControl } from './components/Portfolio'
import NonEuclidean from './components/NonEuclidean'
import { NOCTURNE_UPDATE, SELF_PR } from './lib/portfolio'

const Compiler = lazy(() => import('./components/Compiler'))
const DependencyGraph = lazy(() => import('./components/DependencyGraph'))

let visitRecorded = false
const MARQUEE = `★ 個人制作物置き場 / 謙遜は仕様ではありません ★ 趣味OSのブラウザーでFirefoxが動きました ★ 小変更：+${NOCTURNE_UPDATE.additions.toLocaleString('ja-JP')}行（依存コードを含む） ★ 売るものなし。差分あり。★`
const BIOS = [
  ['Gemini', '最初の版を作りました。次のモデルに引き継ぎました。'],
  ['Grok', 'Geminiのスロップを取り消しました。取り消しも成果です。'],
  ['Qwen', 'その次を担当しました。履歴が増えました。'],
  ['Codex', '風刺を頼まれ、SaaS広告を作りました。怒られました。いまReactの中でVueを動かしています。'],
]

export default function App() {
  const [popup, setPopup] = useState(false)
  const [notice, setNotice] = useState(false)
  const [cookies, setCookies] = useState(true)
  const [bio, setBio] = useState(3)
  const [playing, setPlaying] = useState(false)
  const [diagnostics, setDiagnostics] = useState(false)
  const [nodes, setNodes] = useState(0)
  const [prLevel, setPrLevel] = useState(0)
  const [graphReady, setGraphReady] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const [compilerReady, setCompilerReady] = useState(false)
  const lab = useRef(null)
  const audio = useRef(null)
  const visits = useSlop(state => state.visits)
  const packages = useSlop(state => state.packages)
  const chaos = useSlop(state => state.chaos)
  const calm = useSlop(state => state.calm)
  const crt = useSlop(state => state.crt)
  const add = useSlop(state => state.addFramework)
  const toggleChaos = useSlop(state => state.toggleChaos)
  const toggleCalm = useSlop(state => state.toggleCalm)
  const toggleCrt = useSlop(state => state.toggleCrt)
  useEffect(() => {
    // 重い描画ライブラリは実験室が見えたときだけ取得する。
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setGraphReady(true)
        observer.disconnect()
      }
    })
    observer.observe(lab.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!visitRecorded) { useSlop.getState().visit(); visitRecorded = true }
    let keys = 0
    let last = 0
    function secret(event) {
      if (event.target.closest('input,textarea,select,[contenteditable]') || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      if (event.key.toLowerCase() !== 'v') { keys = 0; return }
      const now = performance.now()
      keys = now - last < 1500 ? keys + 1 : 1
      last = now
      if (keys === 3) { useSlop.getState().toggleChaos(); keys = 0 }
    }
    window.addEventListener('keydown', secret)
    return () => window.removeEventListener('keydown', secret)
  }, [])

  function taskManager() {
    setNodes(document.querySelectorAll('*').length)
    setDiagnostics(!diagnostics)
  }
  return <div id="top" className={`cyber-site ${chaos ? 'chaos-mode' : ''} ${calm ? 'calm-mode' : ''} ${crt ? 'crt-mode' : ''}`}>
    <a href="#works" className="skip-link">作品紹介へ移動</a>
    <div className="starfield" aria-hidden="true" /><div className="retro-floor" aria-hidden="true" />
    <div className="ticker"><div aria-hidden="true">{MARQUEE}　{MARQUEE}</div><span className="sr-only">自作OSと語学アプリのポートフォリオ。音楽は手動再生。秘密のモードはVを3回。販売・登録はありません。</span></div>
    <header className="portal-header"><a href="#top" className="portal-logo"><span>⚡</span> vibeslop<span className="logo-domain">.dev</span><small>個人制作物置き場</small></a><nav aria-label="サイト内移動"><a href="#folded-space">平面図のない入口</a><a href="#works">作品</a><a href="#about">作っている人</a><a href="#lab">余計な実験</a><a href="#guestbook">足跡</a></nav><div className="header-switches"><button onClick={() => audio.current?.toggle()} aria-pressed={playing}>♫ BGM {playing ? 'ON' : 'OFF'}</button><button onClick={toggleCalm} aria-pressed={calm}>{calm ? '過剰に戻す' : '目を休める'}</button></div></header>
    <main className="portal-shell">
      <section className="portal-hero" aria-labelledby="portal-title">
        <div className="hero-top"><a href="#small-update" className="pixel-badge hot-badge">近況：Firefoxが中にいます ↙</a><span className="recommended">小規模の定義については、審議中です。</span><div className="visitor-counter"><span>YOU ARE VISITOR</span><strong aria-label={`このブラウザで${visits}回目の訪問`}>{String(visits).padStart(7, '0').split('').map((digit, i) => <b key={i}>{digit}</b>)}</strong><small>このブラウザ内だけ。人気を偽装するには地味。</small></div></div>
        <p className="under-construction">個人制作 / 本物の作品 / 自己評価だけ参考値以下</p>
        <h1 id="portal-title" className="glitch-title" data-text="VIBESLOP.DEV">VIBESLOP.DEV</h1>
        <div className="portfolio-introduction" aria-live="polite"><p className="hero-motto"><em>{SELF_PR[prLevel].heading}</em></p><p className="hero-blurb">{SELF_PR[prLevel].description}</p></div>
        <SandbagControl level={prLevel} onChange={setPrLevel} />
        <div className="hero-project-index"><a href="#nocturne"><span>01 / 窓を開けたい</span><strong>Nocturne OS</strong><small>結果：カーネルから ↙</small></a><a href="#yuyan"><span>02 / 本を読みたい</span><strong>语言</strong><small>結果：アプリから ↙</small></a></div>
        <div className="hero-stickers"><span>誇大広告・逆方向</span><span>過小申告対応</span><span>売るものなし / 差分あり</span><span>犬による審査は継続中</span></div>
        <a className="space-hero-link" href="#folded-space"><span>↳ 作品より先に、間取りを疑う</span><small>五つの直角で一周する回廊へ ↘</small></a>
      </section>

      <NonEuclidean />

      <Portfolio level={prLevel} onRelease={() => setPrLevel(SELF_PR.length - 1)} />

      <div className="intro-grid" id="about">
        <Window title="作っている人.htm" icon="☾"><div className="webmaster"><div className="avatar-box"><span aria-hidden="true">（ФωФ）</span><b>個人制作</b><small>趣味の範囲（伸縮性）</small></div><div><h2>自己紹介は小さく。差分は別腹。</h2><p>本が読みたい。窓が開いてほしい。<br />既存の道具で済むはずの話が、ときどきカーネルや辞書エンジンになります。いまはOSと語学アプリを制作中。</p><p className="maker-quote">「大したことないです」<br />※ 添付の差分とは見解が異なります。</p></div></div><div className="old-web-badges"><span>個人開発</span><span>趣味の範囲は可変</span><span>謙遜は手動</span><span>差分は実在</span></div><p className="fine-print">AIもライブラリも使います。借りた力は明記します。「全部自分で」と「何もしてない」の間に、実際の制作があります。</p></Window>
        <Window title="このホームページの前科.txt" icon="▤"><div className="model-tabs" role="group" aria-label="このサイトを担当したモデル">{BIOS.map(([name], i) => <button key={name} className="retro-button" aria-pressed={bio === i} onClick={() => setBio(i)}>{name}</button>)}</div><p className="handoff-bio" role="status">{BIOS[bio][1]}</p><div className="user-acceptance"><span>このサイトの、最初の講評</span><blockquote>“cringe”</blockquote><p>風刺を頼まれたAIが、料金表を作りました。<br />いまは作品紹介になりました。料金表は帰ってきません。</p></div><p className="fine-print">作品そのものの評価ではありません。このホームページが迷走した記録です。</p></Window>
      </div>

      <section id="lab" className="lab-area">
        <div className="basement-sign"><span>ここから地下</span><p>作品紹介は上にあります。<br />下は、自己紹介に必要なかったもの。</p></div>
        <h2 className="section-title">⚡ SLOP LAB <span>ポートフォリオにも、余計な部屋は欲しい。</span></h2>
        <div className="hero-toolbar lab-toolbar"><button className="retro-button neon-button" onClick={toggleChaos} aria-pressed={chaos}>🌈 {chaos ? '通常の過剰に戻す' : 'もっと過剰にする'}</button><button className="retro-button" onClick={() => setPopup(true)}>不要なポップアップ</button><button className="retro-button" onClick={taskManager}>タスクマネージャー</button><button className="retro-button" onClick={toggleCrt} aria-pressed={crt}>CRT {crt ? 'ON' : 'OFF'}</button></div>
        <div className="systems-grid" ref={lab}>
          <Suspense fallback={<Window title="依存関係の重力井戸.sys" icon="🌀"><p className="fine-print" role="status">重力を読み込み中。自己評価はすでに低空です。</p></Window>}>
            {graphReady ? <DependencyGraph /> : <Window title="依存関係の重力井戸.sys" icon="🌀"><p className="fine-print">作品を読むだけなら、3Dライブラリまで取りに行きません。</p></Window>}
          </Suspense>
          <AudioPlayer ref={audio} onPlayback={setPlaying} /><Poll />
        </div>
        <details className="compiler-annex" onToggle={event => { if (event.currentTarget.open) setCompilerReady(true) }}>
          <summary>まだ足りない人へ：AIっぽい生成器も開く <span>開けると本当にVueまで読み込みます</span></summary>
          <p className="fine-print">上の二作品をブラウザ内で再現するものではありません。ローカルの定型生成器で遊ぶ、別の実験です。</p>
          {compilerReady && <div className="build-grid"><Suspense fallback={<p role="status">余計なフレームワークを読み込み中…</p>}><Compiler /></Suspense><MiniApp /></div>}
        </details>
      </section>

      <div className="hazard-banner"><span>⚠ ALL SYSTEMS EMOTIONAL</span><span>フレームワークを増やすと、不安だけが減ります。</span><button onClick={() => { for (let i = 0; i < 5; i++) add() }}>5本まとめて安心する →</button></div>

      <section id="toys" className="toy-area"><h2 className="section-title">🧪 不要な追加機能 <span>頼まれていないので、ここにあります。</span></h2><div className="toys-grid"><News /><Oracle /><DogReview /></div></section>
      <Guestbook />
      <section className="history-section"><h2 className="section-title">⌛ このサイトの寄り道 <span>作品の経歴を盛る代わりに、看板の迷走を残します。</span></h2><div className="history-grid"><article><b>01</b><p>風刺を依頼。AIがSaaSの料金表を実装。</p></article><article><b>02</b><p>「売るな」。ホームページが1998年風に退行。</p></article><article><b>03</b><p>本当にvibeslop.devへ公開。自作OSでも開く。</p></article><article><b>04</b><p>本物の二作品を掲載。自己PRだけ控えめに。</p></article></div><p className="fine-print">このサイトで実際に起きた流れです。1998年創業の企業ではありません。</p></section>
    </main>

    <footer className="portal-footer"><div className="webring"><span>◀ 個人制作 WEBRING ▶</span><a href="#nocturne">Nocturne OS</a><a href="#yuyan">语言</a><small>二つあれば、輪だと言い張れます。</small></div><p>© 2026 vibeslop.dev · 本物の作品と、低めの看板。販売・会員登録なし。</p><p>このサイトの投票・訪問数・増築・掲示板は、このブラウザだけに保存。AIへの送信なし。</p><div><a href="https://github.com/jc4789/Vibeslop.dev" target="_blank" rel="noopener noreferrer">このサイトのソース ↗</a><a href="#works">作品に戻る ↑</a><a href="#top">いちばん上 ↑</a></div><p className="last-line">ドメイン名に対して、内容が少し本気です。</p></footer>

    {popup && !calm && <Window title="SYSTEM VIBE ALERT" floating onClose={() => setPopup(false)} className="vibe-popup" icon="⚠"><p className="popup-warning">あなたのPCから7つのVIBEが検出されました。</p><p>実際にはスキャンしていません。数字を付けると診断に見えるので。</p><button className="retro-button neon-button full-button" onClick={() => { add(); setPopup(false); setNotice(true) }}>駆除する（依存関係を増やす）</button></Window>}
    {notice && !calm && <Window title="処理が成功したことにしました" floating onClose={() => setNotice(false)} className="success-popup" icon="✓"><p>VIBEはそのままです。架空のフレームワークを1本追加しました。</p><p className="fine-print">問題への対処と、作業をすることは違います。</p></Window>}
    {diagnostics && <Window title="SLOP_TASK_MANAGER.exe" floating onClose={() => setDiagnostics(false)} className="task-popup" icon="▤"><dl className="task-metrics"><div><dt>DOM要素（開いた時点）</dt><dd>{nodes}</dd></div><div><dt>搭載フレームワーク</dt><dd>{packages.length}</dd></div><div><dt>本当に使うライブラリ</dt><dd>5</dd></div><div><dt>架空の増築</dt><dd>{Math.max(0, packages.length - 5)}</dd></div></dl><p className="fine-print">Reactの中にVue。その隣にThree.js。共有状態はZustand、窓の位置はMotion。混ぜなくてよかったものを混ぜました。</p></Window>}
    {cookies && <div className="unnecessary-cookie"><p>Cookieは使っていません。バナーが欲しかったので付けました。</p><button className="retro-button" onClick={() => setCookies(false)}>同意せず閉じる</button></div>}
    {chaos && <div className="chaos-sticker" aria-live="polite">VIBE OVERRIDE<br /><strong>666%</strong><small>機能は変わらない。装飾だけ増える。</small></div>}
  </div>
}
