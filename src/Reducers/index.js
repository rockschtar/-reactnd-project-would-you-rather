import { combineReducers } from 'redux';
import users from './Users';
import authenticateUser from './AuthenticatedUser';
import questions from './Questions';
import { loadingBarReducer } from 'react-redux-loading';
import isLoading from './Loading';


export default combineReducers({
    authenticateUser,
    users,
    questions,
    isLoading,
    loadingBar: loadingBarReducer
});
