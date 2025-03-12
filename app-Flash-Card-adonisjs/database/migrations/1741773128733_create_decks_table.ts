// database/migrations/[timestamp]_decks.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Decks extends BaseSchema {
  protected tableName = 'decks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable() // Add description column (optional)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

// database/migrations/[timestamp]_flashcards.ts
