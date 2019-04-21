const utils = require('./utils')

module.exports = function (app) {

  app.get('/blah-blah', function (req, res) {
    return utils.sendJSON(res,{
      errors: [
        {
          status: '404',
          title: 'Not found',
          detail: 'User not found.'
        }
      ]
    })
  })
}