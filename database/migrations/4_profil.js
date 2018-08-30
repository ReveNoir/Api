'use strict'

const Schema = use('Schema')

class ProfilSchema extends Schema {
  up () {
    this.create('profils', table => {
      table.increments()

      table.string('header', 255).unique()
      table.string('logo', 255).unique()

      table.timestamps()

      table.string('user_id', 255).notNullable()
      table.foreign('user_id').references('uuid').inTable('users')
    })
  }

  down () {
    this.drop('profils')
  }
}

module.exports = ProfilSchema
