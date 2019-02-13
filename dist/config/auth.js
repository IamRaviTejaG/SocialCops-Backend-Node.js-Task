"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _database = require("./database");

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var userSchema = require('../schema/userSchema');

var UserModel = _database.dbConnection.model('user', userSchema);

var auth = {
  authorize: function authorize(token) {
    return new Promise(function (resolve, reject) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
  generateToken: function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 10
    });
  },
  login: function login(req, res) {
    UserModel.findOne({
      username: req.body.username
    }).exec().then(function (data) {
      if (data) {
        bcrypt.compare(req.body.password, data.password).then(function (result) {
          if (!result) {
            res.status(401).json({
              message: 'Incorrect credentials!'
            });
          } else {
            var token = auth.generateToken({
              username: data.username
            });
            res.status(200).json({
              message: 'Login successful!',
              token: token
            });
          }
        }).catch(function (err) {
          res.status(500).json({
            message: 'Server error!',
            error: err
          });
        });
      } else {
        res.status(401).json({
          message: 'Invalid username!'
        });
      }
    }).catch(function (err) {
      res.status(500).json({
        message: 'Server error!',
        error: err
      });
    });
  },
  register: function register(req, res) {
    UserModel.find({
      username: req.body.username
    }).exec().then(function (data) {
      if (!data.length) {
        bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS)).then(function (passhash) {
          var userData = new UserModel({
            username: req.body.username,
            password: passhash
          });
          userData.save().then(function (result) {
            var token = auth.generateToken({
              username: req.body.username
            });
            res.status(200).json({
              message: 'Signup successful!',
              token: token
            });
          }).catch(function (err) {
            res.status(500).json({
              message: 'Server error!',
              error: err
            });
          });
        }).catch(function (err) {
          res.status(500).json({
            message: 'Server error!',
            error: err
          });
        });
      } else {
        res.status(400).json({
          message: 'Username already taken!'
        });
      }
    }).catch(function (err) {
      res.status(500).json({
        message: 'Server error!',
        error: err
      });
    });
  }
};
exports.auth = auth;