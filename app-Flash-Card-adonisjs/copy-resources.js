import fs from 'fs-extra'

// Copier les vues (.edge)
fs.copySync('resources/views', 'build/resources/views', {
  overwrite: true,
  errorOnExist: false,
  recursive: true,
})

console.log('✅ Vues copiées avec succès dans build/resources/views')
