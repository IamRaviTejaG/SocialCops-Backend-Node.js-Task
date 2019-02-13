let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = {
  username: {
    type: String,
    unique: true,
    select: true,
    trim: true
  },
  password: {
    type: String
  }
}

module.exports = new Schema(userSchema)
