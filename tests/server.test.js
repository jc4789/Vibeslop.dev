import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { request } from 'node:http'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { gunzipSync, brotliDecompressSync } from 'node:zlib'
import { createSiteServer } from '../server.mjs'
import { compressDirectory } from '../scripts/compress.mjs'

let root, server, port
const script = 'console.log("fictional startup");\n'.repeat(100)

before(async () => {
  root = await mkdtemp(join(tmpdir(), 'vibeslop-test-'))
  await mkdir(join(root, 'assets'))
  await writeFile(join(root, 'index.html'), '<!doctype html><title>Vibeslop</title>' + ' '.repeat(600))
  await writeFile(join(root, 'assets', 'index-abcdefgh.js'), script)
  await writeFile(join(root, 'assets', 'index-abcdefgh.css'), 'body { color: #24271e; }')
  await writeFile(join(root, '.env'), 'NOT_A_REAL_SECRET=never_serve_dotfiles')
  await compressDirectory(root)
  server = createSiteServer({ directory: root })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  port = server.address().port
})

after(async () => {
  if (server) await new Promise(resolve => server.close(resolve))
  if (root) {
    assert.ok(root.startsWith(join(tmpdir(), 'vibeslop-test-')))
    await rm(root, { recursive: true, force: true })
  }
})

function get(path, { method = 'GET', headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method, headers }, res => {
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }))
    })
    req.on('error', reject)
    req.end()
  })
}

test('serves the site with revalidating HTML and protective headers', async () => {
  const response = await get('/')
  assert.equal(response.status, 200)
  assert.match(response.body.toString('utf8'), /Vibeslop/)
  assert.match(response.headers['content-type'], /text\/html.*utf-8/)
  assert.equal(response.headers['cache-control'], 'no-cache')
  assert.equal(response.headers['x-content-type-options'], 'nosniff')
  assert.match(response.headers['content-security-policy'], /connect-src 'none'/)
  assert.match(response.headers['content-security-policy'], /frame-ancestors 'none'/)
})

test('serves hashed assets with the right MIME and immutable caching', async () => {
  const js = await get('/assets/index-abcdefgh.js')
  assert.equal(js.status, 200)
  assert.match(js.headers['content-type'], /javascript/)
  assert.equal(js.headers['cache-control'], 'public, max-age=31536000, immutable')
  assert.equal(js.body.toString('utf8'), script)
  assert.match((await get('/assets/index-abcdefgh.css')).headers['content-type'], /text\/css/)
})

test('supports HEAD and conditional requests without response bodies', async () => {
  const head = await get('/', { method: 'HEAD' })
  assert.equal(head.status, 200)
  assert.equal(head.body.length, 0)
  const cached = await get('/', { headers: { 'if-none-match': head.headers.etag } })
  assert.equal(cached.status, 304)
  assert.equal(cached.body.length, 0)
})

test('serves valid precompressed gzip and Brotli assets', async () => {
  const gzip = await get('/assets/index-abcdefgh.js', { headers: { 'accept-encoding': 'gzip' } })
  assert.equal(gzip.headers['content-encoding'], 'gzip')
  assert.equal(gunzipSync(gzip.body).toString('utf8'), script)
  const br = await get('/assets/index-abcdefgh.js', { headers: { 'accept-encoding': 'br, gzip' } })
  assert.equal(br.headers['content-encoding'], 'br')
  assert.equal(brotliDecompressSync(br.body).toString('utf8'), script)
  assert.equal(br.headers.vary, 'Accept-Encoding')
})

test('respects q=0 and leaves uncompressed content available', async () => {
  const response = await get('/assets/index-abcdefgh.js', { headers: { 'accept-encoding': 'br;q=0, gzip;q=0' } })
  assert.equal(response.headers['content-encoding'], undefined)
  assert.equal(response.body.toString('utf8'), script)
})

test('missing assets, source files, traversal, and dotfiles never return the app', async () => {
  for (const path of ['/assets/missing.js', '/src/main.jsx', '/.env', '/../.env', '/%2e%2e/.env', '/unknown-page']) {
    const response = await get(path)
    assert.equal(response.status, 404, path)
    assert.doesNotMatch(response.body.toString('utf8'), /NOT_A_REAL_SECRET/)
  }
})

test('malformed URLs and write methods are rejected', async () => {
  assert.equal((await get('/%zz')).status, 400)
  assert.equal((await get('/%00')).status, 400)
  const post = await get('/', { method: 'POST' })
  assert.equal(post.status, 405)
  assert.equal(post.headers.allow, 'GET, HEAD')
})

test('malformed Range headers cannot crash the static server', async () => {
  const response = await get('/assets/index-abcdefgh.js', { headers: { range: 'bytes=20-1' } })
  assert.equal(response.status, 200)
  assert.equal(response.body.toString('utf8'), script)
  assert.equal((await get('/')).status, 200)
})

test('compression is repeatable and preserves the original file', async () => {
  await compressDirectory(root)
  assert.equal(await readFile(join(root, 'assets', 'index-abcdefgh.js'), 'utf8'), script)
  assert.equal(gunzipSync(await readFile(join(root, 'assets', 'index-abcdefgh.js.gz'))).toString('utf8'), script)
})
