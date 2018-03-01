const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const access = require('./access')
const taskRoutes = require('./api/routes/taskRoutes')
const userRoutes = require('./api/routes/userRoutes')

const config = require('./config')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.db_uri)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// midlewares
access(app)

// routing
taskRoutes(app)
userRoutes(app)

app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`})
})

app.listen(config.port)

console.log(`server started on: ${config.port}`)
