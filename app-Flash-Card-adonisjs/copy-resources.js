import { cpSync } from 'fs'
import { join } from 'path'

const copy = (src, dest) => {
  try {
    cpSync(src, dest, { recursive: true })
    console.log(`✅ Copied ${src} to ${dest}`)
  } catch (err) {
    console.error(`❌ Failed to copy ${src} to ${dest}:`, err)
  }
}

copy(join('resources', 'views'), join('build', 'resources', 'views'))
copy('public', join('build', 'public'))
