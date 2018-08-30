'use strict'

const Schema = use('Schema')

class ProfilBadgesSchema extends Schema {

  up () {
    this.create('profils_badges', table => {
      table.integer('profil_id').references('id').inTable('profils')
      table.integer('badge_id').references('id').inTable('badges')
      table.date('obtention')
    })
  }

  down () {
    this.drop('profils_badges')
  }
  
}

module.exports = ProfilBadgesSchema
