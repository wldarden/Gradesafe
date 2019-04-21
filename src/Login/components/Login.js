import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
class _Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      userType: 'student',
      userName: '',
      password: ''
    }
  }
  userTypes = ['Student', 'Teacher', 'Admin']

  login = () => {
    if (this.state.userName === 'will' && this.state.password === '123') {
      this.props.push(`/${this.state.userType}`)
    }
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
          <div style={{margin: 'auto', border: '1px solid blue', width: '200px'}}>
            <div style={{margin: '10px'}}>
              <span style={{marginRight: '10px'}}>Username:</span>
              <span>
                <input
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
                  name={'password'}
                  onChange={this.onInputChange}
                  value={this.state.password}
                />
              </span>
            </div>
          </div>
          <div style={{margin: '10px'}}>
            <input type='button' value='Login' onClick={this.login}/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(null, {push})(_Login)
