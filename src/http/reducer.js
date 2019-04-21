import * as actions from './actions'
import {Map, fromJS} from 'immutable'

export default function http (state = Map(), {type, id, ...action}) {

  if (type === actions.HTTP_REQUEST) {
    return state.setIn(['requests', id], fromJS(action))
  }

  if (type === actions.CLEAR_REQUEST) {
    return state.deleteIn(['requests', id])
  }

  return state
}
