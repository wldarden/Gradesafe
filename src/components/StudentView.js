import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClassInfoForStudent} from '../redux/actions'
import {DataForStudentCourse} from '../redux/selector'
import moment from 'moment'
const labelOrder = ['Assignment', 'Assigned', 'Due', 'Grade']
const assignmentKeyLabels = {
  Assignment: 'ASSIGNMENTS',
  Grade: 'GRADE',
  Due: 'dueDate',
  Assigned: 'dateAssigned'
}

function renderHeader() {
  return (
    <tr>
      {labelOrder.map((k) => {
        return <td>{k}</td>
      })}
    </tr>
  )
}


class StudentView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assignments: [],
      error: ''
    }
  }
  componentDidMount () {
    this.props.fetchClassInfoForStudent(this.props.user.S_ID, this.props.course.id).then(action => {
      if (action.type === 'FETCH_CLASS_SUCCESS') {
        this.setState({assignments: action.data.data})
      } else {
        this.setState({error: 'Cant Load class information'})
      }

    })
  }

  onLogout = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <div style={{border: '3px solid black', width: '100%', marginTop: '200px'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{width: '70%'}}>Welcome, {this.props.user.FNAME}</div><span onClick={this.onLogout}>Logout</span>
        </div>
        {this.state.error !== '' && <div style={{color: 'red'}}>{this.state.error}</div>}
        <table className="table table-condensed table-bordered" style={{marginTop:5}}>
          <thead>
            {renderHeader()}
          </thead>
          <tbody>
          {this.state.assignments.map((row, i) => {
            return (
              <tr key={row.ASSIGNMENTS}>
                {labelOrder.map(label => {
                  let style = {width: '200px', border: '1px solid black'}
                  let grade = row[assignmentKeyLabels[label]]
                  if (label === 'Grade') {
                    if (grade > 90) {
                      style.backgroundColor = 'lightgreen'
                    } else if (grade > 80) {
                      style.backgroundColor = 'lightGrey'
                    } else if (grade > 70) {
                      style.backgroundColor = 'orange'
                    } else if (grade < 30){
                      style.backgroundColor = 'red'
                    }
                  }
                  // console.log()
                  return (
                    <td key={label} style={style}>
                      {(label === 'Assigned' || label === 'Due') ? moment(row[assignmentKeyLabels[label]]).format('MM/DD/YYYY') : row[assignmentKeyLabels[label]]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

}

export default connect(DataForStudentCourse, {fetchClassInfoForStudent})(StudentView)
