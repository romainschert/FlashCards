import type { HttpContext } from '@adonisjs/core/http'
import Deck from '../models/deck.js'

export default class DecksController {
  // Afficher la liste des decks
  public async index({ view }: HttpContext) {
    const decks = await Deck.all() // Fetch all decks from the database
    return view.render('decks', { decks })
  }

  // Afficher le formulaire de création
  public async create({ view }: HttpContext) {
    return view.render('decks_created')
  }

  // Enregistrer un nouveau deck
  public async store({ request, response, session }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])

    const existingDeck = await Deck.findBy('name', name)
    if (existingDeck) {
      session.flash({ error: 'Le nom du deck existe déjà.' })
      session.put('errors.created_name', 'Erreur name deja utilisé')
      return response.redirect().back()
    }
    session.put('errors.created_name', '')
    if (description.length < 10) {
      session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
      session.put(
        'errors.created_desc',
        'Erreur la description doit contenir au moins 10 caractères'
      )
      return response.redirect().back()
    }
    session.put('errors.created_desc', '')
    const deck = await Deck.create({
      name,
      description,
    })
    // Redirect to the newly created deck's page
    return response.redirect(`/decks`)
  }

  // Afficher un deck spécifique
  public async show({ params, view, response }: HttpContext) {
    const decks = await Deck.query().where('id', params.id)

    if (!decks) {
      return response.redirect('/decks')
    }

    return view.render('decks_show', { decks })
  }

  // Afficher le formulaire d'édition
  public async edit({ params, view, response }: HttpContext) {
    const decks = await Deck.query().where('id', params.id)

    if (!decks) {
      return response.redirect('/decks')
    }

    return view.render('decks_edit', { decks })
  }

  // Mettre à jour un deck
  public async update({ params, request, response, session }: HttpContext) {
    // Récupérer le deck à mettre à jour
    const deck = await Deck.findOrFail(params.id)

    // Récupérer les données du formulaire
    const { name, description } = request.only(['name', 'description'])

    // Vérifier si un autre deck avec le même nom existe
    const existingDeck = await Deck.query().where('name', name).whereNot('id', params.id).first()
    if (existingDeck) {
      session.flash({ error: 'Le nom du deck existe déjà.' })
      session.put('errors.updated_name', 'Erreur name deja utilisé')
      return response.redirect().back()
    }
    session.put('errors.updated_name', '')
    // Vérifier la longueur de la description
    if (description.length < 10) {
      session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
      session.put(
        'errors.updated_desc',
        'Erreur la description doit contenir au moins 10 caractères'
      )
      return response.redirect().back()
    }
    session.put('errors.updated_desc', '')
    // Mettre à jour les propriétés du deck
    deck.name = name
    deck.description = description

    // Sauvegarder les modifications
    await deck.save()

    // Rediriger vers la page des decks
    return response.redirect('/decks')
  }

  // Supprimer un deck
  public async destroy({ params, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()
    return response.redirect('/decks')
  }
}
