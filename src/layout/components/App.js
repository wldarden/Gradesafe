import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setUserInformation} from '../../Users/actions'
import browserStorage from '../../browserStorage'
import '../App.css'

class App extends Component {
  static propTypes = {
    setUserInformation: PropTypes.func,
    children: PropTypes.node,
    location: PropTypes.object
  }

  interval
  componentDidMount () {
    if (browserStorage.get('currentUser') && browserStorage.get('realUser')) {
      this.props.setUserInformation()
    }
  }

  render () {
    return (
      <div>
        <div className='main-content'>
          <div className='main-content-inner'>
            <div className='main-container ace-save-state' id='main-container'>
              <div className='main-content'>
                <div className='main-content-inner'>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(null, {setUserInformation})(App)
