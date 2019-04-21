import React from 'react'
import {Route, IndexRedirect, IndexRoute} from 'react-router'
import App from './App'
import Login from './Login/components/Login'
import NotFound from './Layout/components/NotFound'
// import LoggedOut from './Login/components/LoggedOut'
// import {getAuth} from './http_utils'
import store from './store'
function getRootRedirect () {
  // let expireAt = localStorage.getItem('expireAt')
  // let badToken = false
  // if (expireAt && (Date.now() - expireAt) > 0) {
  //   badToken = true
  // }
  // if (!getAuth('AUTH')) {
    return <IndexRedirect to='login' />
  // }
}

const routes = (
  <Route path='/' name='Home' component={App}>
    {getRootRedirect()}
    <Route path='login' component={Login} />

    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
