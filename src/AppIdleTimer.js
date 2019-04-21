import React, {Component} from 'react'
import IdleTimer from 'react-idle-timer'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from './Users/actions'
import {getAuth} from './http_utils'
import {List} from 'immutable'

import browserStorage from './browserStorage'

const idleTime = 1000 * 60 * 60 // Idle timer set to 60 min

class AppIdleTimer extends Component {
  static propTypes = {
    logout: PropTypes.func,
    refreshAuthToken: PropTypes.func,
  }

  state = {
    auth: ''
  }
  componentDidMount () {
    this.logoutIfnotActive()
  }

  logoutIfnotActive = () => {
    let expireAt = localStorage.getItem('expireAt')
    if (expireAt && (Date.now() - expireAt) > 0) {
      this.props.logout()
      let url = window.location.href
      let parts = url.split('/')
      window.location.href = `${parts[0]}//${parts[2]}/logged-out`
    }
    localStorage.setItem('expireAt', Date.now() + idleTime)
    if (getAuth('AUTH') && browserStorage.get('realUser').loginId) {
      let timeout = setInterval(() => {
        let expireAt = localStorage.getItem('expireAt')
        if ((Date.now() - expireAt) > 0) {
          clearTimeout(timeout)
          this.props.logout()
          let url = window.location.href
          let parts = url.split('/')
          window.location.href = `${parts[0]}//${parts[2]}/logged-out`
        }
      }, 1000)
    }
  }

  onAction = (e) => {
    let expireAt = localStorage.getItem('expireAt')
    if ((Date.now() - expireAt) > 0) {
      this.props.logout()
      let url = window.location.href
      let parts = url.split('/')
      window.location.href = `${parts[0]}//${parts[2]}/logged-out`
    }
    localStorage.setItem('expireAt', Date.now() + idleTime)
  }

  render () {
    return (
      <IdleTimer
        element={document}
        onAction={this.onAction}
        throttle={5000} // Every 5 seconds onAction gets called if user does some action.
      />
    )
  }
}

export default connect(null, {logout})(AppIdleTimer)
