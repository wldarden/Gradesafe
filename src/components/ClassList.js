import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClasses, setCourse} from '../redux/actions'
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

  onClassSelect = (e) => {
    console.log(e.target.name, e.target.id, e.target)
    this.props.setCourse({CNAME: e.target.name, id: e.target.id})
    this.props.history.push(`/student`)
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
      </div>
    )
  }
}

export default connect(DataForClassList, {fetchClasses, setCourse})(ClassList)
