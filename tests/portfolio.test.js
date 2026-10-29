import { test } from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { LEARNING_STEPS, NOCTURNE_SHOTS, NOCTURNE_UPDATE, PROJECTS, SELF_PR, YUYAN_SHOTS } from '../src/lib/portfolio.js'

test('the portfolio includes exactly the two requested projects with fixed facts', () => {
  assert.deepEqual(PROJECTS.map(project => project.name), ['Nocturne OS', '语言'])
  assert.equal(new Set(PROJECTS.map(project => project.id)).size, 2)
  for (const project of PROJECTS) {
    assert.equal(project.claims.length, SELF_PR.length)
    assert.ok(project.features.length)
    assert.ok(project.description.trim())
    assert.match(project.status, /開発中/)
    assert.ok(project.tags.length)
  }
  assert.match(PROJECTS[1].features[2][0], /辞書は同梱なし/)
  assert.match(PROJECTS[1].features[2][1], /利用者が自分で用意/)
})

test('optimized images are smaller, content-addressed, and match their retained originals', async () => {
  const assets = JSON.parse(await readFile(new URL('../src/lib/image-assets.json', import.meta.url), 'utf8'))
  const shots = [...NOCTURNE_SHOTS, NOCTURNE_UPDATE.receipt]
  assert.deepEqual(Object.keys(assets).sort(), shots.map(shot => shot.src).sort())
  for (const shot of shots) {
    const asset = assets[shot.src]
    const original = await readFile(new URL(`../public${shot.src}`, import.meta.url))
    assert.equal(asset.sourceHash, createHash('sha256').update(original).digest('hex'), 'regenerate optimized images after replacing an original')
    for (const src of [asset.full, asset.preview].filter(Boolean)) {
      assert.match(src, /^\/assets\/nocturne-[a-z]+(?:-[a-z]+)*(?:-960)?-[a-f0-9]{12}\.webp$/)
      const data = await readFile(new URL(`../public${src}`, import.meta.url))
      assert.equal(data.toString('ascii', 0, 4), 'RIFF')
      assert.equal(data.toString('ascii', 8, 12), 'WEBP')
      assert.ok(data.length < original.length)
      assert.ok(src.includes(createHash('sha256').update(data).digest('hex').slice(0, 12)))
    }
    if (asset.preview) {
      assert.ok(asset.previewWidth < shot.width)
      assert.ok(asset.previewBytes < asset.bytes)
    }
  }
})

test('self-promotion levels change copy, not completion or fabricated quality metrics', () => {
  assert.equal(new Set(SELF_PR.map(setting => setting.heading)).size, SELF_PR.length)
  assert.ok(SELF_PR.every(setting => setting.label && setting.reading && !('output' in setting)))
  assert.match(LEARNING_STEPS[3].detail, /明示操作/)
  assert.equal(LEARNING_STEPS.length, 4)
})

test('all real screenshots ship locally without private paths or external fetches', async () => {
  for (const shot of [...NOCTURNE_SHOTS, ...YUYAN_SHOTS, NOCTURNE_UPDATE.receipt]) {
    assert.match(shot.src, /^\/projects\/(?:nocturne-[a-z-]+\.png|yuyan-[a-z-]+\.jpg)$/)
    assert.ok(shot.alt.trim())
    assert.ok(shot.width > 0 && shot.height > 0)
    await access(new URL(`../public${shot.src}`, import.meta.url))
  }
  assert.doesNotMatch(JSON.stringify({ PROJECTS, NOCTURNE_SHOTS, YUYAN_SHOTS, LEARNING_STEPS, SELF_PR, NOCTURNE_UPDATE }), /D:\\|D:\/|AppData/)
  for (const project of PROJECTS.filter(project => project.repository)) {
    assert.equal(new URL(project.repository).origin, 'https://github.com')
  }
})

test('the small update preserves the supplied evidence and distinguishes imports from authorship', async () => {
  assert.equal(NOCTURNE_UPDATE.additions, 1_005_910)
  assert.equal(NOCTURNE_UPDATE.deletions, 784)
  assert.equal(NOCTURNE_UPDATE.files, 1_882)
  assert.equal(new URL(NOCTURNE_UPDATE.commitUrl).pathname, `/jc4789/Nocturne-OS/commit/${NOCTURNE_UPDATE.commit}`)
  assert.match(NOCTURNE_UPDATE.receipt.caption, /取り込みを含/)
  assert.match(NOCTURNE_UPDATE.receipt.alt, /Claude/)
  assert.match(PROJECTS.find(project => project.id === 'nocturne').features.flat().join(' '), /ソフトウェア描画/)
  for (const shot of [...NOCTURNE_SHOTS, NOCTURNE_UPDATE.receipt]) {
    const data = await readFile(new URL(`../public${shot.src}`, import.meta.url))
    assert.equal(data.readUInt32BE(16), shot.width, shot.src)
    assert.equal(data.readUInt32BE(20), shot.height, shot.src)
  }
})
