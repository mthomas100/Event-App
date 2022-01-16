import { useEffect, useState } from 'react';
import {  FlatList, ScrollView , TouchableOpacity } from 'react-native';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { VenuesParams } from '../types/venues';
import { MetaParams } from '../types/meta';
import Loading from './Loading';
import Error from './Error';
import { getRandomColor } from '../utils/getRandomColor';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, VenuesData } from '../types/types';
import VenueNameWithBackground from './common/VenueNameWithBackground';
import { useReduxDispatch, useReduxSelector } from '../redux';
import { setVenue } from '../redux/slices/venue';

type VenuesListProps = {
	city : string;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const VenuesList: React.FC<VenuesListProps> = ({ city, navigation }) => {
	const [page, setPage] = useState<number>(1);
	const [venuesData, setVenuesData] = useState<VenuesData[]>([]);
	const [paginationMax, setPaginationMax] = useState<number>(0);

    const dispatch = useReduxDispatch()

	const handleVenuePress = (venue: VenuesData) => {
		dispatch(setVenue(venue));
		navigation.navigate('Venue', {venueId: venue.id});
	}

	const handleEndReached = () => {
		if (page < paginationMax) {
			setPage(page + 1);
		}
	}
	
	const metaParams : MetaParams = { page, per_page: 50 };
	const venuesParams : VenuesParams = { city };
	const { loading, error, data, metaData } = useSeatGeekQuery('venues', {...metaParams, ...venuesParams}, [city, page]) as ReturnType<typeof useSeatGeekQuery> & {data: VenuesData[]};
	// If city is changed, reset venuesData to empty array and page to 1
	useEffect(() => {
		// TODO: When a city has changed, take note of the total number of venues
		// and only allow pagination to occur when page * per_page < total number of venues
		setVenuesData([]);
		setPage(1);
	},[city])

	// If new data is detected (i.e. page is incremented or city is changed), append incoming data to venuesData array
	useEffect(() => {
		const incomingData = data.map(venue => ({
			...venue,
			backgroundColor: getRandomColor(0.5)
		}))
		const venuesWithEvents = incomingData.filter(venue => venue.has_upcoming_events === true);
		setVenuesData(prev => [...prev, ...venuesWithEvents]);
	},[data])

	useEffect(() => {
		if (metaData.total) {
			setPaginationMax(Math.ceil(metaData.total / metaData.per_page));
		}
	}, [metaData])

	useEffect(() => {
		console.log('VENUESLISTRENDER');
	})

	//TODO: FIX ISSUE: PAGINATING ISN'T CONSIDENT BECAUSE WE'RE ELIMINATING DATA WHERE HAS_UPCOMING_EVENTS IS FALSE

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	
	return (
		<FlatList
			data={venuesData}
			keyExtractor={(item) => item.id.toString()}
			onEndReached={handleEndReached} // only allow page changing if the venues array 
			onEndReachedThreshold={0.5}
			renderItem={({ item : venue }) => (
				<ScrollView>
				<TouchableOpacity 
				onPress={() => handleVenuePress(venue)}
				>
					<VenueNameWithBackground venue={venue} />
				</TouchableOpacity>
				</ScrollView>
			)}
		/>
	);
}

export default VenuesList;