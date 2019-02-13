"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = void 0;

var mongoose = require('mongoose');

require('dotenv').config();

var dbConnection = mongoose.createConnection("mongodb://localhost:27017/".concat(process.env.MONGO_DB_URL), {
  useNewUrlParser: true,
  useCreateIndex: true
});
exports.dbConnection = dbConnection;