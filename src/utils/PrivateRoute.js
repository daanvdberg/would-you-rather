import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectAuthedUser from '../selectors/authedUser';

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
	<Route {...rest} render={(props) => {
		return (
			authedUser === ''
				? <Redirect to={{
					pathname: '/login',
					state: {
						loginWarning: 'You need to be logged in to view that page.',
						...((props.location && props.location.pathname) ? { originalRoute: props.location.pathname} : {})
					}
				}} />
				: <Component {...props} />
		)
	}} />
);

const mapStateToProps = createSelector(
	selectAuthedUser(),
	(authedUser) => ({
		authedUser
	})
);

export default connect(mapStateToProps)(PrivateRoute);
