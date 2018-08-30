'use strict'

const Schema = use('Schema')

class CharactersSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments('id')

      table.string('path', 255).unique()
      table.string('data', 1000).notNullable()

      table.integer('application_id').unsigned().notNullable().references('id').inTable('applications')

      table.timestamps()
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharactersSchema
