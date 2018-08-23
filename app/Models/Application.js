'use strict'

const Model = use('Model')

class Application extends Model {

  static get table () {
    return 'applications'
  }

  characters () {
    return this.hasMany('App/Models/Characters')
  }

}

module.exports = Application
