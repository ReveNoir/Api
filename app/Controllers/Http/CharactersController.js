'use strict'

const Characters = use('App/Models/Characters')

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
    const user = await auth.getUser()
    const applications = (await user.applications().fetch()).rows
    const characters = []

    for(const application of applications){
      for(const character of await application.characters()){
        characters.push(character)
      }
    }

    response.status(200).json({ characters })
  }

}

module.exports = CharactersController
