import axios from 'axios';

const client = axios.create({baseURL: 'http://localhost:3000'})

export const login = (email, password, userType) => {
  return dispatch => {
     return client.post('/login', {email: email, password: password, userType: userType})
         .then(res => {
             return dispatch({type: 'LOGIN_SUCCESS', data: res})
         })
         .catch(err => {
             return dispatch({type: 'LOGIN_FAILURE', error: err.response})
      })
  }
};

export const fetchClasses = (email, userType) => {
  return dispatch => {
    return client.post('/classes', {email: email, userType: userType})
    .then(res => {
      return dispatch({type: 'FETCH_CLASSES_SUCCESS', data: res})
    })
    .catch(err => {
      return dispatch({type: 'FETCH_CLASSES_FAILURE', error: err.response})
    })
  }
}

export const setCourse = (course) => {
  return dispatch => {
    return dispatch({type: 'SET_COURSE', data: course})
  }
}

export const fetchClassInfoForStudent = (studentId, classId) => {
  return dispatch => {
    return client.post('/class/student', {sId: studentId, cId: classId})
    .then(res => {
      return dispatch({type: 'FETCH_CLASS_SUCCESS', data: res})
    })
    .catch(err => {
      return dispatch({type: 'FETCH_CLASS_FAILURE', error: err.response})
    })
  }
}

export const fetchClassInfoForTeacher = (classId) => {
  return dispatch => {
    return client.post('/class/teacher', {cId: classId})
    .then(res => {
      return dispatch({type: 'FETCH_CLASS_SUCCESS', data: res})
    })
    .catch(err => {
      return dispatch({type: 'FETCH_CLASS_FAILURE', error: err.response})
    })
  }
}
