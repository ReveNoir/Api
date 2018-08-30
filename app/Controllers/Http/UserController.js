'use strict'

const Persona = use('Persona')

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
    const payload = request.only(['username', 'email', 'password', 'password_confirmation', 'birth', 'mc_account'])
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

  async disconnect ({ response, auth }) {
    await auth.logout()
    response.status(200).json({ status: 'disconnected' })
  }

  async verifyEmail ({ params, response }) {
    await Persona.verifyEmail(use('Encryption').base64Decode(params.token))
    return response.status(200).json({ status: 'verified' })
  }

  async refreshToken ({ request, response, auth }) {
    const refresh = request.header('Refresh')
    const tokens = await auth.newRefreshToken().generateForRefreshToken(refresh, true)
    return response.status(200).json({ tokens })
  }

  async readRules ({ auth, response }) {
    const user = await auth.getUser()
    user.rules = "true"
    await user.save()
    response.status(200).json({ status: 'User updated.' })
  }

  async updateMinecraft ({ auth, response }) {
    const user = await auth.getUser()
    user.minecraft_account = response.input('minecraft_account')
    await user.save()
    response.status(200).json({ status: 'User updated.' })
  }

}

module.exports = UserController
