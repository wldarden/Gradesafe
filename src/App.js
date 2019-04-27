import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Student from "./components/StudentView";
import Teacher from "./components/TeacherView";
import ClassList from './components/ClassList'
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path='/' component={Login}/>
          <Route exact path='/student' component={Student}/>
          <Route exact path='/teacher' component={Teacher}/>
          <Route exact path='/student/classes' component={ClassList} />
      </div>
    );
  }
}

export default App;
