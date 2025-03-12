// app/Models/Flashcard.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Deck from '../models/deck.js' // Import the Deck model to establish the relationship

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare question: string

  @column()
  declare answer: string

  @column()
  declare deckId: number // Reference to the Deck model

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck> // Establish the relationship to the Deck
}
