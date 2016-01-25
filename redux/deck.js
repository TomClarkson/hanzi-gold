import moment from 'moment';
import { saveCard } from 'Storage';
import getCardsToStudy from '../domain/getCardsToStudy';
import lietnerBoxIntervals from 'LietnerBoxIntervals';
import makeAttempt from '../domain/makeAttempt';

var initialState = {
  cards: [],
  allCardsCompleted: false,
  currentCard: null,
  lastCharacterId: null
};

export default function(state = initialState, action) {
	switch (action.type) {
  	case 'UPDATE_DECK':
    	return Object.assign({}, state, {
    		cards: action.cards,
    		currentCard: action.currentCard
    	});
    case 'ALL_CARDS_COMPLETED':
        return Object.assign({}, state, {
          allCardsCompleted: true
        });
  	default:
    	return state
  }
}

export function loadDeck(numCards) {
  return dispatch => {
    getCardsToStudy(numCards).then(cardsToStudy => {
      if(! cardsToStudy.length) {
        dispatch({type: 'ALL_CARDS_COMPLETED'});
      }
      dispatch({
        type: 'UPDATE_DECK', 
        cards: cardsToStudy, 
        currentCard: cardsToStudy[0]
      });
    });
  }
}

function updateDeck(updatedCard, cards, dispatch) {
  saveCard(updatedCard);

  var newCardsSorted = cards
    .map(c => c.id == updatedCard.id ? updatedCard : c)
    .sort((a, b) => 
      (b.nextReview > a.nextReview) ? -1 : 1
    );

  var getNextCardWithoutRepeating = (cards) => {
    if(cards.length == 1) return cards[0];
    
    return cards[0].id != updatedCard.id ? cards[0] : cards[1];
  };

  var nextCard = getNextCardWithoutRepeating(newCardsSorted);

  dispatch({type: 'UPDATE_DECK', currentCard: nextCard, cards: newCardsSorted})
}

export function markCardAsStudied(card, cards) {
  return dispatch => {
    var nextReview = moment(card.nextReview).add(lietnerBoxIntervals[card.leitnerBox - 1], 'seconds');
    var updatedCard = Object.assign(card, {nextReview, lastAction: 'STUDIED'});
    updateDeck(updatedCard, cards, dispatch);
  };  
}

export function markCorrect(card, cards, userAnswer, question = {id: null, type: 'TYPE_MEANING'}) {
  return dispatch => {
    var newLeitnerBox = card.leitnerBox + 1;
    var nextReview = moment(card.nextReview).add(lietnerBoxIntervals[newLeitnerBox - 1], 'seconds');
    var updatedCard = Object.assign(card, {correct: card.correct + 1, nextReview, leitnerBox: newLeitnerBox, lastAction: 'CORRECT'});


    // Storage.saveAttempt({
    //   id: card.id,
    //   attemptedDevice: browser.name,
    //   correct: true,
    //   userAnswer,
    //   question
    // });

    if(newLeitnerBox == 5) {
      getCardsToStudy(1, cards.map(c => c.id)).then(newCardsToStudy => {
        console.log('newCardsToStudy', newCardsToStudy);
        var currentCardsCompleted = cards.filter(c => c.leitnerBox != 5).length == 0;
        if(! newCardsToStudy.length && currentCardsCompleted) {
          console.log('made it', cards);
          // needs to check that no cards exist that are not level 5
          dispatch({type: 'ALL_CARDS_COMPLETED'});
        } else {
          var newCards = cards
            .concat(newCardsToStudy)
            .filter(c => c.id != updatedCard.id);   
            updateDeck(updatedCard, newCards, dispatch);  
        }
        
        
        
      });
    } else {
      updateDeck(updatedCard, cards, dispatch); 
    }
  };  
}

export function markWrong(card, cards, userAnswer, question = {id: null, type: 'TYPE_MEANING'}) {
  return dispatch => {
    var newLeitnerBox = 1;
    var nextReview = moment(card.nextReview).add(lietnerBoxIntervals[newLeitnerBox - 1], 'seconds');
    var updatedCard = Object.assign(card, {wrong: card.wrong + 1, nextReview, leitnerBox: newLeitnerBox, lastAction: 'WRONG'});
    
    // Storage.saveAttempt({
    //   id: card.id,
    //   attemptedDevice: browser.name,
    //   correct: false,
    //   userAnswer,
    //   question
    // });

    updateDeck(updatedCard, cards, dispatch);
  };  
}