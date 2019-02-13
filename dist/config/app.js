"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var express = require('express');

var app = express();

var bodyparser = require('body-parser');

var morgan = require('morgan');

var routes = require('../routes/routes');

require('dotenv').config();

app.use(morgan('short'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
routes.routes(app);
var _default = app;
exports.default = _default;