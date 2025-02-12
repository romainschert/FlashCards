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
      // Vérification si l'utilisateur existe dans la base de données
      const user = await User.findBy('email', email)

      // Si l'utilisateur n'existe pas
      if (!user) {
        session.flash({ error: 'Aucun utilisateur trouvé avec cet email.' })
        return response.redirect('back') // Rediriger si l'utilisateur n'existe pas
      }

      // Si l'utilisateur existe, tenter de l'authentifier
      await auth.attempt(email, password) // Authentifie l'utilisateur avec les informations fournies

      // Connexion réussie
      session.flash({ success: 'Connexion réussie' })

      // Vous pouvez récupérer l'utilisateur actuel via auth.user si nécessaire
      const userId = auth.user?.id // Récupérer l'ID de l'utilisateur connecté

      // Sauvegarder l'utilisateur et son état dans la session
      session.put('loggedIn', true)
      session.put('userId', userId)

      // Redirection vers la page des flashcards
      return response.redirect('/flashcards')
    } catch (error) {
      // Si l'authentification échoue
      session.flash({ error: 'Les informations de connexion sont incorrectes.' })
      return response.redirect('back') // Rediriger vers la page de connexion
    }
  }
}
