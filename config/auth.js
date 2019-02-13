import { dbConnection } from './database'
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let userSchema = require('../schema/userSchema')
let UserModel = dbConnection.model('user', userSchema)

export let auth = {
  authorize: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      })
    })
  },

  generateToken: payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
  },

  login: (req, res) => {
    UserModel.findOne({ username: req.body.username }).exec().then(data => {
      if (data) {
        bcrypt.compare(req.body.password, data.password).then(result => {
          if (!result) {
            res.status(401).json({ message: 'Incorrect credentials!' })
          } else {
            let token = auth.generateToken({ username: data.username })
            res.status(200).json({ message: 'Login successful!', token })
          }
        }).catch(err => {
          res.status(500).json({ message: 'Server error!', error: err })
        })
      } else {
        res.status(401).json({ message: 'Invalid username!' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'Server error!', error: err })
    })
  },

  register: (req, res) => {
    UserModel.find({ username: req.body.username }).exec().then(data => {
      if (!data.length) {
        bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS)).then(passhash => {
          let userData = new UserModel({
            username: req.body.username,
            password: passhash
          })
          userData.save().then(result => {
            let token = auth.generateToken({ username: req.body.username })
            res.status(200).json({ message: 'Signup successful!', token })
          }).catch(err => {
            res.status(500).json({ message: 'Server error!', error: err })
          })
        }).catch(err => {
          res.status(500).json({ message: 'Server error!', error: err })
        })
      } else {
        res.status(400).json({ message: 'Username already taken!' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'Server error!', error: err })
    })
  }
}
