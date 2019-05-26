const nextRoutes = require('next-routes')

const routes = nextRoutes()

exports.Router = routes.Router
exports.Link = routes.Link

module.exports = routes
  .add({name: 'search', pattern: '/search/:userName/:repoName/:page', page: 'index'})

