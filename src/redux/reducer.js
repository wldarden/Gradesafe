import {Map, Set, fromJS}  from 'immutable'

const reducer = (state = Map(), action) => {
  switch (action.type){
      case 'LOGIN_SUCCESS':
        console.log(action)
        let user = action.data.data[0]
        return state.set('user', user);
      default:
          return state;
  }
};

export default reducer
