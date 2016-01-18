import characters from 'Characters';
import { getCards } from 'Storage';
import lietnerBoxIntervals from 'LietnerBoxIntervals';
import makeCard from './makeCard';

export default function getCardsToStudy(numCardsWanted, excludeIds = []) {
	return new Promise((resolve, reject) => {
		getCards().then(cardsFromStorage => {			

			var cardsFromStorageToStudy = cardsFromStorage
				.filter(c => c.leitnerBox != 5 && !excludeIds.includes(c.id))
				.slice(0,numCardsWanted);
				
			if(cardsFromStorageToStudy.length == numCardsWanted) {
				resolve(cardsFromStorageToStudy);	
			}

			var charsAlreadyCardsIds = cardsFromStorage.map(c => c.id);
			var numOfCharsNeeded = numCardsWanted - cardsFromStorageToStudy.length;
			var otherCardsToStudy = characters.filter(c => !charsAlreadyCardsIds.includes(c.id)).slice(0, numOfCharsNeeded);			

			var cardsToStudy = cardsFromStorageToStudy.concat(otherCardsToStudy).map(c => makeCard(c, lietnerBoxIntervals[0]));
			resolve(cardsToStudy);
		});
	});
};

