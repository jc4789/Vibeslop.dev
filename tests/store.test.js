import { test } from 'node:test'
import assert from 'node:assert/strict'

const cache = new Map()
globalThis.localStorage = { getItem: key => cache.get(key) ?? null, setItem: (key, value) => cache.set(key, value), removeItem: key => cache.delete(key) }
const { useSlop } = await import('../src/lib/store.js')
const initial = useSlop.getInitialState()
function reset() { useSlop.setState(initial, true) }

test('framework growth is bounded and undo cannot remove real bundled libraries', () => {
  reset()
  for (let i = 0; i < 100; i++) useSlop.getState().addFramework()
  assert.equal(useSlop.getState().packages.length, 64)
  assert.equal(new Set(useSlop.getState().packages).size, 64)
  for (let i = 0; i < 100; i++) useSlop.getState().removeFramework()
  assert.equal(useSlop.getState().packages.length, 5)
})

test('poll allows exactly one valid vote and persists that choice locally', () => {
  reset()
  useSlop.getState().castVote(-1)
  useSlop.getState().castVote(4)
  assert.equal(useSlop.getState().vote, null)
  useSlop.getState().castVote(3)
  useSlop.getState().castVote(0)
  assert.deepEqual(useSlop.getState().votes, [41, 12, 23, 25])
  assert.equal(useSlop.getState().vote, 3)
  assert.equal(JSON.parse(cache.get('vibeslop-1998-v1')).state.vote, 3)
})

test('local guestbook refuses empty submissions and keeps only the last 30 entries', () => {
  reset()
  assert.equal(useSlop.getState().sign('test', '  '), false)
  for (let i = 0; i < 35; i++) assert.equal(useSlop.getState().sign('test', `message ${i}`), true)
  assert.equal(useSlop.getState().guests.length, 30)
  assert.equal(useSlop.getState().guests[0].message, 'message 34')
  assert.equal(useSlop.getState().guests.at(-1).message, 'message 5')
  const saved = JSON.parse(cache.get('vibeslop-1998-v1')).state
  assert.equal(saved.guests.length, 30)
  assert.equal('build' in saved, false)
  assert.equal('chaos' in saved, false)
})

test('guestbook removal is undoable without clearing unrelated entries', () => {
  reset()
  useSlop.getState().sign('one', 'first')
  useSlop.getState().sign('two', 'second')
  const first = useSlop.getState().guests.find(entry => entry.name === 'one')
  useSlop.getState().removeGuest(first.id)
  assert.equal(useSlop.getState().guests.length, 1)
  assert.equal(useSlop.getState().guests[0].name, 'two')
  useSlop.getState().restoreGuest()
  assert.equal(useSlop.getState().guests.length, 2)
  assert.equal(useSlop.getState().deletedGuest, null)
})
