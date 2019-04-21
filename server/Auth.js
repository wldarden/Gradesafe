/* eslint-disable */
const utils = require('./utils')
const crypto = require('crypto')

/** @constant {string} @default */
const API_AUTH_PREFIX = '/auth'
/** @constant {string} @default */
const API_AUTH_VERSION = '/v1'

/** @constant {string} @default */
const algorithm = 'aes256'
/** @constant {string} */
const key = 'vsonRock3!'

/**
 * Create an Authorization token based on the user name or loginId
 *
 * @param {string} loginId
 * @returns {string}
 */
const generateAuthTokenFromId = (loginId) => {
  //Here we use aes256 but we could use any other algorithm supported by OpenSSL
  const cipher = crypto.createCipher(algorithm, key)
  return cipher.update(loginId + ':' + Date.now(), 'utf8', 'hex') + cipher.final('hex')
}

/**
 * Extract the loginId from the encrypted authorization token
 *
 * @param {string} authToken
 * @returns {string}
 */
const getLoginIdFromAuthToken = (authToken) => {
  const decipher = crypto.createDecipher(algorithm, key)
  const decrypted = decipher.update(authToken, 'hex', 'utf8') + decipher.final('utf8')
  const pos = decrypted.indexOf(':')
  if (!(0 < pos)) {
    return ''
  }

  return decrypted.slice(0, pos)
}

module.exports = function (app) {
  /**
   * This endpoint should not be used after 2017-03-17
   * It is replaced by new auth process using auth/ldap and renew/auth/token endpoints
   *
   * @deprecated
   */
  app.get(API_AUTH_PREFIX + API_AUTH_VERSION + '/auth/getLoginId', function (req, res) {
    if (req.header('Authorization')) {
      const base64hash = req.header('Authorization').replace(/^Basic /, '')
      const decodedHeader = new Buffer(base64hash, 'base64').toString('utf8')
      const pos = decodedHeader.indexOf(':')
      if (0 < pos) {
        return utils.sendJSON(res, {
          loginId: decodedHeader.slice(0, pos)
        })
      }
    }

    return utils.sendJSON(res, {
      loginId: 'v088884'
    })
  })

  /**
   * Get the Basic Auth header and decode to get the loginId then generate an Auth token
   */
  app.get(API_AUTH_PREFIX + API_AUTH_VERSION + '/auth/ldap', function (req, res) {
    const authToken = req.header('Authorization')
    if (!authToken) {
      res.statusCode = 404
      return utils.sendJSON(res, {
        "httpStatus": "NOT_FOUND",
        "code": "404",
        "message": "Bad Request - No Authorization header found."
      })
    }

    const base64hash = authToken.replace(/^Basic /, '')
    const decodedHeader = new Buffer(base64hash, 'base64').toString('utf8')
    const pos = decodedHeader.indexOf(':')
    if (!(0 < pos)) {
      res.statusCode = 400
      return utils.sendJSON(res, {
        "code": "4001",
        "message": "Bad Request - No userId found in the Authorization header."
      })
    }

    const loginId = decodedHeader.slice(0, pos)

    //For testing login with userId error and you will get back the error response
    if ('error' === loginId.toLowerCase()) {
      res.statusCode = 404
      return utils.sendJSON(res, {
        "httpStatus": "NOT_FOUND",
        "code": "404",
        "message": "Message to user - Error used as userId."
      })
    }

    return utils.sendJSON(res, {
      loginId,
      authToken: generateAuthTokenFromId(loginId)
    })
  })

  /**
   * Take in an Authorization Header, decode it to get the loginId then generate a new token
   */
  app.get(API_AUTH_PREFIX + API_AUTH_VERSION + '/renew/auth/token', function (req, res) {
    const authToken = req.header('Authorization')
    if (!authToken) {
      res.statusCode = 400
      return utils.sendJSON(res, {
        "code": "4010",
        "message": "Bad Request - No Authorization header found.",
        "fields": ""
      })
    }

    const loginId = getLoginIdFromAuthToken(authToken)

    if (!loginId) {
      res.statusCode = 400
      return utils.sendJSON(res, {
        "code": "4011",
        "message": "Bad Request - No loginId found in the Authorization header.",
        "fields": ""
      })
    }

    return utils.sendJSON(res, {
      loginId,
      authToken: generateAuthTokenFromId(loginId)
    })
  })
}