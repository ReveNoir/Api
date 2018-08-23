'use strict'

const Persona = use('Persona')
const Encryption = use('Encryption')

class UserController {

  constructor () {
    Persona.registerationRules = () => {
      return {
        username: 'required|unique:users',
        email: 'required|email|unique:users',
        password: 'required',
        password_confirmation: 'required_if:password|same:password'
      }
    }
    Persona.loginRules = function () {
      return {
        uid: 'required|email',
        password: 'required'
      }
    }
  }

  async register ({ request, response, auth }) {
    const payload = request.only(['username', 'email', 'password', 'password_confirmation'])
    const user = await Persona.register(payload)
    const tokens = await auth.withRefreshToken().generate(user, true)
    return response.status(200).json({ tokens })
  }

  async login ({ request, response, auth }) {
    const payload = request.only(['uid', 'password'])
    const user = await Persona.verify(payload)
    const tokens = await auth.withRefreshToken().generate(user, true)
    return response.status(200).json({ tokens })
  }

  async user ({ response, auth }) {
    try {
      const user = await auth.getUser()
      response.status(200).json((user.account_status ? { user } : { status: 'This account must me verified' }))
    } catch (error) {
      response.status(401).json({ status: 'Missing or invalid jwt token' })
    }
  }

  async disconnect ({ response, auth }) {
    await auth.logout()
    response.status(200).json({ status: 'disconnected' })
  }


  async verifyEmail ({ params, response }) {
    await Persona.verifyEmail(Encryption.decrypt(params.token))
    return response.status(200).json({ status: 'verified' })
  }

  async refreshToken ({ request, response, auth }) {
    const refresh = request.header('Refresh')
    const tokens = await auth.newRefreshToken().generateForRefreshToken(refresh, true)
    return response.status(200).json({ tokens })
  }

  async test ({ auth }) {
    const user = await auth.getUser()
    const apps = (await user.applications().fetch()).rows[0]
    const chars = (await apps.characters())[0].data

    const t = JSON.parse(chars)

    console.log(t.name)
  }

  async setBirth ({ request, response, auth }) {
    const user = auth.user
    user.birth = request.only(['birth']).birth
    await user.save()
    return response.status(200).json({ status: 'user edited', uuid: user.uuid })
  }

}

module.exports = UserController
