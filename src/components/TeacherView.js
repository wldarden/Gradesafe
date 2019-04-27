import React, {Component} from 'react'
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

export default class TeacherView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assignments: randAssignment(N_ASSIGNMENTS),
      students: randStudent(N_STUDENTS),
      selectedCell: ''
    }
  }
  renderHeader(assignment) {
    return (
      <tr>
        <td style={{width: COL_WIDTH}}/>
        {assignment.map((k) => {
          return <td style={{width: COL_WIDTH}}>{k.name}</td>
        })}
        <td>
          <input placeholder='Add Assignment...' />
        </td>
      </tr>
    )
  }
  gradeClick = (e) => {
    console.log('Student: ', e.target.id.split('][')[0], ' Assignment: ', e.target.id.split('][')[1])
    this.setState({selectedCell: e.target.id})
  }
  renderStudent = (student) => {
    return (
      <tr>
        <td style={{width: COL_WIDTH}}>{student.name}</td>
        {student.grades.map((g, i) => {
          if (`${student.name}][${i}` === this.state.selectedCell) {
            return <input style={{width: COL_WIDTH}} placeholder='Enter Grade...'/>
          } else {
            let style = {width: COL_WIDTH, border: '1px solid black'}
            let grade = parseInt(g)
            if (grade > 90) {
              style.backgroundColor = 'lightgreen'
            } else if (grade > 80) {
              style.backgroundColor = 'white'
            } else if (grade > 70) {
              style.backgroundColor = 'orange'
            } else if (grade < 30){
              style.backgroundColor = 'pink'
            }
            return (<td id={`${student.name}][${i}`} style={style} onClick={this.gradeClick}>{g || 'None'}</td>)
          }
        })}
      </tr>
    )
  }

  render () {
    return (
      <div style={{border: '3px solid black', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '70%'}}>Welcome, Teacher</div><a>Logout</a>
      </div>
        <table className="table table-condensed table-bordered" style={{marginTop:5}}>
          <thead>
            {this.renderHeader(this.state.assignments)}
          </thead>
          <tbody>
            {this.state.students.map((row, i) => this.renderStudent(row))}
          </tbody>
        </table>
      </div>
    )
  }
}
