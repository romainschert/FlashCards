import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '#models/user'

export default class LoginController {
  public async login({ request, response, session, auth }: HttpContextContract) {
    // Récupérer les données de la requête
    const email = request.input('email')
    const password = request.input('password')

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      session.flash({ error: "L'email et le mot de passe sont requis." })
      return response.redirect('back') // Rediriger en arrière si des champs sont manquants
    }

    try {
      // Vérification des informations d'identification avec verifyCredentials
      await auth.attempt(email, password) // Utilisation de verifyCredentials dans `auth.attempt`

      // Connexion réussie
      session.flash({ success: 'Connexion réussie' })
      session.put('loggedIn', true)
      session.put('userId', 1)
      // Redirection vers la page des flashcards
      return response.redirect('/flashcards')
    } catch (error) {
      // Si l'authentification échoue
      session.flash({ error: 'Les informations de connexion sont incorrectes.' })
      return response.redirect('back') // Rediriger vers la page de connexion
    }
  }
}
