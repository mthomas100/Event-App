import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './slices/examples/counter'
import venueEventsReducer from './slices/venueEvents'
import cityVenuesReducer from './slices/cityVenues'

const rootReducer = combineReducers({
    // key:  arbitrary name of the state slice. value: the reducer for that slice
    counter: counterReducer, 
    venueEvents: venueEventsReducer,
    cityVenues: cityVenuesReducer,
})

export default rootReducer