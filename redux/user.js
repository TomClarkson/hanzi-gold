// import { getUser, savePoints } from '../storage';

var initialState = {
  username: '',
  points: 0,
  wordsLearnt: 0,
  correct: 0,
  wrong: 0,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'LOAD_USER':
	    	return Object.assign({}, state, action.user);
    case 'UPDATE_DECK':
      var {cards} = action;
      var wordsLearnt = cards.filter(c => c.leitnerBox == 5).length;
      return Object.assign({}, state, {wordsLearnt});
    case 'UPDATE_POINTS':
      var {points} = action;
      // @Todo decouple points from correct and wrong
      var correctStats = points > state.points ? {correct: state.correct + 1} : {wrong: state.wrong + 1};
      return Object.assign({}, state, correctStats, {points});
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

