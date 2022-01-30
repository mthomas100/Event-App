import { VenueEvents } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VenuesData } from '../../types/types'

const venueSlice = createSlice({
    name: 'venueEvents',
    initialState: [] as VenueEvents[],
    reducers: {
        setVenueEvents: (state, action: PayloadAction<VenueEvents>) => {
            // If the venueId already exists, replace the events, otherwise add the venueId and events
            const venueIndex = state.findIndex(venueEvent => venueEvent.venueId === action.payload.venueId);
            if (venueIndex !== -1) {
                state[venueIndex].events = action.payload.events
            } else {
                state.push(action.payload)
            }
        },
    },
})

export const { setVenueEvents } = venueSlice.actions
export default venueSlice.reducer // venueReducer