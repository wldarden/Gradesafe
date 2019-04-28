import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../redux/actions'
class _Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      userType: 'student',
      userName: '',
      password: '',
      error: ''
    }
  }
  userTypes = ['Student', 'Teacher']

  login = () => {
    this.props.login(this.state.userName, this.state.password, this.state.userType).then((action) => {
      if (action.type === 'LOGIN_SUCCESS' && action.data && action.data.data && action.data.data.length > 0) {
        this.props.history.push(`/classes`)
      } else {
        if (typeof action.error === 'string') {
          this.setState({error: action.error})
        } else if (action.error && action.error.data && action.error.data.message) {
          this.setState({error: action.error.data.message})
        } else {
          this.setState({error: 'An unknown error occured'})
        }
      }
    })
  }

  onUserTypeChange = (e) => { this.setState({userType: e.target.value}) }
  onInputChange = (e) => { this.setState({[e.target.name]: e.target.value}) }
  render () {
    return (
      <div>
      <div style={{width: '100%', textAlign: 'center'}}>
        <div style={{width: '100px', margin: 'auto', marginTop: '200px'}}>
          Login
        </div>
        <div style={{border: '1px solid black', textAlign: 'center'}}>
          I am a...
          <div style={{margin: '5px'}}>
            <select
              onChange={this.onUserTypeChange}
              value={this.state.userType}
            >
              {this.userTypes.map((t) => <option key={t.toLowerCase()} value={t.toLowerCase()}>{t}</option>)}
            </select>
          </div>
          <div style={{margin: 'auto', border: '1px solid blue', width: '50%'}}>
            <div style={{margin: '10px'}}>
              <span style={{marginRight: '10px'}}>Username:</span>
              <span>
                <input
                  style={{width: '50%'}}
                  name={'userName'}
                  onChange={this.onInputChange}
                  value={this.state.userName}
                />
              </span>
            </div>
            <div style={{margin: '10px'}}>
              <span style={{marginRight: '10px'}}>Password:</span>
              <span>
                <input
                  style={{width: '50%'}}
                  name={'password'}
                  onChange={this.onInputChange}
                  value={this.state.password}
                />
              </span>
            </div>
          </div>
          <div style={{margin: '10px'}}>
            {this.state.error !== '' && <div style={{color: 'red'}}>{this.state.error}</div>}
            <input type='button' value='Login' onClick={this.login}/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(null, {login})(_Login)
