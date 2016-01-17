// import { getUser, savePoints } from '../storage';

var initialState = {
  username: '',
  points: 0
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'LOAD_USER':
	    	return action.user;
    case 'UPDATE_POINTS':
      var {points} = action;
      return Object.assign({}, state, {points});
  	default:
    	return state
  }
}

export function loadUser(user) {
  return {
    type: 'LOAD_USER', user
  };
}

export function updatePoints(points) {
  return dispatch => {    
    // savePoints(points);
    dispatch({type: 'UPDATE_POINTS', points});
  };
}

