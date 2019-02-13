let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let morgan = require('morgan')
let routes = require('../routes/routes')

require('dotenv').config()

app.use(morgan('short'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
routes.routes(app)

export default app
