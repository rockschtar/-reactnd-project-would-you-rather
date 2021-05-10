import { combineReducers } from 'redux'
import users from './Users'
import authedUser from './AuthedUser'
import questions from './Questions'
import { loadingBarReducer } from 'react-redux-loading'
import isLoading from './Loading'

export default combineReducers({
  authedUser,
  users,
  questions,
  isLoading,
  loadingBar: loadingBarReducer
})
