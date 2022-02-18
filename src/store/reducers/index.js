import { combineReducers } from 'redux'

import locationReducer from './locationReducer'

import userReducer from './userReducer'

import autoCompleteReducer from './autoCompleteReducer'

import weatherReducer from './weatherReducer'

import whitePagesReducer from './whitePagesReducer'


const rootReducer = combineReducers({

  user: userReducer,

  location: locationReducer,

  autoComplete: autoCompleteReducer,

  weather: weatherReducer,

  white: whitePagesReducer,

})

export default rootReducer;