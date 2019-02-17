import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import configureStore from './store';
import { loadState, saveState } from './utils/localStorage';

import App from './App';

const persistedState = loadState();
const store = configureStore();
store.subscribe(throttle(() => {
	saveState({
		questions: store.getState().questions,
		users: store.getState().users,
		authedUser: store.getState().authedUser
	});
}, 1000));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
