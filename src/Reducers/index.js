import { combineReducers } from 'redux';
import users from './Users';
import authenticateUser from './AuthenticatedUser';

export default combineReducers({
    authenticateUser,
    users
});
