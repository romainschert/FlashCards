// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '#models/user'

export default class RegisterUsersController {
  // Cette méthode affiche le formulaire d'inscription
  public async showForm({ view }: HttpContextContract) {
    return view.render('register') // Affiche le formulaire d'inscription
  }

  // Cette méthode enregistre un utilisateur
  public async register({ request, response }: HttpContextContract) {
    // Récupérer les données envoyées par le formulaire
    const data = request.only(['full_name', 'email', 'password'])

    // Vérifier si l'email est déjà pris
    const userExists = await User.findBy('email', data.email)
    if (userExists) {
      return response.badRequest({ message: 'Email déjà utilisé' })
    }

    // Créer et enregistrer le nouvel utilisateur
    const user = new User()
    user.full_name = data.full_name
    user.email = data.email
    user.password = data.password // Hachage du mot de passe avant de le sauvegarder

    await user.save() // Enregistrer l'utilisateur dans la base de données

    return response.redirect('/login') // Redirection après succès
  }
}
