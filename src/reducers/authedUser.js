import { SET_AUTHED_USER, LOG_OUT } from '../actions/authedUser';

export default function authedUser (state = '', action) {
	switch (action.type) {
		case SET_AUTHED_USER:
			return action.id;

		case LOG_OUT:
			return '';

		default:
			return state;
	}
}