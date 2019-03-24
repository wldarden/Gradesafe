import React from 'react'
import Login, {StudentView, TeacherView} from 'package-template'

export default function App () {
  return (
    <div>
      <div style={{marginBottom: '250px'}}>
        <Login />
      </div>
      <div style={{marginBottom: '250px'}}>
        <StudentView/>
      </div>
      <div>
        <TeacherView/>
      </div>
    </div>
  )
}
