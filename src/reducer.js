import {combineReducers} from 'redux-immutable'
import {LOCATION_CHANGE} from 'react-router-redux'
import {fromJS} from 'immutable'

const initialState = fromJS({
  locationBeforeTransitions: null
})

function Routes (state = initialState, {type, payload} = {}) {
  if (type === LOCATION_CHANGE) {
    return state.merge({locationBeforeTransitions: fromJS(payload)})
  }

  return state
}

const appReducer = combineReducers({Routes})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
