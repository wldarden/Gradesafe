import React from 'react'
import config from './config'
// import './style'
import ReactDOM from 'react-dom'
import routes from './routes'
import SSOApp from './Auth/sso-index'
import {AppContainer} from 'react-hot-loader'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import store from './store'
import App from './App'

const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('Routes').toJS()})

console.log(config) // eslint-disable-line no-console
console.log({store, history, routes})
const render = props => {
  console.log(props, store, 'index props loggggggggg')
  ReactDOM.render(
    <AppContainer>
      <App {...props} />
    </AppContainer>,
    document.getElementById('app')
  )
}
const renderApp = () => {
  console.log(store, 'store logggggggg')
  return render({store, history, routes})
}
SSOApp(renderApp)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default
    console.log(newRoutes, 'new routes')
    render({store, history, newRoutes})
  })
}
