import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import { handleInitialData } from './actions/common';

import LoadingBar from 'react-redux-loading-bar';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Question from './pages/Question';
import LeaderBoard from './pages/LeaderBoard';
import NewQuestion from './pages/NewQuestion';
import NoMatch from './pages/NoMatch';
import PrivateRoute from './utils/PrivateRoute';
import { loadState } from './utils/localStorage';

class App extends Component {

	componentDidMount () {
		const persistedState = loadState();
		if (isEmpty(persistedState) || isUndefined(persistedState)) {
			this.props.dispatch(handleInitialData());
		}
	}

	render () {
		return (
			<BrowserRouter>
				<Fragment>
					<LoadingBar style={{ zIndex: '999' }} />

					<Navigation />

					<Switch>
						<Route exact path='/' component={ Home } />
						<Route path='/login' component={ Authentication } />
						<PrivateRoute path='/questions/:id' component={ Question } />
						<PrivateRoute path='/leader-board' component={ LeaderBoard } />
						<PrivateRoute path='/add' component={ NewQuestion } />
						<Route component={ NoMatch } />
					</Switch>

					<div className='footer uk-container uk-container-small'>
						Made by <span>Daan van den Berg</span>.
					</div>
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default connect()( App );
