/**
 * @providesModule Storage
 */

import { AsyncStorage } from 'react-native';

let parseJson = json => JSON.parse(json);

export function getUser() {
	return AsyncStorage.getItem('user')
		.then(parseJson);
}

export function saveUser(username) {
	let user = {username, points: 0};
	let userString = JSON.stringify(user);
	AsyncStorage.setItem('user', userString);
	AsyncStorage.setItem('cards', JSON.stringify([]));
}

export function getCards() {
	return AsyncStorage.getItem('cards')
		.then(cards => cards ? JSON.parse(cards) : []);
}

export function getAttempts() {
	return AsyncStorage.getItem('cards')
		.then(cards => cards ? JSON.parse(cards) : []);
}


// export function saveCard(card) {
// 	if(process.env.NODE_ENV == 'test') return;

// 	getCards().then(cards => {
// 		var hasCard = !! cards.find(c => c.id == card.id);
// 		var newCards = !hasCard ? cards.concat([card]) : cards.map(c => c.id == card.id ? card : c);

// 		localStorage.setItem('cards', JSON.stringify(newCards));
// 	});
// }

// export function getUser() {
// 	return new Promise((resolve, reject) => {
// 		const user = JSON.parse(localStorage.getItem('user'));
// 		resolve(user);
// 	});
// }

// export function saveAttempt(attempt) {
// 	getAttempts().then(attempts => {
// 		localStorage.setItem(
// 			'attempts', 
// 			JSON.stringify(attempts.concat(attempt))
// 		);		
// 	});
// }

// export function savePoints(points) {
// 	getUser().then(user => {
// 		var user = Object.assign(user, {points});
// 		localStorage.setItem('user', JSON.stringify(user));
// 	});	
// }