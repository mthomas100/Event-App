import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler'
import { CityVenues, VenuesData } from '../../types/types'
import { Venues } from '../../types/venues'

const cityVenues = createSlice({
    name: 'cityVenues',
    initialState: [] as CityVenues[],
    reducers: {
        setCityVenues: (state, action: PayloadAction<CityVenues>) => {
            // If the city already exists, replace the venues, otherwise add the city and venues
            const cityIndex = state.findIndex(cityVenue => cityVenue.city === action.payload.city)
            if (cityIndex !== -1) {
                state[cityIndex].venues = action.payload.venues
            } else {
                state.push(action.payload)
            }
        }
    },
})

export const { setCityVenues } = cityVenues.actions
export default cityVenues.reducer // cityVenuesReducer