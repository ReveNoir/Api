'use strict'

const Application = use('App/Models/Application')
const User = use('App/Models/User')

class ApplicationController {

  async publish ({ request, response, auth }) {
    const user = await auth.getUser()
    const profil_id = (await user.profil().fetch()).rows[0].id

    const application = new Application()
    const payload = request.only(['auto_evaluation', 'hobby', 'minecraft_time', 'attente', 'publicite', 'implication'])
    
    application.data = JSON.stringify(payload)
    application.profil_id = profil_id

    await application.save()
    return response.status(200).json({ id: application.id, status: 'Application created.' })
  }

  async get ({ response, params }) {
    const user = await User.find(params.uuid)
    const profil = (await user.profil().fetch()).rows[0]
    const application = (await profil.application().fetch()).rows[0]

    return response.status(200).json({ application })
  }

  async update ({ response, request, auth }) {
    const user = await auth.getUser()
    const profil = (await user.profil().fetch()).rows[0]
    const application = (await profil.application().fetch()).rows[0]
    const payload = request.only(['auto_evaluation', 'hobby', 'minecraft_time', 'attente', 'publicite', 'implication'])

    application.data = JSON.stringify(payload)
    await application.save()

    return response.status(200).json({ status: 'Application updated.' })
  }

}

module.exports = ApplicationController
