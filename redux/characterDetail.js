var initialState = {
  activeId: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'LOAD_CHARACTER':
	    return Object.assign({}, state, {activeId: action.characterId})
  	default:
    	return state
  }
}

export function loadCharacter(characterId) {
  return {
    type: 'LOAD_CHARACTER', characterId
  };
}

