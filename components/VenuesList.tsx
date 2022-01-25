import { useEffect, useState } from 'react';
import {  FlatList, ScrollView , TouchableOpacity } from 'react-native';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { VenuesParams } from '../types/venues';
import { MetaParams } from '../types/meta';
import Loading from './Loading';
import Error from './Error';
import { getRandomColor } from '../utils/getRandomColor';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, VenuesData, VenuesParamList } from '../types/types';
import VenueNameWithBackground from './common/VenueNameWithBackground';
import { useReduxDispatch, useReduxSelector } from '../redux';
import { setVenue } from '../redux/slices/venue';
import { useMemo } from 'react';

type VenuesListProps = {
	city : string;
	navigation: NativeStackNavigationProp<VenuesParamList>;
};

const VenuesList: React.FC<VenuesListProps> = ({ city, navigation }) => {
	const [venuesData, setVenuesData] = useState<VenuesData[]>([]);

    const dispatch = useReduxDispatch()

	const handleEndReached = () => {
		console.log('handleEndReached');
	}

	const handleVenuePress = (venue: VenuesData) => {
		dispatch(setVenue(venue));
		navigation.navigate('Venue', {venueId: venue.id});
	}

	const params = useMemo(() => ({
		city,
	}), [city]) as VenuesParams;
	
	const { loading, error, data } = useSeatGeekQuery('venues', params) as ReturnType<typeof useSeatGeekQuery> & {data: VenuesData[]};
	console.log('data', data);

	// If new data is detected (i.e. page is incremented or city is changed), append incoming data to venuesData array
	useEffect(() => {
		const incomingData = data.map(venue => ({
			...venue,
			backgroundColor: getRandomColor(0.5)
		}))
		setVenuesData(prev => [...prev, ...incomingData]);
	},[data])

	useEffect(() => {
		//If city changes, reset venuesData array
		setVenuesData([]);
	},[city])

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