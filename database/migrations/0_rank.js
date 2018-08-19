'use strict'

const Schema = use('Schema')

class RanksSchema extends Schema {

  up () {
    this.create('ranks', table => {
      table.increments('id')
      table.string('label', 255).notNullable().unique()
      table.timestamp('created_at').defaultTo(this.fn.now()).notNullable()
      table.boolean('isDefault').defaultTo(false)
    })
  }

  down () {
    this.drop('ranks')
  }

}

module.exports = RanksSchema
