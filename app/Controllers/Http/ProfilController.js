'use strict'

const Helpers = use('Helpers')
const User = use('App/Models/User')

class ProfilController {

  async getProfil ({ response, params }) {
    const uuid = params.uuid
    const user = await User.find(uuid)
    const profil = (await user.profil().fetch()).rows[0]

    return response.status(200).json({ user, profil, badges: await profil.badges() })
  }

  async upload ({ auth, response, params, request }) {
    const user = await auth.getUser()
    const path = `uploads/users/${ user.uuid }/${ params.type }/`
  
    const picture = request.file('picture', {
      types: ['image'],
      size: '20mb'
    })

    const name = `${new Date().getTime()}.${picture.subtype}`
    await picture.move(Helpers.publicPath(`${path}`), { name: name })

    if(!picture.moved()){
      return response.status(401).json({ status: 'Error when file moved' })
    }

    const profil = (await user.profil().fetch()).rows[0]
    
    if(params.type === "logo"){
      profil.logo = name
    }else if(params.type === "header"){
      profil.header = name
    }

    await profil.save()
    return response.status(200).json({ status: 'File moved', path: `${path}${name}` })
  }

}

module.exports = ProfilController
