'use strict'

const Characters = use('App/Models/Characters')
const Application = use('App/Models/Application')
const Database = use('Database')

class CharactersController {

  async create ({ request, response }) {
    const characters = new Characters()
    
    const pj = request.only([
      'name', 'firstname', 'breeds', 'type', 'years', 'description',
      'provenance', 'story', 'metier', 'object'
    ])

    characters.data = JSON.stringify(pj)
    characters.application_id = request.input('application_id')
    await characters.save()

    return response.status(200).json({ status: 'application created', id: characters.id })
  }

  async get ({ auth, response }) {
    let characters = []
    const user = await auth.getUser()

    for(const application of (await user.applications().fetch()).rows){
      characters = ((await Characters.query().with('application').where('application_id', application.id).fetch()).rows)
    }

    return response.status(200).json({ characters })
  }

}

module.exports = CharactersController
