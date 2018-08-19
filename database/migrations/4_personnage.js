'use strict'

const Schema = use('Schema')

class CharactersSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments('id')

      table.string('path', 255).notNullable().unique()
      table.string('data', 1000).notNullable()

      table.integer('application_id').unsigned().notNullable()

      table.timestamps()

      table.foreign('application_id').reference('id').inTable('application')
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharactersSchema
