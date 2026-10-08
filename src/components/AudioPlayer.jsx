import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TRACKS } from '../lib/slop'
import { createPlayer } from '../lib/audio'
import Window from './Window'

export default function AudioPlayer({ ref, onPlayback }) {
  const engine = useRef(null)
  const canvas = useRef(null)
  const [track, setTrack] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(40)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState('')
  const attempt = useRef(0)
  function stop() { attempt.current++; engine.current?.stop(); setPlaying(false); onPlayback(false) }
  async function play(index = track) {
    const current = ++attempt.current
    try {
      if (!engine.current) engine.current = createPlayer()
      engine.current.volume(volume / 100)
      if (await engine.current.play(index) && attempt.current === current) { setPlaying(true); onPlayback(true); setError(''); setSeconds(0) }
    } catch { if (attempt.current === current) { setError('音声を開始できませんでした。もう一度再生ボタンを押してください。'); stop() } }
  }
  function change(direction) {
    const next = (track + direction + TRACKS.length) % TRACKS.length
    setTrack(next); setSeconds(0)
    if (playing) void play(next)
  }
  useImperativeHandle(ref, () => ({ toggle: () => playing ? stop() : void play() }))
  useEffect(() => () => { attempt.current++; engine.current?.dispose() }, [])
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setSeconds(value => value + 1), 1000)
    function visibility() { if (document.hidden) { attempt.current++; engine.current?.stop(); setPlaying(false); onPlayback(false) } }
    document.addEventListener('visibilitychange', visibility)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', visibility) }
  }, [playing, onPlayback])
  useEffect(() => {
    const context = canvas.current.getContext('2d')
    let frame
    const data = new Uint8Array(128)
    function draw() {
      context.fillStyle = '#080c12'; context.fillRect(0, 0, 320, 90)
      if (playing) engine.current?.analyser.getByteFrequencyData(data)
      for (let i = 0; i < 32; i++) {
        const height = playing ? Math.max(3, data[i * 3] / 3) : 3
        context.fillStyle = i % 3 === 0 ? '#f4ff00' : '#00ff8c'
        context.fillRect(i * 10 + 1, 88 - height, 7, height)
      }
      if (playing) frame = window.requestAnimationFrame(draw)
    }
    draw()
    return () => window.cancelAnimationFrame(frame)
  }, [playing])
  return <Window title="SLOPAMP v2.69 — 本当に鳴ります" icon="♫" className="audio-window">
    <div className="audio-face"><span className="audio-time">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span><div><span>STEREO / {TRACKS[track].bpm} BPM</span><p>{TRACKS[track].title}</p></div></div>
    <canvas ref={canvas} width="320" height="90" className="equalizer" aria-label={playing ? '合成音声の周波数表示' : '停止中の音声プレイヤー'} />
    <div className="audio-controls"><button className="retro-button" aria-label="前の曲" onClick={() => change(-1)}>◀◀</button><button className="retro-button" aria-label={playing ? '音楽を停止' : '音楽を再生'} onClick={() => playing ? stop() : void play()}>{playing ? '❚❚' : '▶'}</button><button className="retro-button" aria-label="次の曲" onClick={() => change(1)}>▶▶</button><label>音量<input type="range" min="0" max="100" value={volume} onChange={event => { const value = Number(event.target.value); setVolume(value); engine.current?.volume(value / 100) }} /></label></div>
    <p className="fine-print" role="status">{error || (playing ? 'Web Audioでローカル合成中。ダウンロードも外部通信も不要。' : '自動再生しません。再生で8-bitの気分を発生させます。')}</p>
  </Window>
}
