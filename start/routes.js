'use strict'

const Route = use('Route')

const link = 'api/v1/blackdream'

Route.group(() => {

}).prefix(link + '/auth').formats(['json']).middleware(['url'])
