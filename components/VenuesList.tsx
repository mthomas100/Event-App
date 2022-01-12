import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { Venues, VenuesParams } from '../types/venues';
import { MetaParams } from '../types/meta';
import Loading from './Loading';
import Error from './Error';
import { getRandomColor } from '../utils/getRandomColor';


export default function VenuesList({city} : {city: string}) {
	type VenuesData = Venues & {backgroundColor : string};
	
	const [page, setPage] = useState<number>(1);
	const [venuesData, setVenuesData] = useState<VenuesData[]>([]);
	

	// This hook should be called each time the params change ✅
	// Each time it is called, its data should be stored 
	// Upon each new call the new data should be appended to the existing data

	const metaParams : MetaParams = { page }
	const venuesParams : VenuesParams = { city };
	const { loading, error, data } = useSeatGeekQuery('venues', {...metaParams, ...venuesParams}, [city, page]) as ReturnType<typeof useSeatGeekQuery> & {data: VenuesData[]};

	useEffect(() => {
		// If city is changed, reset venuesData to empty array and page to 1
		setVenuesData([]);
		setPage(1);
	},[city])

	useEffect(() => {
		// If new data is detected (i.e. page is incremented or city is changed), append incoming data to venuesData array
		const incomingData = data.map(venue => ({
			...venue,
			backgroundColor: getRandomColor(0.5)
		}))
		setVenuesData(prev => [...prev, ...incomingData]);
	},[data])

	useEffect(() => {
		// Effect placed for logging purposes only
		console.log('venues data change', venuesData);
	}, [venuesData])

	if (loading) return <Loading />;
	if (error) return <Error />;
	
	return (
		<>
		<FlatList
		data={venuesData}
		keyExtractor={(item) => item.id.toString()}
		onEndReached={() => setPage(page + 1)}
		onEndReachedThreshold={0.5}
		renderItem={({ item }) => (
			<ScrollView>
			<TouchableOpacity 
            style={[[styles.venueContainer, {backgroundColor: item.backgroundColor}]]}
            >
				<ImageBackground
				style={styles.venueImage}
				source={null}
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
