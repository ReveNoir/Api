'use strict'

const Rank = use('App/Models/Rank')
const Database = use('Database')

class ApplicationController {

  async publish ({ request, response, auth }) {
    const all = request.only([
      'mcname', 'birth', 'self', 'activity', 'mcplaying', 'friendly'
    ])

    const pj = request.only([
      'name', 'firstname', 'breeds', 'type', 'years', 'description',
      'provenance', 'story', 'metier', 'object'
    ])

    const infos = request.only(['expectations', 'knowledge', 'involvement', 'rules'])

    console.log(all, pj, auth.user.uuid)

  }

}

module.exports = ApplicationController
