'use strict'

const Rank = use('App/Models/Rank')
const Database = use('Database')

const Application = use('App/Models/Application')
const Characters = use('App/Models/Characters')

class ApplicationController {

  async publish ({ request, response }) {
    const infos = request.only(['expectations', 'knowledge', 'involvement', 'rules', 'mcname',
      'self', 'activity', 'mcplaying', 'friendly'
    ])

    const application = new Application()
    application.data = JSON.stringify(infos)
    application.user_id = request.input('uuid')

    await application.save()

    return response.status(200).json({ status: 'application created', id: application.id })
  }

  async get ({ response, auth }) {
    const user = await auth.getUser()
    const application = await user.applications()
    response.status(200).json({ application })
  }

}

module.exports = ApplicationController
