import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClasses} from '../redux/actions'
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
    this.props.fetchClasses(this.props.user.EMAIL).then(action => {
      this.setState({classes: action.data.data})
    })
  }

  onClassSelect = () => {
    this.props.history.push(`/student`)
  }

  onUserTypeChange = (e) => { this.setState({userType: e.target.value}) }
  onInputChange = (e) => { this.setState({[e.target.name]: e.target.value}) }
  render () {
    return (
      <div>
      <div style={{width: '100%', textAlign: 'center'}}>
        <div style={{width: '100px', margin: 'auto', marginTop: '200px'}}>
          Class List
        </div>
        <div style={{border: '1px solid black', textAlign: 'center'}}>
          {this.state.classes.map(c => {
            return (<div onClick={this.onClassSelect}><a>{c.CNAME}</a></div>)
          })}
        </div>
      </div>
      </div>
    )
  }
}

export default connect(DataForClassList, {fetchClasses})(ClassList)
