// app/Controllers/Http/FlashcardsController.ts
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  // This method will render the flashcard creation form
  public async index({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id) // Find the deck by ID
    return view.render('flashcards/flashcards_create', { deck }) // Render the flashcard creation page and pass the deck data
  }

  public async create({ request, response, params, session }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const deck = await Deck.findOrFail(params.id) // Find the deck by ID
    session.put('errors.created_question', '')
    // Validate the question length
    if (!answer || question.length < 10) {
      session.flash({ error: 'The question must be at least 10 characters long.' })
      console.log('erreur2')
      session.put('errors.created_answer', 'la question doit faire minimum 10 characters de longs')
      console.log('Flash message set:', session.flashMessages.all()) // Debugging statement
      return response.redirect().back()
    }
    session.put('errors.created_answer', '')
    // Check if a flashcard with the same question already exists in this deck
    const existingFlashcard = await Flashcard.query()
      .where('question', question)
      .andWhere('deckId', deck.id) // Ensure it's in the correct deck
      .first()

    if (existingFlashcard) {
      session.flash({ error: 'A flashcard with the same question already exists in this deck.' })
      console.log('erreur1')
      session.put('errors.created_question', 'la question existe deja')
      console.log('Flash message set:', session.flashMessages.all()) // Debugging statement
      return response.redirect().back()
    }
    session.put('errors.created_question', '')
    // Create the flashcard if no duplicate is found
    const flashcard = await Flashcard.create({
      question,
      answer,
      deckId: deck.id, // Associate flashcard with the deck
    })
    console.log(flashcard)
    // Redirect back to the deck's page after adding the flashcard
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  // This method will handle displaying all the flashcards for a specific deck
  public async show({ params, view }: HttpContext) {
    const { deckId, id } = params

    // Find the deck by deckId
    const deck = await Deck.findOrFail(deckId)

    // Find the flashcard by id
    const flashcard = await Flashcard.findOrFail(id)
    // Return the flashcard data to the view
    return view.render('flashcards/show', { deck, flashcard })
  }
  // Edit Flashcard
  public async edit({ params, view }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).firstOrFail()
    const deckId = params.deckId
    return view.render('flashcards/edit', { flashcard, deckId })
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)

      flashcard.question = request.input('question')
      flashcard.answer = request.input('answer')

      await flashcard.save()

      return response.json({ success: true, message: 'Flashcard updated successfully' }) // Send success response
    } catch (error) {
      return response.status(400).json({ success: false, message: 'Failed to update flashcard' }) // Send failure response
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const deckId = params.deckId
      const flashcardId = params.flashcardId

      // Log the IDs for debugging purposes
      console.log('Deck ID:', deckId)
      console.log('Flashcard ID:', flashcardId)

      // Find the flashcard by its ID
      const flashcard = await Flashcard.findOrFail(flashcardId)

      // Ensure the flashcard belongs to the specified deck
      if (flashcard.deckId !== parseInt(deckId)) {
        return response
          .status(400)
          .json({ success: false, message: 'Flashcard does not belong to this deck.' })
      }

      // Delete the flashcard
      await flashcard.delete()

      // After deletion, redirect back to the deck's page
      return response.json({ success: true, message: 'Flashcard deleted successfully' })
    } catch (error) {
      console.error('Error deleting flashcard:', error)
      return response.status(400).json({ success: false, message: 'Failed to delete flashcard' })
    }
  }

  public async validateFlashcard({ params, response }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    await flashcard.save()

    return response.redirect().toRoute('decks.show', { id: params.deckId })
  }
}
