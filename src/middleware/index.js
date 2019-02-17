import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { createLogger } from 'redux-logger';

const logger = createLogger({
	collapsed: true
});

export default applyMiddleware(
	thunk,
	logger,
	loadingBarMiddleware()
);