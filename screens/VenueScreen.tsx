import { RouteProp } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import VenueNameWithBackground from '../components/common/VenueNameWithBackground';
import Error from '../components/Error';
import VenueEventsList from '../components/VenueEventsList';
import { useReduxSelector } from '../redux';
import { RootStackParamList, VenuesData, VenuesParamList } from '../types/types';
// import { CityVenuesState } from '../redux/slices/cityVenues';

type VenueScreenProps = {
    route: RouteProp<VenuesParamList, 'Venue'>;
};

//TODO: If venueID or city arent found, or are found and can't be found 
    // from the redux store, return an error component

const VenueScreen: React.FC<VenueScreenProps> = ({ route }) => {
    const {venueId, city} = route.params;
    const cityVenues = useReduxSelector(state => state.cityVenues);

    // Get the venue object from the cityVenues object (from the redux store)
    const cityVenue = cityVenues.find(cityVenue => cityVenue.city === city);
    const venue = cityVenue?.venues.find(venue => venue.id === venueId);

    if (!venue) return <Error message='No venue found'/>
    
    return (
        <SafeAreaView style={styles.container}>
            <VenueNameWithBackground venue={venue} />
            {/* <VenueEventsList venue={venue} /> */}
        </SafeAreaView>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
})
