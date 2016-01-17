import moment from 'moment';

export default function({id, userAnswer, attemptedDevice, question, correct}) {
	var attemptedAt = moment();

	var questionId = question.id;
	var questionType = question.type;
	return {
		id,
		userAnswer,
		correct,
		attemptedAt,
		attemptedDevice,
		questionType,
		questionId
	};
};