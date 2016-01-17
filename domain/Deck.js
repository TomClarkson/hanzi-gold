// import moment from 'moment';
// import getCardsToStudy from './getCardsToStudy'; 
// import Card from './Card';

// export default class Deck {
// 	constructor(cards) {
// 		this.cards = cards;
// 		this.lastCardId = null;
// 	}
// 	getNextCard() {
// 		// dont fetch same card twice
// 		var sorted = this.cards.sort((a, b) =>
// 			(b.nextReview > a.nextReview) ? -1 : 1
// 		);

// 		var getNextCardWithoutRepeating = (cards) => {
// 			if(cards.length == 1) return cards[0];
			
// 			return cards[0] != this.lastCardId ? cards[0] : cards[1];
// 		};

// 		var nextCard = getNextCardWithoutRepeating(sorted);

// 		this.lastCard = nextCard.id;

// 		return nextCard;
// 	}
// 	removeCard(cardId) {
// 		var currentCards = this.cards.filter(c => c.id != cardId);
// 		getCardsToStudy(1, currentCards.map(c => c.id)).then(newCardsToStudy => {
// 			this.cards = currentCards.concat(newCardsToStudy.map(c => new Card(c)));	
// 			// console.table(this.cards);
// 		});
		
// 	}
// }