"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedRouteHandler = void 0;

var _auth = require("../config/auth");

var protectedRouteHandler = {
  jsonpatch: function jsonpatch(req, res) {
    _auth.auth.authorize(req.get('x-jwt-token')).then(function (data) {
      res.status(200).json(req.body);
    }).catch(function (err) {
      res.status(400).json({
        message: 'Server error!',
        error: err
      });
    });
  },
  genthumb: function genthumb(req, res) {
    res.status(200).json(req.body);
  }
};
exports.protectedRouteHandler = protectedRouteHandler;