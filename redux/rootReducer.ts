import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './slices/examples/counter'
import venueReducer from './slices/venue'
import cityVenuesReducer from './slices/cityVenues'

const rootReducer = combineReducers({
    // key:  arbitrary name of the state slice. value: the reducer for that slice
    counter: counterReducer, 
    venue: venueReducer,
    cityVenues: cityVenuesReducer,
})

export default rootReducer