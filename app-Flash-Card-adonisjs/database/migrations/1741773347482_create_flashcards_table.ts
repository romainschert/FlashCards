import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Flashcards extends BaseSchema {
  protected tableName = 'flashcards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Auto-incrementing primary key
      table.string('question').notNullable() // The question on the flashcard
      table.string('answer').notNullable() // The answer on the flashcard
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE') // Deck reference

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Created timestamp
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
