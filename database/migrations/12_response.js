'use strict'

const Schema = use('Schema')

class ResponseSchema extends Schema {
  up () {
    this.create('response', table => {
      table.integer('app_id').references('id').inTable('applications')
      table.string('user_id').references('uuid').inTable('users')

      table.string('response', 255)

      table.date('response_date')
    })
  }

  down () {
    this.drop('response')
  }
}

module.exports = ResponseSchema
