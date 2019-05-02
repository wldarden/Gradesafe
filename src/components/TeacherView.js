import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchClassInfoForTeacher, clearData, addAssignment} from '../redux/actions'
import {DataForStudentCourse} from '../redux/selector'
import {Set} from 'immutable'
// const labelOrder = ['Assignment', 'Assigned', 'Due', 'Grade']
const COL_WIDTH = 150
// const assignmentKeyLabels = {
//   Assignment: 'name',
//   Grade: 'grade',
//   Due: 'due',
//   Assigned: 'assigned'
// }

class TeacherView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: '',
      stuMap: {},
      assignmentList: [],
      error: '',
      newA: ''
    }
  }
  componentDidMount () {
    if (!Object.keys(this.props.user).length || (this.props.user && this.props.user.S_ID)) {
      this.onLogout()
    }
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

  changeAName = (e) => {
    this.setState({newA: e.target.value})
  }
  renderHeader(assignment) {
    return (
      <tr>
        <td style={{width: COL_WIDTH}}/>
        {assignment.map((k) => {
          return <td style={{width: COL_WIDTH}}>{k}</td>
        })}
        <td>
          <input onChange={this.changeAName} placeholder='Add Assignment...' />
        </td>
      </tr>
    )
  }
  onLogout = () => {
    this.props.clearData()
    this.props.history.push('/')
  }
  back = () => {
    this.props.history.push('/classes')
  }
  gradeClick = (e) => {
    console.log('Student: ', e.target.id.split('][')[0], ' Assignment: ', e.target.id.split('][')[1])
    this.setState({selectedCell: e.target.id})
  }
  save = () => {
    if (this.state.selectedCell !== '') {

        this.setState({selectedCell: ''})
    }
    if (this.state.newA !== '') {
      this.props.addAssignment(this.props.course.id, this.props.course.CNAME, this.state.newA).then(() => {
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
      })
    }
  }
  renderStudent = (student, name) => {
    let average = 0;
    let sum = 0
    let count = 0;
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
              style.backgroundColor = 'lightGrey'
            } else if (grade > 70) {
              style.backgroundColor = 'orange'
            } else if (grade < 30){
              style.backgroundColor = 'pink'
            }
            sum = sum + student[key]
            count++
            average = sum / count
            return (<td id={`${name}][${key}`} style={style} onClick={this.gradeClick}>{student[key] || 'None'}</td>)
          }
        })}
        <td>{average.toFixed(2) || 'None'}</td>
      </tr>
    )
  }

  render () {
    // console.log(this.props, this.state)
    return (
      <div style={{border: '3px solid black', width: '100%', marginTop: '200px'}}>
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
        <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '5px'}}>
          <button onClick={this.save}>Save</button>
          <button style={{marginRight: '5px'}}onClick={this.back}>Back</button>
        </div>
      </div>
    )
  }
}

export default connect(DataForStudentCourse, {fetchClassInfoForTeacher, clearData, addAssignment})(TeacherView)
