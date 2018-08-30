'use strict'

const Schema = use('Schema')

class BadgeSchema extends Schema {
  up () {
    this.create('badges', table => {
      table.increments()

      table.string('logo_path', 255).unique()
      table.string('label', 255)
      table.string('description', 255)

      table.timestamps()
    })
  }

  down () {
    this.drop('badges')
  }
}

module.exports = BadgeSchema
