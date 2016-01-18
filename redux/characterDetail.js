var initialState = {
  activeIndex: null,
  activeId: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'LOAD_CHARACTER':
	    return action.characterIdAndIndex;
  	default:
    	return state
  }
}

export function loadCharacter(characterIdAndIndex) {
  return {
    type: 'LOAD_CHARACTER', characterIdAndIndex
  };
}

