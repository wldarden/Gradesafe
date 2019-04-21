/* eslint-disable */
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express()
app.use(cors())
app.use(bodyParser.json())

require('./Auth')(app)


var PORT = process.env.PORT || 5006
app.listen(PORT, function() {
  console.log('Dev Express server running at localhost:' + PORT)
})
