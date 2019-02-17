import { createSelector } from 'reselect';

const selectUsers = () =>
	createSelector(
		state => state.users,
		state => state
	);

export default selectUsers;