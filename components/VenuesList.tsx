import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import { images } from '../data/images';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { Venues, VenuesParams } from '../types/Venues';


export default function VenuesList({city} : {city: string}) {

	//get image from assets/images/

	const params : VenuesParams = {
		city,
	}

	const { loading, error, data } = useSeatGeekQuery('venues', params) as {loading: boolean, error: string, data : Venues[]}

	if (loading) return (
		<View style={tw`flex-1 flex justify-center items-center`}>
			<Text>Loading...</Text>
		</View>
	)
	
	if (error) return (
		<View style={tw`flex-1 flex justify-center items-center`}>
			<Text>Error</Text>
		</View>
	)

	data.map((item, i) => item.imageUrl = images[i]);
	
	return (
		<>

		
		<FlatList
		data={data}
		renderItem={({ item }) => (
			<ScrollView>
			<TouchableOpacity 
            style={[styles.venueContainer, tw`bg-gray-500`]}
            >
				<ImageBackground
				style={styles.venueImage}
				source={item.imageUrl}
				resizeMode="cover"
				>
				<View style={[styles.venueImageOverlay]}>
					<Text style={[styles.venueTitle]}> {item.name}</Text>
				</View>
				</ImageBackground>
			</TouchableOpacity>
			</ScrollView>
		)}
		/>
		</>
	);
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
	venueImage : {
		flex: 1,
		width: '100%',
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
});