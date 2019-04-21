import {createSelector, createStructuredSelector} from 'reselect'
import {createStructuredMapSelector} from '../redux_utils'
import {Map, List} from 'immutable'

import {getTableState} from '../Layout/table_selectors'

export const currentFormValues = (state, {formName}) => state.getIn(['Forms', formName, 'currentValues'], Map())

export const currentLoginId = state => state.getIn(['Users', 'currentUser', 'loginId'])
export const realLoginId = state => state.getIn(['Users', 'realUser', 'loginId'])
export const realUserName = state => state.getIn(['Users', 'realUser', 'userName'])

export const currentUser = state => state.getIn(['Users', 'currentUser'], Map())

export const user = (state, props) => state.getIn(['Users', 'entities', props.loginId.toLowerCase()], Map())
const allUsers = state => state.getIn(['Users', 'entities'], Map())

export const getUser = (state, userId) => state.getIn(['Users', 'entities', userId.toLowerCase()], Map())

export const getRealUser = (state, {userid}) => state.getIn(['Users', 'entities', userid.toLowerCase()], Map())

export const getSessionTablePrefs = (state, {tableName}) => state.getIn(['Users', 'sessionGridPrefs', tableName], Map())
export const versionId = (state) => state.getIn(['Users', 'versionId'], undefined)
export const getUserTablePrefs = (state, {tableName}) => state.getIn(
  ['Users', 'entities', state.getIn(['Users', 'realUser', 'loginId'], ''), 'uiPreferences', 'gridPrefs', tableName],
  Map()
)
export const getUserProfile = (state, {tableName}) => state.getIn(['Users', 'entities',
  state.getIn(['Users', 'realUser', 'loginId'], '')], Map())

export const getUserRole = (state) => {
  return state.getIn(['Users', 'entities',
    state.getIn(['Users', 'realUser', 'loginId'], ''), 'role'], '')
}

export const loadingUser = state => state.getIn(['Users', 'requests', 'fetchUser', 'loading'], true)

export const notificationsCount = state => state.getIn(['Users', 'notificationsCount'], 0)
const userSubscriptions = state => {
  let userId = currentUser(state).get('loginId', '')
  return state.getIn(['Users', 'entities', userId, 'subscriptions'], Map())
}

export const notPopUpEnabled = state => state.getIn(['Users', 'miscellaneous', 'notificationPopup'], false)

export const realUser = createSelector(
  [realUserName, allUsers, notificationsCount, versionId, notPopUpEnabled, getUserRole],
  (username, users, notificationsCount, versionId, notPopUpEnabled, getUserRole) => {
    return {
      user: users.get(username, Map()),
      notificationsCount: notificationsCount,
      versionId: versionId,
      notPopUpEnabled: notPopUpEnabled,
      currentUserRole: getUserRole
    }
  }
)
export const currUser = createSelector(
  [currentLoginId, allUsers],
  (username, users) => users.get(username, Map())
)

export const userIdSelector = createStructuredSelector({
  userId: currentLoginId
})

export const dataForShapesList = createStructuredSelector({
  userId: currentLoginId
})

export const dataForSubscriptionToggle = createStructuredSelector({
  userId: currentLoginId,
  userSubscriptions: userSubscriptions
})

export const userRole = createStructuredSelector({
  currentUserRole: getUserRole
})

const userAutocompleteResultsForSearchTerm = (state, props) => {
  let currentInput = state.getIn(['Typeaheads', 'user-typeahead', 'input'], '')
  return state.getIn(['Users', 'autocompletions', currentInput], List())
}
const userTypeaheadValues = state => state.getIn(['Typeaheads', 'user-typeahead'])
export const dataForUserTypeahead = createStructuredMapSelector({currentInput: userTypeaheadValues})
export const TypeaheadUsers = createStructuredSelector({
  users: userAutocompleteResultsForSearchTerm,
  userTypeaheadData: dataForUserTypeahead,
  currentValues: currentFormValues
})

export const NonEngagedResultsSearchHeader = createStructuredSelector({
  user: currUser,
  currentValues: currentFormValues,
  tableState: getTableState
})

export const EngagedResultsSearchHeader = createStructuredSelector({
  user: currUser,
  currentValues: currentFormValues,
  tableState: getTableState
})

export const gridData = createStructuredSelector({
  user: currentUser,
  userProfile: getUserProfile,
  tableState: getUserTablePrefs,
  sessionTableState: getSessionTablePrefs
})

export const UserDropdownData = createStructuredSelector({
  user: currUser,
  notificationsCount: notificationsCount,
  currentUserRole: getUserRole
})

export const profileData = createStructuredSelector({
  notificationsCount: notificationsCount
})
