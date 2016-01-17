import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {getCardsToStudy} from 'Storage';
import reducer from './reducer';

var initialState = {
  cards: [],
  currentCard: null,
  lastCharacterId: null
};

export default function configureStore(initialData = {}) {
  const createStoreWithMiddleware = applyMiddleware(
    thunk
  )(createStore);

  return createStoreWithMiddleware(reducer);
}

export function loadDeck(numCards) {
  return dispatch => {
    getCardsToStudy(numCards).then(cardsToStudy => {
      // need to handle when there are no cards (clocked game)
      dispatch({
        type: 'UPDATE_DECK', 
        cards: cardsToStudy, 
        currentCard: cards[0]
      });
    }); 
  };
}
