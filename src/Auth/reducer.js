import * as actions from './actions'
import {Map, fromJS} from 'immutable'
// import { handleError } from '../redux_utils'

export default function Auth (state = Map(), action) {
  switch (action.type) {
    case actions.VALIDATE_CREDENTIALS_REQUEST:
    case actions.REFRESH_AUTH_TOKEN_REQUEST:
      return state.setIn(['requests', action.name], fromJS({loading: true}))

    case actions.VALIDATE_CREDENTIALS_SUCCESS:
    case actions.REFRESH_AUTH_TOKEN_SUCCESS:
      // Storing the authToken in the realUser object happens in the user reducer
      return state.setIn(['requests', action.name], fromJS({loading: false}))

    case actions.VALIDATE_CREDENTIALS_FAILURE:
    case actions.REFRESH_AUTH_TOKEN_FAILURE:
      // return handleError(state, action.name, action.id, action.errors)
      return state.setIn(['requests', action.name], fromJS({loading: false, errors: action.errors}))

    default:
      return state
  }
}
