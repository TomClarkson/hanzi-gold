import moment from 'moment';

export default function({id, hanzi, correct, wrong, leitnerBox, nextReview, lastAction}, initialInterval) {
	var correct = correct || 0;
	var wrong = wrong || 0;
	var leitnerBox = leitnerBox || 1;
	var lastAction = lastAction || null;
	var nextReview = nextReview ? moment(nextReview) : moment().add(initialInterval, 'seconds');
	return {
		id,
		hanzi,
		correct,
		wrong,
		leitnerBox,
		lastAction,
		nextReview
	};	
}