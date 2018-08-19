'use strict'

const Rank = use('App/Models/Rank')
const Database = use('Database')

class RankController {

  static async default () {
    return await Database
      .table('ranks')
      .where('isDefault', '1')
      .first()
  }

}

module.exports = RankController
