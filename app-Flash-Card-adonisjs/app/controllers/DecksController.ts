import type { HttpContext } from '@adonisjs/core/http'
import Deck from '../models/deck.js'

export default class DecksController {
  // Afficher la liste des decks
  public async index({ view }: HttpContext) {
    const decks = await Deck.all() // Fetch all decks from the database
    return view.render('decks', { decks })
  }

  // Afficher le formulaire de création
  public async create({ view }: HttpContextContract) {
    return view.render('decks/new')
  }

  // Enregistrer un nouveau deck
  public async store({ request, auth, response, session }: HttpContextContract) {
    const user = auth.user!
    const data = request.only(['title', 'description'])

    // Vérification des conditions
    if (data.description.length < 10) {
      session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
      return response.redirect().back()
    }

    const existingDeck = await Deck.query()
      .where('user_id', user.id)
      .andWhere('title', data.title)
      .first()

    if (existingDeck) {
      session.flash({ error: 'Un deck avec ce titre existe déjà.' })
      return response.redirect().back()
    }

    await Deck.create({
      userId: user.id,
      title: data.title,
      description: data.description,
    })

    return response.redirect('/decks')
  }

  // Afficher un deck spécifique
  public async show({ params, auth, view, response }: HttpContextContract) {
    const user = auth.user!
    const deck = await Deck.query().where('id', params.id).andWhere('user_id', user.id).first()

    if (!deck) {
      return response.redirect('/decks')
    }

    return view.render('decks/show', { deck })
  }

  // Afficher le formulaire d'édition
  public async edit({ params, auth, view, response }: HttpContextContract) {
    const user = auth.user!
    const deck = await Deck.query().where('id', params.id).andWhere('user_id', user.id).first()

    if (!deck) {
      return response.redirect('/decks')
    }

    return view.render('decks/edit', { deck })
  }

  // Mettre à jour un deck
  public async update({ params, request, auth, response, session }: HttpContextContract) {
    const user = auth.user!
    const deck = await Deck.query().where('id', params.id).andWhere('user_id', user.id).first()

    if (!deck) {
      return response.redirect('/decks')
    }

    const data = request.only(['title', 'description'])

    if (data.description.length < 10) {
      session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
      return response.redirect().back()
    }

    deck.merge({
      title: data.title,
      description: data.description,
    })

    await deck.save()
    return response.redirect('/decks')
  }

  // Supprimer un deck
  public async destroy({ params, auth, response }: HttpContextContract) {
    const user = auth.user!
    const deck = await Deck.query().where('id', params.id).andWhere('user_id', user.id).first()

    if (!deck) {
      return response.redirect('/decks')
    }

    await deck.delete()
    return response.redirect('/decks')
  }
}
