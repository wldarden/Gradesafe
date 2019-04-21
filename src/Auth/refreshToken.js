import {setAuth} from '../http_utils'
import ajax from '../ajax'
import store from '../store'
import {logout} from '../Users/actions'
import * as authActions from './actions'
import {coalesceErrors} from '../error.js'

export default function () {
  store.dispatch(authActions.refreshAuthTokenRequest())
  ajax.get(authActions.API_AUTH_PREFIX + authActions.API_AUTH_VERSION + '/renew/auth/token')
    .then(res => {
      setAuth('AUTH', res.data.authToken)
      store.dispatch(authActions.refreshAuthTokenSuccess(res.data.authToken))
    })
    .catch(errors => {
      store.dispatch(authActions.refreshAuthTokenFailure(coalesceErrors(errors)))
      store.dispatch(logout())
    })
}
