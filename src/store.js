/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

import {Map} from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import browserStorage from './browserStorage'
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'
import perflogger from 'redux-perf-middleware'

const routingMiddleware = routerMiddleware(browserHistory)

const sessionMiddleware = _store => next => action => {
  let result = next(action)

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      browserStorage.set({
        realUser: {
          loginId: action.userProfile.userName,
          userName: action.userProfile.userName
        },
        currentUser: {
          loginId: action.userProfile.userName,
          userName: action.userProfile.userName
        }
      })
      break

    case 'SWITCH_USER':
      browserStorage.set({
        currentUser: {
          loginId: action.userProfile.userName,
          userName: action.userProfile.userName
        }
      })
      break

    case 'RESTORE_USER':
      browserStorage.set({
        currentUser: {
          loginId: action.userProfile.userName,
          userName: action.userProfile.userName
        }
      })
      break

    case 'USER_LOGOUT':
      browserStorage.clear()
      break

    default:
      break
  }

  return result
}

let middlewares = [
  thunk,
  sessionMiddleware,
  routingMiddleware
]

// if (global.NODE_ENV == 'development' || global.NODE_ENV == 'sandbox' || global.NODE_ENV == 'sandbox-live') {
if (['development', 'sandbox', 'sandbox-live'].indexOf(global.NODE_ENV) !== -1) {
  middlewares.push(perflogger)
}

export default createStore(
  reducer,
  Map(),
  compose(
    applyMiddleware(...middlewares),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
