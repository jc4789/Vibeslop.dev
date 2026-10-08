import { TRACKS } from './slop.js'

export function createPlayer() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) throw new Error('このブラウザでは音を合成できません。')
  const context = new AudioContext()
  const gain = context.createGain()
  gain.gain.value = .12
  const analyser = context.createAnalyser()
  analyser.fftSize = 256
  gain.connect(analyser)
  analyser.connect(context.destination)
  let timer
  let track = 0
  let next = 0
  let step = 0
  let token = 0
  let active = false
  const voices = new Set()
  function stop() {
    active = false
    token++
    window.clearInterval(timer)
    for (const oscillator of voices) { try { oscillator.stop() } catch { /* already ended */ } }
    voices.clear()
  }
  function tone(note, time, duration, volume, type) {
    const oscillator = context.createOscillator()
    const envelope = context.createGain()
    oscillator.type = type
    oscillator.frequency.value = 440 * 2 ** ((note - 69) / 12)
    envelope.gain.setValueAtTime(.0001, time)
    envelope.gain.exponentialRampToValueAtTime(volume, time + .008)
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration)
    oscillator.connect(envelope); envelope.connect(gain)
    oscillator.onended = () => { voices.delete(oscillator); oscillator.disconnect(); envelope.disconnect() }
    voices.add(oscillator)
    oscillator.start(time); oscillator.stop(time + duration + .01)
  }
  function schedule() {
    const song = TRACKS[track]
    const beat = 60 / song.bpm / 2
    while (active && next < context.currentTime + .12) {
      tone(song.notes[step % song.notes.length], next, beat * .75, .28, 'square')
      if (step % 2 === 0) tone(song.notes[Math.floor(step / 4) % song.notes.length] - 24, next, beat * 1.5, .35, 'triangle')
      next += beat; step++
    }
  }
  return {
    analyser,
    async play(index) {
      stop(); const attempt = ++token
      await context.resume()
      if (attempt !== token) return false
      track = index; next = context.currentTime + .03; step = 0; active = true
      schedule(); timer = window.setInterval(schedule, 40)
      return true
    },
    stop,
    volume(value) { gain.gain.setTargetAtTime(value * .3, context.currentTime, .02) },
    dispose() { stop(); void context.close() },
  }
}
