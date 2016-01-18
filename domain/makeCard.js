import moment from 'moment';

export default function({id, english, hanzi, correct, wrong, leitnerBox, nextReview, lastAction}, initialInterval) {
	var correct = correct || 0;
	var wrong = wrong || 0;
	var leitnerBox = leitnerBox || 1;
	var lastAction = lastAction || null;
	var nextReview = nextReview ? moment(nextReview) : moment().add(initialInterval, 'seconds');
	return {
		id,
		hanzi,
		english,
		correct,
		wrong,
		leitnerBox,
		lastAction,
		nextReview
	};	
}