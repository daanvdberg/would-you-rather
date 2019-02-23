import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveUsers } from './users';

export const RECEIVE_QUESTIONS = 'QUESTIONS/RECEIVE';
export const ADD_QUESTION = 'QUESTIONS/ADD';
export const ANSWER_QUESTION = 'QUESTIONS/ANSWER';

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	};
}

export function addQuestion (question, authedUser) {
	return {
		type: ADD_QUESTION,
		question,
		authedUser
	}
}

export function handleAddQuestion ({optionOne, optionTwo}, complete) {
	return (dispatch, getState) => {
		dispatch(showLoading());
		const { authedUser } = getState();

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question, authedUser)))
			.then(() => {
				dispatch(hideLoading());
				if (complete) {
					complete();
				}
			})
	}
}

export function handleAnswerQuestion (data) {
	return (dispatch) => {
		dispatch(showLoading());
		return saveQuestionAnswer(data)
			.then((res) => {
				dispatch(receiveUsers(res.users));
				dispatch(receiveQuestions(res.questions));
			})
			.catch((err) => {
				console.warn('Error in handleAnswerQuestion: ', err);
			} )
			.finally(() => dispatch(hideLoading()));
	}
}