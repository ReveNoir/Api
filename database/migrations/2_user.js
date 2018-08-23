'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.string('uuid', 255).notNullable().unique().primary()

      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()

      table.date('birth')
      table.timestamps()

      table.integer('rank').notNullable().unsigned()

      table.string('account_status', 255)

      table.foreign('rank').references('id').inTable('ranks')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
