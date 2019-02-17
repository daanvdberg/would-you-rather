import { createSelector } from 'reselect';

const selectQuestions = () =>
	createSelector(
		state => state.questions,
		state => state
	);

export default selectQuestions;