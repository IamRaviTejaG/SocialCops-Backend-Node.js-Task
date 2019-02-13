import { publicRouteHandler } from '../controllers/publicRouteController'
import { protectedRouteHandler } from '../controllers/protectedRouteController'
let jsonparser = require('body-parser').json()

export let routes = (router) => {
  router.route('/login', jsonparser)
    .post(publicRouteHandler.login)

  router.route('/signup', jsonparser)
    .post(publicRouteHandler.signup)

  router.route('/jsonpatch', jsonparser)
    .post(protectedRouteHandler.jsonpatch)

  router.route('/thumbnail', jsonparser)
    .post(protectedRouteHandler.genthumb)
}
