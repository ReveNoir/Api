'use strict'

const Model = use('Model')

class Characters extends Model {

  application () {
    return this.belongsTo('App/Models/Application')
  }

}

module.exports = Characters
