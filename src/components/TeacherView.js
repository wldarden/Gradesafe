import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClassInfoForTeacher} from '../redux/actions'
import {DataForStudentCourse} from '../redux/selector'
import {Set} from 'immutable'
// const labelOrder = ['Assignment', 'Assigned', 'Due', 'Grade']
const N_ASSIGNMENTS = 9
const N_STUDENTS = 10
const COL_WIDTH = 100
// const assignmentKeyLabels = {
//   Assignment: 'name',
//   Grade: 'grade',
//   Due: 'due',
//   Assigned: 'assigned'
// }

function randAssignment(n) {
  let res = []
  for (let i = 0; i < n; i++) {
    res.push({name: `HWK-${i}`, assigned: '12/12/12', due: '12/12/12'})
  }
  return res
}
function randGrade(n) {
  let res= []
  if (n === undefined) {
    res = (Math.random() * 100).toString().slice(0,5)
  } else {
    for (let i = 0; i < n; i++) {
      res.push((Math.random() * 100).toString().slice(0,5))
    }
  }
  return res
}

function randStudent(n) {
  let res = []
  for (let i = 0; i < n; i++) {
    res.push({name: `Student-${i}`, grades: randGrade(N_ASSIGNMENTS)})
  }
  return res
}

class TeacherView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assignments: randAssignment(N_ASSIGNMENTS),
      students: randStudent(N_STUDENTS),
      selectedCell: '',
      stuMap: {},
      assignmentList: [],
      error: ''
    }
  }
  componentDidMount () {
    console.log(this.props)
    this.props.fetchClassInfoForTeacher(this.props.course.id).then(action => {
      if (action.type === 'FETCH_CLASS_SUCCESS') {
        let assignments = action.data.data
        let stuList = Set(assignments.map(a => a.FNAME + ' ' + a.LNAME)).toJS()
        let assignmentList = Set(assignments.map(a => a.ASSIGNMENTS)).toJS()
        let stuMap = {}
        assignments.forEach(a => {
          if (!stuMap[a.FNAME + ' ' + a.LNAME]) {
            stuMap[a.FNAME + ' ' + a.LNAME] = {}
          }
          let newGradeMap = stuMap[a.FNAME + ' ' + a.LNAME]
          newGradeMap[a.ASSIGNMENTS] = a.GRADE
          stuMap[a.FNAME + ' ' + a.LNAME] = newGradeMap
        })
        this.setState({stuMap: stuMap, stuList: stuList, assignmentList: assignmentList})
      } else {
        this.setState({error: 'Cant Load class information'})
      }

    })
  }
  renderHeader(assignment) {
    return (
      <tr>
        <td style={{width: COL_WIDTH}}/>
        {assignment.map((k) => {
          return <td style={{width: COL_WIDTH}}>{k}</td>
        })}
        <td>
          <input placeholder='Add Assignment...' />
        </td>
      </tr>
    )
  }
  onLogout = () => {
    this.props.history.push('/')
  }
  gradeClick = (e) => {
    console.log('Student: ', e.target.id.split('][')[0], ' Assignment: ', e.target.id.split('][')[1])
    this.setState({selectedCell: e.target.id})
  }
  renderStudent = (student, name) => {
    return (
      <tr>
        <td style={{width: COL_WIDTH}}>{name}</td>
        {Object.keys(student).map((key) => {
          if (`${name}][${key}` === this.state.selectedCell) {
            return <input style={{width: COL_WIDTH}} placeholder='Enter Grade...'/>
          } else {
            let style = {width: COL_WIDTH, border: '1px solid black'}
            let grade = parseInt(student[key])
            if (grade > 90) {
              style.backgroundColor = 'lightgreen'
            } else if (grade > 80) {
              style.backgroundColor = 'white'
            } else if (grade > 70) {
              style.backgroundColor = 'orange'
            } else if (grade < 30){
              style.backgroundColor = 'pink'
            }
            return (<td id={`${name}][${key}`} style={style} onClick={this.gradeClick}>{student[key] || 'None'}</td>)
          }
        })}
      </tr>
    )
  }

  render () {
    return (
      <div style={{border: '3px solid black', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '70%'}}>Welcome, Teacher</div><a onClick={this.onLogout}>Logout</a>
      </div>
        <table className="table table-condensed table-bordered" style={{marginTop:5}}>
          <thead>
            {this.renderHeader(this.state.assignmentList)}
          </thead>
          <tbody>
            {Object.keys(this.state.stuMap).map((key) => this.renderStudent(this.state.stuMap[key], key))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(DataForStudentCourse, {fetchClassInfoForTeacher})(TeacherView)
