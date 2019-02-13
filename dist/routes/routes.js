"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _publicRouteController = require("../controllers/publicRouteController");

var _protectedRouteController = require("../controllers/protectedRouteController");

var jsonparser = require('body-parser').json();

var routes = function routes(router) {
  router.route('/login', jsonparser).post(_publicRouteController.publicRouteHandler.login);
  router.route('/signup', jsonparser).post(_publicRouteController.publicRouteHandler.signup);
  router.route('/jsonpatch', jsonparser).post(_protectedRouteController.protectedRouteHandler.jsonpatch);
  router.route('/thumbnail', jsonparser).post(_protectedRouteController.protectedRouteHandler.genthumb);
};

exports.routes = routes;