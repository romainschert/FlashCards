import { copySync } from 'fs-extra'

try {
  // Copier les vues (edge)
  copySync('resources/views', 'build/resources/views', {
    overwrite: true,
    errorOnExist: false,
    recursive: true,
  })

  console.log('✅ Vues copiées avec succès dans build/resources/views')
} catch (err) {
  console.error('❌ Erreur lors de la copie des vues :', err)
}
