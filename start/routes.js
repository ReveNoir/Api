'use strict'

const Route = use('Route')
const link = 'api/blackdream/v1'

Route.group(() => {
  Route.get('verify/:token', 'UserController.verifyEmail')

  Route.post('register', 'UserController.register')
  Route.post('login', 'UserController.login')
  Route.post('refresh', 'UserController.refreshToken')
  Route.post('readRules', 'UserController.readRules')
  Route.post('updateMinecraft', 'UserController.updateMinecraft')
}).prefix(`${link}/auth/`).formats(['json'])

Route.group(() => {
  Route.get('get/:uuid', 'ProfilController.getProfil')
  Route.post('upload/:type', 'ProfilController.upload').middleware(['auth'])
}).prefix(`${link}/profil/`).formats(['json'])

Route.group(() => {
  Route.post('publish', 'ApplicationController.publish').middleware(['auth'])
  Route.get('get/:uuid', 'Applicationcontroller.get')
  Route.post('update', 'ApplicationController.update').middleware(['auth'])
}).prefix(`${link}/application/`).formats(['json'])