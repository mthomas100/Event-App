import { RouteProp } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import VenueNameWithBackground from '../components/common/VenueNameWithBackground';
import VenueEventsList from '../components/VenueEventsList';
import { useReduxSelector } from '../redux';
import { RootStackParamList, VenuesData, VenuesParamList } from '../types/types';

type VenueScreenProps = {
    route: RouteProp<VenuesParamList, 'Venue'>;
};

const VenueScreen: React.FC<VenueScreenProps> = ({ route }) => {
    const venue = useReduxSelector(state => state.venue) as VenuesData;
    // if (!venue.id) <Error />
    
    return (
        <SafeAreaView style={styles.container}>
            <VenueNameWithBackground venue={venue} />
            <VenueEventsList venue={venue} />
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
