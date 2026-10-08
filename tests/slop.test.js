import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compilePrompt, detectApp, guestEntry, HEADLINES, nextFramework, oracleAnswer, REAL_STACK, TRACKS } from '../src/lib/slop.js'

test('the excessive real stack is not presented as a virtual install', () => {
  assert.deepEqual(REAL_STACK, ['React', 'Vue', 'Zustand', 'Three.js', 'Motion'])
  assert.equal(new Set(Array.from({ length: 59 }, (_, i) => nextFramework(i))).size, 59)
})

test('Japanese and English prompts generate the intended working mini-app', () => {
  for (const prompt of ['電卓を作って', 'a calculator', '計算して']) assert.equal(detectApp(prompt), 'calculator')
  for (const prompt of ['カウンター', 'a counter', '数字を数える']) assert.equal(detectApp(prompt), 'counter')
  for (const prompt of ['TODOリスト', 'task app', 'something vague']) assert.equal(detectApp(prompt), 'todo')
})

test('the satirical build log preserves model order and produces a real app mode', () => {
  const build = compilePrompt('  電卓を作って  ')
  assert.equal(build.request, '電卓を作って')
  assert.equal(build.mode, 'calculator')
  const log = build.logs.join('\n')
  assert.ok(log.indexOf('Gemini') < log.indexOf('Grok'))
  assert.ok(log.indexOf('Grok') < log.indexOf('Qwen'))
  assert.ok(log.indexOf('Qwen') < log.indexOf('Codex'))
  assert.match(log, /ユーザー: 売るな/)
  assert.match(log, /料金表を削除/)
})

test('compiler requests are bounded plain text and jobs do not share state', () => {
  assert.equal(compilePrompt('x'.repeat(300)).request.length, 160)
  const markup = '<img src=x onerror=alert(1)>'
  assert.equal(compilePrompt(markup).request, markup)
  const first = compilePrompt('todo')
  first.logs[0] = 'edited'
  assert.notEqual(compilePrompt('todo').logs[0], 'edited')
})

test('guestbook rejects empty messages, bounds fields, and stores markup only as text', () => {
  assert.equal(guestEntry('x', '   ', 'id', 'now'), null)
  const entry = guestEntry('a'.repeat(50), 'b'.repeat(500), 'id', 'now')
  assert.equal(entry.name.length, 28)
  assert.equal(entry.message.length, 240)
  assert.equal(guestEntry('', '<script>alert(1)</script>', 'id', 'now').message, '<script>alert(1)</script>')
  assert.equal(guestEntry(' ', 'hello', 'id', 'now').name, '名無しのスロップ職人')
})

test('the oracle and news are finite local fiction, not network requests', () => {
  assert.equal(HEADLINES.length, 12)
  assert.equal(new Set(HEADLINES).size, 12)
  assert.match(oracleAnswer('', 0), /質問がありません/)
  assert.match(oracleAnswer('公開する？', 0), /逆の質問/)
  assert.equal(oracleAnswer('公開する？', 0), oracleAnswer('公開しない？', 0))
})

test('all three audio tracks have playable bounded pitches and tempos', () => {
  assert.equal(TRACKS.length, 3)
  assert.equal(new Set(TRACKS.map(track => track.title)).size, 3)
  for (const track of TRACKS) {
    assert.ok(track.bpm > 60 && track.bpm < 180)
    assert.equal(track.notes.length, 8)
    assert.ok(track.notes.every(note => Number.isInteger(note) && note >= 48 && note <= 84))
  }
})
