import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { gzip, brotliCompress, constants } from 'node:zlib'

const gzipFile = promisify(gzip)
const brotliFile = promisify(brotliCompress)

export async function compressDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  await Promise.all(entries.map(async entry => {
    const filename = join(directory, entry.name)
    if (entry.isDirectory()) return compressDirectory(filename)
    if (!entry.isFile() || !/\.(html|css|js|svg|txt)$/.test(entry.name)) return
    const source = await readFile(filename)
    if (source.length < 512) return
    const [gz, br] = await Promise.all([
      gzipFile(source, { level: 9 }),
      brotliFile(source, { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } }),
    ])
    await Promise.all([writeFile(`${filename}.gz`, gz), writeFile(`${filename}.br`, br)])
  }))
}

if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  await compressDirectory(fileURLToPath(new URL('../dist/', import.meta.url)))
}
