// 公開用の画像を事前生成。通常のビルド・VPSでの配信にSharpは不要。
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { NOCTURNE_SHOTS, YUYAN_SHOTS } from '../src/lib/portfolio.js'

const modulePath = process.argv[2]
const { default: sharp } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'sharp')
const root = new URL('../', import.meta.url)
await mkdir(new URL('public/assets/', root), { recursive: true })
const manifest = {}
let originalTotal = 0
let fullTotal = 0
let galleryTotal = 0

async function saveAsset(name, buffer) {
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 12)
  const src = `/assets/${name}-${hash}.webp`
  await writeFile(new URL(`public${src}`, root), buffer)
  return src
}

for (const shot of [...NOCTURNE_SHOTS, ...YUYAN_SHOTS]) {
  const source = await readFile(new URL(`public${shot.src}`, root))
  originalTotal += source.length
  // JPEGはすでに小さい。文字を再度非可逆圧縮せず、そのまま使う。
  if (!shot.src.endsWith('.png')) {
    fullTotal += source.length
    galleryTotal += source.length
    continue
  }
  const image = sharp(source)
  const full = await image.clone().webp({ lossless: true, effort: 6 }).toBuffer()
  if (full.length >= source.length) {
    fullTotal += source.length
    galleryTotal += source.length
    continue
  }
  const originalPixels = await image.clone().ensureAlpha().raw().toBuffer()
  const webpPixels = await sharp(full).ensureAlpha().raw().toBuffer()
  if (!originalPixels.equals(webpPixels)) throw new Error(`Lossless verification failed: ${shot.src}`)
  const name = shot.src.split('/').pop().replace(/\.png$/, '')
  const asset = { full: await saveAsset(name, full), bytes: full.length, sourceHash: createHash('sha256').update(source).digest('hex') }
  fullTotal += full.length
  if (shot.width > 960) {
    const preview = await image.clone().resize({ width: 960, withoutEnlargement: true }).webp({ lossless: true, effort: 6 }).toBuffer()
    if (preview.length < full.length) {
      asset.preview = await saveAsset(`${name}-960`, preview)
      asset.previewWidth = 960
      asset.previewBytes = preview.length
    }
  }
  galleryTotal += asset.previewBytes || asset.bytes
  manifest[shot.src] = asset
  console.log(`${name}: ${source.length} -> ${asset.bytes} bytes (preview: ${asset.previewBytes || asset.bytes})`)
}
await writeFile(new URL('src/lib/image-assets.json', root), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ originalTotal, fullTotal, galleryTotal }))
