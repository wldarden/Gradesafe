/* eslint-disable */
// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/user', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    username: 'David',
    email: 'foo@bar.com'
  }))
});

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

var PORT = process.env.PORT || 8088
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
