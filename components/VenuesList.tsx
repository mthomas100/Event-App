import {  FlatList, ScrollView , TouchableOpacity } from 'react-native';
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { VenuesParams } from '../types/venues';
import Loading from './Loading';
import Error from './Error';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import VenueNameWithBackground from './common/VenueNameWithBackground';
import { useMemo } from 'react';
import { VenuesData, VenuesParamList } from '../types/types';

type VenuesListProps = {
	city : string;
	navigation: NativeStackNavigationProp<VenuesParamList>;
};

const VenuesList: React.FC<VenuesListProps> = ({ city, navigation }) => {
	const handleEndReached = () => {
		console.log('handleEndReached');
	}

	const handleVenuePress = (venue: VenuesData) => {
		navigation.navigate('Venue', {
			venueId: venue.id,
			city: venue.city,
		});
	}

	const params = useMemo(() => ({
		city,
	}), [city]) as VenuesParams;
	
	
	const { loading, error, venuesData } = useSeatGeekQuery('venues', params);

	if (loading) return <Loading />;
	if (error) return <Error message={error.message} />;
	
	return (
		<FlatList
			data={venuesData?.venues}
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