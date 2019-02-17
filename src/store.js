import { createStore } from 'redux';
import rootReducer from './reducers/index';
import middleware from './middleware';

export default function configureStore(initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		middleware
	);
};
