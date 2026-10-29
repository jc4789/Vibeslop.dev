import { useEffect, useRef, useState } from 'react'
import { ANGLE_EXCESS, ANGLE_SUM, ROOMS, degrees, enterDoor, initialPose, neighbor } from '../lib/nonEuclidean.js'
import '../non-euclidean.css'

export default function NonEuclidean() {
  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState('idle')
  const [failure, setFailure] = useState('')
  const [generation, setGeneration] = useState(0)
  const [pose, setPose] = useState(initialPose)
  const canvas = useRef(null)
  const engine = useRef(null)
  const remembered = useRef(pose)
  const entry = useRef(null)
  const returnFocus = useRef(false)
  const room = ROOMS[pose.room]
  function remember(next) { remembered.current = next; setPose(next) }

  useEffect(() => {
    if (!running) {
      if (returnFocus.current) { entry.current?.focus({ preventScroll: true }); returnFocus.current = false }
      return
    }
    let cancelled = false
    let renderer
    import('../lib/portalRenderer.js').then(({ createPortalRenderer }) => {
      if (cancelled) return
      try {
        renderer = createPortalRenderer(canvas.current, next => {
          remembered.current = next
          setPose(next)
        }, message => { setFailure(message); setStatus('fallback') })
        renderer.setPose(remembered.current)
        engine.current = renderer
        setStatus('ready')
        canvas.current.focus({ preventScroll: true })
      } catch {
        setFailure('この環境ではWebGL2の描画を開始できませんでした。下の扉ボタンで同じ接続を探索できます。')
        setStatus('fallback')
      }
    }).catch(() => {
      if (!cancelled) {
        setFailure('描画コードを読み込めませんでした。扉ボタンによる探索は使えます。')
        setStatus('fallback')
      }
    })
    return () => { cancelled = true; renderer?.dispose(); engine.current = null }
  }, [running, generation])

  function start() { setFailure(''); setStatus('loading'); setRunning(true) }
  function stop() { engine.current?.stop(); returnFocus.current = true; setRunning(false); setStatus('idle') }
  function reset() {
    remember(initialPose())
    engine.current?.restart()
  }
  function door(side) {
    if (engine.current) engine.current.door(side)
    else remember(enterDoor(remembered.current, side))
  }
  function key(event, down) {
    if (status !== 'ready' || event.ctrlKey || event.metaKey || event.altKey) return
    if (!event.target.matches('canvas, [data-world-control]')) return
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(event.key.toLowerCase())) {
      event.preventDefault()
      engine.current?.key(event.key, down)
    }
    if (event.key === 'Escape') { engine.current?.stop(); event.target.blur() }
  }

  return <section id="folded-space" className={`folded-space ${running ? 'space-running' : ''}`} style={{ '--room-color': room.color }} aria-labelledby="space-title">
    <div className="space-masthead"><span>敷地拡張のお知らせ</span><span>床面積：平面への換算不可</span></div>
    <div className="space-heading"><div><p>ちょっと、部屋を増やしました。</p><h2 id="space-title">間取りだけ、<br /><em>話が合いません。</em></h2></div><div className="space-angle"><strong>{degrees(ANGLE_SUM)}<span>°</span></strong><span>一周。誤植ではありません。</span></div></div>
    <p className="space-intro">普通の四角い部屋を、普通でないつなぎ方で。<br />扉の向こうは別の部屋。でも、全部を一枚の平面には置けません。</p>
    <div className="space-stage" onKeyDown={event => key(event, true)} onKeyUp={event => key(event, false)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) engine.current?.stop() }}>
      {!running ? <div className="space-invitation">
        <div className="space-door-art" aria-hidden="true">{ROOMS.map((item, index) => <div key={item.id} style={{ '--door-layer': index, '--door-color': item.color }}><span>{String(index + 1).padStart(2, '0')}</span></div>)}</div>
        <div className="space-entry-copy"><span className="space-status-dot" />非ユークリッド回廊 / 実際に歩けます<h3>この先、<br />直角が余ります。</h3><p>五つの直角で、元の部屋へ。<br />施工ミスではなく、接続の仕様です。</p><button ref={entry} className="space-enter" onClick={start}>平面図を無視して入る <span>↗</span></button><small>音なし・自動移動なし・いつでも退出できます。</small></div>
      </div> : <>
        <canvas key={generation} ref={canvas} className="space-canvas" tabIndex={status === 'ready' ? 0 : -1} role="img" aria-label="扉の向こうまで描画する非ユークリッド回廊。WASDで歩く、左右の矢印で向く、ドラッグで見回す。下の扉ボタンでも探索できます。" aria-describedby="space-instructions"
          onPointerDown={event => engine.current?.pointerDown(event)} onPointerMove={event => engine.current?.pointerMove(event)} onPointerUp={() => engine.current?.pointerUp()} onPointerCancel={() => engine.current?.pointerUp()} />
        <div className="space-hud"><span><b>{String(pose.room + 1).padStart(2, '0')}</b> / {String(ROOMS.length).padStart(2, '0')}<strong>{room.name}</strong></span><button onClick={stop}>平らなページへ戻る ×</button></div>
        {status === 'loading' && <div className="space-fallback" role="status"><strong>隣接関係を折りたたんでいます。</strong><p>依存関係は増やしていません。空間だけです。</p></div>}
        {status === 'fallback' && <div className="space-fallback" role="status"><strong>{room.name}</strong><p>{failure}</p><button onClick={() => { setFailure(''); setStatus('loading'); setGeneration(value => value + 1) }}>描画を再開 ↻</button></div>}
        <div className="space-room-caption" aria-hidden="true"><span>{room.eyebrow}</span><strong>{room.name}</strong></div>
        <div className="space-crosshair" aria-hidden="true">+</div>
        <div className="space-navigation" aria-label="回廊の移動操作">
          <button data-world-control aria-label="左を向く" disabled={status !== 'ready'} onClick={() => engine.current?.turn(-1)}>↶</button>
          <button data-world-control aria-label="前へ進む" disabled={status !== 'ready'} onClick={() => engine.current?.step(1)}>↑</button>
          <button data-world-control aria-label="右を向く" disabled={status !== 'ready'} onClick={() => engine.current?.turn(1)}>↷</button>
          <button data-world-control aria-label="後ろへ進む" disabled={status !== 'ready'} onClick={() => engine.current?.step(-1)}>↓</button>
        </div>
      </>}
    </div>
    {running && <div className="space-control-deck">
      <div className="space-current-room" aria-live="polite" aria-atomic="true"><span>現在地 / 扉を通過 {pose.crossings} 回</span><h3>{room.name}</h3><p>{room.detail}</p><a href={room.exhibit} onClick={() => engine.current?.stop()}>{room.exhibitLabel} ↗</a></div>
      <div className="space-door-buttons" aria-label="連続移動せずに扉を通る"><button onClick={() => door('south')}><span>南の扉 / 来た側へ</span><strong>← {ROOMS[neighbor(pose.room, 'south')].name}</strong></button><button onClick={() => door('east')}><span>東の扉 / 次の部屋へ</span><strong>{ROOMS[neighbor(pose.room, 'east')].name} →</strong></button><button className="space-reset" onClick={reset}>受付からやり直す ↻</button></div>
    </div>}
    <div className="space-footer"><p id="space-instructions">{running ? 'WASDで歩く / ← →で向く / ドラッグで見回す。操作は回廊にフォーカスがある間だけ。動きが苦手なら扉ボタンで一部屋ずつ。' : 'ブラウザー内の小さな展示です。作品紹介は、このまま下へ。Nocturneの画面や実装ではありません。'}</p><details><summary>平面図がない理由</summary><div className="space-geometry-note"><p>{ROOMS.length}枚の正方形の東辺を、次の正方形の南辺へ接続しています。共有する角のまわりは {ROOMS.length} × 90° = {degrees(ANGLE_SUM)}°。平面の360°より{degrees(ANGLE_EXCESS)}°多い、負の曲率を持つ頂点の模型です。</p><p>光線と歩行者に同じ座標変換を使うので、扉越しに見えた部屋へ本当に入れます。単に画面を歪めたフィルターではありません。</p><ol aria-label="部屋の隣接順。平面上の配置図ではありません">{ROOMS.map(item => <li key={item.id} style={{ '--node-color': item.color }}>{item.name}<span aria-hidden="true"> → </span></li>)}</ol><small>最後の部屋の次は、最初の受付です。通過回数や経路に上限はありません。経路は保存・送信しません。</small></div></details></div>
  </section>
}
