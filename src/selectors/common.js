import { createSelector } from 'reselect';

const selectRouterMatch = () =>
	createSelector(
		(state, props) => props.match,
		state => state
	);

export default selectRouterMatch;