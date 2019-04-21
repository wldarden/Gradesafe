import browserStorage from '../browserStorage'
import store from '../store'
// import * as userActions from '../Users/actions'
// import * as authActions from '../Auth/actions'

export default function (renderApp) {
  if (window.location.pathname === '/logged-out') {
    renderApp()
    return
  }

  // const realUser = browserStorage.get('realUser')
  // if (getAuth('AUTH') && realUser) {
  //   const loginId = realUser.loginId
  //
  //   store.dispatch(authActions.refreshAuthToken())
  //     .then(() => store.dispatch(userActions.fetchUserDetails(loginId)))
  //     .then(() => store.dispatch(userActions.login(loginId)))
  //     .then(() => renderApp())
  // } else {
    renderApp()
  // }
}
