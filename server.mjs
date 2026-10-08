import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import sirv from 'sirv'

const DIST = fileURLToPath(new URL('./dist/', import.meta.url))
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"

function acceptedEncodings(value = '') {
  const encodings = new Map(value.split(',').map(part => {
    const [name, ...parameters] = part.trim().toLowerCase().split(';')
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='))
    return [name, quality ? Number(quality.trim().slice(2)) : 1]
  }))
  return ['br', 'gzip'].filter(name => (encodings.get(name) ?? encodings.get('*') ?? 0) > 0).join(', ')
}

export function createSiteServer({ directory = DIST } = {}) {
  if (!existsSync(join(directory, 'index.html'))) throw new Error('Build missing. Run npm run build before npm start.')
  const serve = sirv(directory, { etag: true, gzip: true, brotli: true, dotfiles: false, single: false })

  return createServer({ requestTimeout: 15000, headersTimeout: 10000 }, (request, response) => {
    response.setHeader('Content-Security-Policy', CSP)
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.setHeader('X-Frame-Options', 'DENY')
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    response.setHeader('Cache-Control', 'no-cache')

    function fail(status, message) {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
      response.end(message)
    }

    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD')
      return fail(405, 'This satire accepts no submissions.')
    }

    let pathname
    try { pathname = decodeURIComponent(request.url.split('?')[0]) }
    catch { return fail(400, 'Malformed URL.') }
    if (pathname.includes('\\') || pathname.includes('\0')) return fail(400, 'Malformed URL.')
    if (pathname.split('/').some(part => part.startsWith('.'))) return fail(404, 'Not found.')

    if (/^\/assets\/[^/]+-[\w-]{8,}\.[a-z0-9]+$/.test(pathname)) {
      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
    // No seekable media: ignore Range requests instead of parsing user-supplied offsets.
    delete request.headers.range
    request.headers['accept-encoding'] = acceptedEncodings(request.headers['accept-encoding'])
    serve(request, response, () => fail(404, 'Not found. Even we didn’t generate this page.'))
  })
}

if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: {
    port: { type: 'string', default: process.env.PORT || '3000' },
    host: { type: 'string', default: process.env.HOST || '0.0.0.0' },
  } })
  const port = Number(values.port)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer between 1 and 65535.')
  const server = createSiteServer()
  server.on('error', error => { console.error(error.message); process.exitCode = 1 })
  server.listen(port, values.host, () => console.log(`Vibeslop is serving on ${values.host}:${port}. Please read your diffs.`))
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close())
}
