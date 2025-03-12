/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { Session } from 'inspector/promises'
import vine from '@vinejs/vine'
import RegisterUsersController from '../app/controllers/register_users_controller.js'
import type { HttpContext } from '@adonisjs/core/http'
import DecksController from '../app/controllers/DecksController.js'
import User from '#models/user'

// Route pour afficher la page d'accueil
router.get('/', async ({ view, session }) => {
  const isAuthenticated = session.get('loggedIn')
  return view.render('home', { isAuthenticated })
})
router.get('/home', async ({ view, session }) => {
  const isAuthenticated = session.get('loggedIn')
  return view.render('home-connect', { isAuthenticated })
})
// Route pour afficher la page de connexion
router.get('/login', async ({ view }) => {
  return view.render('login')
})
router.get('/register', async ({ view }) => {
  return view.render('register')
})
// Route pour afficher la page de compte (protégée)
router.get('/account', async ({ view, session, response }) => {
  if (!session.get('loggedIn')) {
    return response.redirect('/login')
  }
  return view.render('account')
})
// Route pour afficher la page des flashcards (protégée)
router.get('/flashcards', async ({ view, session, response }) => {
  console.log('loggedIn')
  if (!session.get('loggedIn')) {
    return response.redirect('/login')
  }
  return view.render('flashcards')
})
// Route pour se déconnecter
router.get('/logout', async ({ auth, response, session }) => {
  await auth.use('web').logout()
  session.clear()
  return response.redirect('/')
})

router.post('/login', async ({ request, response, session, auth }) => {
  // Récupération des données du formulaire

  const { email, password } = request.only(['email', 'password'])

  console.log(email, password, session)
  // Vérification des identifiants avec testUser
  try {
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    // On simule la connexion en stockant dans la session
    session.put('loggedIn', true)
    session.put('userId', 1)
    // Redirection vers la page des flashcards
    console.log('Connexion réussie pour:', email)
    return response.redirect('/flashcards')
  } catch {
    console.log('Échec de connexion : Email ou mot de passe incorrect')
    return response.redirect('back')
  }
})
router.post('/register', async ({ request, response, session, auth }) => {
  const data = request.only(['full_name', 'email', 'password'])

  const emailExists = await User.findBy('email', data.email)
  if (emailExists) {
    session.flash({ notification: 'Email déjà pris' })
    session.put('errors.email', 'Erreur email deja pris')
    return response.redirect('/register')
  }
  session.put('errors.email', '')
  // Créer et enregistrer le nouvel utilisateur
  const user = new User()
  user.full_name = data.full_name
  user.email = data.email
  user.password = data.password // Hachage du mot de passe avant de le sauvegarder

  await user.save() // Enregistrer l'utilisateur dans la base de données

  return response.redirect('/login') // Redirection après succès
})
router.group(() => {
  // Afficher la liste des decks
  router.get('/decks', [DecksController, 'index'])

  // Afficher le formulaire de création
  router.get('/decks/new', [DecksController, 'create'])

  // Enregistrer un nouveau deck
  router.post('/decks', [DecksController, 'store'])

  // Afficher un deck spécifique
  router.get('/decks/:id', [DecksController, 'show'])

  // Afficher le formulaire de modification
  router.get('/decks/:id/edit', [DecksController, 'edit'])

  // Mettre à jour un deck
  router.post('/decks/:id/update', [DecksController, 'update'])

  // Supprimer un deck
  router.get('/decks/:id/delete', [DecksController, 'destroy'])
})
