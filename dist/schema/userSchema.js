"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = {
  username: {
    type: String,
    unique: true,
    select: true,
    trim: true
  },
  password: {
    type: String
  }
};
module.exports = new Schema(userSchema);