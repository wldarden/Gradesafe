import ajax, {rawClient} from '../ajax'
import {createAction} from '../redux_utils'
import {coalesceErrors} from '../error.js'
import {setAuth} from '../http_utils'
import {Map, List} from 'immutable'
import {fetchUserDetailsSuccess} from '../../src/Users/actions'
import js from 'jsonwebtoken'

export const API_AUTH_PREFIX = '/auth'
export const API_AUTH_VERSION = '/v1'

// Renew Auth Token
export const REFRESH_AUTH_TOKEN_REQUEST = 'REFRESH_AUTH_TOKEN_REQUEST'
export const REFRESH_AUTH_TOKEN_SUCCESS = 'REFRESH_AUTH_TOKEN_SUCCESS'
export const REFRESH_AUTH_TOKEN_FAILURE = 'REFRESH_AUTH_TOKEN_FAILURE'

let name = 'refreshAuthToken'
export const refreshAuthTokenRequest = createAction(REFRESH_AUTH_TOKEN_REQUEST, name)
export const refreshAuthTokenSuccess = createAction(REFRESH_AUTH_TOKEN_SUCCESS, name, 'authToken')
export const refreshAuthTokenFailure = createAction(REFRESH_AUTH_TOKEN_FAILURE, name, 'errors')
export function refreshAuthToken () {
  return (dispatch) => {
    dispatch(refreshAuthTokenRequest())
    return ajax.get(API_AUTH_PREFIX + API_AUTH_VERSION + '/renew/auth/token')
      .then(res => {
        setAuth('AUTH', res.data.authToken)
        dispatch(refreshAuthTokenSuccess(res.data.authToken))
      })
      .catch(errors => dispatch(refreshAuthTokenFailure(coalesceErrors(errors))))
  }
}

export const VALIDATE_CREDENTIALS_REQUEST = 'VALIDATE_CREDENTIALS_REQUEST'
export const VALIDATE_CREDENTIALS_SUCCESS = 'VALIDATE_CREDENTIALS_SUCCESS'
export const VALIDATE_CREDENTIALS_FAILURE = 'VALIDATE_CREDENTIALS_FAILURE'
export const ENABLE_NOTIFICATIONS_POPUP = 'ENABLE_NOTIFICATIONS_POPUP'

name = 'validateCredentials'
export const validateCredentialsRequest = createAction(VALIDATE_CREDENTIALS_REQUEST, name)
export const validateCredentialsSuccess = createAction(VALIDATE_CREDENTIALS_SUCCESS, name, 'loginId', 'authToken')
export const validateCredentialsFailure = createAction(VALIDATE_CREDENTIALS_FAILURE, name, 'errors')
export const enableNotificationsPopUp = createAction(
  ENABLE_NOTIFICATIONS_POPUP, 'notificationsTimer', 'notificationPopup'
)

export function validateCredentials (loginId, password) {
  const reqConfig = {
    headers: {Authorization: 'Basic ' + window.btoa(`${loginId}:${password}`)},
    validateStatus: function (status) {
      // Reject only if the status code is greater than or equal to 500
      return status < 499
    }
  }

  return dispatch => {
    dispatch(validateCredentialsRequest())
    return rawClient.get(API_AUTH_PREFIX + API_AUTH_VERSION + `/auth/ldap`, reqConfig)
      .then(res => {
        if (res.status === 200) {
          setAuth('AUTH', res.data.authToken)
          const evaluatedAuthToken = js.decode(res.data.authToken) || {}
          return dispatch(validateCredentialsSuccess(res.data.loginId, res.data.authToken))
        }
        // A valid response is a 404 means user info is not found
        let data = Map(res.data)
        if (data.get('message', '')) {
          return dispatch(validateCredentialsFailure(List([data.get('message', '')])))
        }

        // return dispatch(validateCredentialsFailure(data))
      })
      .catch(error => {
        return dispatch(validateCredentialsFailure(coalesceErrors(error)))
      })
  }
}
