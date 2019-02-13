let mongoose = require('mongoose')
require('dotenv').config()

export let dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${process.env.MONGO_DB_URL}`, { useNewUrlParser: true, useCreateIndex: true })
