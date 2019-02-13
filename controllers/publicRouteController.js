import { auth } from '../config/auth'

export let publicRouteHandler = {
  login: (req, res) => {
    auth.login(req, res)
  },

  signup: (req, res) => {
    auth.register(req, res)
  }
}
