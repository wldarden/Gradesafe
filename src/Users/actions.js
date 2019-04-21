import ajax from '../ajax'
import {push} from 'react-router-redux'
import browserStorage from '../browserStorage'
import {createAction} from '../redux_utils'
import {coalesceErrors} from '../error.js'
import {List, fromJS, Map} from 'immutable'

const API_NOTIFICATION_PREFIX = '/notification'
const API_USER_PREFIX = '/user'
const API_USER_VERSION = '/v1'

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST'
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS'
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE'

export const fetchUserProfileRequest = createAction(FETCH_USER_PROFILE_REQUEST, 'fetchUserProfile', 'userName')
export const fetchUserProfileSuccess = createAction(
  FETCH_USER_PROFILE_SUCCESS,
  'fetchUserProfile',
  'userName',
  'userProfile'
)
export const fetchUserProfileFailure = createAction(
  FETCH_USER_PROFILE_FAILURE,
  'fetchUserProfile',
  'userName',
  'errors'
)
export function fetchUserProfile (userName) {
  return dispatch => {
    dispatch(fetchUserProfileRequest(userName))
    return ajax.get(API_USER_PREFIX + API_USER_VERSION + `/user/${userName}/profile`)
      .then(res => dispatch(fetchUserProfileSuccess(userName, res.data)))
      .then(action => {
        const profile = fromJS(action.userProfile) || Map()
        profile.get('layers', List()).forEach(layer => {
          dispatch(fetchLayerById(layer.get('layerId')))
        })
        return action
      })
      .catch(errors => dispatch(fetchUserProfileFailure(userName, coalesceErrors([errors]))))
  }
}

export function fetchUserProfileIfNeeded (loginId, force = false) {
  return (dispatch, getState) => {
    const user = getState().getIn(['Users', 'entities', loginId])
    if (!user || force) {
      return dispatch(fetchUserProfile(loginId))
    } else {
      return Promise.resolve({userProfile: user.toJS()})
    }
  }
}

export const RETRIEVE_CURRENT_USER_FROM_BROWSER_STORAGE = 'RETRIEVE_CURRENT_USER_FROM_BROWSER_STORAGE'
export const RETRIEVE_REAL_USER_FROM_BROWSER_STORAGE = 'RETRIEVE_REAL_USER_FROM_BROWSER_STORAGE'
export const retrieveCurrentUserFromBrowserStorage = createAction(
  RETRIEVE_CURRENT_USER_FROM_BROWSER_STORAGE,
  'setUserInformation',
  'user'
)
export const retrieveRealUserFromBrowserStorage = createAction(
  RETRIEVE_REAL_USER_FROM_BROWSER_STORAGE,
  'setUserInformation',
  'user'
)

export function setUserInformation () {
  return (dispatch, getState) => {
    const userState = getState().get('Users', Map())
    if (!userState.get('currentUser')) {
      return dispatch(retrieveCurrentUserFromBrowserStorage((browserStorage.get('currentUser', {}) || {})))
    }
    if (!userState.get('realUser')) {
      return dispatch(retrieveRealUserFromBrowserStorage(browserStorage.get('realUser', {})))
    }
  }
}

export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST'
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE'

export const updateUserProfileRequest = createAction(
  UPDATE_USER_PROFILE_REQUEST,
  'updateUserProfile',
  'userName',
  'userProfile'
)
export const updateUserProfileSuccess = createAction(
  UPDATE_USER_PROFILE_SUCCESS,
  'updateUserProfile',
  'userName',
  'userProfile'
)
export const updateUserProfileFailure = createAction(
  UPDATE_USER_PROFILE_FAILURE,
  'updateUserProfile',
  'userName',
  'userProfile',
  'errors'
)
export function updateUserProfile (userName, userProfile) {
  return dispatch => {
    dispatch(updateUserProfileRequest(userName, userProfile))
    return ajax.post(API_USER_PREFIX + API_USER_VERSION + `/user/${userName}/profile`, userProfile)
      .then(res => dispatch(updateUserProfileSuccess(userName, res.data)))
      .catch(errors => dispatch(updateUserProfileFailure(userName, userProfile, coalesceErrors([errors]))))
  }
}

export const ADD_USER_PROFILE_REQUEST = 'ADD_USER_PROFILE_REQUEST'
export const ADD_USER_PROFILE_SUCCESS = 'ADD_USER_PROFILE_SUCCESS'
export const ADD_USER_PROFILE_FAILURE = 'ADD_USER_PROFILE_FAILURE'

export const addUserProfileRequest = createAction(ADD_USER_PROFILE_REQUEST, 'addUserProfile')
export const addUserProfileSuccess = createAction(ADD_USER_PROFILE_SUCCESS, 'addUserProfile', 'userProfile')
export const addUserProfileFailure = createAction(ADD_USER_PROFILE_FAILURE, 'addUserProfile', 'userProfile', 'errors')
export function addUserProfile (userProfile) {
  return dispatch => {
    dispatch(addUserProfileRequest())
    return ajax.post(API_USER_PREFIX + API_USER_VERSION + '/user/profile', {userProfile})
      .then(res => dispatch(addUserProfileSuccess(res.data)))
      .catch(errors => dispatch(addUserProfileFailure(userProfile, [errors])))
  }
}
