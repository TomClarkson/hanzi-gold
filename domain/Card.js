// import moment from 'moment';
// import * as Storage from '../storage';

// var lietnerBoxIntervals = [
// 	15.0, 30.0, 60.0, 120.0, 240.0
// ];
// // need to keep doubing on and on

// export default class Card {
// 	constructor(data) {
// 		const {id, hanzi, correct, wrong, leitnerBox, nextReview, lastAction} = data;

// 		this.id = id;
// 		this.hanzi = hanzi;
// 		this.correct = correct || 0;
// 		this.wrong = wrong || 0;
// 		this.leitnerBox = leitnerBox || 1;
// 		this.lastAction = lastAction || null;
// 		this.nextReview = nextReview ? moment(nextReview) : moment().add(lietnerBoxIntervals[this.leitnerBox - 1], 'seconds');
// 	}
// 	getData() {
// 		return this.data;
// 	}
// 	markAsStudied() {
// 		this.nextReview = moment(this.nextReview).add(lietnerBoxIntervals[this.leitnerBox - 1], 'seconds');	
// 		this.lastAction = 'STUDIED';

// 		Storage.saveCard(this);

// 		return this;
// 	}
// 	markCorrect() {
// 		if(this.leitnerBox == 5) {
// 			var timesCorrectOnBox5 = this.timesCorrectOnBox5 || 1;
// 			// do the doubling logic
// 			this.nextReview = moment().add(lietnerBoxIntervals[this.leitnerBox - 1], 'seconds');	
// 		} else {
// 			this.leitnerBox = this.leitnerBox + 1;
// 			this.nextReview = moment().add(lietnerBoxIntervals[this.leitnerBox - 1], 'seconds');	
// 		}

// 		this.lastAction = 'CORRECT';

// 		Storage.saveCard(this);

// 		return this;
// 	}
// 	markWrong() {
// 		this.leitnerBox = 1;
// 		this.nextReview = moment().add(lietnerBoxIntervals[this.leitnerBox - 1], 'seconds');

// 		this.lastAction = 'WRONG';

// 		Storage.saveCard(this);

// 		return this;
// 	}
// }