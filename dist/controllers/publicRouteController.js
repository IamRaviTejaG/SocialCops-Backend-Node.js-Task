"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRouteHandler = void 0;

var _auth = require("../config/auth");

var publicRouteHandler = {
  login: function login(req, res) {
    _auth.auth.login(req, res);
  },
  signup: function signup(req, res) {
    _auth.auth.register(req, res);
  }
};
exports.publicRouteHandler = publicRouteHandler;