/* eslint-disable */
const delay = require('lodash.delay')

var useDelay = true
process.argv.forEach(function (val, index, array) {
  if (val === 'no-delay') useDelay = false
})

module.exports = {
  sendJSON: function (res, data) {
    res.setHeader('Content-Type', 'application/json')
    if (useDelay) {
      delay(() => res.send(JSON.stringify(data)), Math.random()*300)
    } else {
      res.send(JSON.stringify(data))
    }
    return res
  },

  sendString: function (res, data) {//Recieves string instead of JSON like above.
    res.setHeader('Content-Type', 'text/plain')

    if (useDelay) {
      delay(() => res.send(data), Math.random()*300)
    } else {
      res.send(data)
    }

    return res
  },

  ensureParameter: function (param, res) {
    if (!param || param === 'undefined') {
      res.statusCode = 400
      this.sendJSON(res, {
        Error: {
            status: 400,
            message: 'Invalid or missing property.',
            fields: 'Invalid parameter'
        }
      })

      return false
    }

    return true
  }
}
