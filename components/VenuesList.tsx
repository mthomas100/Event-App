import { useEffect, useState } from 'react';
import {  FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { Venues, VenuesParams } from '../types/venues';
import { MetaParams } from '../types/meta';
import Loading from './Loading';
import Error from './Error';
import { getRandomColor } from '../utils/getRandomColor';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, VenuesData } from '../types/types';
import VenueNameWithBackground from './common/VenueNameWithBackground';

type VenuesListProps = {
	city : string;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const VenuesList: React.FC<VenuesListProps> = ({ city, navigation }) => {
	
	const [page, setPage] = useState<number>(1);
	const [venuesData, setVenuesData] = useState<VenuesData[]>([]);
	
	const metaParams : MetaParams = { page }
	const venuesParams : VenuesParams = { city };
	const { loading, error, data } = useSeatGeekQuery('venues', {...metaParams, ...venuesParams}, [city, page]) as ReturnType<typeof useSeatGeekQuery> & {data: VenuesData[]};

	// If city is changed, reset venuesData to empty array and page to 1
	useEffect(() => {
		setVenuesData([]);
		setPage(1);
	},[city])

	// If new data is detected (i.e. page is incremented or city is changed), append incoming data to venuesData array
	useEffect(() => {
		const incomingData = data.map(venue => ({
			...venue,
			backgroundColor: getRandomColor(0.5)
		}))
		setVenuesData(prev => [...prev, ...incomingData]);
	},[data])

	if (loading) return <Loading />;
	if (error) return <Error />;
	
	return (
		<>
		<FlatList
		data={venuesData}
		keyExtractor={(item) => item.id.toString()}
		onEndReached={() => setPage(page + 1)}
		onEndReachedThreshold={0.5}
		renderItem={({ item : venue }) => (
			<ScrollView>
			<TouchableOpacity 
			onPress={() => navigation.navigate('Venue', {venueId: venue.id})}
            >
				<VenueNameWithBackground venue={venue} />
			</TouchableOpacity>
			</ScrollView>
		)}
		/>
		</>
	);
}

const styles = StyleSheet.create({});

export default VenuesList;