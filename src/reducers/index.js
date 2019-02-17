import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import usersReducer from './users';
import authedUserReducer from './authedUser';
import questionsReducer from './questions';

export default combineReducers({
	loadingBar: loadingBarReducer,
	users: usersReducer,
	authedUser: authedUserReducer,
	questions: questionsReducer
});