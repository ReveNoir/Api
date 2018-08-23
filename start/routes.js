'use strict'

const Route = use('Route')

const link = 'api/blackdream/v1'

Route.group(() => {
  Route.get('verify/:token', 'UserController.verifyEmail')
  Route.post('register', 'UserController.register')
  Route.post('login', 'UserController.login')
  Route.post('refresh', 'UserController.refreshToken') //Token "Refresh"
}).prefix(`${link}/auth/`).formats(['json'])

Route.group(() => {
  Route.post('create', 'ApplicationController.publish') //Token Authorization
  Route.get('get', 'ApplicationController.get')
}).prefix(`${link}/application/`).formats(['json']).middleware(['auth'])

Route.group(() => {
  Route.post('create', 'CharactersController.create') //Request "application_id", "pj"
  Route.get('get', 'CharactersController.get')
}).prefix(`${link}/characters/`).formats(['json']).middleware(['auth'])

Route.group(() => {
  Route.post('user', 'UserController.setBirth') //Request "birth", Token Authorization
  Route.get('me', 'UserController.user') //Token Authorization
}).prefix(`${link}/users/`).formats(['json']).middleware(['auth'])
