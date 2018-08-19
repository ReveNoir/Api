'use strict'

const Schema = use('Schema')

class ApplicationSchema extends Schema {
  up () {
    this.create('application', (table) => {
      table.increments('id')

      table.string('data', 1000).notNullable()
      table.string('user_id', 255).notNullable()
      table.timestamps()

      table.foreign('user_id').references('uuid').inTable('users')
    })
  }

  down () {
    this.drop('application')
  }
}

module.exports = ApplicationSchema
