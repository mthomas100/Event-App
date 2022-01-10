import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function VenuesScreen() {
	//Create an array with length of 10
	const list = Array(10).fill(0);

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// /events
	// /events/{EVENT_ID}
	// /performers
	// /performers/{PERFORMER_ID}
	// /venues
	// /venues/{VENUE_ID}

	useEffect(() => {
		const endPointUrl = 'https://api.seatgeek.com/2';
		const resourceUrl = 'venues';

		const params = {
			client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
			client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
			city: 'savannah'
		};

		const fetchData = async () => {
			try {
				const response = await axios.get(`${endPointUrl}/${resourceUrl}`, {
					params,
				});
				console.log(response.data);
				
				
				// // Check to see if data is already in local storage
				// let teamsData = JSON.parse(localStorage.getItem('teamsData'));
				// if (!teamsData) {
				// 	/* If data is not in local storage, fetch it from the API */
				// 	const response = await axios.get(url, { params });
				// 	/* Get the object containing teams data from the response */
				// 	teamsData = response.data.data;
				// 	/* Create price key and assign a random value for each item in the array */
				// 	teamsData.map((teamData: TeamsData) => {
				// 		teamData.price = getRandomNumber(80, 130);
				// 		return teamData;
				// 	});

				// 	// Save data to local storage
				// 	localStorage.setItem('teamsData', JSON.stringify(teamsData));
				// }
				// // Set Relevant State
				setData(response);
				setLoading(false);
			} catch (error) {
				console.log(error);
				// setError(error);
				// setLoading(false);
			}
		};
		fetchData();
	}, []);

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

	data.map(item => console.log(item))

	return (
		<>
			<View style={[styles.header, tw`bg-red-500`]}>
				<Text style={tw`text-xl text-gray-100 font-bold`}>Venues</Text>
			</View>
			<ScrollView style={[styles.container, tw`p-2`]}>
				<View style={styles.row}>
					{/* {data.map((_, i) => (
						<TouchableOpacity key={i} style={[styles.item, tw`bg-gray-500`]}>
							<Text style={[styles.title, tw`text-white`]}> {data.name}</Text>
						</TouchableOpacity>
					))} */}
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
	item: {
		width: '90%',
		height: 150,
		marginTop: 20,
		borderRadius: 10,
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title : {
		fontSize: 20,
		fontWeight: 'bold',

	}
});
