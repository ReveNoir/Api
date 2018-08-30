'use strict'

const Model = use('Model')

const Database = use('Database')
const Badge = use('App/Models/Badge')

class Profil extends Model {

  static get table () {
    return 'profils'
  }

  application () {
    return this.hasMany('App/Models/Application')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  async badges () {
    const badges = await Database.table('profils_badges').where('profil_id', this.id)
    const data = []

    for(const badge of badges){
      data.push(await Badge.find(badge.badge_id))
    }

    return data
  }

}

module.exports = Profil
