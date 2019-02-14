let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let morgan = require('morgan')
let routes = require('../routes/routes')

app.use(morgan('tiny'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
routes.routes(app)

export default app
