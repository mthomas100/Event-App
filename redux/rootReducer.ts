import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './slices/examples/counter'

const rootReducer = combineReducers({
    // key:  arbitrary name of the state slice. value: the reducer for that slice
    counter: counterReducer, 
})

export default rootReducer