import { auth } from '../config/auth'

export let protectedRouteHandler = {
  jsonpatch: (req, res) => {
    auth.authorize(req.get('x-jwt-token')).then(data => {
      res.status(200).json(req.body)
    }).catch(err => {
      res.status(400).json({ message: 'Server error!', error: err })
    })
  },

  genthumb: (req, res) => {
    res.status(200).json(req.body)
  }
}
