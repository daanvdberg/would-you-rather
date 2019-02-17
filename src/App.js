import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import { handleInitialData } from './actions/common';

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
			<div className='App'>
				Hello World
			</div>
		);
	}
}

export default connect()( App );
