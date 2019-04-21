import {Map} from 'immutable'

export function getCurrentUser (state = Map()) {
  const loginId = state.getIn(['Users', 'currentUser', 'loginId'])

  return state.getIn(['Users', 'entities', loginId], Map())
}

export function getRealUser (state = Map()) {
  const loginId = state.getIn(['Users', 'realUser', 'loginId'])

  return state.getIn(['Users', 'entities', loginId], Map())
}

// noinspection JSUnusedGlobalSymbols
export function getLoginToUse (state = Map()) {
  const realUser = state.getIn(['Users', 'realUser', 'userName'])
  const currentUser = state.getIn(['Users', 'currentUser', 'userName'])

  let loginId = currentUser

  if (realUser !== currentUser && !isAppSupport(realUser)) {
    loginId = realUser
  }

  return loginId
}
