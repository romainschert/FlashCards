/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContextContract } from '@adonisjs/'
const testUser = {
  email: 'test@example.com',
  password: 'password123', // Mot de passe fictif
}

// Route pour afficher la page d'accueil
router.get('/', async ({ view, session }: HttpContextContract) => {
  const isAuthenticated = session.get('loggedIn')
  return view.render('home', { isAuthenticated })
})

// Route pour afficher la page de connexion
router.get('/login', async ({ view }: HttpContextContract) => {
  return view.render('login')
})

// Route pour gérer la connexion
router.post('/login', async ({ request, response, session }: HttpContextContract) => {
  const { email, password } = request.only(['email', 'password'])

  if (email === testUser.email && password === testUser.password) {
    session.put('loggedIn', true)
    return response.redirect('/')
  } else {
    session.flash({ error: 'Identifiants incorrects' })
    return response.redirect('/login')
  }
})

// Route pour afficher la page de compte (protégée)
router.get('/account', async ({ view, session, response }: HttpContextContract) => {
  if (!session.get('loggedIn')) {
    return response.redirect('/login')
  }
  return view.render('account')
})

// Route pour afficher la page des flashcards (protégée)
router.get('/flashcards', async ({ view, session, response }: HttpContextContract) => {
  if (!session.get('loggedIn')) {
    return response.redirect('/login')
  }
  return view.render('flashcards')
})

// Route pour se déconnecter
router.get('/logout', async ({ session, response }: HttpContextContract) => {
  session.forget('loggedIn')
  return response.redirect('/')
})
