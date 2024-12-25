import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dependency_versions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('dependency_id')
        .unsigned()
        .references('id')
        .inTable('dependencies')
        .onDelete('CASCADE')
      table.string('version').notNullable()
      table.string('url').notNullable()
      table.boolean('status').defaultTo(false).notNullable()
      table.string('integrity').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
