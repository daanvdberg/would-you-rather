import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import WebFont from 'webfontloader';

import configureStore from './store';
import { loadState, saveState } from './utils/localStorage';

import App from './App';
UIkit.use(Icons);

WebFont.load({
	google: {
		families: ['Asap:400,400i,500,500i,600,600i,700,700i', 'sans-serif']
	}
});

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
