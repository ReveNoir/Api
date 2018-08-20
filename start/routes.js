'use strict'

const Route = use('Route')

const link = 'api/blackdream/v1'

Route.group(() => {
  Route.get('/verify/:token', 'UserController.verifyEmail')

  Route.post('/register', 'UserController.register')
  Route.post('/login', 'UserController.login')
  Route.post('/refresh/:token', 'UserController.refreshToken')
  Route.post('/me', 'UserController.user')
}).prefix(`${ link }/auth`).formats(['json'])

Route.group(() => {
  Route.post('publish', 'ApplicationController.publish')
}).prefix(`${ link }/users`).formats(['json']).middleware(['auth'])
