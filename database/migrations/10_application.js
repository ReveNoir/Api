'use strict'

const Schema = use('Schema')

class ApplicationSchema extends Schema {
  up () {
    this.create('applications', (table) => {
      table.increments('id')

      table.string('data', 1000).notNullable()
      table.integer('profil_id').notNullable()
      table.timestamps()

      table.foreign('profil_id').references('id').inTable('profils')
    })
  }

  down () {
    this.drop('applications')
  }
}

module.exports = ApplicationSchema
