import { test } from 'node:test'
import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { LEARNING_STEPS, NOCTURNE_SHOTS, PROJECTS, SELF_PR, YUYAN_SHOTS } from '../src/lib/portfolio.js'

test('the portfolio includes exactly the two requested projects with fixed facts', () => {
  assert.deepEqual(PROJECTS.map(project => project.name), ['Nocturne OS', '语言'])
  assert.equal(new Set(PROJECTS.map(project => project.id)).size, 2)
  for (const project of PROJECTS) {
    assert.equal(project.claims.length, SELF_PR.length)
    assert.equal(project.features.length, 4)
    assert.ok(project.description.length > 50)
    assert.match(project.status, /開発中/)
    assert.ok(project.tags.length >= 4)
  }
  assert.match(PROJECTS[1].features[2][0], /辞書は同梱なし/)
  assert.match(PROJECTS[1].features[2][1], /利用者が自分で用意/)
})

test('self-promotion levels change copy, not completion or fabricated quality metrics', () => {
  assert.deepEqual(SELF_PR.map(setting => setting.output), [20, 55, 100])
  assert.equal(new Set(SELF_PR.map(setting => setting.heading)).size, 3)
  assert.match(LEARNING_STEPS[3].detail, /明示操作/)
  assert.equal(LEARNING_STEPS.length, 4)
})

test('all real screenshots ship locally without private paths or external fetches', async () => {
  assert.equal(YUYAN_SHOTS.length, 8)
  for (const shot of [...NOCTURNE_SHOTS, ...YUYAN_SHOTS]) {
    assert.match(shot.src, /^\/projects\/(?:nocturne-[a-z]+\.png|yuyan-[a-z-]+\.jpg)$/)
    assert.ok(shot.alt.length > 20)
    assert.ok(shot.width > 0 && shot.height > 0)
    await access(new URL(`../public${shot.src}`, import.meta.url))
  }
  assert.doesNotMatch(JSON.stringify({ PROJECTS, NOCTURNE_SHOTS, YUYAN_SHOTS, LEARNING_STEPS, SELF_PR }), /D:\\|D:\/|AppData|https?:\/\//)
})
