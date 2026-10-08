import { useEffect, useRef, useState } from 'react'
import { useSlop } from './lib/store'
import Window from './components/Window'
import Compiler from './components/Compiler'
import MiniApp from './components/MiniApp'
import DependencyGraph from './components/DependencyGraph'
import AudioPlayer from './components/AudioPlayer'
import { DogReview, Guestbook, News, Oracle, Poll } from './components/Toys'

let visitRecorded = false
const MARQUEE = '★ WELCOME TO VIBESLOP.DEV ★ 100% HAND-SLOPPED ★ Vを3回押すと秘密のモード ★ 工事中：1998年から ★ 本番でしか再現しない気分 ★ 売るものはありません ★'
const BIOS = [
  ['Gemini', '最初の版を作りました。次のモデルに引き継ぎました。'],
  ['Grok', 'Geminiのスロップを取り消しました。取り消しも成果です。'],
  ['Qwen', 'その次を担当しました。履歴が増えました。'],
  ['Codex', '風刺を頼まれ、SaaS広告を作りました。怒られました。いまReactの中でVueを動かしています。'],
]

export default function App() {
  const [popup, setPopup] = useState(true)
  const [notice, setNotice] = useState(false)
  const [cookies, setCookies] = useState(true)
  const [bio, setBio] = useState(3)
  const [playing, setPlaying] = useState(false)
  const [diagnostics, setDiagnostics] = useState(false)
  const [nodes, setNodes] = useState(0)
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
    <a href="#lab" className="skip-link">遊び場へ移動</a>
    <div className="starfield" aria-hidden="true" /><div className="retro-floor" aria-hidden="true" />
    <div className="ticker"><div aria-hidden="true">{MARQUEE}　{MARQUEE}</div><span className="sr-only">音楽は手動再生。秘密のモードはVを3回。販売・登録はありません。</span></div>
    <header className="portal-header"><a href="#top" className="portal-logo"><span>⚡</span> vibeslop<span className="logo-domain">.dev</span><small>EST. 1998-ish</small></a><nav aria-label="サイト内移動"><a href="#about">管理人</a><a href="#lab">実験室</a><a href="#toys">おもちゃ</a><a href="#guestbook">足跡</a></nav><div className="header-switches"><button onClick={() => audio.current?.toggle()} aria-pressed={playing}>♫ BGM {playing ? 'ON' : 'OFF'}</button><button onClick={toggleCalm} aria-pressed={calm}>{calm ? '過剰に戻す' : '目を休める'}</button></div></header>
    <main className="portal-shell">
      <section className="portal-hero" aria-labelledby="portal-title">
        <div className="hero-top"><span className="pixel-badge hot-badge">HOT! 1998–2026 EDITION</span><span className="recommended">推奨環境: 1024×768 / 判断力 OFF</span><div className="visitor-counter"><span>YOU ARE VISITOR</span><strong aria-label={`このブラウザで${visits}回目の訪問`}>{String(visits).padStart(7, '0').split('').map((digit, i) => <b key={i}>{digit}</b>)}</strong><small>このブラウザ内だけ。世界はまだ見てない。</small></div></div>
        <p className="under-construction">🚧 工事中です。完成したら風刺にならないので。🚧</p>
        <h1 id="portal-title" className="glitch-title" data-text="VIBESLOP.DEV">VIBESLOP.DEV</h1>
        <p className="hero-motto">機能ではなく、<em>気分を実装しました。</em></p>
        <p className="hero-blurb">Gemini → Grok → Qwen → Codex。<br />全員が改善しました。改善前のサイトは全員が消しました。</p>
        <div className="hero-stickers"><span>HTML 6.0（非公式）</span><span>100% AI SLOP</span><span>NO PRODUCT / NO WAITLIST</span><span>犬レビュー済</span></div>
        <div className="hero-toolbar"><button className="retro-button neon-button" onClick={toggleChaos} aria-pressed={chaos}>🌈 {chaos ? '通常の過剰に戻す' : 'もっと過剰にする'}</button><button className="retro-button" onClick={() => setPopup(true)}>ポップアップを復活</button><button className="retro-button" onClick={taskManager}>タスクマネージャー</button><button className="retro-button" onClick={toggleCrt} aria-pressed={crt}>CRT {crt ? 'ON' : 'OFF'}</button></div>
      </section>

      <div className="intro-grid" id="about">
        <Window title="ABOUT_THE_WEBMASTER.htm" icon="💿"><div className="webmaster"><div className="avatar-box"><span aria-hidden="true">(ง'̀-'́)ง</span><b>VIBE MASTER</b><small>LAST SEEN: main</small></div><div><h2>管理人は4体、責任者は未実装。</h2><p>コードは気分。テストも気分。CIは犬の名前です。<br />このページの要件は「風刺」。一度料金表が生えました。</p><div className="model-tabs" role="group" aria-label="担当したモデル">{BIOS.map(([name], i) => <button key={name} className="retro-button" aria-pressed={bio === i} onClick={() => setBio(i)}>{name}</button>)}</div><p className="model-bio" role="status">{BIOS[bio][1]}</p></div></div><div className="old-web-badges"><span>NETSCAPE OK*</span><span>MADE WITH FEELINGS</span><span>CSS IS MY THERAPY</span><span>NO SALES</span></div><p className="fine-print">*いいえ。古いブラウザは無理です。見栄を張りました。</p></Window>
        <Window title="完成報告（誰も承認していない）.txt" icon="✓"><div className="fake-scorecard"><div><span>AIスロップ純度</span><strong>99.8<small>%</small></strong><small>残りは人間の怒り</small></div><div><span>搭載フレームワーク</span><strong>{packages.length}</strong><small>必要数: たぶん1</small></div><div><span>自己申告の確信度</span><strong>100<small>%</small></strong><small>検証する項目ではない</small></div></div><div className="user-acceptance"><span>ユーザー受け入れテスト</span><blockquote>“cringe”</blockquote><p>エージェントの完了報告とは異なる結果が検出されました。</p></div><p className="fine-print">上の純度と確信度はネタです。フレームワーク数は下の増築と連動します。</p></Window>
      </div>

      <section id="lab" className="lab-area"><h2 className="section-title">⚡ SLOP LAB <span>本当に動く。だから余計に困る。</span></h2><div className="build-grid"><Compiler /><MiniApp /></div><div className="systems-grid"><DependencyGraph /><AudioPlayer ref={audio} onPlayback={setPlaying} /><Poll /></div></section>

      <div className="hazard-banner"><span>⚠ ALL SYSTEMS EMOTIONAL</span><span>フレームワークを増やすと、不安だけが減ります。</span><button onClick={() => { for (let i = 0; i < 5; i++) add() }}>5本まとめて安心する →</button></div>

      <section id="toys" className="toy-area"><h2 className="section-title">🧪 不要な追加機能 <span>頼まれていないので、ここにあります。</span></h2><div className="toys-grid"><News /><Oracle /><DogReview /></div></section>
      <Guestbook />
      <section className="history-section"><h2 className="section-title">⌛ 更新履歴 <span>退行もリリースに含みます。</span></h2><div className="history-grid"><article><b>1998</b><p>訪問者カウンターを設置。人生のピーク。</p></article><article><b>2004</b><p>blinkタグを発見。回復の見込みなし。</p></article><article><b>2023</b><p>プロンプトを覚えた。diffを読まなくなった。</p></article><article><b>2026</b><p>風刺を依頼。AIが料金表を実装。人間が介入。</p></article></div><p className="fine-print">前半の歴史はフィクション。最後はこのサイトで本当に起きました。</p></section>
    </main>

    <footer className="portal-footer"><div className="webring"><span>◀ スロップ WEBRING ▶</span><a href="#lab">前のサイト</a><a href="#guestbook">次のサイト</a><small>隣もこのサイトです。規模感だけ出しました。</small></div><p>© 1998–2026 vibeslop.dev · 何も売っていません。会員登録もありません。</p><p>操作はすべて端末内。投票・訪問数・増築・掲示板はこのブラウザに保存。AIへの送信なし。</p><div><a href="https://github.com/jc4789/Vibeslop.dev" target="_blank" rel="noopener noreferrer">実際のソースを見る ↗</a><a href="#top">上へ戻る ↑</a></div><p className="last-line">Let me know if you would like me to keep going.</p></footer>

    {popup && !calm && <Window title="SYSTEM VIBE ALERT" floating onClose={() => setPopup(false)} className="vibe-popup" icon="⚠"><p className="popup-warning">あなたのPCから7つのVIBEが検出されました。</p><p>実際にはスキャンしていません。数字を付けると診断に見えるので。</p><button className="retro-button neon-button full-button" onClick={() => { add(); setPopup(false); setNotice(true) }}>駆除する（依存関係を増やす）</button></Window>}
    {notice && !calm && <Window title="処理が成功したことにしました" floating onClose={() => setNotice(false)} className="success-popup" icon="✓"><p>VIBEはそのままです。架空のフレームワークを1本追加しました。</p><p className="fine-print">問題への対処と、作業をすることは違います。</p></Window>}
    {diagnostics && <Window title="SLOP_TASK_MANAGER.exe" floating onClose={() => setDiagnostics(false)} className="task-popup" icon="▤"><dl className="task-metrics"><div><dt>DOM要素（開いた時点）</dt><dd>{nodes}</dd></div><div><dt>搭載フレームワーク</dt><dd>{packages.length}</dd></div><div><dt>本当に使うライブラリ</dt><dd>5</dd></div><div><dt>架空の増築</dt><dd>{Math.max(0, packages.length - 5)}</dd></div></dl><p className="fine-print">Reactの中にVue。その隣にThree.js。共有状態はZustand、窓の位置はMotion。混ぜなくてよかったものを混ぜました。</p></Window>}
    {cookies && <div className="unnecessary-cookie"><p>Cookieは使っていません。バナーが欲しかったので付けました。</p><button className="retro-button" onClick={() => setCookies(false)}>同意せず閉じる</button></div>}
    {chaos && <div className="chaos-sticker" aria-live="polite">VIBE OVERRIDE<br /><strong>666%</strong><small>機能は変わらない。装飾だけ増える。</small></div>}
  </div>
}
