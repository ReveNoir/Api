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
  }

  async register ({ request, response, auth }) {
    const payload = request.only(['username', 'email', 'password', 'password_confirmation'])
    const user = await Persona.register(payload)
    const tokens = await auth.withRefreshToken().generate(user, true)
    return response.status(200).json({ tokens })
  }

  async verifyEmail ({ params, response }) {
    await Persona.verifyEmail(params.token)
    return response.status(200).json({ status: 'verified' })
  }

}

module.exports = UserController
