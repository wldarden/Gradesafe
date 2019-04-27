import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Student from "./components/StudentView";
import Teacher from "./components/TeacherView";
import ClassList from './components/ClassList';
import { Route } from 'react-router-dom';

export default class App extends Component {
  render() {

    return (
      <div style={{backgroundColor: '#007bff', height: '1000px'}}>
        <div style={{backgroundColor: '#fd7e14', textAlign: 'center', font: 'Times'}}><h2>Uta Gradesafe</h2></div>
        <div className="App" style={{backgroundColor: 'lightGrey'}}>
            <Route exact path='/' component={Login}/>
            <Route exact path='/student' component={Student}/>
            <Route exact path='/teacher' component={Teacher}/>
            <Route exact path='/classes' component={ClassList}/>
        </div>
      </div>
    );
  }
}
