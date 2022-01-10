import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { images } from '../data/images';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { Venues, VenuesParams } from '../types/Venues';


export default function VenuesScreen() {

	//get image from assets/images/

	const params : VenuesParams = {
		city : 'savannah',
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
			<View style={[styles.header, tw`bg-red-500`]}>
				<Text style={tw`text-xl text-gray-100 font-bold`}>Venues</Text>
			</View>
			<ScrollView style={[styles.container, tw`p-2`]}>
				<View style={styles.row}>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<TouchableOpacity style={[styles.venueContainer, tw`bg-gray-500`]}>
								{/* <Text style={[styles.venueTitle, tw`text-white`]}> {item.name}</Text> */}
								<Image
								style={styles.image}
								source={item.imageUrl}
								resizeMode="contain"
								/>
							</TouchableOpacity>
						)}
					/>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	header : {
		padding: 10,
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#1a1a1a',
	},
	row: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start', // if you want to fill rows left to right
		justifyContent: 'center', // if you want to fill rows top to bottom
	},
	venueContainer: {
		width: '90%',
		height: 150,
		marginTop: 20,
		borderRadius: 10,
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	venueTitle : {
		fontSize: 20,
		fontWeight: 'bold',
	},
	image : {
		width: '100%',
	}
});
