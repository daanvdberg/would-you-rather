export const RECEIVE_USERS = 'USERS/RECEIVE';

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users
	};
}