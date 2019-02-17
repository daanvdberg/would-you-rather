import { createSelector } from 'reselect';

const selectAuthedUser = () =>
	createSelector(
		state => state.authedUser,
		state => state
	);

export default selectAuthedUser;