import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('content', 500).alter()
      table
        .enum('privacy', ['public', 'friends', 'just-me', 'custom'])
        .defaultTo('public')
        .after('content')
      table.string('media').nullable().after('content')
      table.string('script', 500).nullable().after('content')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('content').alter()
      table.dropColumn('privacy')
      table.dropColumn('media')
      table.dropColumn('script')
    })
  }
}
