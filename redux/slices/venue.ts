import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VenuesData } from '../../types/types'

const venueSlice = createSlice({
    name: 'venue',
    initialState: {},
    reducers: {
        setVenue: (state, action: PayloadAction<VenuesData>) => action.payload,
    },
})

export const { setVenue } = venueSlice.actions
export default venueSlice.reducer // counterReducer