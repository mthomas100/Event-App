import React from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { VenuesData } from '../../types/types'
import { Venues } from '../../types/venues'

const VenueNameWithBackground:React.FC<{venue: Venues}> = ({ venue }) => {
    return (
        <View style={[styles.venueContainer, {backgroundColor: venue.backgroundColor}]}>
				<View style={[styles.venueImageOverlay]}>
					<Text style={[styles.venueTitle]}> {venue.name}</Text>
				</View>
        </View>
    )
}

const styles = StyleSheet.create({
    venueContainer: {
		width: '90%',
		height: 150,
		marginTop: 20,
		borderRadius: 10,
		overflow: 'hidden',
		alignSelf: 'center',
	},
	venueImageOverlay : {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.15)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	venueTitle : {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#fff',
		paddingHorizontal: 10,
		textAlign: 'center',
	},
})

export default VenueNameWithBackground