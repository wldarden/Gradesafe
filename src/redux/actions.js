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
