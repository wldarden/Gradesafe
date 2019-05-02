import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClasses, setCourse, clearData} from '../redux/actions'
import {DataForClassList} from '../redux/selector'

class ClassList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      error: ''
    }
  }

  componentDidMount () {
    if (!Object.keys(this.props.user).length) {
      this.onLogout()
    }
    if (this.props.user.S_ID) {
      this.props.fetchClasses(this.props.user.EMAIL, 'student').then(action => {
        this.setState({classes: action.data.data})
      })
    } else {
      this.props.fetchClasses(this.props.user.EMAIL, 'professor').then(action => {
        this.setState({classes: action.data.data})
      })
    }

  }
  onLogout = () => {
    this.props.clearData()
    this.props.history.push('/')
  }
  onClassSelect = (e) => {
    this.props.setCourse({CNAME: e.target.name, id: e.target.id})
    if (this.props.user.S_ID) {
      this.props.history.push(`/student`)
    } else {
      this.props.history.push(`/teacher`)
    }
  }

  render () {
    return (
      <div>
        <div style={{width: '100%', textAlign: 'center'}}>
          <div style={{width: '100px', margin: 'auto', marginTop: '200px'}}>
            Class List
          </div>
          <div style={{border: '1px solid black', textAlign: 'center'}}>
            {this.state.classes.map(c => {
              return (<div><a onClick={this.onClassSelect} name={c.CNAME} id={c.id}>{c.CNAME}</a></div>)
            })}
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '5px'}}>
          <button onClick={this.onLogout}>Logout</button>
        </div>
      </div>
    )
  }
}

export default connect(DataForClassList, {fetchClasses, setCourse, clearData})(ClassList)
