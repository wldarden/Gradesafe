import * as actions from './actions'
import {Map, List, fromJS} from 'immutable'
import {setLoading, handleError, addRelationship} from '../redux_utils'
import * as authActions from '../Auth/actions'

export function Users (state = Map(), action) {
  switch (action.type) {
    case actions.FETCH_UNREAD_SON_NOTIFICATIONS_SUCCESS:
      return state.setIn(['sonNotifications'], action.data)

    case actions.FETCH_USER_DETAILS_REQUEST:

      return state.setIn(['requests', action.name], fromJS({loading: true}))

    case actions.RETRIEVE_CURRENT_USER_FROM_BROWSER_STORAGE:
      return state.set('currentUser', fromJS(action.user))

    case actions.RETRIEVE_REAL_USER_FROM_BROWSER_STORAGE:
      return state.set('realUser', fromJS(action.user))

    case actions.ADD_USER_PROFILE_REQUEST:
      return state.setIn(['requests', action.name, 'loading'], true)

    case actions.UPDATE_USER_PROFILE_REQUEST:
    case actions.FETCH_USER_PROFILE_REQUEST:
      return setLoading(state, action.name, action.userName.toLowerCase())

    case actions.ADD_USER_PROFILE_SUCCESS:
      let profile = fromJS(action.userProfile)
      return state.mergeIn(['entities', profile.get('userName', 'undefinedUserName').toLowerCase()], profile)
        .setIn(['requests', action.name, 'loading'], false)

    case actions.UPDATE_USER_PROFILE_SUCCESS:
      state = state.mergeIn(['entities', action.userName.toLowerCase()], fromJS(action.userProfile))
      return setLoading(state, action.name, action.userName.toLowerCase(), false)

    case actions.FETCH_USER_PROFILE_SUCCESS:
      profile = fromJS(action.userProfile)
      let layers = profile.get('layers', List())
      let defaultLayer = Map({
        layerName: 'Default Layer',
        layerId: 0,
        status: 'active'
      })
      layers = layers.push(defaultLayer)

      layers.forEach(layer => {
        const layerId = layer.get('layerId')
        state = state
          .updateIn(['relationships', 'user-layers', profile.get('userName', '').toLowerCase()], List(), ids => {
            if (ids.includes(layerId)) {
              return ids
            } else {
              return ids.push(layerId)
            }
          })
      })

      return state.mergeIn(['entities', profile.get('userName', '').toLowerCase()], profile)
        .setIn(['requests', action.name, profile.get('userName', '').toLowerCase(), 'loading'], false)

    case actions.ADD_USER_PROFILE_FAILURE:
      return state.setIn(['requests', action.name], fromJS({
        loading: false,
        errors: action.errors
      }))

    case actions.UPDATE_USER_PROFILE_FAILURE:
    case actions.FETCH_USER_PROFILE_FAILURE:
      return handleError(state, action.name, action.userName.toLowerCase(), action.errors)

    case actions.LOGIN_REQUEST:
      return state.setIn(['currentUser', 'loading'], true)

    case actions.LOGIN_SUCCESS:
      // when uiPreferences is null SAVE_GRID_STATE reducer was throwing errors, so verify uiPreferences is object
      action.userProfile.uiPreferences = action.userProfile.uiPreferences || {gridPrefs: {}}
      profile = fromJS(action.userProfile)
      const loginId = profile.get('userName', '').toLowerCase()
      profile.get('layers', List()).forEach(layer => {
        const layerId = layer.get('layerId')
        state = state
          .updateIn(['relationships', 'user-layers', loginId], List(), ids => {
            if (ids.includes(layerId)) {
              return ids
            } else {
              return ids.push(layerId)
            }
          })
      })

      return state
        .mergeIn(['currentUser'], fromJS({
          loading: false,
          userName: loginId,
          loginId: loginId
        }))
        .mergeIn(['realUser'], fromJS({
          loading: false,
          userName: loginId,
          loginId: loginId
        }))
        .mergeIn(['entities', loginId], profile)

    case actions.FETCH_USER_DETAILS_SUCCESS:
      let details = Map(action.details)
      localStorage.setItem('role', details.get('role', ''))
      return state.mergeIn(['entities', details.get('loginId', '').toLowerCase()], details)
        .mergeIn(['currentUser'], fromJS({
          loading: false,
          userName: details.get('loginId'),
          loginId: details.get('loginId')
        }))
        .mergeIn(['realUser'], fromJS({
          loading: false,
          userName: details.get('loginId'),
          loginId: details.get('loginId')
        }))
        .setIn(['requests', action.name], fromJS({loading: false}))

    case actions.LOGIN_FAIL:
      return state.set('currentUser', fromJS({
        loading: false,
        errors: fromJS(action.errors)
      }))

    case authActions.VALIDATE_CREDENTIALS_SUCCESS:
    case authActions.REFRESH_AUTH_TOKEN_SUCCESS:
      return state.setIn(['realUser', 'authToken'], action.authToken)

    case actions.FETCH_USER_DETAILS_FAILURE:
      return state.setIn(['requests', action.name], fromJS({loading: false, errors: action.errors}))

    case authActions.VALIDATE_CREDENTIALS_FAILURE:
      return state.setIn(['currentUser', 'errors'], fromJS(action.errors))

    default:
      return state
  }
}

export default Users
