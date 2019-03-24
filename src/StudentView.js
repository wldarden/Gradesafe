import React from 'react'
const labelOrder = ['Assignment', 'Assigned', 'Due', 'Grade']
const assignmentKeyLabels = {
  Assignment: 'name',
  Grade: 'grade',
  Due: 'due',
  Assigned: 'assigned'
}

function randGrade() {
  return (Math.random() * 100).toString().slice(0,5)
}

function randAssignment(n) {
  let res = []
  for (let i = 0; i < n; i++) {
    res.push({name: `HWK-${i}`, grade: randGrade(), assigned: '12/12/12', due: '12/12/12'})
  }
  return res
}

const assignments = randAssignment(9)

function renderHeader() {
  return (
    <tr>
      {labelOrder.map((k) => {
        return <td>{k}</td>
      })}
    </tr>
  )
}

export default function StudentView () {

  return (
    <div style={{border: '3px solid black', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '70%'}}>Welcome, Student</div><span>Logout</span>
      </div>
      <table className="table table-condensed table-bordered" style={{marginTop:5}}>
        <thead>
          {renderHeader()}
        </thead>
        <tbody>
        {assignments.map((row, i) => {
          return (
            <tr key={i}>
              {labelOrder.map(label => {
                let style = {width: '200px', border: '1px solid black'}
                let grade = row[assignmentKeyLabels[label]]
                if (label == 'Grade') {
                  if (grade > 90) {
                    style.backgroundColor = 'lightgreen'
                  } else if (grade > 80) {
                    style.backgroundColor = 'white'
                  } else if (grade > 70) {
                    style.backgroundColor = 'orange'
                  } else if (grade < 30){
                    style.backgroundColor = 'red'
                  }
                }
                // console.log()
                return (
                  <td key={label} style={style}>
                    {row[assignmentKeyLabels[label]]}
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
