'use strict'

const Route = use('Route')

const link = 'api/v1/blackdream'

Route.group(() => {
  Route.post('/register', 'UserController.register')
  Route.get('/verify/:token', 'UserController.verifyEmail')
}).prefix(link + '/auth').formats(['json'])
