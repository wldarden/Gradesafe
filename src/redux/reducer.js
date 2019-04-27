import {Map, Set, fromJS}  from 'immutable'

const reducer = (state = Map(), action) => {
  switch (action.type){
      case 'LOGIN_SUCCESS':
        let user = action.data.data[0]
        return state.set('user', user);
      case ('SET_COURSE'):
        return state.set('course', action.data)
      default:
          return state;
  }
};

export default reducer
