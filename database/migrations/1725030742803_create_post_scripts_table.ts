import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'post_scripts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.string('title').nullable()
      table.string('language').notNullable()
      table.text('content', 'longtext').notNullable()
      table.uuid('user_id').notNullable()
      table.uuid('post_id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('post_id').references('id').inTable('posts').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
