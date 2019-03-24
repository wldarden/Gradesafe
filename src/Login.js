import React from 'react'

export default function Login () {



  return (
    <div>
    <div style={{width: '100%', textAlign: 'center'}}>
      <div style={{width: '100px', margin: 'auto', marginTop: '200px'}}>
        Login
      </div>
      <div style={{border: '1px solid black', textAlign: 'center'}}>
        I am a...
        <div>
          <span>
            <input type='radio' />
            Student
          </span>
          <span>
            <input type='radio' />
            Teacher
          </span>
          <span>
            <input type='radio' />
            Admin
          </span>
        </div>
        <div style={{margin: 'auto', border: '1px solid blue', width: '200px'}}>
          <div style={{margin: '10px'}}>
            <span style={{marginRight: '10px'}}>Username:</span>
            <span><input /></span>
          </div>
          <div style={{margin: '10px'}}>
            <span style={{marginRight: '10px'}}>Password:</span>
            <span><input /></span>
          </div>
        </div>
        <div style={{margin: '10px'}}>
          <input type='button' value='Login' />
        </div>
      </div>
    </div>
    </div>
  )
}
