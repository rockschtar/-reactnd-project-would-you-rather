import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import Logger from './Logger'

export default applyMiddleware(thunk, Logger)