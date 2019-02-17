export const SET_AUTHED_USER = 'AUTHED_USER/SET';
export const LOG_OUT = 'AUTHED_USER/CLEAR';

export function setAuthedUser (id) {
	return {
		type: SET_AUTHED_USER,
		id
	}
}

export function logOut () {
	return {
		type: LOG_OUT
	}
}
