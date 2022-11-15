import { combineReducers } from 'redux'
import figuresReducer from './figuresReducer'

export default combineReducers({
  figuresList: figuresReducer
})